import React from "react";
import styled from "@emotion/styled";
import { Sketchs } from "../../sketch";
import SketchItem from "../SketchItem";

const SketchGallery = () => {
  return (
    <div>
      <h2>Gallery</h2>
      <SketchListStyled>
        {Sketchs.map((sketch, idx) => (
          <SketchItem
            key={idx}
            sketch={sketch}
            size={{ width: 300, height: 300 }}
          />
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
`;

export default SketchGallery;
