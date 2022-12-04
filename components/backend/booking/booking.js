import { Icon } from '@iconify/react'
import React, { useState, useEffect } from 'react'
import Layout from '../layout/layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH
const limit = 10

export default function booking () {
  const router = useRouter()
  const [booking, setBooking] = useState({})
  const [page, setPage] = useState(0)

  const getBooking = () => {
    const params = {
      skip: page,
      limit
    }
    axios.get(
      `${host}/api/booking/`,
      { params }
    ).then((response) => {
      // console.log(response)
      setBooking({
        data: response?.data?.bookings || [],
        count: response?.data?.count || 0
      })
    }).catch(() => {
        setBooking({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getBooking()
  }, [page])

  const deletebooking = (id) => {
    console.log(id)
    confirmAlert({
      title: 'Xóa booking',
      message: 'Bạn có chắc chắn muốn xóa booking này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/booking/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getBooking()
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
  }

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const RenderInfo = (props) => {
    const [tour, setTours] = useState()
    const [user, setUser] = useState()
    const total = parseInt(tour?.price) * (parseInt(props.adults) + 0.5 * parseInt(props.child))

    useEffect(
      () => {
        axios.get(`${host}/api/tours/${props.idtour}`)
          .then((res) => {
            setTours(res?.data?.tours)
          })
          .catch((err) => {
            toast.error(err)
          })

          axios.get(`${host}/api/user/${props.iduser}`)
          .then((res) => {
            setUser(res?.data?.user)
          })
          .catch((err) => {
            toast.error(err)
          })
          
      }, []
    )
    return (
          <tr key={tour?._id}>
            <td>
              {props?.stt + 1}
            </td>
            <td>
              <p>{tour?.name || ''}</p>
            </td>
            <td>
              <p>{tour?.price || ''}</p>
            </td>
            <td>
              <p>{props?.adults || ''}</p>
            </td>
            <td>
              <p>{props?.child || ''}</p>
            </td>
            <td>
              <p>{props?.date || ''}</p>
            </td>
            <td>
              <p> {user?.name || ''}</p>
            </td>
            <td>
              <img src={tour?.avatar[0] || ''} alt='image tour' />
            </td>
            <td>
              <p>{props?.status}</p>
            </td>
            <td>
              <div className='admin__acction'>
                <Icon icon='bx:edit' color='#0c3' width='25' onClick={() => { router.push(`/admin/booking/${props?.idbooking}`) }} />
                <Icon icon='ant-design:delete-filled' color='red' width='25' onClick={() => deletebooking(props?.idbooking)} />
              </div>
            </td>
          </tr>
    )
  } 

  const renderbooking = () => {
    return (
      (booking?.data || []).map((booking,index) => {
        return (
         <RenderInfo
         stt={index}
         idtour={booking.idTour}
         iduser={booking.idUser}
         key={booking?._id}
         adults={booking?.adults}
         child={booking?.child}
         idbooking={booking?._id}
         date={booking?.date} 
         status={booking?.status}/>
        )
      })
    )
  }

  return (
    <Layout>
      <div className='admin__tour'>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '2%' }}>id</th>
              <th style={{ width: '20%' }}>Tên Tour</th>
              <th style={{ width: '10%' }}>Giá tour</th>
              <th style={{ width: '10%' }}>Người lớn</th>
              <th style={{ width: '10%' }}>trẻ em</th>
              <th style={{ width: '10%' }}>Ngày đặt</th>
              <th style={{ width: '15%' }}>Người đặt</th>
              <th style={{ width: '10%' }}>Hình ảnh</th>
              <th style={{ width: '10%' }}>Trạng thái</th>
              <th style={{ width: '5%' }} />
            </tr>
          </thead>
          <tbody>
            {renderbooking()}
          </tbody>
        </table>
        {booking.count > limit && (
          <ReactPaginate
            className='paginate--custom'
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(booking.count / limit)}
            previousLabel='<'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </Layout>
  )
}
