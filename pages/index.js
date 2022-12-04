import Footer from '../components/frontend/footer/Footer'
import Header from '../components/Frontend/header/Header'
import About from '../components/frontend/home/About'
import Favorite from '../components/frontend/home/Favorite'
import Intro from '../components/frontend/home/Intro'
import Process from '../components/frontend/home/Process'
import Tour from '../components/frontend/home/Tour'

import MessengerCustomerChat from 'react-messenger-customer-chat'
export default function Home () {
  return (
    <div>
      {/* <MessengerCustomerChat
    pageId="105508202365899"
  /> */}
      <Header />
      <Intro />
      <Process />
      <Tour />
      <Favorite />
      <About />
      <Footer />
    </div>
  )
}
