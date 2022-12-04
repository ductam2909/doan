import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function Footer () {
  return (
    <div className='footer'>
      <div className='footer__item'>
        <div className='footer__title'>Thông tin </div>
        <div className='footer__detail'>
          <Icon
            icon='el:phone-alt'
            color='#09f'
            width='30' height='30'
            className='footer__item--icon'
          />0983449642
        </div>
        <div className='footer__detail'>
          <Icon
            icon='fontisto:email'
            color='#09f'
            width='30' height='30'
            className='footer__item--icon'
          />ductam@gmail.com
        </div>
      </div>
      <div className='footer__item'>
        <p className='footer__title'>Mục lục</p>
        <Link href='/blog'>
          <p className='footer__detail'>Blog</p>
        </Link>
        <Link href='/tour'>
          <p className='footer__detail'>Tours</p>
        </Link>
        <Link href='/hotel'>
          <p className='footer__detail'>Khách sạn</p>
        </Link>
        <Link href='/contact'>
          <p className='footer__detail'>Liên hệ</p>
        </Link>
      </div>
      <div className='footer__item'>
        <div className='footer__title'>Khám phá</div>
        <div className='footer__detail'>Điểm đến Đà Nẵng</div>
        <div className='footer__detail'>Ẩm thực Đà Nẵng</div>
        <div className='footer__detail'>Kinh nghiệm Đà Nẵng</div>
        <div className='footer__detail'>Tin tức Đà Nẵng</div>
      </div>
      <div className='footer__item'>
        <div className='footer__title'>Liên kết</div>
        <div className='footer__detail'>
          <Link href='https://www.facebook.com/'>
            <Icon
              icon='logos:facebook'
              color='#09f'
              width='30'
              height='30'
              className='footer__item--icon'
            />
          </Link>
          <Icon
            icon='akar-icons:instagram-fill'
            color='#09f'
            width='30'
            height='30'
            className='footer__item--icon'
          />
          <Icon
            icon='logos:youtube-icon'
            color='#09f'
            width='30'
            height='30'
            className='footer__item--icon'
          />
        </div>
      </div>
    </div>
  )
}
