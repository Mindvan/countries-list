import { useRoutes } from 'react-router-dom'
import { routeConfig } from '../config/routeConfig'

export const AppRouter = () => {
  return useRoutes(routeConfig)
}