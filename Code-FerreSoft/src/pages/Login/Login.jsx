import { NavLink } from 'react-router-dom';
//import { AuthContext } from './AuthContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import './Login.css';

const Login = () => {

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/log-in/', data);
            console.log(response.data);
            setCurrentUser(true)
            toast.success('Inicio de sesion exitoso', {
                position: "bottom-right", 
            });
            navigate('/admi-account');
        } catch (error) {
            console.error(error);
            toast.error("Error al iniciar sesión, Verifique las credenciales", {
                position: 'bottom-right',
            });
        }
    };

    return (
        <>
            <div className="container-fluid contenedor-login bg-light border-3 d-flex justify-content-center align-items-center vh-100">
                <div className="bg-white p-5 text-secondary shadow login-box">
                    <p className="text-center fs-2 text-dark fw-bold">Iniciar Sesion</p>
                    <p className="text-decoration-none text-secondary">Compra mas rapido y revisa los detalles de tus compras</p>
                    <form>
                        <label>Correo Electronico</label>
                        <input 
                            type="text" 
                            placeholder="Ingrese su Correo Electronico" 
                            className="inputs" 
                            id='email' 
                            {...register("email", { required: true })} 
                        />
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Ingrese su contraseña" 
                            className="inputs" 
                            id='password' 
                            {...register("password", { required: true })}
                        />
                        <div className="d-flex justify-content-around mt-1 align-items-center gap-1">
                            <input className="form-check-input" type="checkbox" />
                            <div className="pt-1 text-secondary"><small>Recordarme</small></div>
                            <div className="pt-1 text-decoration-none fst-italic">
                                <small className='text-info'> Olvidaste tu contraseña?</small>
                            </div>                        
                        </div>
                        <button 
                            type="submit"
                            className='btn btn-warning text-white w-100 mt-4 fw-semibold shadow-sm boton'
                        >Iniciar</button>
                        
                        <div className="d-flex gap-1 justify-content-center mt-1">
                            <p>No tienes una cuenta?</p>
                            <NavLink to='/registro' className="text-decoration-none text-info fw-semibold">
                                Registrate
                            </NavLink>
                        </div>
                        <div className='text-center'>
                            <NavLink to='/admi-account' className="px-3 text-decoration-none text-info fw-semibold">
                                Admi
                            </NavLink>
                            <NavLink to='/my-account' className="px-3 text-decoration-none text-info fw-semibold">
                                Client
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;