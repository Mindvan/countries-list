import styled from 'styled-components'

const Root = styled.form`
  margin: 0;
  width: 100%;
  max-width: 320px;
`

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.35rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgb(99 102 241 / 18%);
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
      <Label htmlFor="country-search">Поиск по названию</Label>
      <Input
        id="country-search"
        type="search"
        autoComplete="off"
        placeholder="Например, Russia"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Root>
  )
}
