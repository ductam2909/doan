import Header from '../../components/Frontend/header/Header'
import Footer from '../../components/Frontend/footer/Footer'
import React from 'react'
import Blog from '../../components/frontend/blog/Blog'
import BlogByCategory from '../../components/frontend/blogByCategory/blogByCategory'

export default function index () {
  return (
    <>
      <Header />
      <Blog />
      <Footer />
    </>
  )
}
