import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://6304f38b697408f7edbee328.mockapi.io/',
  headers: { 'X-Custom-Header': 'foobar' },
})

export default instance
