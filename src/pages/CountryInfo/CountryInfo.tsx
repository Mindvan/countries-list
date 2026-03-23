import { useParams } from 'react-router-dom'

export const CountryInfo = () => {
  const { cca3 } = useParams();

  console.log(cca3);
  return (
    <div>CountryInfo</div>
  )
}