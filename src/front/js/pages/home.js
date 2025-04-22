import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	
	const handleSubmit = (e) => {

		e.preventDefault();
		if (!formData.name || !formData.email || !formData.password) {
			alert("Todos los campos son obligatorios");
			return;
		}
		console.log("Datos enviados:", formData);
		actions.signup(formData.email, formData.password, formData.name);
		// actions.login(formData.email, formData.password);
		
	};

	return (
		<div className="mt-5">
			<h2 text-center>Ingresa tus datos por favor</h2>
			<form onSubmit={handleSubmit}>
			<div className="mb-3">
			
					<label htmlFor="name" className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						value={formData.email}
						onChange={handleChange}
					/>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
			
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};
