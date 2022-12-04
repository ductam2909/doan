import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function layout (props) {
  const router = useRouter()
  const cookies = new Cookies()
  const tokenAdmin = cookies.get('tokenAdmin')
  const logout = () => {
    cookies.remove('tokenAdmin')
    router.push('/admin/login')
  }

  useEffect(() => {
    if (!tokenAdmin) {
      router.push('/admin/login')
    }
  }, [tokenAdmin])


  return (
    <div className='admin'>
      <div className='admin__left'>
        <div className='admin__logo'>
          <Icon icon='simple-icons:yourtraveldottv' color='white' width='30' />
          <h2>Traveldn</h2>
        </div>
        <ul>
          <li className={router.asPath === '/admin' ? 'ssss ' : ''} onClick={() => { router.push('/admin') }}><Icon icon='bxs:doughnut-chart' color='white' width='20' /><Link href='/admin'><p>Trang chủ</p></Link></li>
          <li className={router.asPath === '/admin/tour' ? 'ssss ' : ''} onClick={() => { router.push('/admin/tour') }}><Icon icon='material-symbols:tour-rounded' color='white' width='20' /><Link href='/admin/tour'><p>Tour</p></Link></li>
          <li className={router.asPath === '/admin/tour/new' ? 'ssss ' : ''} onClick={() => { router.push('/admin/tour/new') }}><Icon icon='dashicons:welcome-write-blog' color='white' width='20' /><p>New Tour</p></li>
          <li className={router.asPath === '/admin/blog' ? 'ssss ' : ''} onClick={() => { router.push('/admin/blog') }}><Icon icon='dashicons:welcome-write-blog' color='white' width='20' /><p>Blog</p></li>
          <li className={router.asPath === '/admin/booking' ? 'ssss ' : ''} onClick={() => { router.push('/admin/booking') }}><Icon icon='tabler:brand-booking' color='white' width='20' /><p>Đặt tour</p></li>
          <li className={router.asPath === '/admin/login' ? 'ssss ' : ''} onClick={() => {logout() ;router.push('/admin/login') }}><Icon icon='ri:logout-circle-line' color='white' width='20' /><p>Đăng xuất</p></li>
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
          <h2 className='admin__right--title'>Trang quản lý</h2>
          <div className='admin__process'>
            <div className='admin__process--item'>
              <div className='admin__process--left'>
                <Icon icon='ci:user-plus' color='white' width='40' />
              </div>
              <div className='admin__process--right'>
                <h3>200+</h3>
                <p>Người sử dụng</p>
              </div>
            </div>

            <div className='admin__process--item'>
              <div className='admin__process--left'>
                <Icon icon='bi:cart-check' color='white' width='40' />
              </div>
              <div className='admin__process--right'>
                <h3>200+</h3>
                <p>lượt đặt</p>
              </div>
            </div>
            <div className='admin__process--item'>
              <div className='admin__process--left'>
                <Icon icon='fa6-solid:signs-post' color='white' width='40' />
              </div>
              <div className='admin__process--right'>
                <h3>200+</h3>
                <p>Tour mới</p>
              </div>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}
