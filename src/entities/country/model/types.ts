export type CountryNameBase = {
  official: string
  common: string
}

export type CountryNativeNames = Record<string, CountryNameBase>

export type CountryNameMain = CountryNameBase & {
  nativeName: CountryNativeNames
}

export type CountryCurrency = {
  code: string
  name: string
  symbol: string
}

export type CountryLanguage = {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

export type CountryFlag = {
  svg: string
  png: string
  alt: string
  emoji: string
}

export type CountryReligion = {
  name: string
  percentage: number
  population: number
}

export type Country = {
  name: CountryNameMain
  cca3: string
  currencies: CountryCurrency[]
  capital: string[]
  continents: string[]
  languages: CountryLanguage[]
  borders: string[]
  flag: CountryFlag
  population: number
  religion: CountryReligion[]
}
