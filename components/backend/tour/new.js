import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'

import Layout from '../layout/layout'
import ImageUploading from 'react-images-uploading'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function New () {
  const [images, setImages] = useState([])
  const [image, SetImage] = useState([])
  const maxNumber = 69
  const [description, setDescription] = useState('')
  const router = useRouter()
  const imagef = []
  const [tour, setTour] = useState({
    name: '',
    price: '',
    detail: '',
    time: '',
    address: ''
  })

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
    const names = imageList.map(function (item) {
      return item.data_url
    })
    SetImage(names)
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

  const postTour = () => {
    // setLoading(true)
    axios.post(`${host}/api/tours`, {
      ...tour,
      avatar: image || [],
      description: description
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/admin/tour')
      })
      .catch((error) => {
        error?.response?.data?.errors?.forEach(item => {
          toast.error(item)
        })
      })
      .finally(() => {
        // setLoading(false)
      })
  }

  return (
    <Layout>
      <div className='admin__form'>
        <h3>Thêm mới Tour</h3>
        <p>Tên tour</p>
        <input
          placeholder='Nhập tên tour'
          name='name'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Giá Tour</p>
        <input
          placeholder='Nhập giá tour'
          name='price'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
         <p>Thời gian</p>
        <input
          placeholder='Nhập thời gian'
          name='time'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
         <p>Địa điểm</p>
        <input
          placeholder='Nhập địa điểm'
          name='address'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Trích dẫn</p>
        <input
          name='detail'
          placeholder='Nhập trích dẫn'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Hình ảnh</p>

        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey='data_url'
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            <div>

              <div className='admin__addimg--content'>
                {imageList.map((image, index) => (
                  <div key={index} className='admin__addimg--item'>
                    <img src={image.data_url} alt='' width='90' height='80' />
                    <div className='admin__addimg--acction'>
                      <Icon icon='ant-design:edit-filled' color='#3c3' width='20' onClick={() => onImageUpdate(index)} />
                      <Icon icon='line-md:remove' color='red' width='20' onClick={() => onImageRemove(index)} />
                    </div>
                  </div>
                ))}
              </div>
              <div className='admin__addimg'>
                <div
                  className='admin__addimg--btn'
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Thêm mới
                </div>
                &nbsp;
                <div className='admin__addimg--btn br-red' onClick={onImageRemoveAll}>Xóa tất cả</div>
              </div>
            </div>
          )}
        </ImageUploading>
        <p>Nội dung</p>
        <div>
          <ReactQuill
            theme='snow' value={description}
            className='w-[500px] h-[300px] admin__quill'
            modules={modules}
            onChange={setDescription}
          />
        </div>
        <button className='admin__form--submit' onClick={postTour}>Thêm</button>
      </div>
    </Layout>
  )
}
