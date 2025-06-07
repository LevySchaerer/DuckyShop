import Link from 'next/link';
import styles from '../styles/aboutus.module.css';

export default function AboutUs() {
  return (
    <div className={styles.body}>
        <div className={styles.imgContainer}>
            <div className={styles.images}>
                <Link href="/profile/161"><img id={styles.levy} src="/Levy.gif" alt="Bildbeschreibung"/></Link>
                <h1>Levy</h1>
                <h3>Italian</h3>
            </div>
            
            <div className={styles.images}>
                <Link href="/profile/132"><img id={styles.oli} src="/Cyrill.gif" alt="Bildbeschreibung"/></Link>
                <h1>Cyrill</h1>
                <h3>Münsige-Rechts</h3>
            </div>

            <div className={styles.images}>
                <Link href="/profile/132"><img id={styles.oli} src="/Emin.gif" alt="Bildbeschreibung"/></Link>
                <h1>Emin</h1>
                <h3>Serbian</h3>
            </div>
        </div>
    </div>
  );
}