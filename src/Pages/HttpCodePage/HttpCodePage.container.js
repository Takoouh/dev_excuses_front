import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Excuse from "../../Components/Excuse/Excuse.component";
import { fetchExcuses } from "../../services/excusesServices";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const HttpCodePage = () => {
  const [excuseToDisplay, setExcuseToDisplay] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  //we retrieve httpCodeId from url param
  const { httpCodeId } = useParams();

  useEffect(() => {
    // we fetch excuses from api and retrieve the one matching HttpCodeId
    fetchExcuses().then((response) => {
      const matchingExcuseForHttpCode = response.data.find(
        (excuse) => excuse["http_code"] === parseInt(httpCodeId)
      );
      if (matchingExcuseForHttpCode && matchingExcuseForHttpCode.message) {
        setExcuseToDisplay(matchingExcuseForHttpCode.message);
      } else {
        //if no match, we set up the redirection to 404
        setShouldRedirect(true);
      }
    });
  }, [httpCodeId]);

  //if no match after fetching info, we redirect to 404
  if (shouldRedirect) {
    return <Navigate to="/404" />;
  }

  if (!excuseToDisplay) {
    return null;
  }

  return <Excuse excuseMessage={excuseToDisplay} />;
};

export default HttpCodePage;
