import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getProfile(); 
    }, []);

    const handleLogout = () => {
        actions.logout(); // Llama a la acción de logout
        navigate("/login"); // Redirige al usuario a la página de login
    };

    return (
        <div className="text-center mt-5">
            {store.user.name ? (
                <>
                    <div className="card mx-auto" id="profileUser">
                        <div className="card-body">
                            <h5 className="card-title" id="titleUser">Información del Usuario</h5>
                            <hr />
                            <h2 id="saludoUser">Bienvenido {store.user.name}  </h2>
                            <p className="card-text">
                                <strong>Nombre:</strong> {store.user.name}
                            </p>
                            <p className="card-text">
                                <strong>Email:</strong> {store.user.email}
                            </p>
                            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                <p>Cargando información del usuario...</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
                    Login
                </button>
            </>
            )}
        </div>
    );
};