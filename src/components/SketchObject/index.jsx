import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import p5 from "p5";

const SketchObject = ({ sketch }) => {
  const parentRef = useRef();

  useEffect(() => {
    new p5(sketch, parentRef.current);
    return () => {
      parentRef.current = null;
    };
  }, []);

  return <SketchObjectContainerStyled ref={parentRef} />;
};

const SketchObjectContainerStyled = styled.div``;

export default SketchObject;
