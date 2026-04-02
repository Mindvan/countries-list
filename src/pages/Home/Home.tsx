import styled from 'styled-components'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  setCountryNameByCodeMap,
  type Country,
} from '../../entities/country'
import CountryCard from '../../entities/country/ui/CountryCard/CountryCard'
import { CountrySearchForm } from '../../widgets/country-search-form'
import { fetchData } from '../../entities/country/api/countryApi'
import { getContinents } from '../../entities/country/model/countryNameByCode'
import { FavoritesContext } from '../../app/providers/AppProvider'

const SearchRow = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 0;

  @media (max-width: 1100px) {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 720px) {
    flex: none;
    width: 100%;
    max-width: 100%;
  }
`

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-content: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.5rem;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1100px) {
    gap: 1rem;
  }

  @media (max-width: 520px) {
    gap: 0.5rem;
  }
`

const SortButtonsRow = styled.div`
  display: contents;

  @media (max-width: 720px) {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    gap: 0.5rem;
  }

  @media (max-width: 520px) {
    gap: 0.5rem;
  }
`

const SortRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  @media (max-width: 1100px) {
    gap: 0.5rem;
    justify-content: end;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    max-width: 100%;
    gap: 0.5rem;
  }

  @media (max-width: 520px) {
    gap: 0.5rem;
  }
`

const SortButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: var(--color-hover-bg);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  @media (max-width: 720px) {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.5rem;
  }

  @media (max-width: 520px) {
    padding: 0.25rem 0.5rem;
  }
`

const ContinentSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;

  @media (max-width: 720px) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`

const FavoritesOnlyLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  user-select: none;

  @media (max-width: 720px) {
    width: 100%;
    max-width: 100%;
    gap: 0.5rem;
  }
`

const FavoritesCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #6366f1;
  cursor: pointer;
`

const SearchSortRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 1rem;

    & > ${SearchRow} {
      flex: 1 1 auto;
      min-width: 0;
    }

    & > ${SortRow} {
      flex: 1 1 auto;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.5rem;

    & > ${SearchRow},
    & > ${SortRow} {
      flex: none;
      width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 520px) {
    gap: 0.5rem;
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text-muted);

  @media (max-width: 1100px) {
    padding: 0.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
  }

  @media (max-width: 520px) {
    padding: 0.25rem;
  }
`

export const Home = () => {
  const { favoritesEnabled, favoriteIds, toggleFavorite } =
    useContext(FavoritesContext)
  const [data, setData] = useState<Country[]>([])
  const [search, setSearch] = useState('')
  const [sortedType, setSortedType] = useState<'asc' | 'desc'>('asc')
  const [continents, setContinents] = useState<string[]>([])
  const [selectedContinent, setSelectedContinent] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  useEffect(() => {
    fetchData()
      .then((x: Country[]) => {
        setData(x)
        setCountryNameByCodeMap(x)
        setContinents(getContinents(x))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!favoritesEnabled) setOnlyFavorites(false)
  }, [favoritesEnabled])

  const favoriteSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds],
  )

  const filtered = useMemo(() => {
    const str = search.trim().toLowerCase()
    return [...data].filter((x) => {
      const matchesSearch =
        x.name.official.toLowerCase().includes(str) ||
        (x.name.nativeName &&
          Object.values(x.name.nativeName).some((y) =>
            y.official.toLowerCase().includes(str),
          ))
      const matchesContinent =
        selectedContinent === '' || x.continents.includes(selectedContinent)
      const matchesFavorites =
        !onlyFavorites ||
        !favoritesEnabled ||
        favoriteSet.has(x.cca3)
      return matchesContinent && matchesSearch && matchesFavorites
    })
  }, [
    data,
    search,
    selectedContinent,
    onlyFavorites,
    favoritesEnabled,
    favoriteSet,
  ])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sortedType === 'asc'
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common),
    )
  }, [filtered, sortedType])

  return (
    <Container>
      <SearchSortRow>
        <SearchRow>
          <CountrySearchForm value={search} onChange={setSearch} />
        </SearchRow>
        <SortRow>
          <ContinentSelect
            id="home-continent-filter"
            name="continent"
            aria-label="Фильтр по континенту"
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="">Все континенты</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </ContinentSelect>
          {favoritesEnabled ? (
            <FavoritesOnlyLabel>
              <FavoritesCheckbox
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />
              Только избранное
            </FavoritesOnlyLabel>
          ) : null}
          <SortButtonsRow>
            <SortButton onClick={() => setSortedType('asc')}>
              По возрастанию
            </SortButton>
            <SortButton onClick={() => setSortedType('desc')}>
              По убыванию
            </SortButton>
          </SortButtonsRow>
        </SortRow>
      </SearchSortRow>
      <Main>
        {sorted.length > 0 ? (
          sorted.map((country) => (
            <CountryCard
              key={country.cca3}
              data={country}
              favoritesEnabled={favoritesEnabled}
              isFavorite={favoriteSet.has(country.cca3)}
              onFavoriteToggle={() => toggleFavorite(country.cca3)}
            />
          ))
        ) : (
          <EmptyState>
            {onlyFavorites && favoritesEnabled
              ? 'Нет избранных стран по текущим фильтрам'
              : 'Страны не найдены'}
          </EmptyState>
        )}
      </Main>
    </Container>
  )
}