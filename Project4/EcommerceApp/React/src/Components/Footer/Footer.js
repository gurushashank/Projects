import React from "react";
import {
  FooterContainer,
  FooterLinkContainer,
  FooterLink,
  Rights,
  RightsContainer,
  SocialMediaIconsContainer,
  SocialMediaIconLinks,
  FooterLinkWrapper,
  SocialMediaIconWrapper,
} from "./FooterElements";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <FooterContainer>
      <FooterLinkContainer>
        <FooterLinkWrapper>
          <FooterLink to="/termsandconditions">
            Terms &amp; Conditions
          </FooterLink>
        </FooterLinkWrapper>
        <FooterLinkWrapper>
          <FooterLink to="/faqs">FAQS</FooterLink>
        </FooterLinkWrapper>
        <FooterLinkWrapper>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterLinkWrapper>
      </FooterLinkContainer>
      <RightsContainer>
        <Rights>ANAHA &#169; 2021. All rights reserved.</Rights>
      </RightsContainer>
      <SocialMediaIconsContainer>
        <SocialMediaIconWrapper>
          <SocialMediaIconLinks href="/" target="_blank" aria-label="Instagram">
            <FaInstagram />
          </SocialMediaIconLinks>
        </SocialMediaIconWrapper>
        <SocialMediaIconWrapper>
          <SocialMediaIconLinks href="/" target="_blank" aria-label="Twitter">
            <FaTwitter />
          </SocialMediaIconLinks>
        </SocialMediaIconWrapper>
        <SocialMediaIconWrapper>
          <SocialMediaIconLinks href="/" target="_blank" aria-label="Facebook">
            <FaFacebook />
          </SocialMediaIconLinks>
        </SocialMediaIconWrapper>
      </SocialMediaIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
