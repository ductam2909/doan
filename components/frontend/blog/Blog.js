import React, { useEffect, useState } from 'react'
const host = process.env.NEXT_PUBLIC_APIAUTH
import axios from 'axios'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'

export default function test() {
  const [listCats, setListCats] = useState([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const getCats = () => {
    setLoading(true)
    axios
      .get(`${host}/api/blog/cat1`)
      .then((response) => {
        setListCats(response?.data?.cates)
      })
      .catch(() => {
        setListCats([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const DetailBlog = (id) => {
    router.push(`/blog/${id}`)
  }

  useEffect(() => {
    getCats()
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
          currentItems.map((blog, index) => {
            {
              if (index > 3) return null;
            }
            return (
              <div className='new__content--item' key={blog?._id}>
                <img src={blog?.avatar} />
                <div className='new__content--text'
                  onClick={() => {
                    DetailBlog(blog?._id)
                  }}>
                  <p>{new Date(blog?.createdAt).toLocaleDateString([], options)}</p>
                  <p>{blog?.name}</p>
                </div>
              </div>
            )
          }
          )}
      </>
    )
  }
  const showBlogsByCate = () => {
    if (listCats !== []) {
      console.log(listCats);
      return listCats.map((cat) => {
        const currentItems = cat.blogs[0];
        console.log(currentItems);
        return (
          <div className='new__content' key={cat?._id}>
            <div className='new__content--title'>
            {loading && <ReactLoading type='bars' color='#04AA6D' className='loading' />}
              <hr />
              <p>{cat._id} Đà Nẵng</p>
              <hr />
            </div>
            <div className='new__container'>
              <Items currentItems={cat.blogs} />
            </div>
            <div >
              <a
                className="xemthem"
                onClick={() => {
                  router.push(`/blogByCategory/${cat._id}`)
                }}
                title=""
              >
                <i className="vc_btn3-icon fa fa-adjust"></i> Xem thêm  <i style={{ color: 'black' }}>{cat._id}</i>
              </a>
            </div>

          </div>
        )

      })
    }
  }

  return (
      <div className='new'>
        <div className='new__title'>
          <h2 >Blog du lịch đà Nẵng</h2>
          <p>Trang tin tổng hợp và giới thiệu những điểm đến du lịch Đà Nẵng, món ăn ngon, khách sạn đẹp, dịch vụ du lịch, ẩm thực, ăn ở đâu, ngủ ở đâu, chơi ở đâu khi đi du lịch Đà Nẵng…</p>
        </div>
        
        {
          showBlogsByCate()
        }
         
      </div>
  )
}
