import { Icon } from '@iconify/react'
import React from 'react'

export default function Process () {
  return (
    <div className='process'>
      <div className='process__container'>
        <div className='process__item'>
          <Icon icon='bi:calendar-heart-fill' color='#003366' width='40' height='40' />
          <h5>Lên lịch dễ dàng</h5>
        </div>
      </div>
      <div className='process__container'>
        <div className='process__item'>
          <Icon icon='zondicons:travel-bus' color='#003366' width='40' height='40' />
          <h5>Đặt tour nhanh</h5>
        </div>
      </div>
      <div className='process__container'>
        <div className='process__item'>
          <Icon icon='fontisto:hotel-alt' color='#003366' width='40' height='40' />
          <h5>Phòng khách sạn</h5>
        </div>
      </div>
      <div className='process__container'>
        <div className='process__item'>
          <Icon icon='ant-design:like-filled' color='#003366' width='40' height='40' />
          <h5>+1000 like</h5>
        </div>
      </div>
    </div>
  )
}
