import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../providers/AppProvider'
import { Footer } from '../../widgets/footer'
import { Header } from '../../widgets/header'

const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
`

const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1100px) {
    padding: 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`

export const AppLayout = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <Page data-theme={theme}>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Page>
  )
}
