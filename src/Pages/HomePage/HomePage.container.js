import React, { useState, useEffect } from "react";

import Button from "../../Components/Button/Button.component";
import Excuse from "../../Components/Excuse/Excuse.component";

import { fetchExcuses } from "../../services/excusesServices";

import "./HomePage.scss";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const HomePage = () => {
  const [excusesList, setExcusesList] = useState([]);
  const [displayedExcuseId, setDisplayedExcuseId] = useState();

  /**
   * generate random number depending on given range
   * @param {number} range - number of possibities (including 0)
   * @returns {number}
   */
  const getRandomNumberFromRange = (range) => Math.floor(Math.random() * range);

  /**
   * Handler of the excuses generation button
   * - set State of displayedId with new generated id
   * @return {void}
   */
  const handleExcuseButtonClick = () => {
    let determinedExcuseId = getRandomNumberFromRange(excusesList.length);

    // if same as previous excuse, we generate another
    while (determinedExcuseId === displayedExcuseId) {
      determinedExcuseId = getRandomNumberFromRange(excusesList.length);
    }
    setDisplayedExcuseId(determinedExcuseId);
  };

  useEffect(() => {
    // we fetch excuses from api and store them in state on mount
    fetchExcuses().then((response) => {
      setExcusesList(response.data);
    });
  }, []);

  return (
    <div className="homepage">
      <h1>Excuses de dev</h1>
      {displayedExcuseId >= 0 && ( //don't display component if none to display
        <Excuse excuseMessage={excusesList[displayedExcuseId].message} />
      )}
      <Button label={"Générer une excuse"} onClick={handleExcuseButtonClick} />
    </div>
  );
};

export default HomePage;
