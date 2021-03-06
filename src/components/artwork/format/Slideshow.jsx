import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import Close from '../Close';
import Timer from '../Timer';

const StyledSlide = styled.div`
  height: 100vh;
  overflow: hidden;
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
    position: relative;
    display: block;
    .slick-track {
      .slick-slide {
        display: block;
        float: left;
        height: 100vh;
        min-height: 1px;
        div {
          height: 100%;
          div {
            height: 100%;
            display: grid !important;
            align-items: center;
            justify-items: center;
            img {
              max-width: 100%;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
  }
`;

const Slideshow = ({ data, images, returnPage }) => {
  const [action, setAction] = useState('idle');

  const totalTime = data.frontmatter.slideshowTime
    ? data.frontmatter.slideshowTime * 1000
    : 3000;

  return (
    <>
      <Close url={returnPage} />
      <StyledSlide>
        <Slider
          onInit={() => setAction('start')}
          afterChange={() => setAction('reset')}
          beforeChange={() => setAction('idle')}
          fade={true}
          arrows={false}
          infinite={true}
          pauseOnHover={false}
          lazyLoad={true}
          speed={300}
          autoplay={true}
          autoplaySpeed={totalTime}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((item, idx) => (
            <div key={idx}>
              <img
                src={item.image.childImageSharp.original.src}
                alt={item.title || `${data.frontmatter.title} #${idx + 1}`}
              />
            </div>
          ))}
        </Slider>
      </StyledSlide>
      <Timer totalTime={totalTime} action={action} />
    </>
  );
};

export default Slideshow;
