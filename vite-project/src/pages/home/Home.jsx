import React, { useState } from 'react'
import './Home.css'

import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/header/Header'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDowload from '../../components/app-dowload/AppDownload'
const Home = () => {
  const [catagory ,setCatagory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu  catagory = {catagory}  setCatagory={setCatagory}/>
      <FoodDisplay catagory={catagory}/>
      <AppDowload/>
    </div>
  )
}

export default Home
