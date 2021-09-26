import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const FooterContainer = styled.div`
  background: #d0312d;
  height: 280px;

  @media screen and (max-width: 680px) {
    height: 260px;
  }
`;

export const FooterLinkContainer = styled.div`
  width: 100%;
  padding-top: 40px;
`;

export const FooterLinkWrapper = styled.div`
  width: 33.33%;
  display: inline-block;
  text-align: center;
`;

export const FooterLink = styled(LinkRouter)`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-size: 18px;

  &:hover {
    text-decoration: none;
    color: #dedede;
  }
`;

export const RightsContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

export const Rights = styled.small`
  color: #fff;
  font-size: 18px;
`;

export const SocialMediaIconsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialMediaIconWrapper = styled.div`
  width: 60px;
  display: inline-block;
  text-align: center;
`;

export const SocialMediaIconLinks = styled.a`
  color: #fff;
  font-size: 32px;
  width: 33.33%;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    transition: 0.2s ease-all;
    color: #dedede;
  }
`;
