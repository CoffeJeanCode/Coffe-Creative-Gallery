import styled from "@emotion/styled";
import p5 from "p5";
import { useEffect, useRef } from "react";

const SketchObject = ({ sketch, size }) => {
  const parentRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    canvasRef.current = new p5(sketch(size), parentRef.current);

    return () => {
      parentRef.current = null;
      canvasRef.current = null;
    };
  }, []);

  return <SketchObjectContainerStyled ref={parentRef} />;
};

const SketchObjectContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 0rem;
  canvas {
    border-radius: 30px;
  }
`;

export default SketchObject;
