import axios from 'axios'
export function apiGetImage () {
  return axios.get('https://www.easy-mock.com/mock/5fbd250b1bc0682deacbfbcc/imagemock/image')
}