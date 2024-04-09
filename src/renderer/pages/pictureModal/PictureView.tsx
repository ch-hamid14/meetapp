import React from 'react';
import { Carousel, Image } from 'antd';
import FirstAnimation from '../../images/first.gif';
import secondAnimation from '../../images/second.gif';
import thirdAnimation from '../../images/third.gif';
import fourthAnimation from '../../images/fourth.gif';
import fifthAnimation from '../../images/fifth.gif';
import './index.scss';
import { RightOutlined } from '@ant-design/icons';
const PictureView = () => {
  return (
    <div>
      <Carousel
        autoplay
        dots={true}
        style={{ color: 'red' }}
        dotPosition="bottom"
      >
        <div>
          <Image src={FirstAnimation} preview={false} />
        </div>
        <div>
          <Image src={secondAnimation} preview={false} />
        </div>
        <div>
          <Image src={thirdAnimation} preview={false} />
        </div>
        <div>
          <Image src={fourthAnimation} preview={false} />
        </div>
        <div>
          <Image src={fifthAnimation} preview={false} />
        </div>
      </Carousel>
    </div>
  );
};

export default PictureView;
