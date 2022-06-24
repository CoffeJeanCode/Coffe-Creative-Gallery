import styled from "@emotion/styled";
import p5 from "p5";
import { useEffect, useRef } from "react";

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
