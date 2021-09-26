import React from "react";
import { Container, Wrapper, Image, H1, H2, P, Pattern } from "./AboutElements";
import about from "../../Images/about.png";
import pattern_up from "../../Images/pattern_1_up.png";
import pattern_down from "../../Images/pattern_1_down.png";

function About() {
  return (
    <div>
      <Pattern src={pattern_up} alt="Pattern up" />
      <Container>
        <br />
        <Wrapper>
          <Image src={about} alt="About Image" />
        </Wrapper>
        <Wrapper>
          <H1>ARTISANAL FINESSE</H1>
          <H2>Handmade Treasure</H2>
          <P>
            Anaha aims to promote the local textile crafts being nurtured by
            every state for countless years such as Banarasi silks, Bagh prints,
            Pashmina shawls, and many more. Inspired by our rich history and
            tradition, we believe it is our duty to spread the incredible beauty
            of the crafts of our country, bringing the artistic crafts to life.
          </P>
        </Wrapper>
      </Container>
      <Pattern src={pattern_down} alt="Pattern down" />
    </div>
  );
}

export default About;
