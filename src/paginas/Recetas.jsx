import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsEye, BsPencil } from 'react-icons/bs';

const ListaRecetas = () => {
  const nombreCellStyle = {
    width: '60%',
  };

  const tableStyle = {
    border: '2px solid black',
  };

  const tableCellStyle = {
    border: '1px solid #ccc', // Color más claro para las líneas interiores
  };

  const accionesCellStyle = {
    width: '20%',
  };

  const yellowBackgroundStyle = {
    backgroundColor: '#FCDB30',
  };

  const addButtonStyle = {
    background: '#f78c29', // Cambio de color del botón
    border: '1px solid #f78c29', // Cambio de color del borde
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '5px 10px',
    color: 'white', // Color del texto en blanco
    marginBottom: '20px',
  };

  const handleAddButtonClick = () => {
    // Agregar lógica para manejar el clic del botón "+" aquí
  };

  const recetas = [
    { id: 1, nombre: 'Receta 1' },
    { id: 2, nombre: 'Receta 2' },
    { id: 3, nombre: 'Receta 3' },
    { id: 4, nombre: 'Receta 4' },
    { id: 5, nombre: 'Receta 5' },
    { id: 6, nombre: 'Receta 6' },
    { id: 7, nombre: 'Receta 7' },
    { id: 8, nombre: 'Receta 8' },
    { id: 9, nombre: 'Receta 9' },
    { id: 10, nombre: 'Receta 10' },
  ];

  return (
    <div className="container mt-4">
      <table className="table table-bordered" style={tableStyle}>
        <thead>
          <tr>
            <th colSpan="4" style={{ ...yellowBackgroundStyle, border: '2px solid black' }}>
              Lista de Recetas
            </th>
          </tr>
          <tr>
            <th style={tableCellStyle}>ID</th>
            <th style={{ ...nombreCellStyle, ...tableCellStyle }}>Nombre</th>
            <th style={{ ...accionesCellStyle, ...tableCellStyle }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recetas.map((receta) => (
            <tr key={receta.id}>
              <td style={tableCellStyle}>{receta.id}</td>
              <td style={{ ...nombreCellStyle, ...tableCellStyle }}>{receta.nombre}</td>
              <td style={{ ...accionesCellStyle, ...tableCellStyle }}>
                <BsEye size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} />
                <BsPencil size={20} style={{ cursor: 'pointer', color: 'green' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={addButtonStyle} onClick={handleAddButtonClick}>
        Agregar Receta
      </button>
    </div>
  );
};

export default ListaRecetas;
