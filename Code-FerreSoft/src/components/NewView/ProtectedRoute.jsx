import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../utils/constants";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }) // ELIMINE ,[] CORCHETES PORQUE SALIA UN ERROR ---------------------------------------------------------------------------------

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
                toast.success('Inicio de sesion exitoso', {
                    position: "bottom-right", 
                });
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
            toast.error("Error al iniciar sesión, Verifique las credenciales", {
                position: 'bottom-right',
            });
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;
