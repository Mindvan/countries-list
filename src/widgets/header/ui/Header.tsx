import styled from 'styled-components'
import { Navbar } from '../../navbar/Navbar'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid #e2e8f0;
  background: rgb(255 255 255 / 88%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgb(15 23 42 / 4%);
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
`

const Logo = styled.span`
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #a855f7 100%);
  font-size: 1.15rem;
  line-height: 1;
  box-shadow: 0 2px 8px rgb(99 102 241 / 35%);
`

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`

const Title = styled.span`
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.2;
`

const Tagline = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1.2;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
`

export function Header() {
  return (
    <Bar>
      <Inner>
        <Brand>
          <Logo aria-hidden>🌍</Logo>
          <BrandText>
            <Title>Countries</Title>
            <Tagline>Справочник стран</Tagline>
          </BrandText>
        </Brand>
        <Nav>
          <Navbar />
        </Nav>
      </Inner>
    </Bar>
  )
}
