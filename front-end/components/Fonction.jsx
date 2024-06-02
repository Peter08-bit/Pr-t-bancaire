import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Fonction = () => {
    const [fonction, setFonction] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8090/auth/Fonction')
            .then(response => {
                const { data } = response;
                if (data.Status) {
                    setFonction(data.Result);
                } else {
                    alert(data.Error);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (num_compte) => {
        axios.delete('http://localhost:8090/auth/delete_fonct/' + num_compte)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            })
    };
    const [totalGlobal, setTotalGlobal] = useState(); // Renommer setTotaleGlobal en setTotalGlobal
    const [totalMin, setTotalMin] = useState();
    const [totalMax, setTotalMax] = useState();

    useEffect(() => {
        totalCount();
        minCount();
        maxCount();
    }, []);

    const totalCount = () => {
        axios.get('http://localhost:8090/auth/total_count')
            .then(result => {
                if (result.data.Status) {
                    setTotalGlobal(result.data.Result[0].montant_a_payer);
                } else {
                    console.error("La réponse de l'API est vide ou ne contient pas les données attendues.");
                }
            })
            .catch(error => console.error(error));
    };

    const minCount = () => {
        axios.get('http://localhost:8090/auth/min_count')
            .then(result => {
                if (result.data.Status) {
                    setTotalMin(result.data.Result[0].min_montant_a_payer);
                } else {
                    console.error("La réponse de l'API est vide ou ne contient pas les données attendues.");
                }
            })
            .catch(error => console.error(error));
    };

    const maxCount = () => {
        axios.get('http://localhost:8090/auth/max_count')
            .then(result => {
                if (result.data.Status) {
                    setTotalMax(result.data.Result[0].max_montant_a_payer);
                } else {
                    console.error("La réponse de l'API est vide ou ne contient pas les données attendues.");
                }
            })
            .catch(error => console.error(error));
    };



    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Liste des prêts</h3>
            </div>
            <Link to="/dashboard/add_New" className='btn btn-outline-success position-left'> <i className="bi bi-plus text-warning m-2 fs-5"></i></Link>
            <div className='mt-4'>
                <table className='table'>
                    <thead className=''>
                        <tr>
                            <th>Nom des client</th>
                            <th>Nom du banque</th>
                            <th>Montant</th>
                            <th>Date de prêt</th>
                            <th>Montant a payer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fonction.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nom_client}</td>
                                <td>{item.nom_banque_id}</td>
                                <td>{item.montant}</td>
                                <td>{item.date}</td>
                                <td>{item.montant_a_payer}</td>
                                <td>
                                    <Link to={`/dashboard/edith_fonct/${item.num_compte}`} className='btn btn-outline-warning btn-sm w-10 me-2' key={`edit_${index}`}> <i className="bi bi-vector-pen"></i></Link>
                                    <button className='btn btn-outline-danger btn-sm  w-10 me-2' onClick={() => handleDelete(item.num_compte)} key={`delete_${index}`}><i className="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='p-3 d-flex justify-content-around mt-3'>
                <div className='px-3 pt-2 pb-3 border shadow w-25'>
                    <div className='text-center pb-1'>
                        <h4>Montant a payer <br /> Total</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-around'>
                        <h5 className='text-danger' >Valeur:</h5>
                        <h5 className='text-success' > {totalGlobal} MGA </h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow w-25'>
                    <div className='text-center pb-1'>
                        <h4>Montant a payer <br />Max</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-around'>
                        <h5 className='text-danger'>Valeur:</h5>
                        <h5 className='text-success' > {totalMax} MGA </h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow w-25'>
                    <div className='text-center pb-1'>
                        <h4>Montant a payer <br />Min</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-around'>
                        <h5 className='text-danger'>Valeur:</h5>
                        <h5 className='text-success' > {totalMin} MGA </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fonction;
