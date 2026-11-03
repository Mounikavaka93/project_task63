function isPersonName(value) {
  const name = value.trim()
  if (name.length < 2 || name.length > 60) return false
  return /^[\p{L}][\p{L}\s.'-]*$/u.test(name)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

function digitCount(value) {
  return value.replace(/\D/g, "").length
}

function ageFrom(iso, today = new Date()) {
  if (!iso) return null
  const dob = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(dob.getTime())) return null
  let age = today.getFullYear() - dob.getFullYear()
  const month = today.getMonth() - dob.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) age -= 1
  return age
}

export function emptyMembership(overrides = {}) {
  return {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    plan: "",
    sport: "",
    emergency: "",
    terms: false,
    ...overrides,
  }
}

export function emptyContact(overrides = {}) {
  return {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    ...overrides,
  }
}

export function validateMembership(values) {
  const errors = {}
  const age = ageFrom(values.dob)

  if (!isPersonName(values.fullName)) {
    errors.fullName = "Enter the member’s full name."
  }

  if (!isEmail(values.email)) {
    errors.email = "Enter a valid email address."
  }

  if (digitCount(values.phone) < 10 || digitCount(values.phone) > 15) {
    errors.phone = "Enter a phone number with 10 to 15 digits."
  }

  if (age === null) {
    errors.dob = "Enter a valid date of birth."
  } else if (age < 6 || age > 100) {
    errors.dob = "Membership is for ages 6 to 100. Check the date of birth."
  }

  if (!values.plan) {
    errors.plan = "Choose a membership plan."
  } else if (age !== null && !errors.dob) {
    if (values.plan === "junior" && age > 15) {
      errors.plan = "Junior Spark is for ages 6–15. Choose another plan."
    }
    if ((values.plan === "active" || values.plan === "elite") && age < 16) {
      errors.plan = "This plan is for ages 16 and over. Choose Junior Spark or Family Court."
    }
    if (values.plan === "family" && age < 18) {
      errors.plan = "The family account holder needs to be 18 or over."
    }
  }

  if (!values.sport) {
    errors.sport = "Choose a primary sport."
  }

  if (!isPersonName(values.emergency)) {
    errors.emergency = "Enter an emergency contact name."
  }

  if (!values.terms) {
    errors.terms = "Accept the club guidelines to send the request."
  }

  return errors
}

export function validateContact(values) {
  const errors = {}

  if (!isPersonName(values.fullName)) {
    errors.fullName = "Enter your full name."
  }

  if (!isEmail(values.email)) {
    errors.email = "Enter a valid email address."
  }

  if (values.phone.trim()) {
    const digits = digitCount(values.phone)
    if (digits < 10 || digits > 15) {
      errors.phone = "Enter a phone number with 10 to 15 digits, or leave it blank."
    }
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "Add a short subject."
  }

  if (values.message.trim().length < 20) {
    errors.message = "Write at least 20 characters so the desk knows how to help."
  } else if (values.message.trim().length > 1000) {
    errors.message = "Keep the message under 1,000 characters."
  }

  return errors
}
