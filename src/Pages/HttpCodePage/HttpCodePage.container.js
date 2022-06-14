import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Excuse from "../../Components/Excuse/Excuse.component";
import { fetchExcuses } from "../../services/excusesServices";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const HttpCodePage = () => {
  const [excuseToDisplay, setExcuseToDisplay] = useState("");

  //we retrieve httpCodeId from url param
  const { httpCodeId } = useParams();

  useEffect(() => {
    // we fetch excuses from api and retrieve the one matching HttpCodeId
    fetchExcuses().then((response) => {
      const matchingExcuseForHttpCode = response.data.find(
        (excuse) => excuse["http_code"] === parseInt(httpCodeId)
      );
      setExcuseToDisplay(matchingExcuseForHttpCode.message);
    });
  }, [httpCodeId]);

  if (!excuseToDisplay) {
    return null;
  }

  return <Excuse excuseMessage={excuseToDisplay} />;
};

export default HttpCodePage;
