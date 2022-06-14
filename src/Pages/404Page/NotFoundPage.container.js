import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const NotFoundPage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // we wait for 5s before changing state that will help redirect
    setTimeout(() => {
      setShouldRedirect(true);
    }, 5000);
  }, []);

  //redirect to HomePage after 5s
  if (shouldRedirect) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="lostpage">
      <img
        alt="Confused Kermit being lost"
        src={
          "https://c.tenor.com/CbhnRg0n7ksAAAAC/kermit-the-frog-looking-for-directions.gif"
        }
      />
    </div>
  );
};

export default NotFoundPage;
