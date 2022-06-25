import styled from "@emotion/styled";
import { useState } from "react";
import SketchModal from "../SketchModal";
import SketchObject from "../SketchObject";

const SketchItem = ({ sketch, size }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return (
    <li>
      <h3>{sketch.title}</h3>
      <SketchObject sketch={sketch.Sketch} size={size}></SketchObject>
      <SketchModal
        sketch={sketch}
        isOpen={isOpenModal}
        toggleModal={toggleModal}
      ></SketchModal>
      <SketchButtoStyled onClick={toggleModal}>
        View Fullscreen
      </SketchButtoStyled>
    </li>
  );
};

const SketchButtoStyled = styled.button`
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  width: 100%;
  background: #1e1e1e;
  color: #fff;
  margin: 0.5rem 0;
  &:hover {
    background: #3a3a3a;
  }
`;

export default SketchItem;
