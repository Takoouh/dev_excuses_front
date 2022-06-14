import React from "react";

import "./NotFoundPage.scss";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <img
        alt="Gandalf warning you of a 404 page, you ar enot supposed to be here"
        src={"https://memegenerator.net/img/instances/40433556.jpg"}
      />
    </div>
  );
};

export default NotFoundPage;
