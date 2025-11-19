import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Home from './Home'
import Clothes from './Clothes'
import ElectronicItems from './ElectronicItems'
import Furniture from './Furniture'
import Shoes from './Shoes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="clothes" element={<Clothes />} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="electronics" element={<ElectronicItems />} />
        <Route path="furniture" element={<Furniture />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes