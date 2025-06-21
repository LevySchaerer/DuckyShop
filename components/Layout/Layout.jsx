import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import Head from 'next/head';
import styles from './Layout.module.css';
import { Bounce, ToastContainer } from 'react-toastify';
import Footer from '../Footer/footer';

const Layout = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e) => setIsDarkMode(e.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Ducky Shop</title>
				<link rel="icon" href="/DuckyType.jpg" />
			</Head>
			<div className={styles.pageContainer}>
				<div className={styles.contentWrapper}>
					<Header />
					<main className={styles.content}>
						{children}
						<ToastContainer
							position="bottom-left"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable={false}
							pauseOnHover={false}
							theme={isDarkMode ? 'dark' : 'light'}
							transition={Bounce}
						></ToastContainer>
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
