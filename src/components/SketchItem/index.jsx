import React, { useState } from "react";
import SketchModal from "../SketchModal";
import SketchObject from "../SketchObject";

const SketchItem = ({ sketch }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return (
    <li>
      <h3>{sketch.title}</h3>
      <SketchObject sketch={sketch.Sketch}></SketchObject>
      {/* <SketchModal isOpen={isOpenModal} toggleModal={toggleModal}></SketchModal> */}
      {/* <button onClick={toggleModal}>View Fullscreen</button> */}
    </li>
  );
};

export default SketchItem;
