import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '../componentes/Navbar';

import './Inventario.css'

function Invent() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    ingredientes: '',
    stockMinimo: '',
    cantidadActual: '',
    calidad: 'Excelente',
    fechaCaducidad: '',
    ediciones: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemData, setEditItemData] = useState({
    ingredientes: '',
    stockMinimo: '',
    cantidadActual: '',
    calidad: 'Excelente',
    fechaCaducidad: '',
    ediciones: '',
  });
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

    if (name === 'stockMinimo' || name === 'cantidadActual') {
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
    fetch('http://localhost:8082/actualizarInventario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje) {
          setData([...data, newItem]);
          setNewItem({
            ingredientes: '',
            stockMinimo: '',
            cantidadActual: '',
            calidad: 'Excelente',
            fechaCaducidad: '',
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
    updatedData[editingIndex] = editItemData;

    fetch(`http://localhost:8082/actualizarInventario/${data[editingIndex].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editItemData),
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
    fetch(`http://localhost:8082/actualizarInventario/${inventarioId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.mensaje) {
          const filteredData = data.filter((item, i) => i !== index);
          setData(filteredData);
        } else {
          console.error('Error al borrar elemento del inventario');
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="table-responsive">
          <table className="custom-table">
            <thead className="thead-dark">
              <tr>
                <th colSpan="6" className="text-center bg-warning">
                  Lista de Inventario
                </th>
                <th className="text-center bg-warning">
                  <button className="add-button" onClick={() => setShowAddModal(true)}>
                    +
                  </button>
                </th>
              </tr>
              <tr>
                <th>Ingredientes</th>
                <th>Stock Mínimo</th>
                <th>Cantidad Actual</th>
                <th>Calidad</th>
                <th>Fecha de Caducidad</th>
                <th>Ediciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ingredientes}</td>
                  <td>{item.stockMinimo}</td>
                  <td>{item.cantidadActual}</td>
                  <td>{item.calidad}</td>
                  <td>{item.fechaCaducidad}</td>
                  <td>{item.ediciones}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditItem(index)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteItem(index)}>
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form">
          {/* ... Formulario de agregar receta existente ... */}
        </div>

        {/* Modal de agregar receta */}
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
                name="stockMinimo"
                value={newItem.stockMinimo}
                onChange={handleInputChange}
                placeholder="Stock Mínimo (Solo números)"
              />
              <input
                type="text"
                name="cantidadActual"
                value={newItem.cantidadActual}
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
                name="fechaCaducidad"
                value={newItem.fechaCaducidad}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="ediciones"
                value={newItem.ediciones}
                onChange={handleInputChange}
                placeholder="Ediciones"
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
              name="stockMinimo"
              value={editItemData.stockMinimo}
              onChange={(e) =>
                setEditItemData({ ...editItemData, stockMinimo: e.target.value })
              }
            />
            <input
              type="text"
              name="cantidadActual"
              value={editItemData.cantidadActual}
              onChange={(e) =>
                setEditItemData({ ...editItemData, cantidadActual: e.target.value })
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
              name="fechaCaducidad"
              value={editItemData.fechaCaducidad}
              onChange={(e) =>
                setEditItemData({ ...editItemData, fechaCaducidad: e.target.value })
              }
            />
            <input
              type="text"
              name="ediciones"
              value={editItemData.ediciones}
              onChange={(e) =>
                setEditItemData({ ...editItemData, ediciones: e.target.value })
              }
              placeholder="Ediciones"
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
