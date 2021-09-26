import React from "react";
import { Container, Jumbotron, Card } from "react-bootstrap";
import styled from "styled-components";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);
  margin: 30px 5px 50px 5px;
  padding: 30px;
  & .row {
    margin: 10px 0px;
  }
`;

const TandC = () => {
  let styles = {
    backgroundColor: "grey",
    fontWeight: "bold",
  };
  return (
    <>
      <Navbar />

      <PageHeader>
        <Container>
          <h2 className="text-center">Terms and Conditions</h2>
        </Container>
      </PageHeader>

      <Container>
        <StyledCard>
          <p>
            These terms of service (“Terms of Service”) govern your use of
            ANAHA.COM and its subsidiaries’ (“Anaha”) websites, services and
            applications (the “Services”). By using or accessing the Services,
            you agree to be bound by these Terms of Service, as updated from
            time to time in accordance with Section 12 below. There may be
            instances when we offer additional terms specific to a product,
            application or service. To the extent such additional terms conflict
            with these Terms of Service, the additional terms associated with
            the product, application or service, with respect to your use of the
            product, application or service, will prevail. References to “us,”
            “we,” and “our” mean ANAHA.
          </p>
          <span style={styles}>1. USING THE SERVICES</span>
          <p>
            Some Services may allow you to: Add your own original content or
            post your content in blog or user comment areas (“Your Content”).
            Remember that all information that is disclosed in blog, comment or
            other public areas becomes public information and you should
            exercise caution when deciding to share any of your personal
            information as part of Your Content Use the Services as modified
            with Your Content Arrange for third parties to have access to Your
            Content subject to these Terms of Service By submitting Your Content
            to the Services, you hereby grant Wiley a worldwide, royalty-free,
            non-exclusive, sublicenseable and transferable license to use,
            distribute, reproduce, prepare derivative works of, perform and
            display Your Content in connection with the Services and Wiley’s
            business, including without limitation for promoting the Services,
            in all media now known or hereafter devised through any media
            channels. You acknowledge that use of the Services is for your
            personal use only. Except as expressly permitted herein, you shall
            not: Access the Services by any means other than instructions
            provided by Wiley Use the Services for any illegal or unauthorized
            purpose Share with any third party any access codes or account
            information, including without limitation your username and password
            that you may create or Wiley may provide in connection with the
            Services And/Or upload, post or otherwise distribute or facilitate
            distribution of any content that: Is unlawful, threatening, abusive,
            harassing, defamatory, deceptive, fraudulent, invasive of another’s
            privacy, discriminatory, sexually oriented or tortious; Infringes on
            any patent, trademark, trade secret, copyright, right of publicity,
            or other proprietary right of any party; Constitutes unauthorized or
            unsolicited advertising, junk or bulk e-mail, or any form of lottery
            or gambling; Constitutes the selling or trading of any merchandise;
            Constitutes the soliciting for advertisers/sponsors; conducting
            contests/raffles; displaying advertising/sponsorship art; promoting,
            soliciting or participating in chain letters or marketing/pyramid
            schemes; Contains software viruses or any other computer code,
            files, or programs that are designed or intended to disrupt, damage,
            or limit the functioning of any software, hardware, or
            telecommunications equipment or to damage or obtain unauthorized
            access to any data or other information of any third party; Contains
            links to sites that violate these Terms of Service, such as
            pornographic sites, defamatory sites, and so on; or Impersonates any
            person or entity. We generally do not pre-screen, monitor or edit
            the content posted by users of the Services. However, we have the
            right at our sole discretion to remove any content that, in our
            judgment, does not comply with the foregoing or is otherwise
            harmful, objectionable, or inaccurate. We are not responsible for
            any failure or delay in removing such content. You are responsible
            for all activity that occurs under your account and you are solely
            responsible for maintaining the confidentiality of your access codes
            and account information. You must notify us immediately if you
            become aware of any unauthorized use of your access codes or account
            information.
          </p>
          <span style={styles}>2. OWNERSHIP</span>
          <p>
            All rights (including without limitation, copyrights, trademarks,
            patents and trade secrets) in the Services and the content contained
            therein, other than Your Content, (“Anaha Content”) are and will
            remain the sole and exclusive property of Anaha and/or its
            licensors. No title to or ownership of any portion of the Services,
            the Wiley Content or any other products or services manufactured,
            sold and/or distributed or otherwise made available by Wiley, or any
            proprietary rights related to those products/services, is or will be
            transferred pursuant to or by virtue of this agreement. Wiley hereby
            grants you a limited, non-exclusive, nonsublicensable, revocable
            license to display and reproduce the Anaha Content (other than
            software code) solely for your personal use in connection with using
            the Services in accordance with these Terms of Service.
          </p>
          <span style={styles}>3. FEEDBACK</span>
          <p>
            You may from time to time provide Wiley with suggestions, ideas or
            other feedback regarding the Services (“Feedback”). Both parties
            agree that Wiley shall own such Feedback and is entitled, but not
            obligated, to use, develop and exploit it in any manner, without
            restriction or duty to compensate or seek permission from you.
          </p>
          <span style={styles}>4. DISCLAIMER</span>
          <p>
            The services are provided “as is”, without warranty of any kind,
            express or implied, including but not limited to the implied
            warranties of merchantability, reliability, availability or fitness
            for a particular purpose. the entire risk as to the results or
            performance of the services as assumed by you. in no event will
            Wiley or its licensors be liable to you for any damages, including
            without limitation lost profits, lost savings, or other incidental
            or consequential damages arising out of the use of inability to use
            the services, even if Wiley has been advised of the possibility of
            such damages. the terms of this sections 6 shall apply to the
            fullest extent permitted by the law in the applicable jurisdiction.
          </p>
        </StyledCard>
      </Container>

      <Footer />
    </>
  );
};

export default TandC;
