import React, {Fragment, useEffect, useState, memo} from 'react';
import { useDispatch } from "react-redux";
import { editField } from "../redux/userSlice";
import users from "../users";

const Field = memo((props) => {
    const [property, setProperty] = useState(props.value);

    const dispatch = useDispatch();



    const onChange = (e) => {
        let {value, type} = e.currentTarget;
        if(type === 'radio') value = value === 'true';

        setProperty(value);
    };


    const handleBlur = (e) =>  {

        let {value, type} = e.currentTarget;
        if(type === 'radio') value = value === 'true';

        dispatch(
                editField({
                    id: props.userId,
                    fieldName: props.name,
                    value: value
                })
            )
    }


    let type = '';
    let field;
    let radios;
    const {value} = props;

    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const dateFormat = Date.parse('2019-02-07T12:37:40 -01:00')
    const dateFormat = /(\d{4})([\/-])(\d{1,2})\2(\d{1,2})/
    const urlFormat = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/;

    if(value !== undefined && value !== null) {
        switch (typeof value) {
            case 'number':
                type = 'number';
                break;
            case 'boolean':
                if (value === true || value === false) {
                    type = 'radio';
                }
                break;
            case 'string':
                if(emailFormat.test(value)) {
                    type = 'email';
                } else if (dateFormat.test(value)) {
                    type = 'date';
                } else if(urlFormat.test(value)) {
                    type = 'url'
                } else if(value.length > 255) {
                    type = 'textarea';
                } else if(value === 'true' || value === 'false') {
                    type = 'radio';
                } else {
                    type = 'text';
                }
                break;
        }


        if (type === 'textarea') {
            field = (
                <Fragment>
                    <label htmlFor={`${props.name}-${props.index}`}>Field editing: {props.name}</label>
                    <textarea id={`${props.name}-${props.userId}`} value={property} onChange={(e) => onChange(e)}/>
                </Fragment>
                )
        } else if (type === 'radio') {
            // Radio buttons
            radios = (
                <Fragment>
                    <label htmlFor={`${props.name}-true`}>True
                    <input id={`${props.name}-true`} name={props.name} type={type} value={true} onClick={(e) => onChange(e)} onChange={(e) => handleBlur(e)} />
                    </label>
                    <label htmlFor={`${props.name}-false`}>False

                    <input id={`${props.name}-false`} name={props.name} type={type} value={false} onClick={(e) => onChange(e)} onChange={(e) => handleBlur(e)}/>
                    </label>
                </Fragment>
            );
        } else if (props.name === 'id') {
            // Don't use input with ID
            field = '';
        } else {
            field = (
                <Fragment>
                    <label htmlFor={`${props.name}-${props.index}`}>Field editing: {props.name}</label>
                    <input type={type} id={`${props.name}-${props.userId}`} value={property}
                           onChange={(e) => onChange(e)}
                           onBlur={(e) => handleBlur(e) } />
                </Fragment>
        )
        }
    } else {
        field = (
            <Fragment>
                <label htmlFor={`${props.name}-${props.index}`}>Please enter: {props.name}</label>
                <input type={type} id={`${props.name}-${props.userId}`} value={property}
                       onChange={(e) => onChange(e)}
                       onBlur={(e) => handleBlur(e) } />

            </Fragment>
            )
    }


    return (
        <div className="user-field__wrapper">
            <div className="user-field__display">
                <div className="user-field__display-name">{props.value || props.value === false || 'false' ? props.name : `Please enter ${props.name}`}</div>
                <div className="user-field__display-value">Current value:
                    <div className="user-field__display-value--current">{property.toString()}</div>
                </div>
            </div>
            <div className="user-field__update">
                {field}
                {radios}
            </div>
        </div>
    )
})

export default Field;
