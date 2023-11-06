import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../componentes/Navbar';

function VerReceta() {
    const [receta, setReceta] = useState({
        nombre_queso: '',
        ingredientes: '',
        preparacion: '',
    });

    // Obtén el ID de la receta desde los parámetros de la URL
    const { id } = useParams();

    useEffect(() => {
        // Realiza una solicitud para obtener los detalles de la receta usando el ID
        fetch(`http://localhost:8082/obtenerReceta/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setReceta(data.receta);
            })
            .catch((error) => {
                console.error('Error al obtener los detalles de la receta:', error);
            });
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table" style={{ fontSize: '1.2rem', border: '1px solid black' }}>
                            <thead>
                                <tr className="bg-warning">
                                    <th colSpan="2">{receta.nombre_queso}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%", backgroundColor: "#FFFFFF", border: '1px solid black' }}>
                                        <div className="bg-white p-2">
                                            <h4 className="mb-0">Ingredientes</h4>
                                        </div>
                                        <div className="p-3">
                                            {receta.ingredientes}
                                        </div>
                                    </td>
                                    <td style={{ width: "50%", backgroundColor: "#FFFFFF", border: '1px solid black' }}>
                                        <div className="bg-white p-2">
                                            <h4 className="mb-0">Procedimiento de la receta</h4>
                                        </div>
                                        <div className="p-3">
                                            {receta.preparacion}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to="/listaRecetas">
                    <button className="btn" style={{ backgroundColor: '#f78c29', color: 'white' }}>Regresar</button>
                </Link>
            </div>
        </div>
    );
}

export default VerReceta;
