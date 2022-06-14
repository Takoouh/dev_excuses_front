import propTypes from "prop-types";
import "./Excuse.scss";

/**
 * @typedef {Object} ExcusePropTypes
 * @property {string} excuseMessage
 */

/**
 * Excuse Component
 * @param {ExcusePropTypes} props
 * @returns {React.JSXElementConstructor}
 */
const Excuse = ({ excuseMessage }) => {
  return (
    <div className="excuse_container">
      <p className="excuse_text">{excuseMessage}</p>
    </div>
  );
};

Excuse.propTypes = {
  excuseMessage: propTypes.string.isRequired,
};

export default Excuse;
