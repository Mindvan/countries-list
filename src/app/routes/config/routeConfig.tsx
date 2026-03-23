import type { RouteObject } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'
import { Home } from '../../../pages/Home/Home'
import { Login } from '../../../pages/Login/Login'
import { CountryInfo } from '../../../pages/CountryInfo/CountryInfo'

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'country/:cca3', element: <CountryInfo /> },
    ],
  },
]
