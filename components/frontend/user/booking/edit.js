import Layout from '../layout/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function editbooking() {
  const router = useRouter()
  const curr = new Date()
  curr.setDate(curr.getDate())
  const date = curr.toISOString().substring(0, 10)
  const [startDate, setStartDate] = useState(date)
  const [booking, setBooking] = useState()
  const [adults, setAdults] = useState()
  const [child, setChild] = useState()
  const [tour, setTour] = useState()
  const [note, setNote] = useState()

  const Getvalue = (s)=> {
    setAdults(parseInt(s?.adults))
    setChild(parseInt(s?.child))
    setNote(s?.note)
    setStartDate(s?.date)
    axios.get(`${host}/api/tours/${s?.idTour}`)
    .then((response) => {
      setTour(response?.data?.tours)
      console.log(response)
      if (response?.data?.bookings) {
        throw response
      }
    })
    .catch((error) => {
      toast.error(error)
    })
  }

  const Update = () => {
    
    axios.put(`${host}/api/booking/${booking?._id}`, {
      adults:adults,
      child:child,
      date:startDate,
      note:note,
    }).then((response) => {
      toast.success(response?.data?.msg || '')
      router.push('/user/booking')
      if (response?.data?.bookings) {
        throw response
      }
    })
    .catch((error) => {
      toast.error(error)
    })
  }
  useEffect(() => {
    if (router?.query?.id) {
      axios.get(`${host}/api/booking/${router?.query?.id}`)
        .then((response) => {
          // getTour(response?.data?.bookings?.idTour)
          Getvalue(response.data?.bookings)
          setBooking(response?.data?.bookings)
          if (response?.data?.bookings) {
            throw response
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }, [router?.query?.id])

  return (
    <Layout>
      <div className='booking__detail'>
        <h3>Chi tiết</h3>
        <p>Tên tour</p>
        <div className='booking__detail--info'>
          <p>{tour?.name}</p>
        </div>
        <p>Giá</p>
        <div className='booking__detail--info'>
          <p>{tour?.price}</p>
        </div>
        <p>Hành khách</p>
        <div className='booking__detail--info2'>
          <div className='booking__detail--item'>
            <p>Người lớn</p>
            <div className='booking__detail--acction'>
              <Icon icon="ic:outline-remove-circle-outline" color="red" width="25" 
                onClick={() => { if (adults > 1) setAdults(adults - 1) }}
               />
              <h4>{adults}</h4>
              <Icon icon="material-symbols:add-circle-outline-rounded" color="#3c3" width="25"
              onClick={() => { setAdults(adults + 1) }}
              />
            </div>
          </div>
          <div className='booking__detail--item'>
            <p>Trẻ em</p>
            <div className='booking__detail--acction'>
              <Icon icon="ic:outline-remove-circle-outline" color="red" width="25" 
                onClick={() => { if (child > 0) setChild(child - 1) }}/>
              <h4>{child}</h4>
              <Icon icon="material-symbols:add-circle-outline-rounded" color="#3c3" width="25" 
               onClick={() => { setChild(child + 1) }}
              />
            </div>
          </div>
        </div>
        <p >Ngày khởi hành</p>
          <input
            type='date'
            name='dateRequired'
            value={startDate}
            onChange={(date) => { setStartDate(date.target.value) }}
            className='booking__input--date'
          />
        <p>Ghi chú</p>
        <textarea value={note} className='booking__detail--note' onChange={e => setNote(e.target.value)}></textarea>
        <button onClick={Update}>Cập nhật</button>
      </div>
      {/* </div> */}
    </Layout>
  )
}
