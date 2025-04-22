const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user:{

			},
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// ingresar los datos del usuario 
			signup: async (email, password, name) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password, name })
					});
			
					const data = await response.json();
			
					if (response.ok) {
						alert("Usuario registrado con éxito ✅");
						console.log("Nuevo usuario:", data.new_user_created);
					} else {
						alert(data.error || "Error al registrar el usuario");
					}
				} catch (error) {
					console.error("Error en el registro:", error);
					alert("Ocurrió un error al intentar registrarse");
				}
			},


			// loguearte

			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					const data = await response.json();

					if (response.ok) {
						console.log("Token recibido:", data.access_token);
						localStorage.setItem("token", data.access_token);
						alert("Login exitoso");
						getActions().getProfile();
					} else {
						alert(data.error || data.Error || "Login incorrecto");
					}
				} catch (error) {
					console.error("Error al hacer login:", error);
					alert("Ocurrió un error al intentar iniciar sesión");
				}
			},
			getProfile: async () => {
				const token = localStorage.getItem("token");
				if (!token) {
					alert("No hay token, por favor inicia sesión");
					return;
				}

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ user: data });
					} else {
						alert("Error al obtener el perfil");
					}
				} catch (error) {
					console.error("Error al obtener el perfil:", error);
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ user: {} });
				alert("Logout exitoso");
			}
		} // ← cierre correcto del bloque actions
	};
};
export default getState;
