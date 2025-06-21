import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const { pathname } = router;

	const getPageTitle = () => {
		switch (pathname) {
			case '/aboutus':
				return 'About Us';
			case '/termsconditions':
				return 'Terms & Conditions';
			case '/impressum':
				return 'Imprint';
			default:
				return '';
		}
	};

	return (
		<header className={styles.header}>
			<Link href="/">
				<div className={styles.logoContainer}>
					<img src="/DuckyType.jpg" alt="Logo" width={50} height={50} />
					<h1>
						DUCKY SHOP
						{getPageTitle() && (
							<span className={styles.subTitle}>{getPageTitle()}</span>
						)}
					</h1>
				</div>
			</Link>
			<div className={styles.logoContainer}>
				<Navigation />
			</div>
		</header>
	);
};

export default Header;
