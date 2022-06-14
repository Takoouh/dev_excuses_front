import React, { useState, useEffect } from "react";

import AddExcuseFormContainer from "../../Components/AddExcuseForm/AddExcuseForm.container";
import Button from "../../Components/Button/Button.component";
import Excuse from "../../Components/Excuse/Excuse.component";
import Loader from "../../Components/Loader/Loader.component";

import { fetchExcuses } from "../../services/excusesServices";

import "./HomePage.scss";

/**
 *
 * @returns {React.JSXElementConstructor}
 */
const HomePage = () => {
  const [homePageAdditionnalClass, setHomePageAdditionnalClass] = useState(
    "home-page_animation_init"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showAddExcuseModal, setShowAddExcuseModal] = useState(false);
  const [excusesList, setExcusesList] = useState([]);
  const [displayedExcuseId, setDisplayedExcuseId] = useState();

  /**
   * generate random number depending on given range
   * @param {number} startingRange - minimum outcome (included)
   * @param {number} endingRange - maximum outcome (not included)
   * @returns {number}
   */
  const getRandomNumberFromRange = (startingRange, endingRange) =>
    Math.floor(Math.random() * (endingRange - startingRange) + startingRange);

  /**
   * set State of displayedId with new generated id
   * @return {void}
   */
  const handleGenerateNewExcuse = () => {
    let determinedExcuseId = getRandomNumberFromRange(0, excusesList.length);

    // if same as previous excuse, we generate another
    while (determinedExcuseId === displayedExcuseId) {
      determinedExcuseId = getRandomNumberFromRange(0, excusesList.length);
    }
    triggerFakeLoader(() => setDisplayedExcuseId(determinedExcuseId));
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

    triggerFakeLoader(() => setDisplayedExcuseId(newExcusesList.length - 1));
  };

  /**
   * Simulate a loading
   * - randomly load between 1s and 5s
   * - then execute function passed on callback
   * @param {function} callBackFunction - executed when loader fade out
   */
  const triggerFakeLoader = (callBackFunction) => {
    setIsLoading(true);
    const randomTime = getRandomNumberFromRange(1000, 5001);
    setTimeout(() => {
      setIsLoading(false);
      callBackFunction();
    }, randomTime);
  };

  useEffect(() => {
    // we fetch excuses from api and store them in state on mount
    fetchExcuses().then((response) => {
      setExcusesList(response.data);
    });

    //we trigger end of animation of component by setting additionnal class
    setTimeout(
      () => setHomePageAdditionnalClass("home-page_animation_on"),
      2000 //2s
    );
  }, []);

  return (
    <div className={`home-page ${homePageAdditionnalClass}`}>
      <h1>Excuses de dev</h1>
      {displayedExcuseId >= 0 && ( //don't display component if none to display
        <Excuse excuseMessage={excusesList[displayedExcuseId].message} />
      )}
      <Button label={"Générer une excuse"} onClick={handleGenerateNewExcuse} />
      <Button
        label={"Ajouter une excuse"}
        onClick={handleNewExcuseFormModalToggle}
      />

      {isLoading && <Loader />}

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
