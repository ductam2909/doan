import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

export default function Login () {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const cookies = new Cookies()
  const host = process.env.NEXT_PUBLIC_APIAUTH
  const router = useRouter()
  const postapi = (e) => {
    axios.post(`${host}/api/auth`, {
      email: email,
      password: password
    })
      .then((response) => {
        getme(response.data.token)
        cookies.set('tokenAdmin', response.data.token, { path: '/' })
      }).catch((error) => {
        toast.error(error.response.data.msg)
      })
  }
  const getme = (token) => {
    axios.get(`${host}/api/auth/me`, { headers: { Authorization: `${token}` } })
      .then(response => {
        toast.success('Login thành công')
        router.push('/admin')
      })
      .catch((error) => {
        toast.error(error)
      })
  }
  return (
    <div className='registration__container'>
      <div className='registration__heading'><h2>Đăng Nhập</h2></div>
      <div className='registration__form'>
        <div className='form__info'>
          <input type='text' placeholder='Nhập tên tài khoản' name='username' className='form__input' onChange={event => setEmail(event.target.value)} />
          <input type='password' placeholder='Nhập mật khẩu' name='password' autoComplete='on' className='form__input' onChange={event => setPassword(event.target.value)} />
          <div className='form__submit'>
            <button
              className='registration__btn'
              onClick={postapi}
            >Đăng Nhập
            </button>
          </div>
          <div className='login__feature'>
            <p className=''>Chưa có tài khoản ?
              <span className='login__link' onClick={() => { router.push('/user/registration') }}> Đăng kí</span>
            </p>
            <p className='password--reset'>Quên mật khẩu</p>
          </div>
        </div>
      </div>
    </div>
  )
}
