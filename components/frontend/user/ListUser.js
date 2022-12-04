import React, { useState, useEffect } from 'react'
import Layout from '../Hotels/Layout'
import axios from 'axios'
import { Icon } from '@iconify/react'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH
const limit = 10

export default function ListUser () {
  const [user, setUser] = useState({})
  const [page, setPage] = useState(0)

  const getUser = () => {
    const params = {
      skip: page,
      limit
    }

    axios.get(
      `${host}/api/user/`,
      { params }
    ).then((response) => {
      setUser({
        data: response?.data?.users || [],
        count: response?.data?.count || 0
      })
    })
      .catch(() => {
        setUser({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getUser()
  }, [page])

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const deleteUser = (id) => {
    confirmAlert({
      title: 'Xóa người dùng',
      message: 'Bạn có chắc chắn muốn xóa người dùng này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/user/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getUser()
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

  const renderUser = () => {
    return (
      (user?.data || []).map((user, index) => {
        return (
          <tr key={user._id}>
            <td className='table__index'>
              {index + 1}
            </td>
            <td className='user__table-col'>
              <p className='table__col--text'>{user?.name || ''}</p>
            </td>
            <td className='user__table-col'>
              <p className='table__col--text'>{user?.email || ''}</p>
            </td>
            <td className='user__table-col'>
              <p className='table__col--text'>{user?.phone || ''}</p>
            </td>
            <td className='user__table-col'>
              <p className='table__col--text'>{user?.address || ''}</p>
            </td>
            <td className='btn--action'>
              <Icon
                icon='akar-icons:edit'
                color='#3c0' className='btn--edit'
              />
              <Icon
                icon='ant-design:delete-filled'
                color='red' className='btn--edit'
                onClick={() => deleteUser(user?._id)}
              />
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Layout breadcrumb='Người dùng'>
      <div className='hotel__container'>
        <Icon
          className='hotel__btn--add'
          icon='carbon:add-filled'
          inline
        />
        <table className='hotel__table'>
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th />
            </tr>
            {renderUser()}
          </tbody>
        </table>
        {user.count > limit && (
          <ReactPaginate
            className='paginate--custom'
            breakLabel='...'
            nextLabel='>>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(user.count / limit)}
            previousLabel='<<'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </Layout>
  )
}
