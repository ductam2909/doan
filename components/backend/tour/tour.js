import { Icon } from '@iconify/react'
import React, { useState, useEffect }  from 'react'
import { Table } from 'react-bootstrap'
import Layout from '../layout/layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH
const limit = 10

export default function Tour () {
  const router = useRouter()
  const [tour, setTour] = useState({})
  const [page, setPage] = useState(0)

  const getTour = () => {
    const params = {
      skip: page,
      limit
    }
    axios.get(
      `${host}/api/tours/`,
      { params }
    ).then((response) => {
      setTour({
        data: response?.data?.tours || [],
        count: response?.data?.count || 0
      })
    })
      .catch(() => {
        setTour({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getTour()
  }, [page])

  const editTour = (id) => {
    router.push(`/admin/tour/${id}`)
  }

  const deleteTour = (id) => {
    confirmAlert({
      title: 'Xóa tour',
      message: 'Bạn có chắc chắn muốn xóa tour này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/tours/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getTour()
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

  const renderTour = () => {
    return (
      (tour?.data || []).map((tour, index) => {
        return (
          <tr key={tour._id}>
            <td >
              {index + 1}
            </td>
            <td >
              <p >{tour?.name || ''}</p>
            </td>
            <td >
              <p >{tour?.detail || ''}</p>
            </td>
            <td >
              <p
              dangerouslySetInnerHTML={{ __html: tour?.description || ''}}>
              </p>
            </td>
            <td >
              <p >{tour?.price || ''}</p>
            </td>
            <td >
              <img src={tour?.avatar[0] || ''} alt='image tour' />
            </td>
            <td>
                <div className='admin__acction'>
                  <Icon icon='bx:edit' color='#0c3' width='25' onClick={()=>{router.push(`/admin/tour/${tour?._id}`)}}/>
                  <Icon icon='ant-design:delete-filled' color='red' width='25'onClick={() => deleteTour(tour._id)} />
                </div>
              </td>
          </tr>
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
              <th style={{ width: '20%' }}>Trích dẫn</th>
              <th style={{ width: '25%' }}>Nội dung</th>
              <th style={{ width: '10%' }}>Giá</th>
              <th style={{ width: '10%' }}>Hình ảnh</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>
          {renderTour()}
          </tbody>
        </table>
        {tour.count > limit && (
            <ReactPaginate
              className='paginate--custom'
              breakLabel='...'
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={limit}
              pageCount={Math.ceil(tour.count / limit)}
              previousLabel='<'
              renderOnZeroPageCount={null}
            />
          )}
      </div>
    </Layout>
  )
}
