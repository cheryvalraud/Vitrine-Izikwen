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
    camera.position.set(0, 0.4, 6.4);

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

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const emeraldLight = new THREE.PointLight("#34d399", 3.2, 10);
    emeraldLight.position.set(-2.2, 1.4, 2.5);
    scene.add(emeraldLight);

    const silverLight = new THREE.PointLight("#dbeafe", 2.1, 12);
    silverLight.position.set(2.4, -1.6, 3);
    scene.add(silverLight);

    const root = new THREE.Group();
    scene.add(root);

    const coinGroup = new THREE.Group();
    root.add(coinGroup);

    const coinMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#eafff4",
        metalness: 0.2,
        roughness: 0.18,
        clearcoat: 0.85,
        clearcoatRoughness: 0.2,
        transmission: 0.05,
      })
    );

    const coin = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(1.2, 1.2, 0.16, 96)),
      coinMaterial
    );
    coin.rotation.x = Math.PI / 2;
    coinGroup.add(coin);

    const faceRing = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.72, 0.025, 18, 120)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#10b981",
          metalness: 0.16,
          roughness: 0.24,
          clearcoat: 0.65,
        })
      )
    );
    faceRing.position.z = 0.095;
    coinGroup.add(faceRing);

    const innerDot = new THREE.Mesh(
      trackGeometry(new THREE.SphereGeometry(0.095, 32, 16)),
      trackMaterial(
        new THREE.MeshPhysicalMaterial({
          color: "#22c55e",
          metalness: 0.08,
          roughness: 0.2,
          clearcoat: 0.7,
        })
      )
    );
    innerDot.position.z = 0.13;
    innerDot.scale.set(1, 1, 0.35);
    coinGroup.add(innerDot);

    const ringMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: "#34d399",
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      })
    );

    const ringA = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.78, 0.012, 12, 160)),
      ringMaterial
    );
    ringA.rotation.set(1.15, 0.28, 0.1);
    root.add(ringA);

    const ringB = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(2.22, 0.01, 12, 180)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: "#94a3b8",
          transparent: true,
          opacity: 0.18,
          depthWrite: false,
        })
      )
    );
    ringB.rotation.set(1.42, -0.48, -0.3);
    root.add(ringB);

    const createRail = (
      points: THREE.Vector3[],
      color: string,
      opacity: number
    ) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = trackGeometry(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(120))
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
        new THREE.Vector3(-2.7, -1.0, -0.2),
        new THREE.Vector3(-1.15, 0.2, 0.7),
        new THREE.Vector3(0.6, 0.45, 0.35),
        new THREE.Vector3(2.5, 1.15, -0.3),
      ],
      "#10b981",
      0.42
    );

    const railTwo = createRail(
      [
        new THREE.Vector3(-2.4, 1.05, -0.55),
        new THREE.Vector3(-0.95, 0.55, 0.4),
        new THREE.Vector3(0.85, -0.1, 0.65),
        new THREE.Vector3(2.35, -1.0, -0.25),
      ],
      "#94a3b8",
      0.28
    );

    const particleCount = 90;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.6 + Math.random() * 2.25;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.35;
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
          color: "#6ee7b7",
          size: 0.035,
          transparent: true,
          opacity: 0.62,
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
      const narrow = width < 560;
      const compact = narrow || height < 280;

      camera.aspect = width / height;
      camera.position.z = compact ? 7.8 : 6.4;
      camera.updateProjectionMatrix();
      root.scale.setScalar(compact ? 0.66 : 1);

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

      root.rotation.y =
        Math.sin(elapsed * 0.25) * 0.14 + mouse.x * 0.16;
      root.rotation.x =
        Math.sin(elapsed * 0.18) * 0.04 - mouse.y * 0.05;
      root.position.y = Math.sin(elapsed * 0.7) * 0.07;

      coinGroup.rotation.z = elapsed * 0.16;
      ringA.rotation.z = elapsed * 0.09;
      ringB.rotation.z = -elapsed * 0.07;
      railOne.rotation.z = Math.sin(elapsed * 0.35) * 0.035;
      railTwo.rotation.z = -Math.sin(elapsed * 0.28) * 0.028;
      particles.rotation.y = elapsed * 0.03;

      emeraldLight.position.x = Math.sin(elapsed * 0.7) * 2.4;
      emeraldLight.position.y = 1.2 + Math.cos(elapsed * 0.55) * 0.5;

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
