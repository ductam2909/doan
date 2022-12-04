import React, { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Header from '../../components/Frontend/header/Header'
const host = process.env.NEXT_PUBLIC_APIAUTH
import Footer from '../../components/Frontend/footer/Footer'
import BlogByCategory from '../../components/frontend/blogByCategory/blogByCategory'

export default function index () {
  const [blog, setBlog] = useState({})
  const router = useRouter()
  const [user, setUser] = useState()

  const getUser = (id) => {
    axios.get(
      `${host}/api/user/${id}`
    ).then((response) => {
      setUser(response?.data?.user)
    })
      .catch(() => {
        setBlog({
          data: []
        })
      })
  }

  const getBlog = () => {
    axios.get(
      `${host}/api/blogbycategory/${router?.query?.id}`
    ).then((response) => {
      setBlog({
        data: response?.data?.blogs || []
      });
      getUser(response?.data?.blogs?.idUser)
    })
      .catch(() => {
        setBlog({
          data: []
        })
      })
  }

  useEffect(
    () => {
      getBlog()
    }, [router?.query?.id]
  )

  return (
    <>
      <Header />
      <BlogByCategory  category={router?.query?.id}/>
      <Footer />
    </>
  )
}
