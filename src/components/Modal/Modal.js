import React from 'react';

import './Modal.css';
import Button from '../Button/Button';

const Modal = props => (
    <div className={`modal ${props.open ? 'open' : ''}`}>
        <header className="modal__header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal__content">
            {props.children}
        </section>
        <section className="modal__actions">
            <Button type="button" onClick={props.onClose}>Close</Button>
        </section>
    </div>
);

export default Modal;