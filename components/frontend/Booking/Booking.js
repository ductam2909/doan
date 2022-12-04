import { Icon } from '@iconify/react'
import React, { useState, useRef, useEffect } from 'react'

import Cookies from 'universal-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function Booking () {
  const router = useRouter()
  const curr = new Date()
  curr.setDate(curr.getDate())
  const date = curr.toISOString().substring(0, 10)
  const [startDate, setStartDate] = useState(date)
  const [account, setAccount] = useState()
  const [tour, setTour] = useState()
  const [adults, setAdults] = useState(1)
  const [child, setChild] = useState(0)

  const postBooking = (notes) => {
    axios.post(`${host}/api/booking`, {
      idTour: `${router?.query?.id}`,
      idUser: account._id,
      date: startDate,
      adults: adults,
      child: child,
      note: notes,
      status: 'chưa duyệt'
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/user/booking')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const cookies = new Cookies()
  const tokenUser = cookies.get('tokenUser')

  const getme = (token) => {
    axios.get(`${host}/api/user/me`, { headers: { Authorization: `${token}` } })
      .then(response => {
        setAccount(response?.data?.user)
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  useEffect(
    () => {
      getme(tokenUser)
      if (router?.query?.id) {
        axios.get(`${host}/api/tours/${router?.query?.id}`)
          .then((res) => {
            setTour(res?.data?.tours)
          })
          .catch((err) => {
            toast.error(err)
          })
      }
    }, []
  )
  const RenderForm1 = () => {
    return (
      <div className='booking__form'>
        <div className='booking__title'>
          <h4>Thông tin tài khoản</h4>
        </div>
        <div className='booking__info'>
          <div className='booking__info--item'>
            <div className='booking__info--input'>
              <Icon icon='carbon:user-filled' color='#38a90e' width='20' className='booking__info--icon' />
              <input placeholder='tên tài khoản' defaultValue={account?.name} type='text' />
            </div>
            <div className='booking__info--input'>
              <Icon icon='ant-design:mail-twotone' color='#38a90e' width='20' className='booking__info--icon' />
              <input placeholder='Email' defaultValue={account?.email} />
            </div>
          </div>
        </div>
        <div className='booking__info'>
          <div className='booking__info--item'>
            <div className='booking__info--input'>
              <Icon icon='fa-regular:address-card' color='#38a90e' width='20' className='booking__info--icon' />
              <input placeholder='Địa chỉ' defaultValue={account?.address} />
            </div>
            <div className='booking__info--input'>
              <Icon icon='bxs:phone-call' color='#38a90e' width='20' className='booking__info--icon' />
              <input placeholder='Số điện thoại' defaultValue={account?.phone} />
            </div>
          </div>
        </div>
        <div className='booking__btn form1__btn'>
          <button onClick={() => { setNumber2(number2 + 33), setNumber(number + 1) }}>Tiếp</button>
        </div>
      </div>
    )
  }

  const RenderForm2 = () => {
    const total = parseInt(tour?.price) * (parseInt(adults) + 0.5 * parseInt(child))
    return (
      <div className='booking__form'>
        <div className='booking__title'>
          <h4>Thông tin tour</h4>
        </div>
        <div className='booking__info'>
          <div className='booking__info--item'>
            <p className='booking__info--name'>{tour?.name}</p>
            {/* <p className='booking__info--price'>{tour?.price}</p> */}
          </div>
          <p className='booking__info--title'>Giá</p>
          <p>Người lớn : <span style={{color: 'red', paddingRight: 20,}}>{tour?.price} VNĐ</span> Trẻ em : <span style={{color: 'red'}}>{parseInt(tour?.price)/2} VNĐ</span></p>
          <p className='booking__info--title'>Hành khách</p>
          <div className='passenger'>
            <div className='passenger__type'>
              <p>Người lớn</p>
              <div className='passenger__acction'>
                <Icon
                  icon='dashicons:remove'
                  color='#38a90e' width='25'
                  onClick={() => { if (adults > 1) setAdults(adults - 1) }}
                />
                <p>{adults}</p>
                <Icon
                  icon='carbon:add-alt'
                  color='#38a90e' width='25'
                  onClick={() => { setAdults(adults + 1) }}
                />
              </div>
            </div>
            <div className='passenger__type'>
              <p>Trẻ con</p>
              <div className='passenger__acction'>
                <Icon
                  icon='dashicons:remove'
                  color='#38a90e' width='25'
                  onClick={() => { setChild(child - 1) }}
                />
                <p>{child}</p>
                <Icon
                  icon='carbon:add-alt'
                  color='#38a90e' width='25'
                  onClick={() => { setChild(child + 1) }}
                />
              </div>
            </div>
          </div>
          <p className='booking__info--title'>Ngày khởi hành</p>
          <input
            type='date'
            name='dateRequired'
            value={startDate}
            onChange={(date) => { setStartDate(date.target.value) }}
            className='booking__input--date'
          />
          {console.log(startDate)}
          <div className='booking__info--item'>
            <p />
            <p className='booking__info--price'><span>Tổng : </span>{total} VNĐ</p>
          </div>
        </div>

        <div className='booking__btn form2__btn'>
          <button onClick={() => { setNumber2(number2 - 33); setNumber(number - 1) }}>Quay lại</button>
          <button onClick={() => { setNumber2(number2 + 33); setNumber(number + 1) }}>Tiếp</button>
        </div>
      </div>
    )
  }

  const RenderForm3 = () => {
    const [note, setNote] = useState('')
    return (
      <div className='booking__form'>
        <div className='booking__title'>
          <h4>Thông tin tour</h4>
        </div>
        <div className='booking__info'>
          <p className='booking__info--title'>Ghi chú *</p>
          <textarea
            className='booking__info--note'
            value={note}
            onChange={e => setNote(e.target.value)}
            type='text'
          />
        </div>

        <div className='booking__btn form2__btn'>
          <button onClick={() => { setNumber2(number2 - 33); setNumber(number - 1) }}>Quay lại</button>
          <button onClick={() => { setNumber2(number2 + 33); postBooking(note) }}>Đặt tour</button>
        </div>
      </div>
    )
  }
  const [number, setNumber] = useState(0)
  const [number2, setNumber2] = useState(1)
  const check = () => {
    if (number == 0) return <RenderForm1 />
    else if (number == 1) return <RenderForm2 />
    else return <RenderForm3 />
  }

  return (
    <div className='booking__container'>
      <h2>Đặt tour</h2>
      <div className='booking__process'>
        <div className='booking__process--content' style={{ width: `${number2}%` }} />
      </div>
      <div className='booking__content'>
        {check()}
      </div>
    </div>
  )
}
