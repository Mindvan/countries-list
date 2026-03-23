import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled.a`
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }

  &:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`

export const Navbar = () => {
  return (
    <div>
        <NavLink><Link to="/">Главная</Link></NavLink>
        <NavLink><Link to="/login">Войти</Link></NavLink>
    </div>
  )
}