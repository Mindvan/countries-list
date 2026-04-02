import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../app/providers/AppProvider'

const Page = styled.main`
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 1rem;
`

const Card = styled.form`
  width: 100%;
  max-width: 380px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgb(15 23 42 / 8%);
`

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
`

const Field = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
`

const Input = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid
    ${(p) => (p.$invalid ? '#f87171' : 'var(--color-border)')};
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);

  &:focus {
    outline: 2px solid var(--color-outline);
    border-color: var(--color-outline);
  }
`

const FieldError = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: #dc2626;
`

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  background: var(--color-outline);
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }
`

const Note = styled.p`
  margin: 1rem 0 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--color-text-muted);
`

function validatePassword(password: string): string | null {
  if (password.length < 4) {
    return 'Пароль: не меньше 4 символов.'
  }
  if (!/[a-zA-Z]/.test(password)) {
    return 'Пароль: нужна хотя бы одна латинская буква (a–z).'
  }
  if (!/[0-9]/.test(password)) {
    return 'Пароль: нужна хотя бы одна цифра.'
  }
  return null
}

function displayNameFromEmail(email: string): string {
  const local = email.trim().split('@')[0]
  return local.length > 0 ? local : email.trim() || 'гость'
}

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const err = validatePassword(password)
    setPasswordError(err)
    if (err) return
    login(displayNameFromEmail(email))
    navigate('/')
  }

  return (
    <Page>
      <Card onSubmit={onSubmit} noValidate>
        <Title>Авторизация</Title>
        <Field>
          Email
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          Пароль
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            $invalid={!!passwordError}
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError(null)
            }}
            required
          />
          {passwordError ? <FieldError>{passwordError}</FieldError> : null}
        </Field>
        <SubmitButton type="submit">Войти</SubmitButton>
        <Note>
          Пароль должен быть не короче 4 символов и содержать хотя бы одну цифру
          и одну латинскую букву. Серверной авторизации нет, поэтому можно ввести любые данные с учётом валидации.
        </Note>
      </Card>
    </Page>
  )
}
