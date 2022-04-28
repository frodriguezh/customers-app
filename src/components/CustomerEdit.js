import React, { Component } from 'react';
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


const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const toGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue))


class CustomerEdit extends Component {

    componentDidMount() {
        if(this.txt){
            this.txt.focus();
        }
    }
    

    renderField = ({ input, meta, type, label, name, withFocus }) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input} 
                type= { !type ? "text" : type} 
                ref= { withFocus && (txt => this.txt = txt) } />
            { 
                meta.touched && meta.error && <span>{meta.error}</span> 
            }
        </div>
    );

    render(){
    const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Edición de cliente</h2> 
                <form onSubmit={handleSubmit}>
                    <Field 
                        withFocus
                        name="name" 
                        component={this.renderField} 
                        type="text"
                        label="Nombre:"
                        parse={toUpper}
                        format={toLower}></Field>
                    <Field 
                        name="dni" 
                        component={this.renderField} 
                        type="text"
                        validate={isNumber}
                        label="DNI:"></Field>
                    <Field 
                        name="age" 
                        component={this.renderField}  
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
        )
    }
}

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
   