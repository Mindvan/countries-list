import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import type { Country } from '../../entities/country'
import CountryCard from '../../entities/country/ui/CountryCard/CountryCard'
import { CountrySearchForm } from '../../widgets/country-search-form'

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SearchRow = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-content: start;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Home = () => {
    const [data, setData] = useState<Country[]>([])
    const [search, setSearch] = useState('')
  
    async function fetchData(): Promise<void> {
      const res = await fetch(
        'https://restcountries.com/v4/all?fields=name,cca3,currencies,capital,continents,languages,borders,flag,population,religion',
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: unknown = await res.json()
      if (!Array.isArray(json)) throw new Error('Expected an array from API')
      setData(json as Country[])
    }
  
    useEffect(() => {
      fetchData().catch(console.error);
    }, []);
  
    const filtered = useMemo(() => {
      const str = search.trim().toLowerCase();
      return data.filter(x => x.name.official.toLowerCase().includes(str) || Object.values(x.name.nativeName).some(y => y.official.toLowerCase().includes(str)))
    }, [data, search])

  return (
    <Content>
      <SearchRow>
        <CountrySearchForm value={search} onChange={setSearch} />
      </SearchRow>
      <Main>
        {filtered.length > 0 ? filtered.map((country) => (
          <CountryCard key={country.cca3} data={country} />
        )) : <div>Страны не найдены</div>}
      </Main>
    </Content>
  )
}