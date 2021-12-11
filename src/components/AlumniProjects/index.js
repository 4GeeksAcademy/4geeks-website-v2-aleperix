import React, {useState, useEffect} from 'react';
import {GridContainer, GridContainerWithImage, Div, Grid} from '../Sections'
import PropTypes from "prop-types"
import {H2, H3, H4, H5, Paragraph} from '../Heading';
import {Colors, StyledBackgroundSection, Span} from '../Styling';
import Icon from "../Icon"
import ReactPlayer from '../ReactPlayer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AlumniProjects = ({lang, showThumbs, limit, playerHeight, title, paragraph}) => {
    const [projects, setProjects] = useState(lang[0].node.projects.slice(0, limit || lang[0].node.projects.length))
    const [value, setValue] = useState(0);

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", fontSize:"30px", background: "black", right: "120px", zIndex:99, borderRadius: "50%"}}
            onClick={onClick}
          />
        );
      }
      const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", fontSize:"30px", background: "black", left: "120px", zIndex:99, borderRadius: "50%"}}
            onClick={onClick}
          />
        );
      }
    const settings= {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        /* OPTIONAL
            Disabled arrows becouse it's have a GrabAndSlide Functions
            And it works with the kewboard arrows (left/right) when the 
            component is clicked 
        */
        arrows: false,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    }
    return (
        <Div flexDirection="column">
            <GridContainer margin="6rem 0">
                <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <H2 margin="0 0 15px 0" fontWeight="900">{title}</H2>
                    <Paragraph>{paragraph}</Paragraph>
                </Div>
            </GridContainer>

            <Slider {...settings}>
                {projects?.map((item, index) => {
                    return (
                        <GridContainerWithImage imageSide="left" columns_tablet="14" gridGap_tablet="0" margin_tablet="0 0 36px 0" margin="0 0 50px 0" padding_tablet="0">
                            <Div background={Colors.lightGray} height_tablet="auto" padding="0" padding_tablet="17px 51px" gridColumn_tablet="1 / 9">
                                {item.project_video === "" ?

                                    <StyledBackgroundSection
                                        height={`500px`}
                                        image={item.project_image.childImageSharp.gatsbyImageData}
                                        bgSize={`cover`}
                                        alt="Cnn Logo"
                                    />
                                    :
                                    <ReactPlayer
                                        id={item.project_video}
                                        thumb={item.project_image}
                                        imageSize="maxresdefault"
                                        right_tablet="-93px"
                                        left_tablet="unset"
                                        style={{
                                            width: "100%",
                                            height: "500px",
                                        }}
                                    />
                                }
                            </Div>
                            <Div flexDirection="column" gridColumn_tablet="10 / 15 " >
                                <H3
                                    textAlign="left"
                                    margin={`10px 0`}
                                >Project: {`${item.project_name}`}
                                </H3>
                                <H4
                                    textAlign="left"
                                    fontWeight="900"
                                    margin={`24px 0 9px 0`}
                                > {`> MADE BY:`}
                                </H4>
                                {item.alumni.map((alumni, i) => {
                                    return (
                                        <Div key={i} justifyContent="start" margin={`0 0 20px 0`} gap="10px" display="flex" >
                                            <H4
                                                textAlign="left"
                                                fontWeight={`400`}
                                                width="fit-content"
                                                margin="0 20px 0 0"
                                            >{`${alumni.first_name} ${alumni.last_name}`}
                                            </H4>
                                            {alumni.github != "" &&
                                                <>
                                                    <a target="_blank" href={alumni.github} rel="noopener noreferrer nofollow">
                                                        <Icon icon="github" width="22" color={Colors.black} fill={Colors.black} />
                                                    </a>
                                                </>
                                            }
                                            {alumni.linkedin != "" &&
                                                <>
                                                    <a target="_blank" href={alumni.linkedin} rel="noopener noreferrer nofollow">
                                                        <Icon icon="linkedin" width="22" color={Colors.blue} fill={Colors.blue} />
                                                    </a>
                                                </>
                                            }
                                        </Div>
                                    )
                                })}
                                <H4
                                    textAlign="left"
                                    fontWeight="900"
                                    margin={`20px 0 6px 0`}
                                    style={{ borderTop: "1px solid #ebebeb" }}
                                > {`> DESCRIPTION:`}
                                </H4>
                                <Paragraph
                                    color={Colors.gray}
                                    textAlign="left"
                                >{item.project_content}
                                </Paragraph>

                            </Div>

                        </GridContainerWithImage>

                    )
                })
                }
            </Slider>
        </Div>
    )
};
AlumniProjects.propTypes = {
    limit: PropTypes.number
}
AlumniProjects.defaultProps = {
    limit: 0,
    playerHeight: "100%"
}
export default AlumniProjects;