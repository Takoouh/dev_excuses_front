import { useState } from "react";
import propTypes from "prop-types";
import { addExcuse } from "../../services/excusesServices";
import Button from "../Button/Button.component";

import "./AddExcuseForm.scss";

/**
 * @typedef {Object} AddExcuseProps
 * @property {VoidFunction} onModalClose
 * @property {VoidFunction} onExcuseSubmitCallback
 */

/**
 * AddExcuseForm Container
 * @param {AddExcuseProps} prop
 * @returns {React.JSXElementConstructor}
 */
const AddExcuseFormContainer = ({ onModalClose, onExcuseSubmitCallback }) => {
  const [userExcuse, setUserExcuse] = useState("");

  /**
   * change userExcuse State depending depending on value passed
   * @param {EventListener} event
   */
  const handleUserExcuseOnChange = (event) => setUserExcuse(event.target.value);

  /**
   * - send new excuse to API and retrieve new list
   * - then pass it to callback prop function
   */
  const handleUserExcuseSubmit = () => {
    addExcuse(userExcuse).then((response) =>
      onExcuseSubmitCallback(response.data)
    );
  };

  return (
    <div className="addExcuseForm_wrapper">
      <div className="addExcuseForm_frame">
        <button className="addExcuseForm_close" onClick={onModalClose}>
          X
        </button>
        <h2>C'est quoi ton excuse ?</h2>
        <input
          type="text"
          value={userExcuse}
          onChange={handleUserExcuseOnChange}
        />
        <Button onClick={handleUserExcuseSubmit} label="Envoyer" />
      </div>
    </div>
  );
};

AddExcuseFormContainer.propTypes = {
  onModalClose: propTypes.func.isRequired,
  onExcuseSubmitCallback: propTypes.func.isRequired,
};

export default AddExcuseFormContainer;
