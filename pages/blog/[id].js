import React, { useState, useEffect } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Header from '../../components/Frontend/header/Header'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH
import Footer from '../../components/Frontend/footer/Footer'

export default function Blog() {
  const [blog, setBlog] = useState({})
  const router = useRouter()
  const [user, setUser] = useState()

  const getUser = (id) => {
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

  const getBlog = () => {
    axios.get(
      `${host}/api/blog/${router?.query?.id}`
    ).then((response) => {
      setBlog({
        data: response?.data?.blogs || []
      });
      getUser(response?.data?.blogs?.idUser)
    })
      .catch(() => {
        setBlog({
          data: []
        })
      })
  }

  useEffect(
    () => {
      getBlog()
    }, [router?.query?.id]
  )

  return (
    <>
      <Header />
      <div className='product'>
        <div className='blog__banner' />
        <div className='product__container'>
          <div className='product__left'>
            <div className='blog__detail'>
              <img src={blog?.data?.avatar} className='blog__detail--avatar' />
              <div className='blog__detail--info'>
                <h2>{blog?.data?.name}</h2>
                <div className='blog__item'>
                  <div className='blog__item--left'>
                    <Icon icon='carbon:user-filled' color='#FF9900' width='20' />
                    <p><span>Người viết : </span> {user?.name || ''}</p>
                  </div>
                  <div className='blog__item--left'>
                    <Icon icon='bi:calendar-event' color='#FF9900' width='20' />
                    <p><span>Ngày viết : </span> {new Date(blog?.data?.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p>{blog?.data?.detail}</p>
              </div>
            </div>

            <div
              className='ql-editor blog__edit'
              dangerouslySetInnerHTML={{ __html: blog?.data?.description }}
            />
            {/* <hr />
            <div className='product__content'>
              <h5>Bình luận</h5>
              <div className='product__comment'>
                <img src='https://znews-photo.zingcdn.me/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg' />
                <div className='product__comment--info'>
                  <p>hshshshshs</p>
                </div>
              </div>
              <textarea
                ref={inputRef}
                onChange={event => setComment((prev) => ({ ...prev, message: event.target.value }))}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <button onClick={postComment}>Gửi tin nhắn</button>
            </div> */}
          </div>
          <div className='product__right'>
            <div className='product__form--search'>
              <div className='product__search'>
                <input placeholder='tìm kiếm' />
                <div className='product__search--btn'>
                  <Icon icon='eva:search-fill' color='white' width='20' height='20' />
                </div>
              </div>
              <div className='product__submit'>
                Search
              </div>
            </div>
            <div className='product__category'>
              <div className='product__category--title'>
                Danh sách tour
              </div>
              <hr />
              <div className='product__category--item'>
                <p>Tour Bà Nà</p>
              </div>
              <div className='product__category--item'>
                <p>Tour Bà Nà</p>
              </div>
              <div className='product__category--item'>
                <p>Tour Bà Nà</p>
              </div>
              <div className='product__category--item'>
                <p>Tour Bà Nà</p>
              </div>
            </div>
            <div className='product__category'>
              <div className='product__category--title'>
                bài viết về Đà Nẵng
              </div>
              <hr />
              <div className='product__blog'>
                <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
                <div className='product__blog--info'>
                  <h5>du lịch đà nẵng có gì vui </h5>
                  <p>January 12, 2019</p>
                </div>
              </div>
              <div className='product__blog'>
                <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
                <div className='product__blog--info'>
                  <h5>du lịch đà nẵng có gì vui </h5>
                  <p>January 12, 2019</p>
                </div>
              </div>
              <div className='product__blog'>
                <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
                <div className='product__blog--info'>
                  <h5>du lịch đà nẵng có gì vui </h5>
                  <p>January 12, 2019</p>
                </div>
              </div>
              <div className='product__blog'>
                <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
                <div className='product__blog--info'>
                  <h5>du lịch đà nẵng có gì vui </h5>
                  <p>January 12, 2019</p>
                </div>
              </div>
            </div>
            <div className='product__category'>
              <div className='product__category--title'>
                Quý khách cần hỗ trợ
              </div>
              <div className='product__support'>
                <div className='product__support--call'>
                  <Icon icon='bx:phone-call' color='white' width='25' height='25' />
                  <p>Gọi miễn Phí</p>
                </div>
                <div className='product__support--contact'>
                  <Icon icon='codicon:mail' color='014b85' width='25' height='25' />
                  <p>Gửi liên hệ</p>
                </div>
              </div>
            </div>
            <div className='product__category'>
              <div className='product__category--title'>
                Hình ảnh đẹp
              </div>
              <hr />
              <div className='product__image'>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
                <div className='product__image--container'>
                  <img src='https://technext.github.io/gotrip/assets/img/post/post_5.png' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
