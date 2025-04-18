import styled from "@emotion/styled";
import { useState } from "react";
import SketchModal from "../SketchModal";
import SketchObject from "../SketchObject";

const SketchItem = ({ sketch, size, interaction }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return (
    <SketchItemContainerStyled isOpenModal={isOpenModal}>
      <h3>
        {sketch.title}
        {interaction.isInteractive && (
          <SketchMouseUsedStyled>
            Can {interaction.type} Mouse
          </SketchMouseUsedStyled>
        )}
      </h3>
      <SketchObject sketch={sketch.Sketch} size={size}></SketchObject>
      <SketchModal
        sketch={sketch}
        isOpen={isOpenModal}
        toggleModal={toggleModal}
      ></SketchModal>
      <SketchButtonStyled onClick={toggleModal}>
        View Fullscreen
      </SketchButtonStyled>
    </SketchItemContainerStyled>
  );
};

const SketchButtonStyled = styled.button`
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

const SketchItemContainerStyled = styled.li`
  text-align: center;
  scroll-snap-align: start;
`;

const SketchMouseUsedStyled = styled.div`
  border-radius: 10px;
  margin: 0 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  display: inline-block;
  background-color: #000;
  border: 2px solid #fff;
  color: #fff;
`;

export default SketchItem;
