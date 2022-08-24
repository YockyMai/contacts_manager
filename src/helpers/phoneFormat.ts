const phoneFormat = (number: string) => {
  let phone = number.replace(/\D/g, '').split(/(?=.)/)
  let i = phone.length - 1

  if (0 <= i) phone.unshift('+ ')

  if (1 <= i) phone.splice(2, 0, ' ')

  if (4 <= i) phone.splice(6, 0, ' ')

  if (7 <= i) phone.splice(10, 0, '-')

  if (9 <= i) phone.splice(13, 0, '-')

  return phone.join('')
}
export default phoneFormat
