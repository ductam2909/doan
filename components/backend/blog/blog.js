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

export default function Blog () {
  const router = useRouter()
  const [blog, setBlog] = useState({})
  const [page, setPage] = useState(0)
 
  // const getUser = (id) => {
  //   if (id) {
  //   axios.get(
  //     `${host}/api/user/${id}`
  //   ).then((response) => {
  //     setUser(response?.data?.user)
  //     console.log(response)
  //   })
  //     .catch(() => {
  //       setUser('')
  //     })
  //   }
  // }

  const getBlog = () => {
    const params = {
      skip: page,
      limit
    }
    axios.get(
      `${host}/api/blog/`,
      { params }
    ).then((response) => {
      setBlog({
        data: response?.data?.blogs || [],
        count: response?.data?.count || 0
      })
      // getUser(response?.data?.blogs?.idUser)
    }).catch(() => {
        setBlog({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getBlog()
  }, [page])

  const deleteblog = (id) => {
    console.log(id)
    confirmAlert({
      title: 'Xóa blog',
      message: 'Bạn có chắc chắn muốn xóa blog này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/blog/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getBlog()
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

  const RenderUser = (props) => {
    const [user, setUser] = useState()
    useEffect(() => {
      if (props?.id) {
        axios.get(
          `${host}/api/user/${props?.id}`
        ).then((response) => {
          setUser(response?.data?.user)
        })
          .catch(() => {
            setUser('')
          })
        }
    }, [])
    
      return (
        <div>
        <p>{user?.name}</p>
      </div>
      )
  }

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const renderblog = () => {
    return (
      (blog?.data || []).map((blog,index) => {
        return (
          <tr key={blog?._id}>
          <td>
            {index+1}
          </td>
          <td>
            <p>{blog?.name || ''}</p>
          </td>
          <td>
            <p>{blog?.detail || ''}</p>
          </td>
          <td>
          <p
              dangerouslySetInnerHTML={{ __html: blog?.description || ''}}>
              </p>
          </td>
          <td>
            <p>{new Date(blog?.createdAt).toLocaleDateString()}</p>
          </td>
          <td>
            <RenderUser id = {blog?.idUser}/>
          </td>
          <td>
            <img src={blog?.avatar || ''} alt='image blog' />
          </td>
          <td>
            <p>{blog?.status || ''}</p>
          </td>
          <td>
            <div className='admin__acction'>
              <Icon icon='bx:edit' color='#0c3' width='25' onClick={() => { router.push(`/admin/blog/${blog?._id}`) }} />
              <Icon icon='ant-design:delete-filled' color='red' width='25' onClick={() => deleteblog(blog?._id)} />
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
              <th style={{ width: '15%' }}>Tên blog</th>
              <th style={{ width: '15%' }}>Trích dẫn</th>
              <th style={{ width: '20%' }}>Nội dung</th>
              <th style={{ width: '10%' }}>Ngày viết</th>
              <th style={{ width: '15%' }}>Người Viết</th>
              <th style={{ width: '10%' }}>Hình ảnh</th>
              <th style={{ width: '10%' }}>Trạng thái</th>
              <th style={{ width: '5%' }} />
            </tr>
          </thead>
          <tbody>
            {renderblog()}
          </tbody>
        </table>
        {blog.count > limit && (
          <ReactPaginate
            className='paginate--custom'
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(blog.count / limit)}
            previousLabel='<'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </Layout>
  )
}
