import React from "react";
import PropTypes from 'prop-types'


const InputText = ({ onChangeText, name, placeholder, onKeyPress, value }) => (
  <div>
    <input
      onChange={text => onChangeText(text)}
      placeholder={placeholder}
      value={value}
      onKeyPress={onKeyPress}
      name={name}
      className="form-control text-center"
      autoFocus
    />
  </div>
);

InputText.propTypes = {
    onKeyPress: PropTypes.func,
    value:PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired 
}


export default InputText;
