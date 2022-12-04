import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'

export default function header () {
  const router = useRouter()
  const [display, setDisplay] = useState(false)
  const handleClick = event => {
    setDisplay(current => !current)
  }

  const cookies = new Cookies()
  const token = cookies.get('tokenUser')

  const cook = new Cookies()
  const [session, setSession] = useState()

  useEffect(() => {
    setSession(cook.get('tokenUser'))
  }, [])

  const RenderMenu = () => {
    if (!session) {
      return (
        <li>
          <p onClick={() => { router.push('/user/login') }}>Đăng nhập</p>
        </li>
      )
    } else {
      return (
        <li>
          <p onClick={() => { router.push('/user') }}>Tài khoản</p>
        </li>
      )
    }
  }

  return (
    <div>
      <div className='header'>
        <div className='header__logo'>
          <img src='/assets/img/logo.jpg' />
        </div>
        <div className='header__container'>
          <div className={display ? '' : 'hide__header'}>
            <ul>
              <li>
                <Link href='/'>
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li>
                <Link href='/tour'>
                  <p>Tour</p>
                </Link>
              </li>
              <li>
                <Link href='/blog'>
                  <p>Blog</p>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <p>Liên hệ</p>
                </Link>
              </li>
              <RenderMenu />
              {/* <li>
              <RenderMenu />
            </li> */}
              {/* <RenderMenu /> */}
              {/* <Greeting isLoggedIn ={false} /> */}
            </ul>

          </div>
        </div>
        <div className='show-togle'>
          <Icon
            icon='ant-design:menu-outlined'
            color='#264247' width='40'
            onClick={handleClick}
            height='40' className='toggle'
          />
        </div>
      </div>
    </div>
  )
}
