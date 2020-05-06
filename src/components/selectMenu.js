import React from 'react'

export default (props) => {

    const options = props.lista.map( (option, index) => {
        return(
            <option key={index} value={option.label }>{option.label}</option>
        )
    })

    return (
        <select {...props} >
            {options}
        </select>
    )
}

