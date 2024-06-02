import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React from 'react'
React
const AddPret = () => {
    const [name, setName] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8090/auth/add_Pret', { name })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/Categorie')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className="p-3 rounded w-25 border">

                <h2> Ajouter un nouveau Bank</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"> <strong> Nom: </strong> </label>
                        <input type="text" name="name" id="" placeholder="Entrer le Nom de client" onChange={(e) => setName(e.target.value)} className="form-control round-0" /> {/* Correction de 'type="name"' à 'type="text"' */}
                    </div>
                    <button className='btn btn-outline-success  w-52 rounded-0 mb-2'> <i className="bi bi-floppy2"></i></button>
                </form>

            </div>
        </div>
    )
}

export default AddPret