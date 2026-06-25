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
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.18, 7.2);

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

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.2);
    keyLight.position.set(4.2, 4.6, 5.5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight("#27d6c3", 3.1, 10);
    fillLight.position.set(-3.2, 1.2, 3.1);
    scene.add(fillLight);

    const goldLight = new THREE.PointLight("#f4d187", 2.4, 12);
    goldLight.position.set(2.9, -1.6, 3.4);
    scene.add(goldLight);

    const root = new THREE.Group();
    scene.add(root);

    const ikGroup = new THREE.Group();
    root.add(ikGroup);

    const frontMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#f4d187",
        emissive: "#3a2a08",
        emissiveIntensity: 0.08,
        metalness: 0.46,
        roughness: 0.22,
        clearcoat: 0.82,
        clearcoatRoughness: 0.15,
      })
    );

    const sideMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#27d6c3",
        emissive: "#06312f",
        emissiveIntensity: 0.12,
        metalness: 0.38,
        roughness: 0.24,
        clearcoat: 0.68,
      })
    );

    const darkMaterial = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: "#edf4fb",
        metalness: 0.26,
        roughness: 0.22,
        clearcoat: 0.72,
      })
    );

    const makeBar = (
      name: string,
      width: number,
      height: number,
      depth: number,
      x: number,
      y: number,
      rotationZ = 0,
      material: THREE.Material = frontMaterial
    ) => {
      const mesh = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(width, height, depth)),
        material
      );
      mesh.name = name;
      mesh.position.set(x, y, 0);
      mesh.rotation.z = rotationZ;
      ikGroup.add(mesh);
      return mesh;
    };

    // A real 3D "I"
    makeBar("I-top", 0.72, 0.18, 0.42, -0.95, 0.82, 0, darkMaterial);
    makeBar("I-stem", 0.22, 1.52, 0.48, -0.95, 0, 0, frontMaterial);
    makeBar("I-bottom", 0.72, 0.18, 0.42, -0.95, -0.82, 0, darkMaterial);

    // A real 3D "K" built from blocks, not a flat logo inside a coin.
    makeBar("K-stem", 0.24, 1.72, 0.5, 0.1, 0, 0, frontMaterial);
    makeBar("K-upper", 0.28, 1.0, 0.48, 0.56, 0.38, -0.72, sideMaterial);
    makeBar("K-lower", 0.28, 1.04, 0.48, 0.58, -0.4, 0.72, sideMaterial);

    const shadowPlane = new THREE.Mesh(
      trackGeometry(new THREE.PlaneGeometry(3.4, 1.4)),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: "#27d6c3",
          transparent: true,
          opacity: 0.055,
          depthWrite: false,
        })
      )
    );
    shadowPlane.position.set(0, -1.2, -0.45);
    shadowPlane.rotation.x = -0.72;
    root.add(shadowPlane);

    const createRail = (
      points: THREE.Vector3[],
      color: string,
      opacity: number
    ) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = trackGeometry(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(128))
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
        new THREE.Vector3(-2.8, -1.0, -0.25),
        new THREE.Vector3(-1.4, 0.05, 0.45),
        new THREE.Vector3(0.6, 0.42, 0.35),
        new THREE.Vector3(2.6, 1.08, -0.35),
      ],
      "#27d6c3",
      0.38
    );

    const railTwo = createRail(
      [
        new THREE.Vector3(-2.4, 1.0, -0.5),
        new THREE.Vector3(-0.92, 0.42, 0.42),
        new THREE.Vector3(0.78, -0.06, 0.62),
        new THREE.Vector3(2.36, -0.94, -0.2),
      ],
      "#f4d187",
      0.24
    );

    const particleCount = 96;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.55 + Math.random() * 2.65;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.55;
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
          opacity: 0.44,
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
      camera.position.z = compact ? 8.6 : 7.2;
      camera.position.y = compact ? 0.1 : 0.18;
      camera.updateProjectionMatrix();
      root.scale.setScalar(compact ? 0.78 : 1.08);

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

      root.rotation.y = Math.sin(elapsed * 0.2) * 0.1 + mouse.x * 0.12;
      root.rotation.x = Math.sin(elapsed * 0.18) * 0.035 - mouse.y * 0.04;
      root.position.y = Math.sin(elapsed * 0.58) * 0.06;

      ikGroup.rotation.y = elapsed * 0.34;
      ikGroup.rotation.x = Math.sin(elapsed * 0.36) * 0.08;

      railOne.rotation.z = Math.sin(elapsed * 0.3) * 0.03;
      railTwo.rotation.z = -Math.sin(elapsed * 0.26) * 0.026;

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.z = Math.sin(elapsed * 0.14) * 0.025;

      fillLight.position.x = Math.sin(elapsed * 0.64) * 2.5;
      fillLight.position.y = 1.1 + Math.cos(elapsed * 0.5) * 0.45;
      goldLight.position.x = 2.35 + Math.sin(elapsed * 0.32) * 0.28;

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
