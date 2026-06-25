"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const trackGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      geometries.push(geometry);
      return geometry;
    };

    const trackMaterial = <T extends THREE.Material>(material: T) => {
      materials.push(material);
      return material;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.25, 6.7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.8);
    keyLight.position.set(3.4, 4.2, 5);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight("#27d6c3", 3.2, 10);
    cyanLight.position.set(-2.3, 1.3, 2.8);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight("#f4d187", 2.1, 12);
    goldLight.position.set(2.4, -1.2, 3.1);
    scene.add(goldLight);

    const root = new THREE.Group();
    scene.add(root);

    const tokenGroup = new THREE.Group();
    root.add(tokenGroup);

    const tokenMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#eef3f8",
        metalness: 0.5,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.18,
      })
    );

    const token = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(1.18, 1.18, 0.16, 96)),
      tokenMaterial
    );
    token.rotation.x = Math.PI / 2;
    tokenGroup.add(token);

    const tokenRim = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.2, 0.035, 18, 128)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#f4d187",
          emissive: "#2c2109",
          emissiveIntensity: 0.12,
          metalness: 0.32,
          roughness: 0.24,
          clearcoat: 0.72,
        })
      )
    );
    tokenRim.position.z = 0.11;
    tokenGroup.add(tokenRim);

    const logoTexture = new THREE.TextureLoader().load(
      "/images/izikwen-logo-mark.png"
    );
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    textures.push(logoTexture);

    const logoPlate = new THREE.Mesh(
      trackGeometry(new THREE.PlaneGeometry(0.94, 0.52)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          map: logoTexture,
          transparent: true,
          opacity: 0.98,
          depthWrite: false,
        })
      )
    );
    logoPlate.position.z = 0.18;
    tokenGroup.add(logoPlate);

    const pulseMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: "#27d6c3",
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      })
    );

    const pulseRing = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.38, 0.012, 12, 168)),
      pulseMaterial
    );
    pulseRing.rotation.set(Math.PI / 2, 0, 0);
    tokenGroup.add(pulseRing);

    const createRing = (
      radius: number,
      color: string,
      opacity: number,
      rotation: [number, number, number]
    ) => {
      const ring = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(radius, 0.01, 12, 176)),
        trackMaterial(
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            depthWrite: false,
          })
        )
      );
      ring.rotation.set(...rotation);
      root.add(ring);
      return ring;
    };

    const ringA = createRing(1.78, "#27d6c3", 0.28, [1.14, 0.28, 0.1]);
    const ringB = createRing(2.24, "#d9e3ee", 0.17, [1.42, -0.48, -0.3]);
    const ringC = createRing(2.72, "#f4d187", 0.14, [1.25, 0.72, 0.42]);

    const createRail = (
      points: THREE.Vector3[],
      color: string,
      opacity: number
    ) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = trackGeometry(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(124))
      );
      const material = trackMaterial(
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity,
          depthWrite: false,
        })
      );
      const line = new THREE.Line(geometry, material);
      root.add(line);
      return line;
    };

    const railOne = createRail(
      [
        new THREE.Vector3(-2.75, -1.0, -0.2),
        new THREE.Vector3(-1.15, 0.2, 0.7),
        new THREE.Vector3(0.6, 0.45, 0.35),
        new THREE.Vector3(2.55, 1.12, -0.3),
      ],
      "#27d6c3",
      0.42
    );

    const railTwo = createRail(
      [
        new THREE.Vector3(-2.42, 1.05, -0.55),
        new THREE.Vector3(-0.95, 0.55, 0.4),
        new THREE.Vector3(0.85, -0.1, 0.65),
        new THREE.Vector3(2.36, -1.0, -0.25),
      ],
      "#d9e3ee",
      0.25
    );

    const orbiters = new THREE.Group();
    root.add(orbiters);

    const nodeGeometry = trackGeometry(new THREE.SphereGeometry(0.048, 18, 10));
    const nodeMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: "#27d6c3",
        transparent: true,
        opacity: 0.76,
        depthWrite: false,
      })
    );

    const nodes: THREE.Mesh[] = [];
    const nodeBaseY: number[] = [];
    for (let i = 0; i < 8; i += 1) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (i / 8) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1.84 : 2.34;
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.3) * 0.76,
        Math.sin(angle) * 0.56
      );
      node.userData.phase = angle;
      nodeBaseY.push(node.position.y);
      nodes.push(node);
      orbiters.add(node);
    }

    const particleCount = 108;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.55 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.7;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.38;
    }

    const particleGeometry = trackGeometry(new THREE.BufferGeometry());
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particles = new THREE.Points(
      particleGeometry,
      trackMaterial(
        new THREE.PointsMaterial({
          color: "#d9e3ee",
          size: 0.028,
          transparent: true,
          opacity: 0.48,
          depthWrite: false,
        })
      )
    );
    root.add(particles);

    const mouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleResize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const compact = width < 560 || height < 320;

      camera.aspect = width / height;
      camera.position.z = compact ? 8.1 : 6.7;
      camera.position.y = compact ? 0.16 : 0.25;
      camera.updateProjectionMatrix();
      root.scale.setScalar(compact ? 0.7 : 1.02);

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.render(scene, camera);
    };

    container.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    let animationFrameId: number | undefined;
    const startTime = window.performance.now();

    const animate = () => {
      const elapsed = (window.performance.now() - startTime) / 1000;

      root.rotation.y = Math.sin(elapsed * 0.2) * 0.12 + mouse.x * 0.13;
      root.rotation.x = Math.sin(elapsed * 0.18) * 0.04 - mouse.y * 0.045;
      root.position.y = Math.sin(elapsed * 0.62) * 0.06;

      tokenGroup.rotation.z = elapsed * 0.08;
      tokenGroup.rotation.y = Math.sin(elapsed * 0.42) * 0.07;

      const pulseScale = 1 + Math.sin(elapsed * 1.15) * 0.07;
      pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
      pulseMaterial.opacity = 0.08 + Math.sin(elapsed * 1.15) * 0.035;

      ringA.rotation.z = elapsed * 0.08;
      ringB.rotation.z = -elapsed * 0.06;
      ringC.rotation.z = elapsed * 0.04;

      railOne.rotation.z = Math.sin(elapsed * 0.32) * 0.03;
      railTwo.rotation.z = -Math.sin(elapsed * 0.28) * 0.025;

      orbiters.rotation.z = elapsed * 0.08;
      orbiters.rotation.y = Math.sin(elapsed * 0.32) * 0.08;
      nodes.forEach((node, index) => {
        const phase = node.userData.phase as number;
        const scale = 1 + Math.sin(elapsed * 1.05 + phase) * 0.25;
        node.scale.setScalar(scale);
        node.position.y = nodeBaseY[index] + Math.sin(elapsed * 0.95 + index) * 0.04;
      });

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.z = Math.sin(elapsed * 0.14) * 0.025;

      cyanLight.position.x = Math.sin(elapsed * 0.66) * 2.3;
      cyanLight.position.y = 1.2 + Math.cos(elapsed * 0.52) * 0.45;
      goldLight.position.x = 2.15 + Math.sin(elapsed * 0.35) * 0.28;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);

      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
