"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// 型定義（必要に応じて拡張可能）
interface GeometryProps {
	r: number;
	position: number[];
	geometry: THREE.BufferGeometry;
	materials: THREE.Material[];
}

export default function Shapes() {
	return (
		<Canvas
			shadows
			gl={{ antialias: false }}
			dpr={[1, 1.5]}
			camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
		>
			<Suspense fallback={null}>
				<Geometries />
				<ContactShadows
					position={[0, -6.5, 0]}
					opacity={0.65}
					scale={40}
					blur={1}
					far={9}
				/>
				<Environment preset="studio" />
			</Suspense>
		</Canvas>
	);
}

function Geometries() {
	// 型アサーションを利用して各ジオメトリの型を明示する
	const geometries: {
		position: number[];
		r: number;
		geometry: THREE.BufferGeometry;
	}[] = [
		{
			position: [-0.5, 1.5, 0],
			r: 0.3,
			geometry: new THREE.SphereGeometry(1, 32, 16),
		},
		{
			position: [-2, -1, -6],
			r: 0.3,
			geometry: new THREE.CapsuleGeometry(1, 6, 20, 20),
		},
		{
			position: [0, -1, -3],
			r: 0.3,
			geometry: new THREE.CapsuleGeometry(1, 6, 20, 20),
		},
		{
			position: [2, -1, -5],
			r: 0.3,
			geometry: new THREE.CapsuleGeometry(1, 6, 20, 20),
		},
	];

	const materials = [
		new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0 }),
		new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.4 }),
		new THREE.MeshStandardMaterial({ color: 0xa9a9a9, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0xd3d3d3, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({
			roughness: 0,
			metalness: 0.5,
			color: 0xdcdcdc,
		}),
		new THREE.MeshStandardMaterial({
			roughness: 0.1,
			metalness: 0.5,
			color: 0xf5f5f5,
		}),
	];

	return geometries.map(({ position, geometry, r }) => (
		<Geometry
			key={JSON.stringify(position)}
			position={position.map((p) => p * 2)}
			geometry={geometry}
			materials={materials}
			r={r}
		/>
	));
}

function Geometry({
	r,
	position,
	geometry,
	materials,
}: GeometryProps & { position: number[] }) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [visible, setVisible] = useState(false);

	const startingMaterial = getRandomMaterial();

	function getRandomMaterial() {
		return gsap.utils.random(materials);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleClick(e: any) {
		const mesh = e.object as THREE.Mesh;
		gsap.to(mesh.rotation, {
			x: `+=${gsap.utils.random(0, 0.5)}`,
			y: `+=${gsap.utils.random(0, 0.5)}`,
			z: `+=${gsap.utils.random(0, 0.5)}`,
			duration: 1.3,
			ease: "elastic.out(1,0.3)",
			yoyo: true,
		});
		mesh.material = getRandomMaterial();
	}

	const handlePointerOver = () => {
		document.body.style.cursor = "pointer";
	};

	const handlePointerOut = () => {
		document.body.style.cursor = "default";
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
			setVisible(true);
			if (meshRef.current) {
				gsap.from(meshRef.current.scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 1,
					ease: "elastic.out(1,0.3)",
					delay: 0.3,
				});
			}
		});
		return () => ctx.revert();
	}, []);

	return (
		<group position={position as [number, number, number]} ref={meshRef}>
			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<mesh
					geometry={geometry}
					onClick={handleClick}
					onPointerOver={handlePointerOver}
					onPointerOut={handlePointerOut}
					visible={visible}
					material={startingMaterial}
				/>
			</Float>
		</group>
	);
}
