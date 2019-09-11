import React, { Component } from 'react';
import InputSelect from "./../lib";
import {InputForm, InputDefault} from "react-forms-lib";
import "react-datetime/css/react-datetime.css";

const languages = {
    'en': 'English',
    'ru': 'Russian',
    'de': 'German',
    'sp': 'Spanish',
    'fr': 'French'
};

export default class SampleForm extends Component
{
    state = {
        data: {}
    };

    handleChange = (data) =>
    {
        console.log(data);
        this.setState({data});
    };

    handleSave = (data) =>
    {
        alert("Save");
    };

    handleCancel = () =>
    {
        alert("Cancel");
    };

    handleExtraButtonClick = (e) =>
    {
        e.preventDefault();
        alert("Extra button click")
    };

    render()
    {
        return (
            <InputForm data={this.state.data}
                       onChange={this.handleChange} clearButton cancelButton
                       onSave={this.handleSave} onCancel={this.handleCancel}
                       languages={languages} title="Form"
                       extraButtons={<a href="#" onClick={this.handleExtraButtonClick} className="float-right">Extra Button</a>}
                       {...this.props}>
                <InputDefault type="text" title="Text" localize field="text" />
                <InputSelect title="Date" field="date" />
            </InputForm>
        )
    }
}
