import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import { AuthContext, ThemeContext } from '../../app/providers/AppProvider'

const NAV_FONT_SIZE = '1rem'

const navItemStyles = `
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: ${NAV_FONT_SIZE};
  line-height: 1.25;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: var(--color-hover-text);
    background: var(--color-hover-bg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    padding: 0.5rem;
  }
`

const NavRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  max-width: 100%;

  @media (max-width: 520px) {
    gap: 0.1rem;
  }
`

const ThemeButton = styled.button`
  ${navItemStyles}
  border: none;
  background: transparent;
  font-family: inherit;
`

const ThemeLabelLong = styled.span`
  @media (max-width: 520px) {
    display: none;
  }
`

const ThemeLabelShort = styled.span`
  display: none;

  @media (max-width: 520px) {
    display: inline;
  }
`

const NavLinkStyled = styled(Link)`
  ${navItemStyles}
  display: inline-block;
  text-decoration: none;
`

const NavLabelLong = styled.span`
  @media (max-width: 520px) {
    display: none;
  }
`

const NavLabelShort = styled.span`
  display: none;

  @media (max-width: 520px) {
    display: inline;
  }
`

export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { username, logout } = useContext(AuthContext)

  const themeAria =
    theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'

  return (
    <NavRoot>
      <ThemeButton
        type="button"
        onClick={toggleTheme}
        aria-label={themeAria}
      >
        <ThemeLabelLong>
          {theme === 'light' ? 'Тема: Светлая' : 'Тема: Тёмная'}
        </ThemeLabelLong>
        <ThemeLabelShort aria-hidden>
          {theme === 'light' ? '☀' : '☾'}
        </ThemeLabelShort>
      </ThemeButton>
      <NavLinkStyled to="/" aria-label="Главная">
        <NavLabelLong>Главная</NavLabelLong>
        <NavLabelShort aria-hidden>Гл.</NavLabelShort>
      </NavLinkStyled>
      {username ? (
        <ThemeButton type="button" onClick={logout}>
          Выйти
        </ThemeButton>
      ) : (
        <NavLinkStyled to="/login">Войти</NavLinkStyled>
      )}
    </NavRoot>
  )
}
