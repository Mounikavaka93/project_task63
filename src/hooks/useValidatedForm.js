import { useState } from "react"

function sameErrors(left, right) {
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  if (leftKeys.length !== rightKeys.length) return false
  return rightKeys.every((key) => left[key] === right[key])
}

export function useValidatedForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)

  function update(name, value) {
    const next = { ...values, [name]: value }
    setValues(next)
    setErrors((existing) => {
      if (Object.keys(existing).length === 0) return existing
      const validated = validate(next)
      return sameErrors(existing, validated) ? existing : validated
    })
  }

  function reset(nextValues) {
    setValues(nextValues)
    setErrors({})
  }

  function handleSubmit(event, onValid) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const fields = Object.keys(nextErrors)
    if (fields.length > 0) {
      document.getElementById(fields[0])?.focus()
      return
    }
    onValid(values)
  }

  return { values, setValues, errors, notice, setNotice, update, reset, handleSubmit }
}
