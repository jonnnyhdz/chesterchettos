import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Navbar from '../componentes/Navbar';
import { Link } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';

const ListaRecetas = () => {
  const nombreQuesoCellStyle = {
    width: '40%',
  };

  const nombreRecetaCellStyle = {
    width: '40%',
  };

  const tableStyle = {
    border: '2px solid black',
  };

  const tableCellStyle = {
    border: '1px solid #ccc',
  };

  const accionesCellStyle = {
    width: '20%',
  };

  const yellowBackgroundStyle = {
    backgroundColor: '#FCDB30',
  };

  const addButtonStyle = {
    background: '#f78c29',
    border: '1px solid #f78c29',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '5px 10px',
    color: 'white',
    marginBottom: '20px',
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const [newRecetaData, setNewRecetaData] = useState({
    nombre_queso: '',
    nombre_receta: '',
    ingredientes: '',
    preparacion: '',
  });

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecetaData({
      ...newRecetaData,
      [name]: value,
    });
  };

  const handleAddReceta = () => {
    // Envía los datos de la nueva receta a la base de datos
    fetch('http://localhost:8082/agregarReceta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecetaData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Receta agregada exitosamente') {
          // Cierra el modal
          handleCloseAddModal();

          // Limpia los campos del formulario
          setNewRecetaData({
            nombre_queso: '',
            nombre_receta: '',
            ingredientes: '',
            preparacion: '',
          });

          // Refresca la lista de recetas
          fetch('http://localhost:8082/obtenerRecetas')
            .then((response) => response.json())
            .then((data) => {
              setRecetas(data.recetas);
            })
            .catch((error) => {
              console.error('Error al obtener las recetas:', error);
            });
        } else {
          console.error('Error al agregar receta:', data.mensaje);
        }
      });
  };

  const handleDeleteReceta = (recetaId) => {
    const confirmarEliminacion = window.confirm('¿Seguro que deseas eliminar esta receta?');

    if (confirmarEliminacion) {
      // Envía una solicitud para eliminar la receta de la base de datos
      fetch(`http://localhost:8082/eliminarReceta/${recetaId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.mensaje === 'Receta eliminada exitosamente') {
            // Actualiza la lista de recetas después de eliminar
            const updatedRecetas = recetas.filter((receta) => receta.id !== recetaId);
            setRecetas(updatedRecetas);
          } else {
            console.error('Error al eliminar la receta:', data.mensaje);
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la receta:', error);
        });
    }
  };

  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/obtenerRecetas')
      .then((response) => response.json())
      .then((data) => {
        setRecetas(data.recetas);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
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
              <th style={{ ...nombreQuesoCellStyle, ...tableCellStyle }}>Nombre del Queso</th>
              <th style={{ ...nombreRecetaCellStyle, ...tableCellStyle }}>Nombre de la Receta</th>
              <th style={{ ...accionesCellStyle, ...tableCellStyle }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recetas.map((receta) => (
              <tr key={receta.id}>
                <td style={tableCellStyle}>{receta.id}</td>
                <td style={{ ...nombreQuesoCellStyle, ...tableCellStyle }}>{receta.nombre_queso}</td>
                <td style={{ ...nombreRecetaCellStyle, ...tableCellStyle }}>{receta.nombre_receta}</td>
                <td style={{ ...accionesCellStyle, ...tableCellStyle }}>
                  <Link to={`/verReceta/${receta.id}`}>
                    <BsEye size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} />
                  </Link>
                  <Link to={`/editarReceta/${receta.id}`}>
                    <BsPencil size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }} />
                  </Link>
                  <BsTrash
                    size={20}
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => handleDeleteReceta(receta.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleShowAddModal} style={addButtonStyle}>
          Agregar Receta
        </button>
        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nueva Receta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="nombre_queso">
                <Form.Label>Nombre del Queso</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_queso"
                  value={newRecetaData.nombre_queso}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="nombre_receta">
                <Form.Label>Nombre de la Receta</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_receta"
                  value={newRecetaData.nombre_receta}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="ingredientes">
                <Form.Label>Ingredientes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="ingredientes"
                  value={newRecetaData.ingredientes}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="preparacion">
                <Form.Label>Preparación</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="preparacion"
                  value={newRecetaData.preparacion}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddReceta}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ListaRecetas;