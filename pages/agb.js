import styles from '../styles/agb.module.css';

function AGB() {
	return (
		<div className={styles.body}>
			<div className={styles.container}>
				<h1 className={styles.title}>Allgemeine Geschäftsbedingungen</h1>
				<p className={styles.date}>Stand: April 2025</p>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>1. Geltungsbereich</h2>
					<p className={styles.text}>
						Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen
						über unseren Online-Shop „DuckyShop“, betrieben von der campustype GmbH, mit
						Sitz in der Schweiz (nachfolgend „Anbieter“ genannt).
					</p>
					<p className={styles.text}>
						Entgegenstehende oder von diesen AGB abweichende Bedingungen der Kundschaft
						werden nicht anerkannt, ausser der Anbieter stimmt diesen ausdrücklich zu.
					</p>
					<p className={styles.text}>
						Der Anbieter behält sich vor, die AGB jederzeit zu ändern. Es gilt die zum
						Zeitpunkt der Bestellung gültige Fassung.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>2. Vertragsschluss</h2>
					<p className={styles.text}>
						Die Produktdarstellungen im DuckyShop stellen kein rechtlich bindendes
						Angebot dar, sondern eine unverbindliche Aufforderung zur Bestellung.
					</p>
					<p className={styles.text}>
						Mit dem Absenden einer Bestellung gibt die Kundschaft ein verbindliches
						Angebot zum Abschluss eines Kaufvertrags ab. Der Vertrag kommt zustande,
						wenn der Anbieter die Bestellung durch eine Auftragsbestätigung per E-Mail
						annimmt.
					</p>
					<p className={styles.text}>
						Der Anbieter behält sich vor, Bestellungen ohne Angabe von Gründen
						abzulehnen.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>3. Preise und Zahlungsbedingungen</h2>
					<p className={styles.text}>
						Alle Preise verstehen sich in Schweizer Franken (CHF) inklusive gesetzlicher
						Mehrwertsteuer.
					</p>
					<p className={styles.text}>
						Versandkosten werden separat ausgewiesen und sind vor Abschluss des
						Bestellvorgangs ersichtlich.
					</p>
					<p className={styles.text}>
						Als Zahlungsmethoden stehen TWINT, Kreditkarte, PayPal und Vorkasse zur
						Verfügung.
					</p>
					<p className={styles.text}>
						Der Gesamtbetrag ist sofort zur Zahlung fällig. Bei Zahlungsverzug behält
						sich der Anbieter vor, Mahngebühren zu erheben.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>4. Lieferung</h2>
					<p className={styles.text}>
						Die Lieferung erfolgt innerhalb der Schweiz an die von der Kundschaft
						angegebene Adresse.
					</p>
					<p className={styles.text}>
						Lieferzeit beträgt in der Regel 2–5 Werktage. Bei Verzögerungen wird die
						Kundschaft informiert.
					</p>
					<p className={styles.text}>
						Die Gefahr geht mit Übergabe der Ware an das Transportunternehmen auf die
						Kundschaft über.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>5. Rückgabe & Widerrufsrecht</h2>
					<p className={styles.text}>
						Privatkunden haben das Recht, innerhalb von 14 Tagen nach Erhalt der Ware
						vom Vertrag zurückzutreten. Die Rückgabe hat in ungebrauchtem und
						unbeschädigtem Zustand zu erfolgen.
					</p>
					<p className={styles.text}>
						Die Kosten für die Rücksendung trägt die Kundschaft, es sei denn, es handelt
						sich um eine fehlerhafte oder falsche Lieferung.
					</p>
					<p className={styles.text}>
						Vom Widerruf ausgeschlossen sind personalisierte Enten sowie digitale
						Inhalte.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>6. Gewährleistung und Haftung</h2>
					<p className={styles.text}>
						Es gelten die gesetzlichen Gewährleistungsrechte gemäss Schweizer
						Obligationenrecht (OR).
					</p>
					<p className={styles.text}>
						Der Anbieter haftet nur für direkte Schäden, die durch vorsätzliches oder
						grobfahrlässiges Verhalten entstanden sind.
					</p>
					<p className={styles.text}>
						Für indirekte Schäden oder Folgeschäden wird, soweit gesetzlich zulässig,
						keine Haftung übernommen.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>7. Datenschutz</h2>
					<p className={styles.text}>
						Die Daten der Kundschaft werden gemäss Schweizer Datenschutzgesetz (DSG)
						verarbeitet.
					</p>
					<p className={styles.text}>
						Weitere Informationen sind in der Datenschutzerklärung auf duckyshop.ch zu
						finden.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>8. Eigentumsvorbehalt</h2>
					<p className={styles.text}>
						Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>9. Gerichtsstand und anwendbares Recht</h2>
					<p className={styles.text}>
						Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist der Sitz des
						Anbieters in Bern, sofern kein anderer zwingender gesetzlicher Gerichtsstand
						besteht.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.subtitle}>10. Kontakt</h2>
					<p className={styles.text}>
						Fragen zu den AGB oder Beschwerden können per E-Mail an{' '}
						<strong>info@duckyshop.ch</strong> gerichtet werden.
					</p>
				</section>
			</div>
		</div>
	);
}

export default AGB;
