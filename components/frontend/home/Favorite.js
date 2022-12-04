import { Icon } from '@iconify/react'
import React from 'react'

export default function Favorite () {
  return (
    <div className='favorite'>
      <div className='favorite__container'>
        <div className='favorite__play'>
          <Icon icon='bi:play-fill' color='black' width='30' height='30' />
          <div className='favorite__play2' />
        </div>
      </div>
      <div className='favorite__info'>
        <h2>Du lịch Đà Nẵng –  điểm đến hấp dẫn miền Trung</h2>
      </div>

    </div>
  )
}
