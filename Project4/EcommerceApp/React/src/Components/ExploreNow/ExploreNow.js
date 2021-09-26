import React from "react";
import image1 from "../../Images/explore_now_1.png";
import image2 from "../../Images/explore_now_2.png";
import image3 from "../../Images/explore_now_3.png";
import {
  Container,
  Wrapper,
  Image,
  H1,
  ImageContentH1,
  ImageContentP,
  Button,
  ButtonContainer,
} from "./ExploreNowElements";

function ExploreNow() {
  return (
    <Container>
      <H1>Just Arrived</H1>
      <br />
      <Wrapper>
        <Image src={image1} alt="Image1" />
        <ImageContentH1>Embroidered Bliss</ImageContentH1>
        <ImageContentP>A beautiful mix of hues &amp; designs</ImageContentP>
        <ButtonContainer>
          <Button to="/shop">EXPLORE</Button>
        </ButtonContainer>
      </Wrapper>
      <Wrapper>
        <Image src={image2} alt="Image1" />
        <ImageContentH1>Premium Linen</ImageContentH1>
        <ImageContentP>Like a calm breeze on a sunny day</ImageContentP>
        <ButtonContainer>
          <Button to="/shop">EXPLORE</Button>
        </ButtonContainer>
      </Wrapper>
      <Wrapper>
        <Image src={image3} alt="Image1" />
        <ImageContentH1>Handloom Fabrics</ImageContentH1>
        <ImageContentP>The allure of hand-made</ImageContentP>
        <ButtonContainer>
          <Button to="/shop">EXPLORE</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
}

export default ExploreNow;
