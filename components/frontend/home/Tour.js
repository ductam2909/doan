import { Icon } from '@iconify/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
const host = process.env.NEXT_PUBLIC_APIAUTH
const limit = 6

export default function Tour () {
  const [tour, setTour] = useState({})
  const [page, setPage] = useState(0)
  const router = useRouter()

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

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const DetailTour = (id) => {
    router.push(`/tour/${id}`)
  }

  const renderTour = () => {
    console.log(tour)
    return (
      (tour?.data || []).map((tour) => {
        return (
          <div className='tour__item' key={tour?._id}>
            <div className='tour__item--img'>
              <img src={tour?.avatar[0]} />
            </div>
            <div className='tour__info'>
              <h3 onClick={() => { DetailTour(tour?._id) }}>{tour?.name}</h3>
              <h5>{tour?.price}<span>/1 người</span></h5>
              <hr />
              <div className='tour__info--bottom'>
                <Icon icon='akar-icons:clock' color='#99a1a7' width='25' height='25' />
                <p>{tour?.time}</p>
                <div className='tour__location'>
                  <Icon icon='bxs:map' color='#99a1a7' width='30' height='30' />
                  <p>{tour?.address} </p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  return (
    <div className='tour'>
      <h2>Top Tour du lịch giá rẻ</h2>
      <div className='tour__container'>
        {renderTour()}
      </div>
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
  )
}
