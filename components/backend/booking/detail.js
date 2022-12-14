import Layout from '../layout/layout'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import booking from './booking'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function detail() {
  const router = useRouter()
  const [tour, setTour] = useState()
  const [user, setUser] = useState()
  const [booking, setBooking] = useState()
  const [status,setStatus] = useState()
  const Getvalue = (s) => {
    axios.get(`${host}/api/tours/${s?.idTour}`)
      .then((response) => {
        setTour(response?.data?.tours)
        if (response?.data?.bookings) {
          throw response
        }
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const getUser = (s) => {
    axios.get(`${host}/api/user/${s?.idUser}`)
      .then((response) => {
        setUser(response?.data?.user)
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
          // console.log(response.data?.bookings)
          Getvalue(response.data?.bookings)
          getUser(response.data?.bookings)
          setBooking(response?.data?.bookings)
          setStatus(response?.data?.bookings?.status)
          if (response?.data?.bookings) {
            throw response
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }, [router?.query?.id])

  const postvalue = ()=> {
    axios.put(`${host}/api/booking/${router?.query?.id}`, {
      status: status
    })
    .then((response) => {
      toast.success(response?.data?.msg || '')
      router.push('/admin/booking')
    })
    .catch((error) => {
      toast.error(error)
    })
  }
  return (
    <Layout>
      <div className='admin__booking--form'>
        
        <div className='admin__booking--left'>
        <div className='booking--left-img'>
          <img src='https://cdn.tgdd.vn/Files/2018/01/29/1062931/1_1280x720-800-resize.jpg' />
        </div>
          <h2>{tour?.name}</h2>
          <p>Ng??y kh???i h??nh : {booking?.date} </p>
        </div>
        <div className='admin__booking--right'>
          
          <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '25%' }}><h3>Th??ng tin</h3></th>
              <th style={{ width: '75%' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gi?? tour</td>
              <td>{tour?.price}</td>
            </tr>
            <tr>
              <td>h??nh Kh??ch</td>
              <td><p className='child'>Ng?????i l???n : {booking?.adults} {} <span>Tr??? em : {booking?.child}</span></p>  </td>
            </tr>
            <tr>
              <td>Ghi ch??</td>
              <td>{booking?.note}</td>
            </tr>
            <tr>
              <td>Ng?????i ?????t</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td>S??? ??i???n tho???i</td>
              <td>{user?.phone}</td>
            </tr>
            <tr>
              <td>?????a ch???</td>
              <td>{user?.address}</td>
            </tr>
            <tr>
              <td>Tr???ng th??i</td>
              <td>
                <select value={status || 'ch??a duy???t'} onChange={(e)=>{setStatus(e.target.value)}}>
                <option value="Ch??a duy???t">Ch??a Duy???t</option>
                <option value="???? duy???t">???? Duy???t</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>T???ng </td>
              <td>10000 VN??</td>
            </tr>
          </tbody>
        </table>
        <button onClick={()=>{postvalue()}}>C???p nh???t</button>
        </div>
      </div>
    </Layout>
  )
}
