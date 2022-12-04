import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Icon } from '@iconify/react'
const host = process.env.NEXT_PUBLIC_APIAUTH
import axios from 'axios'
import { useRouter } from 'next/router'

export default function BlogByCategory({ category }) {
  const [blog, setBlog] = useState({})
  const router = useRouter()
  const getBlog = () => {
    const arr = []

    axios
      .get(`${host}/api/blog/cat/${router?.query?.id}`)
      .then((response) => {
        response?.data?.blogs.forEach((element) => {
          if (element?.status === 'đã duyệt') {
            arr.push(element)
            setBlog({
              data: arr || [],
            })
          }
        })
      })
      .catch(() => {
        setBlog({
          data: [],
          count: 0,
        })
      })
  }

  const DetailBlog = (id) => {
    router.push(`/blog/${id}`)
  }

  useEffect(() => {
    getBlog()
  }, [])

  const RenderUser = (props) => {
    const [user, setUser] = useState()
    useEffect(() => {
      if (props?.id) {
        axios
          .get(`${host}/api/user/${props?.id}`)
          .then((response) => {
            setUser(response?.data?.user)
          })
          .catch(() => {
            setUser({
              data: [],
            })
          })
      }
    }, [])
    return (
      <p key={props?.id}>
        <span>Người viết : </span>
        {user?.name}
      </p>
    )
  }

  function Items({ currentItems }) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return (
      <>
        {currentItems &&
          currentItems.map((blog) => (
            <div className="blog__items" key={blog?._id}>
              <div className="blog__items--img">
                <img src={blog?.avatar} />
                <div className="blog__items--date">
                  <p>
                    {new Date(blog?.createdAt).toLocaleDateString([], options)}
                  </p>
                </div>
              </div>
              <div className="blog__items--info">
                <h3
                  onClick={() => {
                    DetailBlog(blog?._id)
                  }}
                >
                  {blog?.name}
                </h3>
                <p>{blog?.detail}</p>
                <div className="blog__items--left">
                  <Icon icon="carbon:user-filled" color="#FF9900" width="20" />
                  <RenderUser id={blog?.idUser} />
                </div>
              </div>
            </div>
          ))}
      </>
    )
  }
  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0)
    console.log(blog)
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    const currentItems = blog?.data?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(blog?.data?.length / itemsPerPage)

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % blog?.data?.length
      setItemOffset(newOffset)
    }

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          className="paginate--custom"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </>
    )
  }

  return (
    <div className="product">
      <div className="blog__banner" />
      <div className="product__container">
        <div className="product__left">
          <PaginatedItems itemsPerPage={2} />
        </div>
        <div className="product__right">
          <div className="product__form--search">
            <div className="product__search">
              <input placeholder="tìm kiếm" />
              <div className="product__search--btn">
                <Icon
                  icon="eva:search-fill"
                  color="white"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <div className="product__submit">Search</div>
          </div>
          <div className="product__category">
            <div className="product__category--title">Danh sách tour</div>
            <hr />
            <div className="product__category--item">
              <p>Tour Bà Nà</p>
            </div>
            <div className="product__category--item">
              <p>Tour Bà Nà</p>
            </div>
            <div className="product__category--item">
              <p>Tour Bà Nà</p>
            </div>
            <div className="product__category--item">
              <p>Tour Bà Nà</p>
            </div>
          </div>
          <div className="product__category">
            <div className="product__category--title">bài viết về Đà Nẵng</div>
            <hr />
            <div className="product__blog">
              <img
                src="https://technext.github.io/gotrip/assets/img/post/post_1.png"
                alt="Anh blog"
              />
              <div className="product__blog--info">
                <h5>du lịch đà nẵng có gì vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className="product__blog">
              <img
                src="https://technext.github.io/gotrip/assets/img/post/post_1.png"
                alt="Anh blog"
              />
              <div className="product__blog--info">
                <h5>du lịch đà nẵng có gì vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className="product__blog">
              <img
                src="https://technext.github.io/gotrip/assets/img/post/post_1.png"
                alt="Anh blog"
              />
              <div className="product__blog--info">
                <h5>du lịch đà nẵng có gì vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className="product__blog">
              <img
                src="https://technext.github.io/gotrip/assets/img/post/post_1.png"
                alt="Anh blog"
              />
              <div className="product__blog--info">
                <h5>du lịch đà nẵng có gì vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
          </div>
          <div className="product__category">
            <div className="product__category--title">Quý khách cần hỗ trợ</div>
            <div className="product__support">
              <div className="product__support--call">
                <Icon
                  icon="bx:phone-call"
                  color="white"
                  width="25"
                  height="25"
                />
                <p>Gọi miễn Phí</p>
              </div>
              <div className="product__support--contact">
                <Icon
                  icon="codicon:mail"
                  color="014b85"
                  width="25"
                  height="25"
                />
                <p>Gửi liên hệ</p>
              </div>
            </div>
          </div>
          <div className="product__category">
            <div className="product__category--title">Hình ảnh đẹp</div>
            <hr />
            <div className="product__image">
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
              <div className="product__image--container">
                <img src="https://technext.github.io/gotrip/assets/img/post/post_5.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
