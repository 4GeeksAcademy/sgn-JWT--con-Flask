import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Token recibido:", data.access_token);
				// Guardar el token en localStorage o contexto
				localStorage.setItem("token", data.access_token);
				alert("Login exitoso ✅");
			} else {
				alert("Error: " + data.error || data.Error);
			}
		} catch (error) {
			console.error("Error al hacer login:", error);
			alert("Ocurrió un error al intentar iniciar sesión");
		}
	};

	return (
		<div className="text-center mt-5">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
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
				<button type="submit" className="btn btn-primary">Login</button>
			</form>
		</div>
	);
};
