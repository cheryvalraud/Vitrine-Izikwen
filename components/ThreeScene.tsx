"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Firework = {
  points: THREE.Points;
  velocities: THREE.Vector3[];
  life: number;
  maxLife: number;
};

export default function SarahGiftBoxShow() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const fireworks: Firework[] = [];

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#080014", 0.055);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 2.2, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("#080014", 1);
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const createStandardMaterial = (
      options: THREE.MeshStandardMaterialParameters
    ) => {
      const material = new THREE.MeshStandardMaterial(options);
      materials.push(material);
      return material;
    };

    const createBasicMaterial = (options: THREE.MeshBasicMaterialParameters) => {
      const material = new THREE.MeshBasicMaterial(options);
      materials.push(material);
      return material;
    };

    const createGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      geometries.push(geometry);
      return geometry;
    };

    const smoothstep = (start: number, end: number, value: number) => {
      const x = Math.min(Math.max((value - start) / (end - start), 0), 1);
      return x * x * (3 - 2 * x);
    };

    const createTextSprite = (
      lines: string[],
      width = 1400,
      height = 420
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(255,255,255,0.20)");
      gradient.addColorStop(0.45, "rgba(255,105,210,0.20)");
      gradient.addColorStop(1, "rgba(125,211,252,0.18)");

      ctx.fillStyle = gradient;
      ctx.roundRect(40, 40, width - 80, height - 80, 45);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "#ff4fd8";
      ctx.shadowBlur = 28;

      lines.forEach((line, index) => {
        if (index === 0) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 78px Arial";
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.88)";
          ctx.font = "bold 42px Arial";
        }

        const y = height / 2 - 70 + index * 80;
        ctx.fillText(line, width / 2, y);
      });

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      textures.push(texture);

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      });

      materials.push(material);

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(6.5, 2.0, 1);

      return sprite;
    };

    // Lights
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.7);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight("#ff4fd8", 5, 14);
    pinkLight.position.set(-4, 4, 5);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight("#60a5fa", 4, 14);
    blueLight.position.set(4, 1, 5);
    scene.add(blueLight);

    const goldLight = new THREE.PointLight("#facc15", 3, 12);
    goldLight.position.set(0, 5, 3);
    scene.add(goldLight);

    const mainLight = new THREE.DirectionalLight("#ffffff", 2.3);
    mainLight.position.set(3, 5, 6);
    scene.add(mainLight);

    // Star background
    const starCount = 1400;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 55;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }

    const starGeometry = createGeometry(new THREE.BufferGeometry());
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    materials.push(starMaterial);

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Main stage group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Gift box group
    const giftGroup = new THREE.Group();
    giftGroup.position.y = -1.1;
    stageGroup.add(giftGroup);

    const boxMaterial = createStandardMaterial({
      color: "#ec4899",
      roughness: 0.35,
      metalness: 0.2,
      emissive: "#7f1d5f",
      emissiveIntensity: 0.1,
    });

    const ribbonMaterial = createStandardMaterial({
      color: "#facc15",
      roughness: 0.22,
      metalness: 0.35,
      emissive: "#a16207",
      emissiveIntensity: 0.15,
    });

    // Box base
    const boxBase = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(3.4, 2.1, 3.4)),
      boxMaterial
    );
    boxBase.position.y = 0;
    giftGroup.add(boxBase);

    // Ribbons on box
    const frontRibbon = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(0.35, 2.22, 3.52)),
      ribbonMaterial
    );
    frontRibbon.position.y = 0.02;
    giftGroup.add(frontRibbon);

    const sideRibbon = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(3.52, 2.22, 0.35)),
      ribbonMaterial
    );
    sideRibbon.position.y = 0.03;
    giftGroup.add(sideRibbon);

    // Lid pivot. This makes the top open like a real box.
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 1.2, -1.8);
    giftGroup.add(lidPivot);

    const lid = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(3.8, 0.38, 3.8)),
      boxMaterial
    );
    lid.position.set(0, 0, 1.8);
    lidPivot.add(lid);

    const lidRibbonA = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(0.38, 0.42, 3.9)),
      ribbonMaterial
    );
    lidRibbonA.position.set(0, 0.03, 1.8);
    lidPivot.add(lidRibbonA);

    const lidRibbonB = new THREE.Mesh(
      createGeometry(new THREE.BoxGeometry(3.9, 0.42, 0.38)),
      ribbonMaterial
    );
    lidRibbonB.position.set(0, 0.04, 1.8);
    lidPivot.add(lidRibbonB);

    // Dog group
    const dogGroup = new THREE.Group();
    dogGroup.position.set(0, -0.95, 0.1);
    giftGroup.add(dogGroup);

    const dogFur = createStandardMaterial({
      color: "#d6a56f",
      roughness: 0.65,
      metalness: 0.05,
    });

    const dogDark = createStandardMaterial({
      color: "#3b2416",
      roughness: 0.5,
    });

    const dogWhite = createStandardMaterial({
      color: "#fff7ed",
      roughness: 0.45,
    });

    const blackMat = createStandardMaterial({
      color: "#050505",
      roughness: 0.3,
    });

    const tongueMat = createStandardMaterial({
      color: "#fb7185",
      roughness: 0.4,
    });

    // Dog body
    const body = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.58, 32, 32)),
      dogFur
    );
    body.scale.set(1.0, 1.25, 0.78);
    body.position.y = 0.1;
    dogGroup.add(body);

    // Dog head
    const head = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.58, 32, 32)),
      dogFur
    );
    head.position.set(0, 0.95, 0.05);
    dogGroup.add(head);

    // Dog snout
    const snout = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.28, 24, 24)),
      dogWhite
    );
    snout.scale.set(1.15, 0.78, 0.7);
    snout.position.set(0, 0.82, 0.48);
    dogGroup.add(snout);

    // Eyes
    const leftEye = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.055, 16, 16)),
      blackMat
    );
    leftEye.position.set(-0.2, 1.08, 0.55);
    dogGroup.add(leftEye);

    const rightEye = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.055, 16, 16)),
      blackMat
    );
    rightEye.position.set(0.2, 1.08, 0.55);
    dogGroup.add(rightEye);

    // Nose
    const nose = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.075, 16, 16)),
      blackMat
    );
    nose.scale.set(1.1, 0.8, 0.8);
    nose.position.set(0, 0.87, 0.68);
    dogGroup.add(nose);

    // Tongue
    const tongue = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.08, 16, 16)),
      tongueMat
    );
    tongue.scale.set(0.75, 1.25, 0.25);
    tongue.position.set(0, 0.64, 0.6);
    dogGroup.add(tongue);

    // Ears
    const leftEar = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.22, 24, 24)),
      dogDark
    );
    leftEar.scale.set(0.7, 1.35, 0.32);
    leftEar.position.set(-0.48, 0.92, 0.05);
    leftEar.rotation.z = 0.45;
    dogGroup.add(leftEar);

    const rightEar = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.22, 24, 24)),
      dogDark
    );
    rightEar.scale.set(0.7, 1.35, 0.32);
    rightEar.position.set(0.48, 0.92, 0.05);
    rightEar.rotation.z = -0.45;
    dogGroup.add(rightEar);

    // Paws
    const leftPaw = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.18, 20, 20)),
      dogWhite
    );
    leftPaw.position.set(-0.34, -0.47, 0.35);
    dogGroup.add(leftPaw);

    const rightPaw = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.18, 20, 20)),
      dogWhite
    );
    rightPaw.position.set(0.34, -0.47, 0.35);
    dogGroup.add(rightPaw);

    // Party hat
    const hatMaterial = createStandardMaterial({
      color: "#a855f7",
      roughness: 0.35,
      metalness: 0.15,
      emissive: "#581c87",
      emissiveIntensity: 0.2,
    });

    const hat = new THREE.Mesh(
      createGeometry(new THREE.ConeGeometry(0.28, 0.7, 32)),
      hatMaterial
    );
    hat.position.set(0, 1.57, 0.05);
    dogGroup.add(hat);

    const hatBall = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.08, 16, 16)),
      ribbonMaterial
    );
    hatBall.position.set(0, 1.95, 0.05);
    dogGroup.add(hatBall);

    // Microphone
    const micGroup = new THREE.Group();
    micGroup.position.set(0.55, 0.15, 0.5);
    micGroup.rotation.z = -0.35;
    dogGroup.add(micGroup);

    const micHandle = new THREE.Mesh(
      createGeometry(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 16)),
      blackMat
    );
    micHandle.rotation.z = Math.PI / 2;
    micGroup.add(micHandle);

    const micTop = new THREE.Mesh(
      createGeometry(new THREE.SphereGeometry(0.12, 16, 16)),
      createStandardMaterial({
        color: "#d1d5db",
        roughness: 0.2,
        metalness: 0.7,
      })
    );
    micTop.position.x = -0.31;
    micGroup.add(micTop);

    // Message cards
    const mainMessage = createTextSprite([
      "Happy Birthday Sarah",
      "This little surprise is made for you ✨",
      "May your year be full of joy, peace, and love",
    ]);
    mainMessage.position.set(0, 3.4, 0);
    scene.add(mainMessage);

    const dogMessage = createTextSprite(
      ["Woof woof, Sarah!", "Happy Birthday from your tiny singer 🎤"],
      1200,
      330
    );
    dogMessage.scale.set(4.7, 1.3, 1);
    dogMessage.position.set(2.5, 2.0, 0.2);
    scene.add(dogMessage);

    // Balloons
    const balloonGroups: THREE.Group[] = [];
    const balloonColors = [
      "#fb7185",
      "#f472b6",
      "#c084fc",
      "#60a5fa",
      "#34d399",
      "#facc15",
    ];

    for (let i = 0; i < 10; i++) {
      const balloonGroup = new THREE.Group();

      const balloonMat = createStandardMaterial({
        color: balloonColors[i % balloonColors.length],
        roughness: 0.25,
        metalness: 0.1,
        emissive: balloonColors[i % balloonColors.length],
        emissiveIntensity: 0.12,
      });

      const balloon = new THREE.Mesh(
        createGeometry(new THREE.SphereGeometry(0.26, 24, 24)),
        balloonMat
      );
      balloon.scale.set(0.85, 1.15, 0.85);
      balloonGroup.add(balloon);

      const stringGeometry = createGeometry(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -0.25, 0),
          new THREE.Vector3(0, -1.2, 0),
        ])
      );

      const stringMaterial = new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.5,
      });
      materials.push(stringMaterial);

      const string = new THREE.Line(stringGeometry, stringMaterial);
      balloonGroup.add(string);

      const angle = (i / 10) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.8;

      balloonGroup.position.set(
        Math.cos(angle) * radius,
        -0.2,
        Math.sin(angle) * radius
      );

      balloonGroup.userData.startX = balloonGroup.position.x;
      balloonGroup.userData.startZ = balloonGroup.position.z;
      balloonGroup.userData.speed = 0.4 + Math.random() * 0.35;
      balloonGroup.userData.offset = Math.random() * Math.PI * 2;

      balloonGroups.push(balloonGroup);
      giftGroup.add(balloonGroup);
    }

    // Confetti pieces
    const confettiPieces: THREE.Mesh[] = [];
    const confettiColors = [
      "#facc15",
      "#fb7185",
      "#60a5fa",
      "#34d399",
      "#c084fc",
      "#ffffff",
    ];

    for (let i = 0; i < 120; i++) {
      const confettiMat = createBasicMaterial({
        color: confettiColors[i % confettiColors.length],
        side: THREE.DoubleSide,
      });

      const confetti = new THREE.Mesh(
        createGeometry(new THREE.PlaneGeometry(0.09, 0.045)),
        confettiMat
      );

      confetti.position.set(0, 0.8, 0);

      confetti.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        1.5 + Math.random() * 4,
        (Math.random() - 0.5) * 4
      );

      confetti.userData.spin = new THREE.Vector3(
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5
      );

      confettiPieces.push(confetti);
      giftGroup.add(confetti);
    }

    const createFirework = () => {
      const count = 160;
      const positions = new Float32Array(count * 3);
      const velocities: THREE.Vector3[] = [];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;

        const direction = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();

        direction.multiplyScalar(0.9 + Math.random() * 2.1);
        velocities.push(direction);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const color = new THREE.Color().setHSL(Math.random(), 0.95, 0.7);

      const material = new THREE.PointsMaterial({
        color,
        size: 0.075,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);

      points.position.set(
        (Math.random() - 0.5) * 6,
        1.3 + Math.random() * 2.8,
        (Math.random() - 0.5) * 2
      );

      scene.add(points);

      fireworks.push({
        points,
        velocities,
        life: 0,
        maxLife: 1.7,
      });
    };

    const autoFirework = window.setInterval(() => {
      createFirework();
    }, 2400);

    const mouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleClick = () => {
      createFirework();
      createFirework();
      createFirework();
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("click", handleClick);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.getElapsedTime();

      const openAmount = smoothstep(1.0, 3.0, elapsed);
      const dogRiseAmount = smoothstep(2.2, 4.4, elapsed);
      const celebrationAmount = smoothstep(3.1, 5.0, elapsed);

      // Box lid opens
      lidPivot.rotation.x = -openAmount * 1.45;

      // Dog pops out
      dogGroup.position.y = -0.95 + dogRiseAmount * 2.35;
      dogGroup.rotation.y = Math.sin(elapsed * 1.8) * 0.18;
      dogGroup.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.025 * dogRiseAmount);

      // Dog sings: head bob and tongue movement
      head.position.y = 0.95 + Math.sin(elapsed * 8) * 0.035 * dogRiseAmount;
      tongue.scale.y = 1.25 + Math.sin(elapsed * 10) * 0.35 * dogRiseAmount;
      micGroup.rotation.z = -0.35 + Math.sin(elapsed * 5) * 0.08 * dogRiseAmount;

      // Gift box bounce
      giftGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.08;
      stageGroup.rotation.y += delta * 0.08;

      // Balloons rise from the box
      balloonGroups.forEach((balloonGroup, index) => {
        const rise = Math.max(0, celebrationAmount);

        balloonGroup.position.y =
          -0.1 + rise * (2.2 + index * 0.12) + Math.sin(elapsed * 1.3 + index) * 0.08;

        balloonGroup.position.x =
          balloonGroup.userData.startX +
          Math.sin(elapsed * balloonGroup.userData.speed + balloonGroup.userData.offset) *
            0.25;

        balloonGroup.position.z =
          balloonGroup.userData.startZ +
          Math.cos(elapsed * balloonGroup.userData.speed + balloonGroup.userData.offset) *
            0.25;

        balloonGroup.scale.setScalar(0.05 + rise * 0.95);
      });

      // Confetti burst
      confettiPieces.forEach((piece) => {
        const t = Math.max(0, elapsed - 3.0);

        if (t < 7) {
          const velocity = piece.userData.velocity as THREE.Vector3;
          const spin = piece.userData.spin as THREE.Vector3;

          piece.position.x = velocity.x * t * 0.35;
          piece.position.y = 0.9 + velocity.y * t * 0.45 - 0.55 * t * t;
          piece.position.z = velocity.z * t * 0.35;

          piece.rotation.x += spin.x * delta;
          piece.rotation.y += spin.y * delta;
          piece.rotation.z += spin.z * delta;
        }
      });

      // Message animation
      mainMessage.position.y = 3.45 + Math.sin(elapsed * 1.2) * 0.08;
      dogMessage.position.y = 2.0 + Math.sin(elapsed * 2.1) * 0.06;
      dogMessage.material.opacity = dogRiseAmount;

      // Stars slowly move
      stars.rotation.y += delta * 0.02;
      stars.rotation.x += delta * 0.006;

      // Camera parallax
      camera.position.x += (mouse.x * 0.65 - camera.position.x) * 0.035;
      camera.position.y += (-mouse.y * 0.35 + 2.2 - camera.position.y) * 0.035;
      camera.lookAt(0, 0.5, 0);

      // Fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.life += delta;

        const positionAttribute = firework.points.geometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute;

        for (let j = 0; j < firework.velocities.length; j++) {
          positionAttribute.array[j * 3] += firework.velocities[j].x * delta;
          positionAttribute.array[j * 3 + 1] += firework.velocities[j].y * delta;
          positionAttribute.array[j * 3 + 2] += firework.velocities[j].z * delta;

          firework.velocities[j].y -= delta * 1.15;
        }

        positionAttribute.needsUpdate = true;

        const material = firework.points.material as THREE.PointsMaterial;
        material.opacity = Math.max(0, 1 - firework.life / firework.maxLife);

        if (firework.life >= firework.maxLife) {
          scene.remove(firework.points);
          firework.points.geometry.dispose();
          material.dispose();
          fireworks.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(autoFirework);

      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("click", handleClick);

      fireworks.forEach((firework) => {
        scene.remove(firework.points);
        firework.points.geometry.dispose();

        const material = firework.points.material;
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material.dispose();
        }
      });

      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}