import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form } from 'react-bootstrap'; // Asegúrate de tener las bibliotecas instaladas
import Navbar from '../componentes/Navbar';


const Lotes = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaProduccion, setFechaProduccion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');



  const tableHeaderStyle = {
    backgroundColor: '#FFFFFF',
  };

  const iconStyle = {
    cursor: 'pointer',
    margin: '0 5px',
  };
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/obtenerLotes')
      .then((response) => response.json())
      .then((data) => {
        setLotes(data.lotes);
      })
      .catch((error) => {
        console.error('Error al obtener los lotes:', error);
      });
  }, []);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    // Aquí puedes guardar los datos ingresados en el modal
    console.log('Nombre:', nombre);
    console.log('Cantidad:', cantidad);
    console.log('Fecha de Producción:', fechaProduccion);
    console.log('Fecha de Vencimiento:', fechaVencimiento);
    setShowModal(false);
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-3">
      <h2 style={{ backgroundColor: '#FFD700', padding: '10px' }}>Lista de Lotes</h2>
      <Button variant="success" onClick={handleAddClick}>Agregar</Button>
      <div className="table-responsive">
        <table className="table">
          <thead style={tableHeaderStyle}>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Fecha Producción</th>
              <th>Fecha Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote) => (
              <tr key={lote.id}>
                <td>{lote.id}</td>
                <td>{lote.nombre_lote}</td>
                <td>{lote.cantidad}</td>
                <td>{lote.fecha_produccion.substring(0, 10)}</td>
                <td>{lote.fecha_vencimiento.substring(0, 10)}</td>
                <td>
                  <FontAwesomeIcon icon={faEdit} style={{ ...iconStyle, color: '#007bff' }} onClick={() => console.log('Editar')} />
                  <FontAwesomeIcon icon={faTrash} style={{ ...iconStyle, color: '#dc3545' }} onClick={() => console.log('Eliminar')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Lote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="fechaProduccion">
              <Form.Label>Fecha de Producción</Form.Label>
              <Form.Control type="date" value={fechaProduccion} onChange={(e) => setFechaProduccion(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="fechaVencimiento">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Lotes;