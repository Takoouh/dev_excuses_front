import React, { useState, useEffect } from "react";

import AddExcuseFormContainer from "../../Components/AddExcuseForm/AddExcuseForm.container";
import Button from "../../Components/Button/Button.component";
import Excuse from "../../Components/Excuse/Excuse.component";

import { fetchExcuses } from "../../services/excusesServices";

import "./HomePage.scss";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const HomePage = () => {
  const [showAddExcuseModal, setShowAddExcuseModal] = useState(false);
  const [excusesList, setExcusesList] = useState([]);
  const [displayedExcuseId, setDisplayedExcuseId] = useState();

  /**
   * generate random number depending on given range
   * @param {number} range - number of possibities (including 0)
   * @returns {number}
   */
  const getRandomNumberFromRange = (range) => Math.floor(Math.random() * range);

  /**
   * set State of displayedId with new generated id
   * @return {void}
   */
  const handleGenerateNewExcuse = () => {
    let determinedExcuseId = getRandomNumberFromRange(excusesList.length);

    // if same as previous excuse, we generate another
    while (determinedExcuseId === displayedExcuseId) {
      determinedExcuseId = getRandomNumberFromRange(excusesList.length);
    }
    setDisplayedExcuseId(determinedExcuseId);
  };

  /**
   * Toggle New Excuse modal open state
   * @param {event}
   * @return {void}
   */
  const handleNewExcuseFormModalToggle = (event) =>
    setShowAddExcuseModal(!showAddExcuseModal);

  /**
   * Function that will be triggered after addExcuseForm has been
   * submitted
   * - close modal
   * - retrieve newly added excuses from api call
   * - store them in state
   * - store last id to display newly added excuse
   * @param {Excuse[]} newExcusesList
   * @return {void}
   */
  const handleExcuseSubmitCallback = (newExcusesList) => {
    setShowAddExcuseModal(false);
    setExcusesList(newExcusesList);
    setDisplayedExcuseId(newExcusesList.length - 1);
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
      <Button label={"Générer une excuse"} onClick={handleGenerateNewExcuse} />
      <Button
        label={"Ajouter une excuse"}
        onClick={handleNewExcuseFormModalToggle}
      />

      {showAddExcuseModal && (
        <AddExcuseFormContainer
          onModalClose={handleNewExcuseFormModalToggle}
          onExcuseSubmitCallback={handleExcuseSubmitCallback}
        />
      )}
    </div>
  );
};

export default HomePage;
