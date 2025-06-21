import React, { useState } from 'react';
import styles from '../styles/contactus.module.css';
import { toast, Bounce } from 'react-toastify';

const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { name: '', email: '', message: '' };

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
			isValid = false;
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
			isValid = false;
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			toast.success('Message sent successfully!', { transition: Bounce });
			setFormData({ name: '', email: '', message: '' });
		}
	};

	return (
		<div className={styles.contactUsContainer}>
			<div className={styles.formContainer}>
				<h1>Contact Us</h1>
				<form onSubmit={handleSubmit}>
					<div className={errors.name ? styles.inputFieldError : styles.inputField}>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder=" "
						/>
						<label>Name</label>
					</div>
					{errors.name && <div className={styles.error}>{errors.name}</div>}

					<div className={errors.email ? styles.inputFieldError : styles.inputField}>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder=" "
						/>
						<label>Email</label>
					</div>
					{errors.email && <div className={styles.error}>{errors.email}</div>}

					<div className={errors.message ? styles.inputFieldError : styles.inputField}>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							placeholder=" "
							rows="5"
						/>
						<label>Message</label>
					</div>
					{errors.message && <div className={styles.error}>{errors.message}</div>}

					<div className={styles.buttonContainer}>
						<button type="submit" className={styles.button}>
							Send Message
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactUs;
