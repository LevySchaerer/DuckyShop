import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/404.module.css';

export default function NotFound() {
	const [floatingDucks, setFloatingDucks] = useState([]);
	const [ripples, setRipples] = useState([]);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	// Duck emojis für Abwechslung
	const duckEmojis = ['🦆', '🐥', '🐤', '🦢', '🪿'];

	// Mausposition verfolgen
	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePos({ x: e.clientX, y: e.clientY });
			// CSS Custom Properties für Mausposition setzen
			document.documentElement.style.setProperty(
				'--mouse-x',
				`${(e.clientX / window.innerWidth) * 100}%`
			);
			document.documentElement.style.setProperty(
				'--mouse-y',
				`${(e.clientY / window.innerHeight) * 100}%`
			);
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	// Automatische schwimmende Enten
	useEffect(() => {
		const interval = setInterval(() => {
			if (floatingDucks.length < 15) {
				spawnFloatingDuck();
			}
		}, 2000);
		return () => clearInterval(interval);
	}, [floatingDucks.length]);

	// Cleanup alte Enten
	useEffect(() => {
		const cleanup = setInterval(() => {
			setFloatingDucks((prev) => prev.filter((duck) => Date.now() - duck.timestamp < 10000));
			setRipples((prev) => prev.filter((ripple) => Date.now() - ripple.timestamp < 2000));
		}, 1000);
		return () => clearInterval(cleanup);
	}, []);

	const spawnFloatingDuck = useCallback(() => {
		const newDuck = {
			id: Date.now() + Math.random(),
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			emoji: duckEmojis[Math.floor(Math.random() * duckEmojis.length)],
			size: Math.random() * 30 + 20,
			speedX: (Math.random() - 0.5) * 2,
			speedY: (Math.random() - 0.5) * 2,
			rotation: Math.random() * 360,
			timestamp: Date.now(),
		};
		setFloatingDucks((prev) => [...prev, newDuck]);
	}, []);

	const handleClick = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Spawn mehrere Enten beim Klick
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const duck = {
					id: Date.now() + Math.random(),
					x: x + (Math.random() - 0.5) * 100,
					y: y + (Math.random() - 0.5) * 100,
					emoji: duckEmojis[Math.floor(Math.random() * duckEmojis.length)],
					size: Math.random() * 40 + 25,
					speedX: (Math.random() - 0.5) * 4,
					speedY: (Math.random() - 0.5) * 4,
					rotation: Math.random() * 360,
					timestamp: Date.now(),
				};
				setFloatingDucks((prev) => [...prev, duck]);
			}, i * 100);
		}

		// Wasser-Ripple Effekt
		const ripple = {
			id: Date.now(),
			x,
			y,
			timestamp: Date.now(),
		};
		setRipples((prev) => [...prev, ripple]);
	};

	return (
		<div className={styles.salami} onClick={handleClick}>
			{/* Schwimmende Enten */}
			{floatingDucks.map((duck) => (
				<div
					key={duck.id}
					className={styles.floatingDuck}
					style={{
						left: duck.x,
						top: duck.y,
						fontSize: duck.size,
						transform: `rotate(${duck.rotation}deg)`,
					}}
				>
					{duck.emoji}
				</div>
			))}

			{/* Wasser Ripples */}
			{ripples.map((ripple) => (
				<div
					key={ripple.id}
					className={styles.ripple}
					style={{
						left: ripple.x - 25,
						top: ripple.y - 25,
						width: 50,
						height: 50,
					}}
				/>
			))}

			<img src="/sadduck.gif" alt="Sad Duck" className="w-40 mb-6" />
			<p className={styles['404text']}>Diese Ente hat sich verlaufen.</p>
			<a href="/" className={styles['404text2']}>
				Zurück zum Ententeich
			</a>
		</div>
	);
}
