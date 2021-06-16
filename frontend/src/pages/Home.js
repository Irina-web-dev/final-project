import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import HeroSection from '../components/HeroSection'

const Home = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory() 

  useEffect(() => {
    if(accessToken) {
      history.push('/main')
    }
  }, [accessToken, history])

  return (
    <HeroSection />
  )
}

export default Home
