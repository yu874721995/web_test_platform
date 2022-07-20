export function getBudgetstatisticsList() {
  return axios({
    method: 'get',
    url: '/mis/XXXXXX/XXXX.jsonlist'
  })
}