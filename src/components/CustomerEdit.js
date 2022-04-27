import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {setPropsAsInitial } from './../helpers/setPropsAsInitial'
import CustomerActions from './CustomersActions'
import { Prompt } from 'react-router-dom';

const isNumber = value => (
    isNaN(Number(value)) && "*El valor debe ser númerico"
);

const validate = values => {
    const error = {};

    if(!values.name){
        error.name = "Debe ingresar su nombre";
    }

    if(!values.dni){
        error.dni = "Debe ingresar su DNI";
    }

    return error;
};

const MyField = ({ input, meta, type, label, name }) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type= { !type ? "text" : type} />
        { 
            meta.touched && meta.error && <span>{meta.error}</span> 
        }
    </div>
);

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const toGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue))


const CustomerEdit = ({ 
    name ,dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
    return (
        <div>
            <h2>Edición de cliente</h2> 
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    component={MyField} 
                    type="text"
                    label="Nombre:"
                    parse={toUpper}
                    format={toLower}></Field>
                <Field 
                    name="dni" 
                    component={MyField} 
                    type="text"
                    validate={isNumber}
                    label="DNI:"></Field>
                <Field 
                    name="age" 
                    component={MyField}  
                    type="number"
                    validate={isNumber}
                    label="Edad:"
                    parse={toNumber}
                    normalize={toGrow}></Field>
                <CustomerActions>
                    <button type="submit" disabled={pristine ||submitting}>Aceptar</button>
                    <button type="button" onClick={onBack}>Cancelar</button>
                </CustomerActions>
                <Prompt when={!pristine && !submitSucceeded} 
                    message="Se perderán los datos si continúa"></Prompt>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {  
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const customerEditForm = reduxForm({ 
    form: 'CustomerEdit',
    validate

})(CustomerEdit);

export default setPropsAsInitial(customerEditForm);
   