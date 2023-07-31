import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import MainCard from '../components/MainCard.styled'

const MainViewCard = () => {
  return (
    <MainCard>
        <TopBar/>
        <Outlet/>
    </MainCard>
  )
}

export default MainViewCard