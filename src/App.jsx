import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import normalize from "normalize.css";
import Nav from "./components/Nav";
import SketchGallery from "./components/SketchGallery";

function App() {
  return (
    <AppContainerStyled>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <Nav />
      <ContainerStyled>
        <MainContentStyled>
          <SketchGallery />
        </MainContentStyled>
      </ContainerStyled>
    </AppContainerStyled>
  );
}

const ContainerStyled = styled.main`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
`;

const MainContentStyled = styled.div`
  grid-column: 2;
  margin: 2rem 1rem;
`;

const AppContainerStyled = styled.div`
  background-color: #ffffff;
  background-image: radial-gradient(
    #9a9a9a 0.35000000000000003px,
    #ffffff 0.35000000000000003px
  );
  overflow: hidden;
  background-size: 7px 7px;
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default App;
