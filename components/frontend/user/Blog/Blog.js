import React, { useState, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const host = process.env.NEXT_PUBLIC_APIAUTH
import Layout from '../layout/layout'
import { useEffect } from 'react'

export default function Blog() {
  const router = useRouter()
  const FormData = require('form-data')
  const cookies = new Cookies()
  const [user, setUser] = useState()
  const tokenUser = cookies.get('tokenUser')

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image', 'video'],
        ['clean'],
        [{ color: [] }, { background: [] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
      ]

    }
  }), [])

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


  const [blog, setBlog] = useState({
    name: '',
    detail: '',
    avatar: '',
    status: 'chưa duyệt',
    category:'Tin tức'
  })
  const [description, setDescription] = useState('')

  const postBlog = () => {
    axios.post(`${host}/api/blog`, {
      ...blog,
      description: description,
      idUser: user?._id
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/blog')
      })
      .catch((error) => {
        error?.response?.data?.errors.forEach(item => {
          toast.error(item)
        })
      })
  }

  const UploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'trave-img')
    axios.post('https://api.cloudinary.com/v1_1/duwafqtaz/image/upload', data)
      .then((response) => {
        setBlog((prev) => ({ ...prev, avatar: response.data.secure_url }))
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Layout>
      <div className='admin__form'>
        <h3>Thêm mới Bài viết</h3>
        <p>Nhập Tiêu đề</p>
        {console.log(user?._id)}
        <input
          type='text'
          name='name'
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Nhập Trích dẫn</p>
        <input
          type='text'
          name='detail'
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>chọn ảnh</p>
        <input
          type='file' 
          className='blog__input--custom'
          name='address'
          placeholder='Nhập địa chỉ'
          onChange={UploadImage}
        />
         <div className='admin__blog--status'>
         <p>Chọn thể loại</p>
        <select name='category'
         onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}> 
                <option value="Tin tức">Tin tức</option> 
                <option value="Ẩm thực">Ẩm thực</option>
                <option value="Người đà nẵng">Người đà nẵng</option>
                <option value="Điểm đến">Điểm đến</option>
                <option value="Quán cà phê">Quán cà phê</option>
        </select>
        {console.log(blog)}
        </div>
        <p>Nhập Nội dung</p>
        <ReactQuill
          theme='snow' value={description}
          className='w-[500px] h-[300px] admin__quill'
          modules={modules}
          onChange={setDescription}
        />

        <button className='admin__form--submit' onClick={postBlog}>
          Đăng bài
        </button>
      </div>
    </Layout>
  )
}
