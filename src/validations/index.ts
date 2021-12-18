import email from 'email-validator'

function isEmpty(data: string | null | Array<object>) {
  let result = false
  if (data === null || data === '' || data.length <= 0) result = true
  return result
}

function isValidEmail(data: string) {
  let result = null
  result = email.validate(data)
  return result
}

export default {
  isEmpty,
  isValidEmail,
}
