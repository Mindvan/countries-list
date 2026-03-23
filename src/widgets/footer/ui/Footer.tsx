import styled from 'styled-components'

const Bar = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  border-top: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 -1px 0 rgb(15 23 42 / 4%);
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.9rem 1.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
  }
`

const Credits = styled.small`
  font-size: 0.8125rem;
  color: #64748b;
`

const Link = styled.a`
  font-size: 0.8125rem;
  color: #475569;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: #0f172a;
  }

  &:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
    border-radius: 6px;
  }
`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Bar>
      <Inner>
        <Credits>{year} Ivan Eroshin</Credits>
      </Inner>
    </Bar>
  )
}
