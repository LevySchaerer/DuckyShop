import Link from 'next/link';
import styles from './Navigation.module.css';


const Navigation = () => {
    return (
        <nav className={styles.nav}>

            <div className={styles.links}>
                <ul>
                    <li><Link href="/leaderboard" title="Leaderboard">Leaderboard</Link></li>
                    <li><Link href="/login" title="Login">Login</Link></li>
                    <li><Link href="/aboutus" title="About Us">About Us</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;