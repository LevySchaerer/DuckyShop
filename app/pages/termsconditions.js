import styles from '../styles/agb.module.css';

export default function PrivacyPolicy() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Datenschutzerklärung</h1>
                <p className={styles.date}>Stand: April 2025</p>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>1. Allgemeine Hinweise</h2>
                    <p className={styles.text}>
                        Der Schutz Ihrer persönlichen Daten ist uns ein zentrales Anliegen. Wir behandeln Ihre Daten vertraulich und gemäss den geltenden Datenschutzbestimmungen der Schweiz (DSG).
                    </p>
                    <p className={styles.text}>
                        Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Erhebung und Verwendung personenbezogener Daten auf unserer Website duckyshop.ch.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>2. Kontaktaufnahme</h2>
                    <p className={styles.text}>
                        Wenn Sie per Formular oder per E-Mail mit uns Kontakt aufnehmen, werden Ihre Angaben (Name, E-Mail, Nachricht) zwecks Bearbeitung der Anfrage bei uns gespeichert.
                    </p>
                    <p className={styles.text}>
                        Diese Daten geben wir nicht ohne Ihre ausdrückliche Einwilligung weiter. Die Speicherung erfolgt maximal sechs Monate, sofern keine gesetzliche Aufbewahrungspflicht besteht.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>3. Datenspeicherung im Shop</h2>
                    <p className={styles.text}>
                        Zum Zweck der Vertragsabwicklung speichern wir folgende Daten: Benutzername, Name, Adresse, E-Mail-Adresse, Zahlungsinformationen. Diese Daten sind erforderlich, um den Kaufvertrag zu erfüllen.
                    </p>
                    <p className={styles.text}>
                        Eine Datenweitergabe erfolgt nur an:
                        <ul>
                            <li>Zahlungsdienstleister (z. B. TWINT, Stripe, PayPal) zur Zahlungsabwicklung</li>
                            <li>unser Treuhandbüro zur Erfüllung gesetzlicher Buchhaltungspflichten</li>
                        </ul>
                    </p>
                    <p className={styles.text}>
                        Eine weitergehende Datenweitergabe oder Datenverarbeitung findet nicht statt.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>4. Cookies</h2>
                    <p className={styles.text}>
                        Unsere Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
                    </p>
                    <p className={styles.text}>
                        Manche Cookies bleiben auf Ihrem Gerät, bis Sie sie löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                    </p>
                    <p className={styles.text}>
                        Sie können Ihren Browser so konfigurieren, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>5. Webanalyse mit Google Analytics</h2>
                    <p className={styles.text}>
                        Unsere Website nutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website ermöglichen.
                    </p>
                    <p className={styles.text}>
                        Die dadurch erzeugten Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                    </p>
                    <p className={styles.text}>
                        IP-Adressen werden anonymisiert (IP-Masking). Sie können die Erfassung Ihrer Daten durch Google Analytics durch ein Browser-Add-on verhindern: <a href="https://tools.google.com/dlpage/gaoptout?hl=de">Google Opt-out</a>.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>6. Ihre Rechte</h2>
                    <p className={styles.text}>
                        Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch zu.
                    </p>
                    <p className={styles.text}>
                        Sie können Ihre Rechte jederzeit per E-Mail an uns geltend machen. Ausserdem steht Ihnen das Recht zu, eine Beschwerde beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) einzureichen.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>7. Kontakt</h2>
                    <p className={styles.text}>
                        Verantwortlich für die Datenverarbeitung:<br />
                        DuckyType<br />
                        Engehaldenstrasse 26<br />
                        3012 Bern, Schweiz<br />
                        E-Mail: olivier@deszynski.com
                    </p>
                </section>
            </div>
        </div>
    );
}
