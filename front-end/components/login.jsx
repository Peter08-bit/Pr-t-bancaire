import { useState } from "react";
import './style.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
    });
    const [error , setError] = useState(null)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; 
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8090/auth/adminlogin', values) // Ajout de 'values' pour envoyer les données au serveur
        .then(result => {
            if(result.data.loginStatus){
                navigate('/dashboard');
            } else{
                setError (result.data.Error)
            }
            
        }) 
        .catch(err => console.log(err));
    };

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <div className="text-warning">
                    {error && error}
                </div>
                <h2> Login PAge</h2>
                    <form onSubmit={handleSubmit}> {/* Correction de la position de l'attribut 'onSubmit' */}
                        <div className="mb-3">
                            <label htmlFor="name"> <strong> Nom: </strong> </label> {/* Correction de l'attribut 'htmlFor' */}
                            <input type="text" name="name" id="" autoComplete="off" placeholder="Entrer votre Nom" onChange={(e) => setValues({...values, name : e.target.value})} className="form-control round-0"/> {/* Correction de 'type="name"' à 'type="text"' */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"> <strong> Password: </strong> </label>
                            <input type="password" name="password"  placeholder="Entrer votre mot de passe" onChange={(e) => setValues({...values, password : e.target.value})} className="form-control round-0"/> {/* Correction de l'attribut 'placeholder' */}
                        </div>
                        <button type="submit" className="btn btn-outline-success w-100 rounded-0 mb-2"> Se connecter </button> {/* Ajout de 'type="submit"' */}
                    </form>
                
            </div>
        </div>
    );
};

export default Login;  //la position de l'export
