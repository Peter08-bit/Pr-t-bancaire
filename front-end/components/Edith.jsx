import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edith = () => {
  const { num_compte } = useParams();
  const [fonction, setFonction] = useState({
    nom_client: '',
    nom_banque_id: '',
    image: '',
    date: '',
    montant: '',
    taux_pret: '',
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8090/auth/Categorie')
      .then(response => {
        const { data } = response;
        setCategories(data.Result); // Assuming data.Result contains categories
      })
      .catch(error => console.error(error));

    axios.get(`http://localhost:8090/auth/Fonction/${num_compte}`)
      .then(result => {
        const { data } = result;
        const firstResult = data.Result[0] || {};

        // Formater la date au format "yyyy-MM-dd"
        const formattedDate = firstResult.date ? new Date(firstResult.date).toISOString().split('T')[0] : '';

        setFonction({
          ...fonction,
          nom_client: firstResult.nom_client || '',
          nom_banque_id: firstResult.nom_banque_id || '',
          montant: firstResult.montant || '',
          date: formattedDate, // Utiliser la date formatée
          taux_pret: firstResult.taux_pret || '',
        });
      })
      .catch(error => console.error(error));
  }, [num_compte]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFonction({ ...fonction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8090/auth/edith_fonct/'+num_compte, fonction)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/Fonction');
        } else {
          alert(result.data.Error);
        }
      })
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-50 border">
        <h3 className='text-center'>Modifier un Prêt</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputClient"><strong>Nom de Client:</strong></label>
            <input type="text" className="form-control rounded-0" id="inputName" name="nom_client"
              onChange={handleInputChange} value={fonction.nom_client} placeholder="Entrer le Nom de client" />
          </div>
          <div className="col-12">
            <label htmlFor="inputBanque"><strong>Nom du banque:</strong></label>
            <select name="nom_banque_id" id="categorie" className='form-select rounded-0'
              onChange={handleInputChange} value={fonction.nom_banque_id}>
              {categories.map(c => (
                <option key={c.num_compte} value={c.num_client}>{c.nom_client}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputNumber"><strong>Montant:</strong></label>
            <input type="number" className="form-control rounded-0" id="" name="montant"
              onChange={handleInputChange} value={fonction.montant} placeholder="Entrer le Montant" />
          </div>
          <div className="col-12">
            <label htmlFor="inputDate"><strong>Date:</strong></label>
            <input type="date" className="form-control rounded-0" id="" name="date"
              onChange={handleInputChange} value={fonction.date} placeholder="Entrer la Date" />
          </div>
          <div className="col-12">
            <label htmlFor="inputNumber"><strong>Taux de prêt:</strong></label>
            <input type="number" className="form-control rounded-0" id="inputName" name="taux_pret"
              onChange={handleInputChange} value={fonction.taux_pret} placeholder="Entrer le Taux de prêt" />
          </div>
          <div className="col-12">
            <button className='btn btn-outline-success w-100 rounded-0 mb-2'><i className="bi bi-floppy2"></i></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edith;
