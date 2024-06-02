
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const AddNew = () => {
  const [fonction, setFonction] = useState({
    nom_client:'',
    nom_banque_id:'',
    image:'',
    date:'',
    montant:'',
    taux_pret:'',

  })
  const [categorie, setCategories] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8090/auth/Categorie')
      .then(response => {
        const { data } = response;
        if (data.Status) {
          setCategories(data.Result);
        } else {
          alert(data.Error);
        }
      })
      .catch(error => console.log(error));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(fonction)
    axios.post('http://localhost:8090/auth/add_New', fonction)
    .then(result => {
      if (result.data.Status) {
          navigate('/dashboard/Fonction')
      } else {
          alert(result.data.Error)
      }
  })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="p-3 rounded w-50 border">
            
            <h3 className='text-center'> Ajouter un nouveau Prêt</h3>
                <form className='row g-1' onSubmit={handleSubmit} >
                    <div className="col-12">
                        <label  htmlFor="inputClient"> <strong> Nom de Client: </strong> </label> 
                        <input type="text" className="form-control rounded-0" id="inputName" 
                        onChange={(e) => setFonction({...fonction, nom_client: e.target.value})} placeholder="Entrer le Nom de client"  />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputBanque"> <strong> Nom du banque: </strong> </label> 
                        <select name="categorie" id="categorie" className='form-select rounded-0' onChange={(e) => setFonction({...fonction, nom_banque_id: e.target.value})}>
                          {categorie.map(c => {
                            return <option key={c.num_client} value={c.num_client}> {c.nom_client} </option>
                          })
                          }
                        </select>
                    </div>
                    <div className='col-12 mb-3'>
                        <label className='form-label'  htmlFor="inputGroupFile01"> <strong> Select Image: </strong>  </label>
                        <input type="file" className='form-control rounded-0' onChange={(e) => setFonction({...fonction, image: e.target.files[0]})} id='inputGroupeFile01' />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputNumber"> <strong> Montant: </strong> </label> 
                        <input type="number" className="form-control rounded-0" id="" onChange={(e) => setFonction({...fonction, montant: e.target.value})} placeholder="Entrer le Nom de client"  />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDate"> <strong> Date: </strong> </label> 
                        <input type="date" className="form-control rounded-0" id="" onChange={(e) => setFonction({...fonction, date: e.target.value})} placeholder="Entrer le Nom de client"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputNumber"> <strong> Taux de prêt: </strong> </label> 
                        <input type="number" className="form-control rounded-0" id="inputName" onChange={(e) => setFonction({...fonction, taux_pret: e.target.value})} placeholder="Entrer le Nom de client"/>
                    </div>
                    <div className="col-12">
                    <button className='btn btn-outline-success  w-100 rounded-0 mb-2'> <i className="bi bi-floppy2"></i></button>
                    </div>
                </form>
            
        </div>
    </div>
  )
}

export default AddNew