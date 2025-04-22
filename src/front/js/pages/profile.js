import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const UserProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile(); // Cargar el perfil del usuario al montar el componente
    }, []);

    return (
        <div className="text-center mt-5">
            <h2>Perfil del Usuario</h2>
            {store.user.name ? (
                <>
                    <h5>Nombre: {store.user.name}</h5>
                    <h5>Email: {store.user.email}</h5>
                </>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
        </div>
    );
};