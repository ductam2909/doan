import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Intro () {
  const dataimg = [
    {
      id: '1',
      imgage: 'https://webdulichdanang.com/wp-content/uploads/2018/02/header-img.jpg'
    },
    {
      id: '2',
      imgage: 'https://webdulichdanang.com/wp-content/uploads/2018/02/header-img.jpg'
    },
    {
      id: '3',
      imgage: 'https://webdulichdanang.com/wp-content/uploads/2018/02/header-img.jpg'
    },
    {
      id: '4',
      imgage: 'https://webdulichdanang.com/wp-content/uploads/2018/02/header-img.jpg'
    }

  ]

  const renderSlides = () =>
    dataimg.map(item => (
      <div key={item.id}>
        <img src={item.imgage} alt='' className='intro__img' />
      </div>
    ))
  return (
    <div className='intro'>
      <Slider
        dots
        autoplay
        arrows={false}
      >{renderSlides()}
      </Slider>
      <div className='intro__content'>
        <div className='hero__caption'>
          <h1>Du Lịch <span>Đà Nẵng</span> </h1>
          <p>Cùng chúng tôi khám phá ngay nào!</p>
        </div>
        <div className='intro__form'>
          <div className='intro__input'>
            <input type='text' placeholder='Bạn muốn đặt tour đi đâu ?' />
          </div>
          <div className='intro__search'>
            <p>Search</p>
          </div>
        </div>
      </div>
    </div>
  )
}
