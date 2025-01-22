import React from 'react'
import{useNavigate} from 'react-router-dom'
import "./home.css"
import Testomonials from '../../components/testtimonials/Testomonials'

const Home = () => {
  const navigate =useNavigate()
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-Learning Platform</h1>
          <p>Learn,Grow and Push Past your Limits</p>
          <button  onClick={()=>navigate("/courses")} className='common-btn'>Get Started</button>
        </div>
      </div>
      <Testomonials/>
    </div>
  )
}

export default Home;
