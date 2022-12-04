import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'

import Layout from '../../../components/backend/layout/layout'
import ImageUploading from 'react-images-uploading'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

const host = process.env.NEXT_PUBLIC_APIAUTH

export default function Edit () {
  const router = useRouter()
  const [status,setStatus] = useState()
  const [user, setUser] = useState()
  const [blog, setBlog] = useState({
    name: '',
    detail: '',
    avatar: '',
    description: ''
  })

  const arr = []

  const getUser = (id) => {
    if (id) {
    axios.get(
      `${host}/api/user/${id}`
    ).then((response) => {
      setUser(response?.data?.user)
    })
      .catch(() => {
        setBlog({
          data: []
        })
      })
    }
  }
  const getBlog = () => {
  if (router?.query?.id) {
    axios.get(`${host}/api/blog/${router?.query?.id}`)
      .then((response) => {
        setBlog(response?.data?.blogs)
        setStatus(response?.data?.blogs?.status)
        getUser(response?.data?.blogs?.idUser)
        if (response?.data?.blogs) {
          throw response
        }
      })
      .catch((error) => {
        toast.error(error)
      })
  }
}

  useEffect(() => {
    getBlog()
  }, [router?.query?.id])

  const editBlog = () => {
    if (arr == '') {
      axios.put(`${host}/api/blog/${router?.query?.id}`, {
        ...blog,
        description: blog?.description,
        status:status
      })
        .then((response) => {
          toast.success(response?.data?.msg || '')
          router.push('/admin/blog')
        })
        .catch((error) => {
          toast.error(error)
        })
    } else {
      axios.put(`${host}/api/blog/${router?.query?.id}`, {
        ...blog,
        description: arr[arr.length - 1],
        status:status
      })
        .then((response) => {
          toast.success(response?.data?.msg || '')
          router.push('/admin/blog')
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

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

  return (
    <Layout>
      <div className='admin__form'>
        <h3>Thêm mới Blog</h3>
        <p>Tên blog</p>
        <input
          placeholder='Tên blog'
          name='name'
          type='text'
          value={blog?.name  || ''}
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
         <p>Trích dẫn</p>
        <input
          placeholder='Trích dẫn'
          name='detail'
          value={blog?.detail  || ''}
          type='text'
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Hình ảnh</p>
        <div className='admin__blog--img'>
          <img src={blog?.avatar  || ''} />
        </div>

        <p>Nội dung</p>
        <div>
          <ReactQuill
            theme='snow' value={blog?.description || ''}
            className='w-[500px] h-[300px] admin__quill'
            modules={modules}
            onChange={(value) => {
              arr.push(value) 
            }}
          />
        </div>
        <p>Ngày đăng</p>
        <input
          placeholder='Ngày đăng'
          name='date'
          value={new Date(blog?.createdAt).toLocaleDateString()  || ''}
          type='text'
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>người đăng</p>
        <input
          name='user'
          placeholder='Người đăng'
          value={user?.name || ''}
          type='text'
          onChange={event => setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Trạng thái</p>
        <div className='admin__blog--status'>
        <select value={status || 'chưa duyệt'} onChange={(e)=>{setStatus(e.target.value)}}>
                <option value="chưa duyệt">Chưa Duyệt</option>
                <option value="đã duyệt">Đã Duyệt</option>
        </select>
        </div>
        <button className='admin__form--submit' onClick={editBlog}>Cập nhật</button>
      </div>
    </Layout>
  )
}
