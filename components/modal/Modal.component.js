import React from 'react';
import classNames from './modal.module.scss';
//import Header from '../components/modal/shared/Header/header.component';
import Register from './Register/register.component';
import Header from './shared/Header/header.component';
//import './components/Register/register.component';
//import Register from '../components/modal/Register/register.component';

const Modalcomp = props => {

    if(!props.modalIsOpen){
        console.log('lol');
        return null;
    }


    return (
        <span className={classNames.modal} >
            <span className={classNames["modal-content"]} onMouseDown={(e) => e.stopPropagation()}>
                <span className={classNames['modal-header']}>
                    <Header/>
                    {/* <button onClick={props.onClose} className={classNames.closeButton}>Xhgj</button> */}
                </span>
                <span className={classNames['modal-body']}>
                    <Register/>
                </span>
                <span className={classNames['modal-footer']}>
                    <button onClick={props.onClose} className={classNames.closeButton}>&times;</button>
                </span>
            </span>
        </span>
    );
}

export default Modalcomp;