import React from "react";
import propTypes from "prop-types";

import "./Button.scss";

/**
 * @typedef {Object} ButtonProps
 * @property {string} label
 * @property {VoidFunction} onClick
 */

/**
 * Button Component
 * @param {ButtonProps} props
 * @returns {React.JSXElementConstructor}
 */
const Button = ({ label, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;
