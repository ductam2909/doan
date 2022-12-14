import { Icon } from '@iconify/react'
import React, { useState, useEffect, useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { confirmAlert } from 'react-confirm-alert'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function TourDetail () {
  const router = useRouter()
  const [listComent, setListComment] = useState({})
  const [page, setPage] = useState(0)
  const [user, setUser] = useState({})
  const [account, setAccount] = useState()
  const [countComment, setCountComment] = useState(0)
  const inputRef = useRef(null)
  const [tour, setTour] = useState({
    name: '',
    price: '',
    detail: '',
    avatar: '',
    description: '',
    information: ''
  })

  const [comment, setComment] = useState({
    avatar: '',
    idTour: '',
    idUser: '',
    message: ''
  })

  const getUser = () => {
    axios.get(
      `${host}/api/user/`)
      .then((response) => {
        setUser({
          data: response?.data?.users || []
        })
      })
      .catch(() => {
        setUser({
          data: []
        })
      })
  }

  const getComment = () => {
    axios.get(
      `${host}/api/comments/`
    ).then((response) => {
      setListComment({
        data: response?.data?.comments || []
      })
    })
      .catch(() => {
        setComment({
          data: []
        })
      })
  }

  const cookies = new Cookies()
  const tokenUser = cookies.get('tokenUser')

  const getme = (token) => {
    axios.get(`${host}/api/user/me`, { headers: { Authorization: `${token}` } })
      .then(response => {
        setAccount(response?.data?.user)
        console.log('user', response.data)
        setComment(
          (prev) => ({ ...prev, idUser: response?.data?.user?._id })
        )
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  useEffect(
    () => {
      setComment(
        (prev) => ({ ...prev, idTour: router?.query?.id })
      )
      getme(tokenUser)
      getComment()
      getUser()
      if (router?.query?.id) {
        axios.get(`${host}/api/tours/${router?.query?.id}`)
          .then((res) => {
            setTour({
              ...res?.data?.tours,
              avatar: res?.data?.tours?.avatar.map(url => ({
                original: `${url}`,
                thumbnail: `${url}`
              }))
            })
          })
          .catch((err) => {
            toast.error(err)
          })
      }
    }, [router?.query?.id, page]
  )

  const postComment = () => {
    axios.post(`${host}/api/comments`, {
      ...comment
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const RenderAction = ({ id }) => {
    const [isActive, setIsActive] = useState(false)

    const PostEdit = (event) => { //  setIsActive(false)
      axios.put(`${host}/api/comments/${id}}`, {
        ...comment
      })
        .then((response) => {
          toast.success(response?.data?.msg || '')
        })
        .catch((error) => {
          toast.error(error)
        })
    }

    function handleKeyPress (event) {
      if (event.key === 'Enter') {
        PostEdit()
      }
    }

    const [commentinfo, setCommentInfo] = useState()
    const getCommentinfo = () => {
      return (
        axios.get(
          `${host}/api/comments/${id}`
        ).then((response) => {
          console.log(response)
          setCommentInfo({
            data: response?.data?.comments || []
          })
        })
          .catch(() => {
            setComment({
              data: []
            })
          })
      )
    }

    const handleClick = () => {
      setIsActive(!isActive)
      getCommentinfo()
    }

    const deletecomment = () => {
      confirmAlert({
        title: 'X??a comments',
        message: 'B???n c?? ch???c ch???n mu???n x??a comments n??y kh??ng?',
        buttons: [
          {
            label: 'C??',
            onClick: () => {
              axios.delete(`${host}/api/comments/${id}`)
                .then((response) => {
                  toast.success(response?.data?.msg)
                  getComment()
                  handleClick()
                })
                .catch((error) => {
                  toast.error(error)
                })
            }
          },
          {
            label: 'Kh??ng'
          }
        ]
      })
    }

    return (
      <div className='product__acction' key={id}>
        <p>Tr??? l???i</p>
        <p onClick={deletecomment}>X??a</p>
      </div>
    )
  }

  const RenderInfoUser = (props) => {
    return (
      (user?.data || []).map((user) => {
        if (user._id === props.id) {
          return (
            <div className='product__comment' key={user._id}>
              <img src={user.avatar} />
              <div className='product__comment--info'>
                <h4>{user.name}</h4>
                <p>{props.message}</p>
                {
                  props.id === account?._id && <RenderAction id={props.idcomment} message={props.message} />
                  }
              </div>
            </div>
          )
        }
      }))
  }

  const renderComment = () => {
    return (
      (listComent?.data || []).map((comment) => {
        if (comment.idTour === router?.query?.id) {
          { () => { setCountComment(countComment + 1) } }
          return (
            <RenderInfoUser id={comment.idUser} message={comment.message} idcomment={comment._id} key={comment._id} />
          )
        }
      })
    )
  }

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const confirmLogin = (s) => {
    confirmAlert({
      title: '????ng nh???p',
      message: `????ng nh???p ????? ${s} ?`,
      buttons: [
        {
          label: 'C??',
          onClick: () => {
            router.push('/user/login')
          }
        },
        {
          label: 'Kh??ng'
        }
      ]
    })
  }

  const onAddComment = (event) => {
    if (tokenUser) {
      postComment()
      getComment()
    } else confirmLogin('b??nh lu???n')
  }

  function handleKeyPress (event) {
    if (event.key === 'Enter') {
      inputRef.current.value = ''
      onAddComment()
    }
  }

  const checkBooking = () => {
    if (tokenUser) {
      router.push(`/booking/${router.query?.id}`)
    } else confirmLogin('?????t tour')
  }

  return (
    <div className='product'>
      <div className='product__container'>
        <div className='product__left'>
          <div className='product__info'>
            <div className='product__name'>
              <h3>{tour?.name}</h3>
            </div>
            <div className='product__info--right'>
              <div className='product__price'><p><span>{tour?.price}</span>/ kh??ch</p></div>
              <div className='product__info--booking' onClick={checkBooking}>
                <Icon icon='ant-design:shopping-cart-outlined' color='white' width='25' height='25' />
                <p>?????t ngay</p>
              </div>
            </div>
          </div>
          <div className='product__image'>
            <ImageGallery items={tour.avatar || []} />
          </div>
          <div className='product__content'>
            <h5>Tr??ch d???n</h5>
            <p>{tour?.detail}</p>
            <h5>Th??ng tin tour</h5>
            <div
              className='ql-editor blog__edit'
              dangerouslySetInnerHTML={{ __html: tour?.description }}
            />
            <hr />
            <h5>B??nh lu???n</h5>
            {renderComment()}
            <hr />
            <h5>????? l???i B??nh lu???n</h5>
            <textarea
              ref={inputRef}
              onChange={event => setComment((prev) => ({ ...prev, message: event.target.value }))}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <button>G???i tin nh???n</button>
          </div>
        </div>
        <div className='product__right'>
          <div className='product__form--search'>
            <div className='product__search'>
              <input placeholder='t??m ki???m' />
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
              Danh s??ch tour
            </div>
            <hr />
            <div className='product__category--item'>
              <p>Tour B?? N??</p>
            </div>
            <div className='product__category--item'>
              <p>Tour B?? N??</p>
            </div>
            <div className='product__category--item'>
              <p>Tour B?? N??</p>
            </div>
            <div className='product__category--item'>
              <p>Tour B?? N??</p>
            </div>
          </div>
          <div className='product__category'>
            <div className='product__category--title'>
              b??i vi???t v??? ???? N???ng
            </div>
            <hr />
            <div className='product__blog'>
              <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
              <div className='product__blog--info'>
                <h5>du l???ch ???? n???ng c?? g?? vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className='product__blog'>
              <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
              <div className='product__blog--info'>
                <h5>du l???ch ???? n???ng c?? g?? vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className='product__blog'>
              <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
              <div className='product__blog--info'>
                <h5>du l???ch ???? n???ng c?? g?? vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
            <div className='product__blog'>
              <img src='https://technext.github.io/gotrip/assets/img/post/post_1.png' alt='Anh blog' />
              <div className='product__blog--info'>
                <h5>du l???ch ???? n???ng c?? g?? vui </h5>
                <p>January 12, 2019</p>
              </div>
            </div>
          </div>
          <div className='product__category'>
            <div className='product__category--title'>
              Qu?? kh??ch c???n h??? tr???
            </div>
            <div className='product__support'>
              <div className='product__support--call'>
                <Icon icon='bx:phone-call' color='white' width='25' height='25' />
                <p>G???i mi???n Ph??</p>
              </div>
              <div className='product__support--contact'>
                <Icon icon='codicon:mail' color='014b85' width='25' height='25' />
                <p>G???i li??n h???</p>
              </div>
            </div>
          </div>
          <div className='product__category'>
            <div className='product__category--title'>
              H??nh ???nh ?????p
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
  )
}
