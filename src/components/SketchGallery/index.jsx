import React from "react";
import styled from "@emotion/styled";
import { Sketchs } from "../../sketch";
import SketchItem from "../SketchItem";
import SketchModal from "../SketchModal";

const SketchGallery = () => {
  return (
    <div>
      <h2>Gallery</h2>
      <SketchListStyled>
        {Sketchs.map((sketch, idx) => (
          <SketchItem key={idx} sketch={sketch} />
        ))}
      </SketchListStyled>
    </div>
  );
};

const SketchListStyled = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  canvas {
    border-radius: 30px;
  }
`;

export default SketchGallery;
