import { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../app/providers/AppProvider'
import { Navbar } from '../../navbar/Navbar'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgb(15 23 42 / 4%);
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  @media (max-width: 900px) {
    flex: 1 1 auto;
    min-width: 0;
    gap: 0.5rem;
  }

  @media (max-width: 520px) {
    gap: 0.25rem;
  }
`

const Logo = styled.span`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #a855f7 100%);
  font-size: 1.25rem;
  line-height: 1;
  box-shadow: 0 2px 8px rgb(99 102 241 / 35%);
  flex-shrink: 0;
`

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`

const Title = styled.span`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

`

const Tagline = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  line-height: 1.2;

  @media (max-width: 720px) {
    display: none;
  }
`

const Greeting = styled.span`
  flex: 1;
  min-width: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.25rem;

  @media (max-width: 900px) {
    order: 3;
    flex: 1 0 100%;
    text-align: center;
    white-space: normal;
    padding: 0.25rem 0 0;
    line-height: 1.3;
  }

  @media (max-width: 520px) {
    padding: 0.1rem 0 0;
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;

  @media (max-width: 900px) {
    order: 2;
    margin-left: auto;
  }

  @media (max-width: 520px) {
    gap: 0.1rem;
  }
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 1100px) {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
    row-gap: 0.25rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`

export function Header() {
  const { username } = useContext(AuthContext)

  return (
    <Bar>
      <Inner>
        <Brand>
          <Logo aria-hidden>🌍</Logo>
          <BrandText>
            <Title>Кантри.ру</Title>
            <Tagline>Справочник стран</Tagline>
          </BrandText>
        </Brand>
        <Greeting>
          Привет, {username ?? 'аноним'}!
        </Greeting>
        <Nav>
          <Navbar />
        </Nav>
      </Inner>
    </Bar>
  )
}
