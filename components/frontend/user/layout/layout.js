import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function layout (props) {
  const router = useRouter()
  const cookies = new Cookies()
  const tokenUser = cookies.get('tokenUser')
  const logout = () => {
    cookies.remove('tokenUser')
    router.push('/user/login')
  }

  useEffect(() => {
    if (!tokenUser) {
      router.push('/user/login')
    }
  }, [tokenUser])

  return (
    <div className='admin'>
      <div className='admin__left'>
        <div className='admin__logo'>
          <Icon icon='simple-icons:yourtraveldottv' color='white' width='30' />
          <h2>Traveldn</h2>
        </div>
        <ul>
          <li className={router.asPath == '/user' ? 'ssss ' : ''} onClick={() => { router.push('/user') }}><Icon icon='bxs:doughnut-chartic:baseline-switch-account' color='white' width='20' /><Link href='/admin'><p>Tài khoản</p></Link></li>
          <li className={router.asPath == '/user/booking' ? 'ssss ' : ''} onClick={() => { router.push('/user/booking') }}><Icon icon='material-symbols:tour-rounded' color='white' width='20' /><Link href='/admin/tour'><p>Booking</p></Link></li>
          <li className={router.asPath == '/user/blog' ? 'ssss ' : ''} onClick={() => { router.push('/user/blog') }}><Icon icon='dashicons:welcome-write-blog' color='white' width='20' /><p>Blog</p></li>
          <li  className={router.asPath == '/tour' ? 'ssss ' : ''} onClick={() => { router.push('/tour') }}><Icon icon='tabler:brand-booking' color='white' width='20' /><p>Đặt tour</p></li>
          <li className={router.asPath == '/' ? 'ssss ' : ''} onClick={() => { router.push('/') }}><Icon icon='bxs:doughnut-chart' color='white' width='20' /><p>Trang chủ</p></li>
          <li className={router.asPath === '/user/login' ? 'ssss ' : ''} onClick={() => {logout() ;router.push('/user/login') }}><Icon icon='ri:logout-circle-line' color='white' width='20' /><p>Đăng xuất</p></li>
        </ul>
      </div>
      <div className='admin__right'>
        <div className='admin__header'>
          <div className='admin__header--search'>
            <Icon icon='eva:search-fill' color='#666' width='25' className='admin__header--icon' />
            <input placeholder='Tìm kiếm ..' />
          </div>
          <div className='admin__account'>
            <Icon icon='ci:notification-outline' color='#333' width='30' />
          </div>
        </div>
        <div className='admin__content'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
