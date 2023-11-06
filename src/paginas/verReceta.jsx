import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function VerReceta() {
    const tableCellStyle = {
        border: '1px solid black', // Establece el borde de la celda
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <table className="table" style={{ fontSize: '1.2rem', border: '1px solid black' }}>
                        <thead>
                            <tr className="bg-warning">
                                <th colSpan="2">Receta de Quesillo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ width: "50%", backgroundColor: "#FFFFFF", ...tableCellStyle }}>
                                    <div className="bg-white p-2">
                                        <h4 className="mb-0">Ingredientes</h4>
                                    </div>
                                    <div className="p-3">
                                        Caramelo: 1 taza de azúcar, 1/4 taza de agua.
                                        <br />
                                        Quesillo: 1 lata de leche condensada, misma medida de leche líquida, 3 huevos, 1 cucharadita de vainilla, (opcional) chorrito de ron.
                                    </div>
                                </td>
                                <td style={{ width: "50%", backgroundColor: "#FFFFFF", ...tableCellStyle }}>
                                    <div className="bg-white p-2">
                                        <h4 className="mb-0">Procedimiento de la receta</h4>
                                    </div>
                                    <div className="p-3">
                                        1. Caramelo: En sartén, disolver azúcar en agua hasta dorar. Verter en molde.
                                        <br />
                                        2. Mezcla: Licuar leche condensada, leche líquida, huevos y vainilla.
                                        <br />
                                        3. Baño María: Verter mezcla en molde con caramelo. Colocar en bandeja con agua caliente. Hornear a 175°C por 45-60 minutos.
                                        <br />
                                        4. Enfriar: Dejar a temperatura ambiente, refrigerar 2 horas.
                                        <br />
                                        5. Desmoldar: Pasar cuchillo por bordes y voltear sobre plato.
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
    );
}

export default VerReceta;