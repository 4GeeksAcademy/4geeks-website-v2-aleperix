import React, {useState, useContext} from 'react';
import {Div, Container, Divider, Wrapper, WrapperImage} from "../new_components/Sections";
import {Title, H2, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import PricesAndPayment from '../new_components/PricesAndPayment';
import BaseRender from './_baseLayout';
import {openGuidebook} from "../actions";
import {SessionContext} from '../session.js'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// new_components
// import PricesAndPayment from '../new_components/PricesAndPayment';
import { Header } from '../new_components/Sections'

const Pricing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  let location = null;
  if (session && session.location) {

    location = data.allLocationYaml.edges.find(l => l.node.active_campaign_location_slug === session.location.active_campaign_location_slug)
    if (location) location = location.node;
  }
  return (
    <>
      {/* HEADER SECTION */}
      <WrapperImage
        imageData={yml.header.image && yml.header.image.childImageSharp.gatsbyImageData}
        className={`img-header`}
        height={`500px`}
        bgSize={`cover`}
        alt={yml.header.alt}
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
        margin="0 0 50px 0"
      >
        <Divider height="100px" />
        <Title
          type="h1"
          size="5"
          color={Colors.white}
          title={yml.header.tagline}
          paragraph={yml.header.sub_heading}
          variant="main"
          paragraphColor={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
      </WrapperImage>

        <Div flexDirection="column-reverse" placeItems="center" m_sm="0px 0px 100px 0" display="flex">
          <Div flexDirection="column" size="5" size_sm="12" height="300px" align_sm="center">
            <GatsbyImage
              // fixed={yml.intro.image.childImageSharp.gatsbyImageData}
              image={getImage(yml.intro.image.childImageSharp.gatsbyImageData)}
              objectFit="cover"
              objectPosition="50% 50%"
              margin="auto"
            />
          </Div>
          <Div flexDirection="column" size="7" size_sm="12">
            <H2 align="left" margin="30px 0 20px 0" type="h2">{yml.intro.heading}</H2>
            <H5 align="left" fontSize="20px" fontHeight="30px">{yml.intro.content}</H5>
          </Div>
        </Div>
        <Div m_sm="0px 0px 0px 0" display="flex" padding="0 12%">
          <Div flexDirection="column" size="7" size_sm="12">
            <H2 align="left" margin="30px 0 20px 0" >{yml.intro.heading_second}</H2>
            <Paragraph textAlign="left" fontSize="20px" fontHeight="30px">{yml.intro.content_second}</Paragraph>
            {yml.intro.bullets.map(b => <Paragraph textAlign="left" margin="10px 0">• {b}</Paragraph>)}
          </Div>
          <Div flexDirection="column" size="5" disp_sm="none" height="300px" align_sm="center">
            <StyledBackgroundSection
              className={`image`}
              height={`250px`}
              image={yml.intro.image_second.childImageSharp.gatsbyImageData}
              bgSize={`cover`}
              backgroundColor={Colors.lightGray}
              alt="4Geeks Academy"
              borderRadius={`1.25rem`}
            />
          </Div>
      </Div>
      <Div flexDirection="column" margin="50px 0px" m_sm="0" right
        customBorderRadius="1.25rem 0 0 1.25rem"
        background={Colors.lightGray}
        border="top"
      >
        <Title
          size="10"
          title={yml.prices.heading}
          paragraph={yml.prices.paragraph}
          paragraphColor={Colors.black}
          variant="primary"
        />
        <PricesAndPayment
          shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
          openedLabel={yml.prices.opened_label}
          session={session}
          closedLabel={yml.prices.closed_label}
          type={pageContext.slug}
          lang={pageContext.lang}
          locations={data.allLocationYaml.edges}
        />
      </Div >
      {/* { location && location.documents && location.documents.payment_guidebook && location.documents.payment_guidebook.url && location.documents.payment_guidebook.url != "" &&
        <Div margin="50px 0px">
          <Title
            size="10"
            title={yml.payment_guide.heading}
            paragraph={yml.payment_guide.sub_heading}
            paragraphColor="black"
            variant="primary"
          />
          <Divider height="30px" />
          <Div display="flex" justifyContent="center">
            <Button outline position="relative" width="300px" onClick={() => openGuidebook(location.documents.payment_guidebook.url)} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
          </Div>
        </Div>
      } */}
      <Div flexDirection="column" right margin="50px 0px"
        background={Colors.lightGray}
        border="top"
      >
        <Title
          textAlign="center"
          size="10"
          title={yml.ecosystem?.heading}
          paragraph={yml.ecosystem?.sub_heading}
          paragraphColor="black"
          variant="primary"
        />
        <Divider height="150px" />
      </Div>

    </ >
  )
};
// REMOED: payment_guide{ ... }
export const query = graphql`
  query PricingQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            seo_title
            header{
                title
                paragraph
                tagline
                image{
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 1600
                      quality: 100
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                    # fluid(maxWidth: 1600, quality: 100){
                    #   ...GatsbyImageSharpFluid_withWebp
                    # }
                  }
                }
                alt
                sub_heading
            }
            ecosystem {
              heading
              sub_heading
            }
            intro{
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 300
                      height: 300
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                    # fixed(width: 300, height: 300) {
                    #   ...GatsbyImageSharpFixed
                    # }
                  }
                }
                image_second {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 450
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                    # fluid(maxWidth: 450){
                    #   ...GatsbyImageSharpFluid_withWebp
                    # }
                  }
                }
                content
                content_second
                heading_second
                bullets
                heading
            }
            label{
                program{
                  title
                  closedLabel
                }
                modality{
                  title
                  closedLabel
                }
                campus{
                  title
                  closedLabel
                }
            }
            syllabus_button_text
            prices{
                heading
                paragraph
                opened_label
                closed_label
            }


        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            credentials {
              title
              icon
              value
            }
          }
        }
      }
      allLocationYaml(filter: { fields: { lang: {eq: $lang}}}){
        edges {
          
          node {
            id
            city
            country
            hasFinancialsOption
            financials_max_months
            active_campaign_location_slug
            breathecode_location_slug
            fields{
              lang
            }
            meta_info {
              slug
              title
              description
              image
              keywords
              redirects
            }
            header{
              sub_heading
              tagline
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 1200
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 1200, quality: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              } 
            }
            prices {
              full_stack {
                full_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      sub_heading
                      heading_one
                      heading_two
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      heading_two
                      sub_heading
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      sub_heading
                      heading_one
                      heading_two
                    }
                  }
                }
                part_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      heading_two
                      sub_heading
                      heading_one
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                }
              }
              software_engineering {
                part_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      heading_two
                      sub_heading
                      heading_one
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                }
              }
            }
            documents{
              payment_guidebook{
                url
              }
            }
          }
        }
      }
      allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
            node {
              partners {
                images {
                  name
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 100
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                      )
                      # fluid(maxWidth: 100){
                      #   ...GatsbyImageSharpFluid_withWebp
                      # }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 100
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                      )
                      # fluid(maxWidth: 100){
                      #   ...GatsbyImageSharpFluid_withWebp
                      # }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              influencers {
                images {
                  name
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 100
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                      )
                      # fluid(maxWidth: 100){
                      #   ...GatsbyImageSharpFluid_withWebp
                      # }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                        width: 200
                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                      )
                      # fluid(maxWidth: 200){
                      #   ...GatsbyImageSharpFluid_withWebp
                      # }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
            }
          }
        }
  }
`;
export default BaseRender(Pricing);