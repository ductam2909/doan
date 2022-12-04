import React ,{ useState } from 'react'
import Layout from './layout/layout'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
const host = process.env.NEXT_PUBLIC_APIAUTH
import { toast } from 'react-toastify'

export default function Account() {
  const FormData = require('form-data')
  const cookies = new Cookies()
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone:'',
    avatar:''
  })
  const tokenUser = cookies.get('tokenUser')

  const getme = (token) => {
    axios.get(`${host}/api/user/me`, { headers: { Authorization: `${token}` } })
      .then(response => {
        setUser(response?.data?.user || '')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  useEffect(
    ()=> {
      getme(tokenUser)
    },[]
  )

  const postUser = () => {
    axios.put(`${host}/api/user/${user?._id}`, {
     ...user
    }).then((response) => {
      toast.success(response?.data?.msg || '')

    })
    .catch((error) => {
      toast.error(error)
    })
  }

  const UploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'trave-img')
    axios.post('https://api.cloudinary.com/v1_1/duwafqtaz/image/upload', data)
      .then((response) => {
        setUser((prev) => ({ ...prev, avatar: response.data.secure_url }))
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Layout>
      <div className='user'>
        <div className='user__info'>
          <h3>Hồ sơ của tôi</h3>
          <p>Quản lý thông tin hồ sơ</p>
        </div>
        <div className='user__content'>
          <div className='user__content--left'>
            <p>Tên tài khoản</p>
            <input
              value={user?.name}
              name='name'
              placeholder='Tên tài khoản'
              type='text'
              onChange={event => setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            ></input>
            <p>Email </p>
            <input
              placeholder='Eamail'
              value={user?.email}
              name='email'
              type='text'
              onChange={event => setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            ></input>
            <p>Số điện thoại </p>
            <input
              value={user?.phone}
              name='phone'
              placeholder='Số điện thoại'
              type='text'
              onChange={event => setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            ></input>
            <p>Địa chỉ </p>
            <input
            value={user?.address}
              name='address'
              placeholder='địa chỉ'
              type='text'
              onChange={event => setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            ></input>
            <div><button className='admin__form--submit' onClick={postUser}>Lưu Thông tin</button></div>
          </div>
          <div className='user__content--right'>
            <div>
              <div className='user__avatar'>
                <img src={user?.avatar} />
              </div>
              <div className='user__content--submit'>
                <input type="file" id="files" name="uploadfile" onChange={UploadImage}/>
                <label htmlFor="files">Chọn ảnh</label>
              </div>
              {/* <p>Định dạng:.JPEG, .PNG</p> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
