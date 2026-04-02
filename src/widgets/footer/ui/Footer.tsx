import styled from 'styled-components'

const Bar = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 -1px 0 rgb(15 23 42 / 4%);
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 1100px) {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Credits = styled.small`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Bar>
      <Inner>
        <Credits>{year} Ivan Eroshin. Использованы данные из API <a style={{ color: 'var(--color-text)' }} href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">REST Countries</a> / Требуется VPN</Credits>
      </Inner>
    </Bar>
  )
}
