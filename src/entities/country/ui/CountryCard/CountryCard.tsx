import styled from 'styled-components'
import type { Country } from '../..'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const BODY_HEIGHT_TRANSFORM = 20;
const NATIVE_HEIGHT_TRANSFORM = 20;


const Body = styled.div<{ $titleHeight: number, $nativeNamesHeight: number }>`
  padding: 0.75rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  transition: height 0.35s ease;
  transform: translateY(${({ $titleHeight }) => `${(15 - (($titleHeight - 1) * BODY_HEIGHT_TRANSFORM))}px`});
  background: var(--color-surface);
  transition: transform 0.35s ease;

  h3 {
    color: var(--color-text);
  }

  p {
    transform: translateY(${({ $nativeNamesHeight }) => `${NATIVE_HEIGHT_TRANSFORM * $nativeNamesHeight}px`});
    transition: all 0.4s ease;
    color: var(--color-text-muted);
  }
`

const FavoriteLabel = styled.label`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #6366f1;
  }

  &:has(input:checked) {
    border-color: #6366f1;
    background: rgb(99 102 241 / 12%);
  }
`

const FavoriteCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1rem;
  height: 1rem;
  margin: 0;
  accent-color: #6366f1;
  cursor: pointer;
`

const FlagWrap = styled.div`
  position: relative;
  background: #f1f5f9;
  min-height: 100px;
  transition: transform 0.35s ease;
`

const FlagImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.35s ease;
`

const Card = styled.div<{ $titleHeight: number, $nativeNamesHeight: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(15 23 42 / 8%);
  cursor: pointer;
  height: 160px;
  transition: opacity 0.25s ease;

  &.active {
    opacity: 0.5;
  }

  &.active ${Body} {
    transform: translateY(${({ $titleHeight, $nativeNamesHeight }) => `${BODY_HEIGHT_TRANSFORM - $titleHeight * BODY_HEIGHT_TRANSFORM 
    - 17.5 * ($nativeNamesHeight - 1)}px`});

    p {
      transform: translateY(0);
    }
  }

  &.active ${FlagImg} {
  }

  &.active ${FlagWrap} {
    transform: translate(0%, -20%);
  }
`

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 600;
  color: #0f172a;
`

const NativeNames = styled.p`
  margin: 0;
  font-size: 0.72rem;
  color: #64748b;
`

type CountryCardProps = {
  data: Country
  favoritesEnabled?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

function formatNativeNames(nativeName: Country['name']['nativeName']): string {
  const values = Object.values(nativeName ?? {})
  if (values.length === 0) return ''
  return values
    .map((n) => n.common || n.official)
    .filter(Boolean)
    .join(' · ')
}


function CountryCard({
  data,
  favoritesEnabled = false,
  isFavorite = false,
  onFavoriteToggle,
}: CountryCardProps) {
  const nativeLine = formatNativeNames(data.name.nativeName)
  const [isHovered, setIsHovered] = useState(false)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const [titleHeight, setTitleHeight] = useState(0)
  const nativeNamesRef = useRef<HTMLParagraphElement>(null)
  const [nativeNamesHeight, setNativeNamesHeight] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    setTitleHeight(Math.round(el.getBoundingClientRect().height / 20.25))
    const elNativeNames = nativeNamesRef.current
    if (!elNativeNames) return
    setNativeNamesHeight(Math.round(elNativeNames.getBoundingClientRect().height / 17))
  }, [])

  function handleClick(value: Country) {
    navigate(`/country/${value.name.common}`);
  }

  return (
    <Card
      className={isHovered ? 'active' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(data)}
      $titleHeight={titleHeight}
      $nativeNamesHeight={nativeNamesHeight}
    >
      <FlagWrap>
        <FlagImg src={data.flag.png} alt={data.flag.alt} loading="lazy" />
      </FlagWrap>
      {favoritesEnabled && onFavoriteToggle ? (
        <FavoriteLabel
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <FavoriteCheckbox
            checked={isFavorite}
            onChange={(e) => {
              e.stopPropagation()
              onFavoriteToggle()
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label={
              isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
            }
          />
        </FavoriteLabel>
      ) : null}
      <Body $titleHeight={titleHeight} $nativeNamesHeight={nativeNamesHeight}>
        <Title ref={titleRef}>{data.name.common}</Title>
        {nativeLine ? <NativeNames ref={nativeNamesRef}>{nativeLine}</NativeNames> : null}
      </Body>
    </Card>
  )
}

export default CountryCard
