import { Link, Outlet } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
const dashboard = () => {
  return (
    <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark vh-100'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 text-white text-align-center'>
                    <Link to="/dashboard" className='d_flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-align-center text-decoration-none'>

                        <span className='fs-1 fw-bolder d-none d-sm-inline text-warning'> <i className="bi bi-currency-bitcoin fw-bolder">GPB</i> </span>
                    </Link>
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100' id='menu'>
                        <li className='w-100'>
                            <Link to="/dashboard" className='nav-link text-white px-0 align-liddle'>
                                <i className='fs-4 bi-speedometer2 ms2'></i>
                                <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                            </Link>
                        </li>
                        <li className='w-100'>
                            <Link to="/dashboard/Categorie" className='nav-link text-white px-0 align-liddle'>
                                <i className='fs-4 bi-columns ms2'></i>
                                <span className='ms-2 d-none d-sm-inline'>Categorie</span>
                            </Link>
                        </li>
                        <li className='w-100'>
                            <Link to="/dashboard/Fonction" className='nav-link text-white px-0 align-liddle'>
                                <i className='fs-4 bi-cash-coin ms2 text-warning'></i>
                                <span className='ms-2 d-none d-sm-inline'> Fonction de prêt </span>
                            </Link>
                        </li>
                        <li className='w-100'>
                            <Link to="/dashboard/Profile" className='nav-link text-white px-0 align-liddle'>
                                <i className='fs-4 bi-person-circle ms2'></i>
                                <span className='ms-2 d-none d-sm-inline'>Profile</span>
                            </Link>
                        </li>
                        <li className='w-100 pb-4'>
                            <Link to="/dashboard" className='nav-link text-white px-0 align-liddle'>
                                <i className='fs-4 bi-power ms2'></i>
                                <span className='ms-2 mb-75 d-none d-sm-inline'>Sortie</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col p-0 m-0">
                <div className='p-2 d-flex justify-content-center shadow'>
                    <h4>GESTION DE PRËT BANQUAIRE</h4>

                </div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default dashboard