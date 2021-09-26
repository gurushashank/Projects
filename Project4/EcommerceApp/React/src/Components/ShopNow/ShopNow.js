import React from "react";
import {
  Container,
  Pattern,
  Wrapper,
  H1,
  Image,
  ImageContentContainer,
  ImageContentH1,
  ImageContentH2,
  ImageContentP,
  ButtonContainer,
  Button,
} from "./ShopNowElements";
import image1 from "../../Images/shop_now_1.png";
import image2 from "../../Images/shop_now_2.png";
import pattern_up from "../../Images/pattern_up.png";
import pattern_down from "../../Images/pattern_down.png";
import { GiDiamonds } from "react-icons/gi";

function ShopNowSection() {
  return (
    <Container>
      <Pattern src={pattern_up} alt="Pattern" />
      <H1>Handcrafted By Artisans</H1>
      <br />
      <Wrapper>
        <Image src={image1} alt="Image 1" />
        <ImageContentContainer>
          <ImageContentH1>
            <GiDiamonds /> &nbsp; EXQUISITE &nbsp;
            <GiDiamonds />
          </ImageContentH1>
          <ImageContentH2>Artisanal Sarees</ImageContentH2>
          <ImageContentP>
            Captivating collection of authentic handcrafted sarees
          </ImageContentP>
          <ButtonContainer>
            <Button to="/shop">SHOP NOW</Button>
          </ButtonContainer>
        </ImageContentContainer>
      </Wrapper>
      <Wrapper>
        <Image src={image2} alt="Image 2" />
        <ImageContentContainer>
          <ImageContentH1>
            <GiDiamonds /> &nbsp; HANDCRAFTED &nbsp;
            <GiDiamonds />
          </ImageContentH1>
          <ImageContentH2>Beautiful Lehengas</ImageContentH2>
          <ImageContentP>
            Delicately embroidered collection of lehenga choli sets
          </ImageContentP>
          <ButtonContainer>
            <Button to="/shop">SHOP NOW</Button>
          </ButtonContainer>
        </ImageContentContainer>
      </Wrapper>
      <br />
      <Pattern src={pattern_down} alt="Pattern" />
    </Container>
  );
}

export default ShopNowSection;
