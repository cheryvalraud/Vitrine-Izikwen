"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OrbitNode = {
  sprite: THREE.Sprite;
  radius: number;
  speed: number;
  phase: number;
  yScale: number;
  zOffset: number;
};

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 720;
    const particleCount = isMobile ? 70 : 150;
    const nodeCount = isMobile ? 7 : 13;
    const maxDpr = isMobile ? 1.2 : 1.65;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.set(0, 0.05, isMobile ? 6.4 : 5.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const root = new THREE.Group();
    const coinGroup = new THREE.Group();
    const orbitGroup = new THREE.Group();
    const qrGroup = new THREE.Group();
    const railGroup = new THREE.Group();
    const particleGroup = new THREE.Group();

    scene.add(root);
    root.add(particleGroup, railGroup, orbitGroup, qrGroup, coinGroup);

    scene.add(new THREE.AmbientLight("#baf8e4", 0.78));

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.6);
    keyLight.position.set(3.2, 3.8, 4.4);
    scene.add(keyLight);

    const emeraldLight = new THREE.PointLight("#10f0a0", 4.4, 9);
    emeraldLight.position.set(-2.4, 0.9, 2.2);
    scene.add(emeraldLight);

    const whiteGlint = new THREE.PointLight("#ffffff", 2.6, 7);
    whiteGlint.position.set(2.6, -1.7, 3.4);
    scene.add(whiteGlint);

    let frameId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const makeCoinFaceTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;

      const context = canvas.getContext("2d");
      if (!context) {
        return new THREE.CanvasTexture(canvas);
      }

      const center = 512;
      const radial = context.createRadialGradient(center, 360, 40, center, center, 520);
      radial.addColorStop(0, "#f9fff6");
      radial.addColorStop(0.14, "#d7b76a");
      radial.addColorStop(0.34, "#1fe8a0");
      radial.addColorStop(0.68, "#08241c");
      radial.addColorStop(1, "#03110f");
      context.fillStyle = radial;
      context.beginPath();
      context.arc(center, center, 500, 0, Math.PI * 2);
      context.fill();

      context.lineCap = "round";
      context.lineJoin = "round";

      const rings = [
        { radius: 462, width: 18, color: "rgba(255, 236, 184, 0.92)" },
        { radius: 410, width: 6, color: "rgba(107, 255, 202, 0.78)" },
        { radius: 326, width: 4, color: "rgba(255, 255, 255, 0.25)" },
        { radius: 250, width: 3, color: "rgba(47, 255, 177, 0.46)" },
      ];

      rings.forEach((ring) => {
        context.strokeStyle = ring.color;
        context.lineWidth = ring.width;
        context.beginPath();
        context.arc(center, center, ring.radius, 0, Math.PI * 2);
        context.stroke();
      });

      context.strokeStyle = "rgba(180, 255, 230, 0.58)";
      context.lineWidth = 7;
      for (let i = 0; i < 22; i += 1) {
        const angle = (i / 22) * Math.PI * 2;
        const inner = 176 + (i % 3) * 34;
        const outer = 398 - (i % 4) * 22;
        const x1 = center + Math.cos(angle) * inner;
        const y1 = center + Math.sin(angle) * inner;
        const x2 = center + Math.cos(angle) * outer;
        const y2 = center + Math.sin(angle) * outer;

        context.globalAlpha = i % 2 === 0 ? 0.82 : 0.48;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();

        context.beginPath();
        context.arc(x2, y2, i % 2 === 0 ? 8 : 5, 0, Math.PI * 2);
        context.fillStyle = "rgba(232, 255, 244, 0.82)";
        context.fill();
      }
      context.globalAlpha = 1;

      context.font = "800 260px Arial, Helvetica, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(255, 245, 210, 0.92)";
      context.shadowColor = "rgba(15, 255, 166, 0.52)";
      context.shadowBlur = 28;
      context.fillText("IZ", center, 500);
      context.shadowBlur = 0;

      context.font = "700 46px Arial, Helvetica, sans-serif";
      context.fillStyle = "rgba(224, 255, 240, 0.78)";
      context.fillText("IZIKWEN", center, 680);

      const qrStartX = 706;
      const qrStartY = 214;
      const cell = 16;
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const active =
            row === 0 ||
            col === 0 ||
            row === 7 ||
            col === 7 ||
            (row * 3 + col * 5) % 4 === 0;
          context.fillStyle = active
            ? "rgba(212, 255, 237, 0.84)"
            : "rgba(212, 255, 237, 0.13)";
          context.fillRect(qrStartX + col * cell, qrStartY + row * cell, cell - 3, cell - 3);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      return texture;
    };

    const makeGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 160;

      const context = canvas.getContext("2d");
      if (!context) {
        return new THREE.CanvasTexture(canvas);
      }

      const gradient = context.createRadialGradient(80, 80, 0, 80, 80, 80);
      gradient.addColorStop(0, "rgba(236, 255, 245, 1)");
      gradient.addColorStop(0.25, "rgba(62, 255, 184, 0.72)");
      gradient.addColorStop(0.7, "rgba(18, 226, 156, 0.18)");
      gradient.addColorStop(1, "rgba(18, 226, 156, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 160, 160);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const makeScanTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 80;

      const context = canvas.getContext("2d");
      if (!context) {
        return new THREE.CanvasTexture(canvas);
      }

      const gradient = context.createLinearGradient(0, 40, 512, 40);
      gradient.addColorStop(0, "rgba(30, 255, 178, 0)");
      gradient.addColorStop(0.42, "rgba(30, 255, 178, 0.16)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.94)");
      gradient.addColorStop(0.58, "rgba(30, 255, 178, 0.16)");
      gradient.addColorStop(1, "rgba(30, 255, 178, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 80);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const coinFaceTexture = makeCoinFaceTexture();
    const glowTexture = makeGlowTexture();
    const scanTexture = makeScanTexture();

    const coinBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.28, 1.28, 0.24, isMobile ? 72 : 112),
      new THREE.MeshPhysicalMaterial({
        color: "#0f4b37",
        emissive: "#062719",
        emissiveIntensity: 0.28,
        metalness: 0.92,
        roughness: 0.24,
        clearcoat: 0.86,
        clearcoatRoughness: 0.12,
      }),
    );
    coinBody.rotation.x = Math.PI / 2;
    coinGroup.add(coinBody);

    const faceMaterial = new THREE.MeshPhysicalMaterial({
      map: coinFaceTexture,
      color: "#ffffff",
      metalness: 0.55,
      roughness: 0.18,
      clearcoat: 0.92,
      clearcoatRoughness: 0.12,
    });

    const frontFace = new THREE.Mesh(
      new THREE.CircleGeometry(1.22, isMobile ? 72 : 112),
      faceMaterial,
    );
    frontFace.position.z = 0.124;
    coinGroup.add(frontFace);

    const backFace = new THREE.Mesh(
      new THREE.CircleGeometry(1.22, isMobile ? 72 : 112),
      faceMaterial.clone(),
    );
    backFace.rotation.y = Math.PI;
    backFace.position.z = -0.124;
    coinGroup.add(backFace);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.31, 0.022, 12, isMobile ? 90 : 140),
      new THREE.MeshBasicMaterial({
        color: "#ffe6a8",
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    rim.position.z = 0.14;
    coinGroup.add(rim);

    const innerGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: "#18eba2",
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    innerGlow.position.z = -0.42;
    innerGlow.scale.set(3.2, 3.2, 1);
    coinGroup.add(innerGlow);

    const scanBeam = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 0.33),
      new THREE.MeshBasicMaterial({
        map: scanTexture,
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scanBeam.position.set(-2.8, 0.08, 0.28);
    scanBeam.rotation.z = -0.08;
    coinGroup.add(scanBeam);

    const createRail = (
      radius: number,
      yScale: number,
      color: number,
      opacity: number,
      tilt: number,
      twist: number,
    ) => {
      const points: THREE.Vector3[] = [];

      for (let i = 0; i < 220; i += 1) {
        const angle = (i / 220) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * yScale,
            Math.sin(angle * 2.0) * 0.09 - 0.16,
          ),
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const rail = new THREE.LineLoop(geometry, material);
      rail.rotation.x = tilt;
      rail.rotation.z = twist;
      railGroup.add(rail);
      return rail;
    };

    const rails = [
      createRail(1.86, 0.28, 0x2dffc1, 0.48, -0.48, 0.16),
      createRail(2.26, 0.24, 0xffffff, 0.24, -0.38, -0.22),
      createRail(2.58, 0.22, 0xd8b35f, 0.3, -0.26, 0.34),
    ];

    const orbitNodes: OrbitNode[] = Array.from({ length: nodeCount }, (_, index) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: index % 4 === 0 ? "#ffffff" : index % 3 === 0 ? "#d8b35f" : "#25f3ad",
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      sprite.scale.set(index % 4 === 0 ? 0.14 : 0.105, index % 4 === 0 ? 0.14 : 0.105, 1);
      orbitGroup.add(sprite);

      return {
        sprite,
        radius: 1.6 + (index % 5) * 0.23,
        speed: 0.3 + index * 0.035,
        phase: index * 0.78,
        yScale: 0.24 + (index % 3) * 0.035,
        zOffset: -0.22 - (index % 4) * 0.06,
      };
    });

    for (let i = 0; i < (isMobile ? 18 : 34); i += 1) {
      const size = 0.035 + (i % 3) * 0.018;
      const square = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshBasicMaterial({
          color: "#baffea",
          transparent: true,
          opacity: 0.32,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
      const column = i % 7;
      const row = Math.floor(i / 7);
      square.position.set(
        1.65 + column * 0.075,
        0.62 - row * 0.075,
        -0.08 + Math.sin(i) * 0.08,
      );
      square.rotation.y = -0.24;
      qrGroup.add(square);
    }

    const particlePositions = new Float32Array(particleCount * 3);
    const particleBase = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.85 + Math.random() * 1.75;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * (0.34 + Math.random() * 0.14);
      const z = -0.58 + (Math.random() - 0.5) * 0.72;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      particleBase[i * 3] = x;
      particleBase[i * 3 + 1] = y;
      particleBase[i * 3 + 2] = z;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: "#baffea",
        size: isMobile ? 0.018 : 0.022,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    particleGroup.add(particles);

    const handlePointerMove = (event: PointerEvent) => {
      if (isMobile || prefersReducedMotion) {
        return;
      }

      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleResize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      camera.aspect = width / height;
      camera.position.z = width < 520 ? 6.8 : 5.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    };

    container.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    const renderStill = () => {
      coinGroup.rotation.x = -0.16;
      coinGroup.rotation.y = 0.34;
      renderer.render(scene, camera);
    };

    const animate = () => {
      const elapsed = clock.elapsedTime;
      const slow = prefersReducedMotion ? 0.18 : 1;

      coinGroup.rotation.y = elapsed * 0.35 * slow + mouseX * 0.08;
      coinGroup.rotation.x = Math.sin(elapsed * 0.55 * slow) * 0.14 - mouseY * 0.045;
      coinGroup.rotation.z = Math.sin(elapsed * 0.34 * slow) * 0.025;
      coinGroup.position.y = Math.sin(elapsed * 0.78 * slow) * 0.05;

      rim.rotation.z -= 0.004 * slow;
      innerGlow.material.opacity = 0.24 + Math.sin(elapsed * 1.35 * slow) * 0.08;
      scanBeam.position.x = ((elapsed * 1.42 * slow) % 5.8) - 2.9;
      scanBeam.material.opacity = 0.22 + Math.abs(Math.sin(elapsed * 2.1 * slow)) * 0.3;

      rails.forEach((rail, index) => {
        rail.rotation.z += (0.0027 + index * 0.0006) * slow;
        rail.rotation.y = Math.sin(elapsed * 0.36 * slow + index) * 0.14;
        const material = rail.material as THREE.LineBasicMaterial;
        material.opacity = 0.18 + Math.abs(Math.sin(elapsed * 0.8 * slow + index)) * 0.28;
      });

      orbitNodes.forEach((node) => {
        const angle = elapsed * node.speed * slow + node.phase;
        node.sprite.position.set(
          Math.cos(angle) * node.radius,
          Math.sin(angle) * node.radius * node.yScale,
          node.zOffset + Math.sin(angle * 2.2) * 0.07,
        );
        node.sprite.material.opacity =
          0.52 + Math.abs(Math.sin(elapsed * 1.25 * slow + node.phase)) * 0.34;
      });

      const positions = particles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < positions.count; i += 1) {
        const bx = particleBase[i * 3];
        const by = particleBase[i * 3 + 1];
        const bz = particleBase[i * 3 + 2];
        positions.setXYZ(
          i,
          bx + Math.sin(elapsed * 0.9 * slow + i * 0.17) * 0.035,
          by + Math.cos(elapsed * 1.08 * slow + i * 0.13) * 0.03,
          bz + Math.sin(elapsed * 0.72 * slow + i * 0.19) * 0.045,
        );
      }
      positions.needsUpdate = true;
      particleGroup.rotation.z -= 0.0009 * slow;

      qrGroup.children.forEach((square, index) => {
        square.position.z = -0.05 + Math.sin(elapsed * 1.2 * slow + index * 0.38) * 0.12;
        const material = (square as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = 0.16 + Math.abs(Math.sin(elapsed * 1.5 * slow + index)) * 0.26;
      });

      root.rotation.y = mouseX * 0.035;
      root.rotation.x = -mouseY * 0.02;
      emeraldLight.intensity = 3.5 + Math.sin(elapsed * 1.1 * slow) * 0.7;
      whiteGlint.position.x = 2.4 + Math.sin(elapsed * 0.7 * slow) * 0.45;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      renderStill();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      root.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
          child.geometry.dispose();
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose());
          } else {
            material.dispose();
          }
        }

        if (child instanceof THREE.Sprite) {
          child.material.dispose();
        }

        if (child instanceof THREE.Line || child instanceof THREE.LineLoop) {
          child.geometry.dispose();
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose());
          } else {
            material.dispose();
          }
        }
      });

      coinFaceTexture.dispose();
      glowTexture.dispose();
      scanTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Animated premium IZIKWEN crypto coin payment network"
      className="absolute inset-0 h-full w-full"
    />
  );
}
