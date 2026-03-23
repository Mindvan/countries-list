import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Footer } from '../../widgets/footer'
import { Header } from '../../widgets/header'

const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
`

export const AppLayout = () => {
  return (
    <Page>
      <Header />
      <Outlet />
      <Footer />
    </Page>
  )
}
