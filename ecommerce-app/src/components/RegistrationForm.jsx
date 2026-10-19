import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className="submit-button" type="submit" disabled={pending}>
      {pending ? 'Registering…' : 'Register'}
    </button>
  )
}

function validate(formData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const errors = {}

  if (name.length < 2) errors.name = 'Enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (password.length < 8) errors.password = 'Use at least 8 characters.'

  return { name, email, errors }
}

export function RegistrationForm({ onRegister }) {
  const [result, formAction] = useActionState(
    async (_previousState, formData) => {
      const { name, email, errors } = validate(formData)
      if (Object.keys(errors).length > 0) return { errors, success: false }

      await new Promise((resolve) => window.setTimeout(resolve, 700))
      onRegister({ name, email })
      return { errors: {}, success: true }
    },
    { errors: {}, success: false },
  )

  return (
    <form className="registration-form" action={formAction} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(result.errors.name)}
          aria-describedby={result.errors.name ? 'name-error' : undefined}
        />
        {result.errors.name && <span className="field-error" id="name-error">{result.errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(result.errors.email)}
          aria-describedby={result.errors.email ? 'email-error' : undefined}
        />
        {result.errors.email && <span className="field-error" id="email-error">{result.errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(result.errors.password)}
          aria-describedby={result.errors.password ? 'password-error' : undefined}
        />
        {result.errors.password && (
          <span className="field-error" id="password-error">{result.errors.password}</span>
        )}
      </div>

      <SubmitButton />
      {result.success && <p className="success-message" role="status">Registration complete.</p>}
    </form>
  )
}
