import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import p5 from "p5";

const SketchObject = ({ sketch, size }) => {
  const parentRef = useRef();

  useEffect(() => {
    new p5(sketch(size), parentRef.current);
    return () => {
      parentRef.current = null;
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
