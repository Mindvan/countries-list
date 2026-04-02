import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCountryByName } from '../../entities/country/api/countryApi'
import { getCountryNameByCode } from '../../entities/country'
import type { Country } from '../../entities/country/model/types'

const Page = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 5rem;

  @media (max-width: 560px) {
    padding: 1rem;
  }
`

const Hero = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(160px, 220px) 1fr;
  align-items: start;
  margin-bottom: 2rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const FlagBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-hover-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgb(15 23 42 / 6%);
`

const FlagImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`

const CountryName = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: var(--color-text);
`

const NativeNames = styled.p`
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.0;
`

const CodeBadge = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-hover-bg);
  border-radius: 6px;
  width: fit-content;
`

const BackButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 600;
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
`

const DetailsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 1px 2px rgb(15 23 42 / 5%);
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.4rem;
`

const InfoValue = styled.div`
  font-size: 1rem;
  color: var(--color-text);
  line-height: 1.5;
`

const LoadingText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
`

const LoaderWrap = styled.div`
  min-height: 220px;
  display: grid;
  place-items: center;
  gap: 0.75rem;
`

const LoaderRing = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-outline);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #64748b;
`

function formatList(items: string[] | undefined, emptyLabel: string): string {
  if (!items?.length) return emptyLabel
  return items.join(', ')
}

function formatBorders(codes: string[] | undefined): string {
  if (!codes?.length) return '-'
  return codes
    .map((code) => getCountryNameByCode(code) ?? code)
    .join(', ')
}

export const CountryInfo = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState<Country | undefined>()

  useEffect(() => {
    if (!name) return
    fetchCountryByName(name)
      .then((data: Country) => setCountry(data))
      .catch(console.error)
  }, [name])

  if (!name) {
    return (
      <Page>
        <EmptyText>Не указана страна в адресе.</EmptyText>
      </Page>
    )
  }

  if (!country) {
    return (
      <Page>
        <LoaderWrap aria-live="polite" aria-busy="true">
          <LoaderRing aria-hidden />
          <LoadingText>Загрузка…</LoadingText>
        </LoaderWrap>
      </Page>
    )
  }

  const nativeNamesLine =
    country.name.nativeName ? Object.values(country.name.nativeName).map((l) => l.official).join(', ') : '-'

  const languagesLine =
    country.languages?.map((l) => l.name).join(', ') || '-'

  const religionLine =
    country.religion?.map((r) => r.name).join(', ') || '-'

  return (
    <Page>
      <Hero>
        <FlagBox>
          <FlagImg
            src={country.flag.png}
            alt={country.flag.alt}
            loading="lazy"
          />
        </FlagBox>
        <TitleBlock>
          <CountryName>{country.name.common}</CountryName>
          <NativeNames>{nativeNamesLine}</NativeNames>
          <CodeBadge>{country.cca3}</CodeBadge>
        </TitleBlock>
      </Hero>

      <BackButton type="button" onClick={() => navigate(-1)}>
        Назад
      </BackButton>

      <DetailsGrid>
        <InfoCard>
          <InfoLabel>Столица</InfoLabel>
          <InfoValue>
            {formatList(country.capital, '-')}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Континент</InfoLabel>
          <InfoValue>
            {formatList(country.continents, '-')}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Языки</InfoLabel>
          <InfoValue>{languagesLine}</InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Границы</InfoLabel>
          <InfoValue>
            {formatBorders(country.borders)}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Население</InfoLabel>
          <InfoValue>
            {country.population.toLocaleString('ru-RU')} чел.
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Религии</InfoLabel>
          <InfoValue>{religionLine}</InfoValue>
        </InfoCard>
      </DetailsGrid>
    </Page>
  )
}
