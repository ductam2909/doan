import { Icon } from '@iconify/react'
import React from 'react'

export default function About () {
  return (
    <div className='about'>
      <div className='about__left'>
        <div className='about__boder' />
        <div className='about__since'><h2>Cầu Vàng</h2></div>
        {/* <img src='/assets/img/cauvang.jpg' /> */}
      </div>
      <div className='about__right'>
        <h2>Đi Đà Nẵng bây giờ là phải check-in cầu vàng mới đúng “mốt”.</h2>
        <p>Cầu Vàng ở Bà Nà Hills (Đà Nẵng) đang khuấy đảo cộng đồng xê dịch thế giới những ngày này khi được đồng loạt các trang tin nổi tiếng trên ca ngợi dồn dập, trong đó có CNN, BBC, New York Times, Times, The Guardian, Bored Panda, National Geographic… Nhiều travelblogger nổi tiếng cũng khoe ảnh check in ở cây cầu này</p>
        <div className='about__check'>
          <div className='about__check--item'>
            <Icon icon='ant-design:check-square-filled' color='#014b85' width='30' height='30' />
            <p>Ăn trưa Buffet miễn phí</p>
          </div>
          <div className='about__check--item'>
            <Icon icon='ant-design:check-square-filled' color='#014b85' width='30' height='30' />
            <p>Trẻ em dưới  1m miễn phí</p>
          </div>
          <div className='about__check--item'>
            <Icon icon='ant-design:check-square-filled' color='#014b85' width='30' height='30' />
            <p>Xe trung chuyển Đà Nẵng </p>
          </div>
        </div>
        <div className='about__btn'><p>Về chúng tôi</p></div>
      </div>
    </div>
  )
}
