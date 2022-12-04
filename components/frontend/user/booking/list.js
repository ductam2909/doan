import Layout from '../layout/layout'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { useRouter } from 'next/router'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function list() {
  const cookies = new Cookies()
  const tokenUser = cookies.get('tokenUser')
  const [user, setUser] = useState()
  const [booking, setBooking] = useState()
  const router = useRouter()

  const getme = (token) => {
    axios.get(`${host}/api/user/me`, { headers: { Authorization: `${token}` } })
      .then(response => {
        setUser(response?.data?.user || '')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const getBooking = () => {
    axios.get(`${host}/api/booking`)
      .then((res) => {
        setBooking({
          data: res?.data?.bookings || []
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  useEffect(
    () => {
      getme(tokenUser)
      if (!tokenUser) {
        router.push('user/login')
      }
      getBooking()
      // GetTour()
    }, []
  )

  const [hide, setHide] = useState(false)

  const RenderInfo = (props) => {
    const [tours, setTours] = useState()
    const total = parseInt(tours?.price) * (parseInt(props.adults) + 0.5 * parseInt(props.child))

    useEffect(
      () => {
        axios.get(`${host}/api/tours/${props.ids}`)
          .then((res) => {
            setTours(res?.data?.tours)
          })
          .catch((err) => {
            toast.error(err)
          })
      }, []
    )
    return (
      <div className='cart' key={tours?._id}>
        <div className='cart__container'>
          <img src={tours?.avatar[0]} />
          <div className='cart__info'>
          <div className='cart__info--item'>
            <h3>{tours?.name}</h3>
            <p className='cart__status'>{props?.status}</p>
            </div>
            <div className='cart__info--item1'>
              <p>Người lớn X {props?.adults}</p>
              <p>Trẻ em X {props?.child}</p>
            </div>
            <div className='cart__info--item'>
              <p>{props?.date}</p>
              <p>Giá : <span>{tours?.price}</span>/1 người</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='cart__acction'>
          <div className='cart__acction--btn'>
            <button onClick={() => { router.push(`/user/booking/${props.idbooking}`) }}>Chi tiết</button>
            <button onClick={() => {
              confirmAlert({
                title: 'Xóa tour',
                message: 'Bạn có chắc chắn muốn xóa tour đã đặt không?',
                buttons: [
                  {
                    label: 'Có',
                    onClick: () => {
                      axios.delete(`${host}/api/booking/${props?.idbooking}`)
                        .then((response) => {
                          toast.success(response?.data?.msg)
                          getBooking()
                          // handleClick()
                        })
                        .catch((error) => {
                          toast.error(error)
                        })
                    }
                  },
                  {
                    label: 'Không'
                  }
                ]
              })
            }}
            >Xóa tour
            </button>
          </div>
          <p>Tổng tiền : <span>{total}K</span></p>
        </div>
      </div>
    )
  }

  const a =[]
  const RenderNone = () => {
    if (a.length === 0) {
      return (
        <div className='cart__empty'>
          <div className='cart__empty--img'>
            <img src='https://www.xanh.farm/assets/images/no-cart.png' />
          </div>
          <h3>Bạn chưa đặt Tour Nào cả !!</h3>
        </div>
      )
    }
  }

  const RenderBooking = () => {
    return (
      (booking?.data || []).map((booking) => {
        if (booking?.idUser === user?._id) {
          a.push(1)
          return (
            <RenderInfo
              ids={booking.idTour}
              key={booking?._id}
              adults={booking?.adults}
              child={booking?.child}
              idbooking={booking?._id}
              date={booking?.date}
              status={booking?.status}
            />
          )
        }
      })
    )
  }

  return (
    <Layout>
      <div className='booking__list'>
        <RenderBooking />
        <RenderNone />
      </div>
    </Layout>
  )
}
