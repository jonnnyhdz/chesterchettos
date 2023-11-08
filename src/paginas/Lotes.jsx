import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../componentes/Navbar';

const Lotes = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaProduccion, setFechaProduccion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const [editingLoteId, setEditingLoteId] = useState(null);

  const tableHeaderStyle = {
    backgroundColor: '#FFFFFF',
  };

  const iconStyle = {
    cursor: 'pointer',
    margin: '0 5px',
  };

  const [lotes, setLotes] = useState([]);

  const fetchLotes = () => {
    fetch('http://localhost:8082/obtenerLotes')
      .then((response) => response.json())
      .then((data) => {
        setLotes(data.lotes);
      })
      .catch((error) => {
        console.error('Error al obtener los lotes:', error);
      });
  };

  useEffect(() => {
    fetchLotes();
  }, []);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    fetch('http://localhost:8082/agregarLote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        cantidad,
        fechaProduccion,
        fechaVencimiento,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.mensaje);
        fetchLotes(); // Actualiza la lista de lotes después de agregar el lote
      })
      .catch((error) => {
        console.error('Error al agregar el lote:', error);
      });
    setShowModal(false);
  };

  const handleEdit = (lote) => {
    setEditingLoteId(lote.id);
    setNombre(lote.nombre_lote);
    setCantidad(lote.cantidad);
    setFechaProduccion(lote.fecha_produccion);
    setFechaVencimiento(lote.fecha_vencimiento);
  };

  const handleUpdate = () => {
    // Verifica en la consola si los valores son correctos
    console.log('Valores a actualizar:', nombre, cantidad, fechaProduccion, fechaVencimiento);

    fetch(`http://localhost:8082/actualizarLote/${editingLoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        cantidad,
        fechaProduccion,
        fechaVencimiento,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verifica la respuesta en la consola
        console.log('Respuesta del backend:', data);

        if (data.mensaje === 'Lote actualizado exitosamente') {
          // Actualiza la lista de lotes y restablece el estado de edición
          fetchLotes();
          setEditingLoteId(null);
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el lote:', error);
      });
  };

  const handleDelete = (loteId) => {
    if (window.confirm('¿Seguro que deseas eliminar este lote?')) {
      fetch(`http://localhost:8082/eliminarLote/${loteId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.mensaje);
          if (data.mensaje === 'Lote eliminado exitosamente') {
            fetchLotes();
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el lote:', error);
        });
    }
  };

  const cancelEdit = () => {
    setEditingLoteId(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h2 style={{ backgroundColor: '#FFD700', padding: '10px' }}>Lista de Lotes</h2>

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
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ ...iconStyle, color: '#007bff' }}
                      onClick={() => handleEdit(lote)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ ...iconStyle, color: '#dc3545' }}
                      onClick={() => handleDelete(lote.id)}
                    />
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
            <Button variant="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        {editingLoteId !== null && (
          <Modal show={editingLoteId !== null} onHide={cancelEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Lote</Modal.Title>
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
              <Button variant="secondary" onClick={cancelEdit}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <button style={addButtonStyle} onClick={handleAddClick}>
          Agregar
        </button>
      </div>
    </>
  );
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
  }

export default Lotes;