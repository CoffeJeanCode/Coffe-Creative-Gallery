import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Sketchs } from "../../sketch";
import SketchItem from "../SketchItem";

const SketchGallery = () => {
  const containerRef = useRef(null);
  const [itemSize, setItemSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        const columns = Math.floor(width / 400) || 1;
        const size = width / columns - 32;
        setItemSize({ width: size, height: size });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h2>Gallery</h2>
      <SketchListStyled ref={containerRef}>
        {Sketchs.map((sketch, idx) => (
          <SketchItem
            key={idx}
            sketch={sketch}
            size={itemSize}
            interaction={sketch.interaction}
          />
        ))}
      </SketchListStyled>
    </>
  );
};

const SketchListStyled = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

export default SketchGallery;
