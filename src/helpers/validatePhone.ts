const regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

const validate = (phone: string) => {
  return regexp.test(phone) ? null : 'Неверный формат'
}

export default validate
