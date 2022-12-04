import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Icon } from '@iconify/react'
const host = process.env.NEXT_PUBLIC_APIAUTH
import axios from 'axios'
import { useRouter } from 'next/router'
// import './Blog.css'

export default function Test() {
  const [cats, setCats] = useState([])
  const [cat1s, setCat1s] = useState([])
  const getCat = () => {
    axios
      .get(`${host}/api/blog/cat`)
      .then((response) => {
        setCats(response?.data?.cates)
      })
      .catch(() => {
        console.log('error')
      })
  }
  const getCat1 = () => {
    axios
      .get(`${host}/api/blog/cat1`)
      .then((response) => {
        setCat1s(response?.data?.cates)
      })
      .catch(() => {
        console.log('error')
      })
  }

  useEffect(() => {
    getCat1()
  }, [])

  const showCates = () => {
    console.log(cats);
    if (cats !== []) {
      return cats.map((cat) => {
        return <p>{cat}</p>
      })
    }
  }
  const showCate1s = () => {
    console.log('cats');
    console.log(cats);
    if (cats !== []) {
      return cats.map((cat) => {
        return <p>{cat}</p>
      })
    }
  }
  if (cats.length == 0) {
    return null
  }
  if (cat1s.length == 0) {
    return null
  }
  return <div className="test">{showCate1s()}</div>
}
