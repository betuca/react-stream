import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, lable, meta }) => {
        return (
            <div className="field">
                <label>{lable}</label>
                <input {...input}></input>
                {this.renderError(meta)}
            </div>
        );
    }

    render = () => {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} lable="Enter title">
                </Field>
                <Field name="description" component={this.renderInput} lable="Enter description">
                </Field>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'Missing a title';
    }
    if (!formValues.description) {
        errors.description = 'Missing a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
