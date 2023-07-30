import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'

const MainViewCard = () => {
  return (
    <MainCard>
        <Outlet/>
    </MainCard>
  )
}

export default MainViewCard

const MainCard = styled.div`
  width: 600px;
  height: 500px;
  border: 2px solid #555555;
  border-radius: 10px;
  background-color: #FAFAFA;
  padding: 1rem;
`