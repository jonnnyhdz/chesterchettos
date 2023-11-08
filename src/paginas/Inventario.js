import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../componentes/Navbar';

function Invent() {
  
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    ingredientes: '',
    stock_minimo: '',
    cantidad_actual: '',
    calidad: 'Excelente',
    fecha_caducidad: '',
    ediciones: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemData, setEditItemData] = useState({
    ingredientes: '',
    stock_minimo: '',
    cantidad_actual: '',
    calidad: 'Excelente',
    fecha_caducidad: '',
    ediciones: '',
  });

  const iconStyle = {
    cursor: 'pointer',
    margin: '0 5px',
  };
  const tableStyle = {
    border: '2px solid black',
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

  useEffect(() => {
    fetch('http://localhost:8082/obtenerInventario')
      .then((response) => response.json())
      .then((data) => {
        setData(data.inventario);
      })
      .catch((error) => {
        console.error('Error al obtener datos del inventario:', error);
      });
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'stock_minimo' || name === 'cantidad_actual') {
      if (/^\d+$/.test(value)) {
        setNewItem({
          ...newItem,
          [name]: value,
        });
      }
    } else {
      setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };

  const handleAddItem = () => {
    fetch('http://localhost:8082/agregarInventario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje) {
          setData((prevData) => {
            return [...prevData, newItem];
          });          
  
          setNewItem({
            ingredientes: '',
            stock_minimo: '',
            cantidad_actual: '',
            calidad: 'Excelente',
            fecha_caducidad: '',
            ediciones: '',
          });
  
          setShowAddModal(false);
        } else {
          console.error('Error al agregar elemento al inventario');
        }
      });
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setEditItemData(data[index]);
    setShowEditModal(true);
  };

  const handleSaveItem = () => {
    const updatedData = [...data];
    const originalItem = data[editingIndex];

    const updatedItem = {
      ...originalItem,
      ingredientes: editItemData.ingredientes,
      stock_minimo: editItemData.stock_minimo,
      cantidad_actual: editItemData.cantidad_actual,
      calidad: editItemData.calidad,
      fecha_caducidad: editItemData.fecha_caducidad,
      ediciones: editItemData.ediciones,
    };

    updatedData[editingIndex] = updatedItem;

    fetch(`http://localhost:8082/actualizarInventario/${originalItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.mensaje) {
          setData(updatedData);
          setEditingIndex(null);
          setShowEditModal(false);
        } else {
          console.error('Error al guardar cambios en el elemento del inventario');
        }
      });
  };

  const handleDeleteItem = (index) => {
    const inventarioId = data[index].id;
  
    fetch(`http://localhost:8082/eliminarInventario/${inventarioId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.mensaje) {
          // Elimina el elemento del inventario localmente
          const filteredData = data.filter((item, i) => i !== index);
          setData(filteredData);
        } else {
          console.error('Error al borrar elemento del inventario');
        }
      })
      .catch((error) => {
        console.error('Error al borrar elemento del inventario:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-striped custom-table" style={tableStyle}>
            <thead className="thead-dark">
              <tr>
                <th colSpan="6" className="text-center bg-warning">
                  Lista de Inventario
                </th>
              </tr>
              <tr>
                <th>Ingredientes</th>
                <th>Stock Mínimo</th>
                <th>Cantidad Actual</th>
                <th>Calidad</th>
                <th>Fecha de Caducidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ingredientes}</td>
                  <td>{item.stock_minimo}</td>
                  <td>{item.cantidad_actual}</td>
                  <td>{item.calidad}</td>
                  <td>{item.fecha_caducidad ? item.fecha_caducidad.substring(0, 10) : ''}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} style={{ ...iconStyle, color: '#007bff' }} onClick={() => handleEditItem(index)} />
                    <FontAwesomeIcon icon={faTrash} style={{ ...iconStyle, color: '#dc3545' }} onClick={() => handleDeleteItem(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button style={addButtonStyle} onClick={() => setShowAddModal(true)}>
            Agregar
          </button>
        </div>
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Elemento al Inventario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form">
              <input
                type="text"
                name="ingredientes"
                value={newItem.ingredientes}
                onChange={handleInputChange}
                placeholder="Ingredientes"
              />
              <input
                type="text"
                name="stock_minimo"
                value={newItem.stock_minimo}
                onChange={handleInputChange}
                placeholder="Stock Mínimo (Solo números)"
              />
              <input
                type="text"
                name="cantidad_actual"
                value={newItem.cantidad_actual}
                onChange={handleInputChange}
                placeholder="Cantidad Actual (Solo números)"
              />
              <select
                name="calidad"
                value={newItem.calidad}
                onChange={handleInputChange}
              >
                <option value="Excelente">Excelente</option>
                <option value="Bueno">Bueno</option>
                <option value="Pasable">Pasable</option>
                <option value="Malo">Malo</option>
              </select>
              <input
                type="date"
                name="fecha_caducidad"
                value={newItem.fecha_caducidad}
                onChange={handleInputChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddItem}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Elemento del Inventario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              name="ingredientes"
              value={editItemData.ingredientes}
              onChange={(e) =>
                setEditItemData({ ...editItemData, ingredientes: e.target.value })
              }
            />
            <input
              type="text"
              name="stock_minimo"
              value={editItemData.stock_minimo}
              onChange={(e) =>
                setEditItemData({ ...editItemData, stock_minimo: e.target.value })
              }
            />
            <input
              type="text"
              name="cantidad_actual"
              value={editItemData.cantidad_actual}
              onChange={(e) =>
                setEditItemData({ ...editItemData, cantidad_actual: e.target.value })
              }
            />
            <select
              name="calidad"
              value={editItemData.calidad}
              onChange={(e) =>
                setEditItemData({ ...editItemData, calidad: e.target.value })
              }
            >
              <option value="Excelente">Excelente</option>
              <option value="Bueno">Bueno</option>
              <option value="Pasable">Pasable</option>
              <option value="Malo">Malo</option>
            </select>
            <input
              type="date"
              name="fecha_caducidad"
              value={editItemData.fecha_caducidad}
              onChange={(e) =>
                setEditItemData({ ...editItemData, fecha_caducidad: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSaveItem}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Invent;
