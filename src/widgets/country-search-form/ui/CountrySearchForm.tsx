import styled from 'styled-components'

const Root = styled.form`
  margin: 0;
  width: 100%;
  max-width: 320px;

  @media (max-width: 1100px) {
    max-width: 100%;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-outline);
    box-shadow: 0 0 0 0.1rem rgb(99 102 241 / 35%);
  }

  @media (max-width: 1100px) {
    min-width: 0;
  }
`

export type CountrySearchFormProps = {
  value: string
  onChange: (value: string) => void
}

export function CountrySearchForm({ value, onChange }: CountrySearchFormProps) {
  return (
    <Root
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Input
        id="country-search"
        type="search"
        autoComplete="off"
        placeholder="Поиск по названию"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Root>
  )
}
