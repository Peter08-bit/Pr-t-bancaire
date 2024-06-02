import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categorie = () => {
  const [categorie, setCategories] = useState([]);
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

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Liste des categorie bancaire</h3>
      </div>
      <Link to="/dashboard/add_Pret" className='btn btn-outline-success'> <i className="bi bi-plus m-2"></i></Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Nom des banque</th>
            </tr>
          </thead>
          <tbody>
            {categorie.map((categorie, index) => (
              <tr key={index}>
                <td>{categorie.nom_client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorie;
