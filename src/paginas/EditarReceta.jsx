import React, { useEffect, useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../componentes/Navbar';
import { useParams } from 'react-router-dom';

const EditarReceta = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState({
    nombre_queso: '',
    nombre_receta: '',
    ingredientes: '',
    preparacion: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [inputValue, setInputValue] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setInputValue(content === 'ingredient' ? receta.ingredientes : receta.preparacion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  const handleAddIngredient = () => {
    openModal('ingredient');
  };

  const handleAddProcedure = () => {
    openModal('procedure');
  };

  const handleSave = () => {
    if (modalContent === 'ingredient') {
      const newIngredients = receta.ingredientes + '\n' + inputValue;
      setReceta((prevReceta) => ({ ...prevReceta, ingredientes: newIngredients }));
    } else {
      const newProcedure = receta.preparacion + '\n' + inputValue;
      setReceta((prevReceta) => ({ ...prevReceta, preparacion: newProcedure }));
    }

    // Realiza una solicitud para actualizar la receta en el servidor
    fetch(`http://localhost:8082/actualizarReceta/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientes: receta.ingredientes,
        preparacion: receta.preparacion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al actualizar la receta:', error);
      });

    closeModal();
  };

  useEffect(() => {
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
      <div className="container mt-4">
        <div>
          <div style={{ flex: 1, marginRight: '15px' }}>
            <div>Ingredientes</div>
            <textarea
              style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}
              value={receta.ingredientes}
              readOnly
            ></textarea>
            <button onClick={handleAddIngredient} style={{ background: '#f78c29', border: '1px solid #f78c29', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', padding: '5px 10px', color: 'white' }}>Editar Ingrediente</button>
          </div>
          <div style={{ flex: 1, marginLeft: '15px' }}>
            <div>Procedimiento de la receta</div>
            <textarea
              style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}
              value={receta.preparacion}
              readOnly
            ></textarea>
            <button onClick={handleAddProcedure} style={{ background: '#f78c29', border: '1px solid #f78c29', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', padding: '5px 10px', color: 'white' }}>Editar Procedimiento</button>
          </div>
        </div>

        <BootstrapModal show={isModalOpen} onHide={closeModal}>
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>
              {modalContent === 'ingredient' ? 'Editar Ingrediente' : 'Editar Procedimiento'}
            </BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}
            />
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </BootstrapModal.Footer>
        </BootstrapModal>
      </div>
    </div>
  );
};

export default EditarReceta;
