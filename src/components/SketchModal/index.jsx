import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SketchItem from "../SketchObject";

const SketchModal = ({ Sketch, isOpen, toggleModal }) => {
  if (isOpen)
    return (
      <SketchModalContainerStyled>
        <SketchItem sketch={Sketch} />
      </SketchModalContainerStyled>
    );
};

const SketchModalContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export default SketchModal;
