import React, { useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    formContainerStyle,
    combinedFormSectionStyle,
    tableHeaderStyle,
    textAreaStyle,
    buttonStyle,
} from './EditarRecetaStyles';

function EditarReceta() {
    const [ingredients, setIngredients] = useState('');
    const [procedure, setProcedure] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [inputValue, setInputValue] = useState("");

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setInputValue("");
    };

    const handleAddIngredient = () => {
        openModal("ingredient");
    }

    const handleAddProcedure = () => {
        openModal("procedure");
    }

    const handleSave = () => {
        if (modalContent === "ingredient") {
            setIngredients(prev => prev + inputValue + "\n");
        } else {
            setProcedure(prev => prev + inputValue + "\n");
        }
        closeModal();
    };

    return (
        <div style={formContainerStyle}>
            <div style={tableHeaderStyle}>
                Cambiar nombre
            </div>
            <div style={combinedFormSectionStyle}>
                <div style={{ flex: 1, marginRight: '15px' }}>
                    <div style={tableHeaderStyle}>Ingredientes</div>
                    <textarea 
                        style={textAreaStyle} 
                        value={ingredients} 
                        onChange={(e) => setIngredients(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddIngredient} style={buttonStyle}>Editar Ingrediente</button>
                </div>
                <div style={{ flex: 1, marginLeft: '15px' }}>
                    <div style={tableHeaderStyle}>Procedimiento de la receta</div>
                    <textarea 
                        style={textAreaStyle} 
                        value={procedure} 
                        onChange={(e) => setProcedure(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddProcedure} style={buttonStyle}> Editar procedimiento</button>
                </div>
            </div>

            <BootstrapModal show={isModalOpen} onHide={closeModal}>
                <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>
                        {modalContent === "ingredient" ? "Agregar Ingrediente" : "Agregar Procedimiento"}
                    </BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>
                    <textarea 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        style={{ 
                            width: '100%', 
                            minHeight: '150px', 
                            padding: '10px', 
                            borderRadius: '10px', 
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
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
    );
}

export default EditarReceta;