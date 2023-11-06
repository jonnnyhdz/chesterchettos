import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Inventario.css';

function Invent() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    ingredientes: '',
    stockMinimo: '',
    cantidadActual: '',
    calidad: 'Excelente',
    fechaCaducidad: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemData, setEditItemData] = useState({
    ingredientes: '',
    stockMinimo: '',
    cantidadActual: '',
    calidad: 'Excelente',
    fechaCaducidad: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'stockMinimo' || name === 'cantidadActual') {
      // Verifica que solo se ingresen números
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
    setData([...data, newItem]);
    setNewItem({
      ingredientes: '',
      stockMinimo: '',
      cantidadActual: '',
      calidad: 'Excelente',
      fechaCaducidad: '',
    });
    setShowAddModal(false);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setEditItemData(data[index]);
    setShowEditModal(true);
  };

  const handleSaveItem = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = editItemData;

    setData(updatedData);
    setEditingIndex(null);
    setShowEditModal(false);
  };

  const handleDeleteItem = (index) => {
    const filteredData = data.filter((item, i) => i !== index);
    setData(filteredData);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="custom-table">
          <thead className="thead-dark">
            <tr>
              <th colSpan="5" className="text-center bg-warning">
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
          <Modal.Title>Agregar Receta</Modal.Title>
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

      {/* Modal de edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Elemento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="ingredientes"
            value={editItemData.ingredientes}
            onChange={(e) => setEditItemData({ ...editItemData, ingredientes: e.target.value })}
          />
          <input
            type="text"
            name="stockMinimo"
            value={editItemData.stockMinimo}
            onChange={(e) => setEditItemData({ ...editItemData, stockMinimo: e.target.value })}
          />
          <input
            type="text"
            name="cantidadActual"
            value={editItemData.cantidadActual}
            onChange={(e) => setEditItemData({ ...editItemData, cantidadActual: e.target.value })}
          />
          <select
            name="calidad"
            value={editItemData.calidad}
            onChange={(e) => setEditItemData({ ...editItemData, calidad: e.target.value })}
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
            onChange={(e) => setEditItemData({ ...editItemData, fechaCaducidad: e.target.value })}
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
  );
}

export default Invent;