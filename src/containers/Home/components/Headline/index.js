import React, { Component } from 'react';
import Slider from 'react-slick';
import './style.css';
import { dataMock } from './dataMock';

const headlineDataSource = dataMock;

class Headline extends Component {
  render () {
    const settings = {
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true,
      vertical: true
    };

    return (
      <div className="headline">
        <div className="headline__logo"></div>
        <div className="headline__slider">
          <Slider {...settings}>
            {
              headlineDataSource.map((item, index) => {
                return (
                  <a
                    key={index}
                    className="headline__sliderInner"
                    href={item.url}
                  >
                    <div className="headline__sliderTitle">{item.title}</div>
                    <div className="headline__sliderImgWrapper">
                      <img className="headline__sliderImg" src={item.pic} alt={item.title} />
                    </div>
                  </a>
                )
              })
            }
          </Slider>
        </div>
      </div>
    )
  }
}

export default Headline;
