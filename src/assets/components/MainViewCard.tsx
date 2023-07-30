import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

const MainViewCard = () => {
  return (
    <MainCard>
        <TopBar/>
        <Outlet/>
    </MainCard>
  )
}

export default MainViewCard

const MainCard = styled.div`
  width: 600px;
  height: 500px;
  max-width: 95%;
  max-height: 95dvh;
  border: 2px solid #555555;
  border-radius: 10px;
  background-color: #FAFAFA;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`