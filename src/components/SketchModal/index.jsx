import styled from "@emotion/styled";
import { MdClose as CloseIcon } from "react-icons/md";
import SketchItem from "../SketchObject";

const SketchModal = ({ sketch, isOpen, toggleModal }) => {
  if (isOpen)
    return (
      <SketchModalContainerStyled>
        <SketchModalTitleStyled>{sketch.title}</SketchModalTitleStyled>
        <CloseButtonStyled onClick={toggleModal}>
          <CloseIcon />
        </CloseButtonStyled>
        <SketchItem sketch={sketch.Sketch} size={{ width: window.innerWidth - 100, height: window.innerHeight - 100 }} />
        <SketchModalBackgroundContainer onClick={toggleModal} />
      </SketchModalContainerStyled>
    );
};

const SketchModalContainerStyled = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
`;
const SketchModalBackgroundContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: -1;
`;

const SketchModalTitleStyled = styled.h3`
  color: #fff;
  font-size: 2rem;
  margin: 1rem 0;
`;

const CloseButtonStyled = styled.button`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 0;
  right: 2rem;
  padding: 2rem;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 2rem;
`;

export default SketchModal;
