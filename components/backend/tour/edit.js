import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'

import Layout from '../layout/layout'
import ImageUploading from 'react-images-uploading'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

const host = process.env.NEXT_PUBLIC_APIAUTH

export default function Edit () {
  const [images, setImages] = useState([])
  const [imageupdate, SetImageupdate] = useState([])
  const maxNumber = 69
  const [descriptions, setDescriptions] = useState('')
  const router = useRouter()
  const [tour, setTour] = useState({
    name: '',
    price: '',
    detail: '',
    time:'',
    address:''
  })

  const arr = []

  useEffect(() => {
    if (router?.query?.id) {
      axios.get(`${host}/api/tours/${router?.query?.id}`)
        .then((response) => {
          setTour(response?.data?.tours)
          setImages(response?.data?.tours?.avatar)
          SetImageupdate(response?.data?.tours?.avatar)
          if (response?.data?.tours) {
            throw response
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }, [router?.query?.id])

  const editTour = () => {
    if (arr == '') {
      axios.put(`${host}/api/tours/${router?.query?.id}`, {
        ...tour,
        avatar: imageupdate || [],
        description: tour?.description
      })
        .then((response) => {
          toast.success(response?.data?.msg || '')
          router.push('/admin/tour')
        })
        .catch((error) => {
          toast.error(error)
        })
    } else {
      axios.put(`${host}/api/tours/${router?.query?.id}`, {
        ...tour,
        avatar: imageupdate || [],
        description: arr[arr.length - 1]
      })
        .then((response) => {
          toast.success(response?.data?.msg || '')
          router.push('/admin/tour')
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }
  
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
    const names = imageList.map(function (item) {
      if (typeof (item) === 'object') {
        return item.data_url
      } else return item
    })
    SetImageupdate(names)
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

  const RenderImage = (props) => {
    if (typeof (props.img) === 'string') {
      return <img src={props.img} alt='' width='90' height='80' />
    } else return <img src={props.img.data_url} alt='' width='90' height='80' />
  }

  return (
    <Layout>
      <div className='admin__form'>
        <h3>Th??m m???i Tour</h3>
        <p>T??n tour</p>
        <input
          placeholder='Nh???p t??n tour'
          name='name'
          type='text'
          value={tour?.name}
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Gi?? Tour</p>
        <input
          placeholder='Nh???p gi?? tour'
          name='price'
          value={tour?.price}
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Th???i gian</p>
        <input
          placeholder='Nh???p th???i gian'
          name='time'
          value={tour?.time}
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
         <p>?????a ??i???m</p>
        <input
          placeholder='Nh???p ?????a ??i???m'
          name='address'
          value={tour?.address}
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>Tr??ch d???n</p>
        <input
          name='detail'
          placeholder='Nh???p tr??ch d???n'
          value={tour?.detail}
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p>H??nh ???nh</p>
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
                {images.map((image, index) => (
                  <div key={index} className='admin__addimg--item'>
                    <RenderImage img={image} />
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
                  Th??m m???i
                </div>
                &nbsp;
                <div className='admin__addimg--btn br-red' onClick={onImageRemoveAll}>X??a t???t c???</div>
              </div>
            </div>
          )}
        </ImageUploading>
        <p>N???i dung</p>
        <div>
          <ReactQuill
            theme='snow' value={tour?.description}
            className='w-[500px] h-[300px] admin__quill'
            modules={modules}
            onChange={(value) => {
              arr.push(value)
            }}
          />
        </div>
        <button className='admin__form--submit' onClick={editTour}>C???p nh???t</button>
      </div>
    </Layout>
  )
}
