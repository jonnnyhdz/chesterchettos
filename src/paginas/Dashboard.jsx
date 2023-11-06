import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faClipboardList, faCube, faWarehouse, faSun } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 p-3" style={{backgroundColor: '#FCDB30', height: '100vh', position: 'relative'}}> 
          <div className="d-flex align-items-center mb-4">
            <FontAwesomeIcon icon={faSun} color="white" size="lg" className="mr-2" />
            <span className="text-white">light</span>
          </div>
          <div className="mb-5"> 
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Dashboards
          </div>
          <div className="mb-5">
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            Recetas
          </div>
          <div className="mb-5">
            <FontAwesomeIcon icon={faCube} className="mr-2" />
            Lotes
          </div>
          <div className="mb-5">
            <FontAwesomeIcon icon={faWarehouse} className="mr-2" />
            Inventario
          </div>
          <div style={{position: 'absolute', bottom: '50px', left: '15px', right: '15px'}}> {/* Ajuste en la posición del botón */}
            <button className="btn btn-block" style={{backgroundColor: '#E5F3FF', color: 'black'}}>Cerrar sesión</button>
          </div>
        </div>
        <div className="col-9 p-3">
          <div className="row">
            <div className="col-4">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Ingresos</h5>
                  <h2>$ 3,503.26</h2>
                  <p className="card-text">+6.50% since last month</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Clientes</h5>
                  <h2>34</h2>
                  <p className="card-text">-2.86% since last month</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Recetas</h5>
                  <h2>683</h2>
                  <p className="card-text">+1.70% since last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;