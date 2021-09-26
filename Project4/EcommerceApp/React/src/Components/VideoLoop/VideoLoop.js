import React from "react";
import video_clip from "../../Videos/video_clip.mp4";
import {
  VideoContainer,
  VideoBackground,
  VideoComponent,
  Content,
  H1,
  P,
  ButtonContainer,
  Button,
  DarkContent,
} from "./VideoLoopElements";

const VideoLoop = () => {
  return (
    <VideoContainer>
      <VideoBackground>
        <VideoComponent autoPlay loop muted src={video_clip} type="video/mp4" />
      </VideoBackground>
      <Content />
      <DarkContent >
        <br />
        <H1> Ethnic Wear At Its Best</H1>
        <P>
          Wrap yourself in the Anaha's ethinic attires handcrafted with care by India's best artisans. <br />
          Sign up for a new account and avail 20% off on your first purchase.
        </P>
        <ButtonContainer>
          <Button to="/signup/profile">SIGN UP TODAY</Button>
        </ButtonContainer>
        <br />
      </DarkContent>
    </VideoContainer>
  );
};

export default VideoLoop;
