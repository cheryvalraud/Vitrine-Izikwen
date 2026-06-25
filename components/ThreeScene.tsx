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
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.35, 6.5);

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

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.1);
    keyLight.position.set(3.5, 4.2, 5);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight("#27d6c3", 4.2, 10);
    cyanLight.position.set(-2.3, 1.4, 2.8);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight("#f4d187", 2.5, 12);
    goldLight.position.set(2.5, -1.4, 3.1);
    scene.add(goldLight);

    const root = new THREE.Group();
    scene.add(root);

    const tokenGroup = new THREE.Group();
    root.add(tokenGroup);

    const tokenMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#dfe8f3",
        metalness: 0.58,
        roughness: 0.18,
        clearcoat: 0.92,
        clearcoatRoughness: 0.16,
      })
    );

    const token = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(1.16, 1.16, 0.16, 96)),
      tokenMaterial
    );
    token.rotation.x = Math.PI / 2;
    tokenGroup.add(token);

    const outerMark = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.78, 0.026, 18, 128)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#27d6c3",
          emissive: "#082f32",
          emissiveIntensity: 0.22,
          metalness: 0.28,
          roughness: 0.24,
          clearcoat: 0.7,
        })
      )
    );
    outerMark.position.z = 0.098;
    tokenGroup.add(outerMark);

    const innerMark = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.48, 0.16, 0.045)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#07111f",
          metalness: 0.35,
          roughness: 0.2,
          clearcoat: 0.72,
        })
      )
    );
    innerMark.position.z = 0.14;
    tokenGroup.add(innerMark);

    const goldPin = new THREE.Mesh(
      trackGeometry(new THREE.SphereGeometry(0.08, 32, 16)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#f4d187",
          emissive: "#3a2906",
          emissiveIntensity: 0.18,
          metalness: 0.24,
          roughness: 0.22,
          clearcoat: 0.72,
        })
      )
    );
    goldPin.position.set(0.34, 0, 0.15);
    goldPin.scale.set(1, 1, 0.42);
    tokenGroup.add(goldPin);

    const pulseMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: "#27d6c3",
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      })
    );

    const pulseRing = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.34, 0.012, 12, 168)),
      pulseMaterial
    );
    pulseRing.rotation.set(Math.PI / 2, 0, 0);
    tokenGroup.add(pulseRing);

    const ringA = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.76, 0.012, 12, 176)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: "#27d6c3",
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
        })
      )
    );
    ringA.rotation.set(1.14, 0.28, 0.1);
    root.add(ringA);

    const ringB = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(2.24, 0.01, 12, 188)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: "#d9e3ee",
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        })
      )
    );
    ringB.rotation.set(1.42, -0.48, -0.3);
    root.add(ringB);

    const ringC = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(2.72, 0.008, 12, 204)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: "#f4d187",
          transparent: true,
          opacity: 0.18,
          depthWrite: false,
        })
      )
    );
    ringC.rotation.set(1.25, 0.72, 0.42);
    root.add(ringC);

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
      0.52
    );

    const railTwo = createRail(
      [
        new THREE.Vector3(-2.42, 1.05, -0.55),
        new THREE.Vector3(-0.95, 0.55, 0.4),
        new THREE.Vector3(0.85, -0.1, 0.65),
        new THREE.Vector3(2.36, -1.0, -0.25),
      ],
      "#d9e3ee",
      0.34
    );

    const railThree = createRail(
      [
        new THREE.Vector3(-2.86, 0.2, -0.75),
        new THREE.Vector3(-1.3, -0.55, 0.35),
        new THREE.Vector3(0.2, -0.15, 0.8),
        new THREE.Vector3(1.45, 0.55, 0.28),
        new THREE.Vector3(2.76, 0.18, -0.5),
      ],
      "#f4d187",
      0.25
    );

    const orbiters = new THREE.Group();
    root.add(orbiters);

    const nodeGeometry = trackGeometry(new THREE.SphereGeometry(0.055, 20, 10));
    const nodeMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: "#27d6c3",
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
      })
    );

    const nodes: THREE.Mesh[] = [];
    const nodeBaseY: number[] = [];
    for (let i = 0; i < 10; i += 1) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (i / 10) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1.85 : 2.42;
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.3) * 0.82,
        Math.sin(angle) * 0.58
      );
      node.userData.phase = angle;
      nodeBaseY.push(node.position.y);
      nodes.push(node);
      orbiters.add(node);
    }

    const particleCount = 132;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.55 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
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
          size: 0.034,
          transparent: true,
          opacity: 0.58,
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
      camera.position.z = compact ? 8.2 : 6.5;
      camera.position.y = compact ? 0.18 : 0.35;
      camera.updateProjectionMatrix();
      root.scale.setScalar(compact ? 0.72 : 1.03);

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

      root.rotation.y = Math.sin(elapsed * 0.26) * 0.16 + mouse.x * 0.18;
      root.rotation.x = Math.sin(elapsed * 0.2) * 0.05 - mouse.y * 0.055;
      root.position.y = Math.sin(elapsed * 0.72) * 0.08;

      tokenGroup.rotation.z = elapsed * 0.18;
      tokenGroup.rotation.y = Math.sin(elapsed * 0.48) * 0.08;

      const pulseScale = 1 + Math.sin(elapsed * 1.35) * 0.09;
      pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
      pulseMaterial.opacity = 0.1 + Math.sin(elapsed * 1.35) * 0.05;

      ringA.rotation.z = elapsed * 0.11;
      ringB.rotation.z = -elapsed * 0.08;
      ringC.rotation.z = elapsed * 0.055;

      railOne.rotation.z = Math.sin(elapsed * 0.38) * 0.04;
      railTwo.rotation.z = -Math.sin(elapsed * 0.31) * 0.032;
      railThree.rotation.z = Math.sin(elapsed * 0.29) * 0.025;

      orbiters.rotation.z = elapsed * 0.12;
      orbiters.rotation.y = Math.sin(elapsed * 0.36) * 0.1;
      nodes.forEach((node, index) => {
        const phase = node.userData.phase as number;
        const scale = 1 + Math.sin(elapsed * 1.25 + phase) * 0.35;
        node.scale.setScalar(scale);
        node.position.y = nodeBaseY[index] + Math.sin(elapsed * 1.1 + index) * 0.05;
      });

      particles.rotation.y = elapsed * 0.04;
      particles.rotation.z = Math.sin(elapsed * 0.16) * 0.035;

      cyanLight.position.x = Math.sin(elapsed * 0.76) * 2.5;
      cyanLight.position.y = 1.25 + Math.cos(elapsed * 0.58) * 0.54;
      goldLight.position.x = 2.2 + Math.sin(elapsed * 0.4) * 0.32;

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
