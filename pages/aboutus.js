import Link from 'next/link';
import styles from '../styles/aboutus.module.css';
import { FaCode } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { FaRegFaceLaugh } from 'react-icons/fa6';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaAccessibleIcon } from 'react-icons/fa';
import { GiFullPizza } from 'react-icons/gi';
import { LuCarrot } from 'react-icons/lu';
import { VscAzure } from 'react-icons/vsc';
import { PiBoxingGlove } from 'react-icons/pi';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaBaby } from 'react-icons/fa';

export default function AboutUs() {
	return (
		<div className={styles.body}>
			<div className={styles.container}>
				<div className={styles.StartScreen}>
					<h1 className={styles.title}>Our Team</h1>
					<h3 className={styles.subTitle}>Get to know the team behind DUCKYSHOP.</h3>
					<div className={styles.bubble}></div>
					<div className={styles.bubble}></div>
					<div className={styles.bubble}></div>
					<div className={styles.bubble}></div>
				</div>

				<div className={styles.person1}>
					<div className={styles.ImageContainer}>
						<img src="/Cyrill.gif" class={styles.personImage} alt="" />
					</div>
					<div className={styles.profileContainer}>
						<h1 className={styles.personName}>Cyrill Gammeter</h1>
						<div className={styles.profilePoints}>
							<FaCode size={25} /> Frontend Developer
						</div>
						<div className={styles.profilePoints}>
							<IoIosFootball size={25} /> Football Player
						</div>
						<div className={styles.profilePoints}>
							<FaRegFaceLaugh size={25} /> Mous breather
						</div>
						<div className={styles.profilePoints}>
							<MdFamilyRestroom size={25} /> Loves his Family
						</div>
					</div>
				</div>

				<div className={styles.person2}>
					<div className={styles.profileContainer}>
						<h1 className={styles.personName}>Levy Schärer</h1>
						<div className={styles.profilePoints}>
							<FaCode size={25} /> Frontend Developer
						</div>
						<div className={styles.profilePoints}>
							<FaAccessibleIcon size={25} /> Full Stack Lega
						</div>
						<div className={styles.profilePoints}>
							<GiFullPizza size={25} /> Fake italian
						</div>
						<div className={styles.profilePoints}>
							<LuCarrot size={25} /> Carrots are underrated
						</div>
					</div>
					<div className={styles.ImageContainer}>
						<img src="/Levy.gif" class={styles.personImage} alt="" />
					</div>
				</div>

				<div className={styles.person3}>
					<div className={styles.ImageContainer}>
						<img src="/Emin.gif" class={styles.personImage} alt="" />
					</div>
					<div className={styles.profileContainer}>
						<h1 className={styles.personName}>Emin Zenoverschanin</h1>
						<div className={styles.profilePoints}>
							<VscAzure size={25} /> Cloud Specialist
						</div>
						<div className={styles.profilePoints}>
							<PiBoxingGlove size={25} /> 19 Years of Boxing experience
						</div>
						<div className={styles.profilePoints}>
							<FaMapLocationDot size={25} /> Proud Serb
						</div>
						<div className={styles.profilePoints}>
							<FaBaby size={25} /> Family father of three children
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
