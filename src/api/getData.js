import axios from 'axios'
import store from './../store'

let configUrl = `${window.location.origin}/static/config/config.json`
let languageUrl = `${window.location.origin}/static/config/language.json`

const successCode = '00'
const headers = {
  'Content-Type': 'application/json'
}

async function http (url, method = 'GET', headers, data = {}) {
  method = method.toUpperCase()
  if (url.indexOf('http') === -1) {
    url = store.state.host + url
  }
  let reqConfig = {
    method,
    url,
    headers
  }
  if (method === 'GET') {
    reqConfig.params = data
  } else {
    reqConfig.data = data
  }
  try {
    const res = await axios(reqConfig)
    const resObj = res.data
    console.log(res)
    let result
    if (resObj.status === successCode) {
      result = {
        data: resObj.data,
        offset: resObj.offset,
        success: true,
        url: resObj.url
      }
    } else {
      result = {
        code: resObj.messageCode,
        msg: resObj.message,
        success: false
      }
    }
    return result
  } catch (error) {
    return {
      code: '999',
      msg: '服务器繁忙，请稍后重试。',
      success: false
    }
  }
}

export const getCompanyList = (customerId) => http('/companyinfo/compnayList', 'GET', headers, { customerId })

export const accountLogin = (loginInfo) => http('/customer/login', 'GET', headers, loginInfo)

export const getCategoryList = (companyId) => http('/goods/category', 'GET', headers, { companyId })

export const getGoods = (companyId, categoryId) => http('/goods/list', 'GET', headers, { companyId, categoryId })

export const getGoodsDetail = (companyId, goodsNo) => http('/goods/info', 'GET', headers, { companyId, goodsNo })

export const bindCustomer = (customerId, companyCode, customerCode) => http('/companyinfo/bindCustomer', 'GET', headers, { customerId, companyCode, customerCode })

export const getAddress = (customerId) => http('/customer/address/list', 'GET', headers, { customerId })

export const newAddress = (data) => http('/customer/address/add', 'POST', headers, data)

export const updateAddress = (data) => http('/customer/address/update', 'POST', headers, data)

export const commitOrder = (data) => http('/order/commit', 'POST', headers, data)

export const getOrder = (customerId, companyId, status) => http('/order/all', 'GET', headers, { customerId, companyId, status })

export const getOrderDetail = (customerId, companyId, orderGuid) => http('/order/goods', 'GET', headers, { customerId, companyId, orderGuid })

export const search = (companyId, q) => http('/goods/search', 'GET', headers, { companyId, q })

export const getIosApp = (ver) => http('http://dadisoft.cn:8080/PMBOX/BoxRequest', 'GET', headers, { type: 'checksoftupdate', app: 'phoneios', ver })

export const getAndroidApp = (ver) => http('http://dadisoft.cn:8080/PMBOX/BoxRequest', 'GET', headers, { type: 'checksoftupdate', app: 'phoneandroid', ver })

export const getBanner = (companyId) => http('/companyinfo/adpic', 'GET', headers, { companyId })

export const getCart = (customerId, companyId) => http('/shoppingcar/get', 'GET', headers, { customerId, companyId })

export const addCart = (customerId, companyId, data) => http(`/shoppingcar/add?customerId=${customerId}&companyId=${companyId}`, 'POST', headers, data)

export const updateCart = (customerId, companyId, data) => http(`/shoppingcar/update?customerId=${customerId}&companyId=${companyId}`, 'POST', headers, data)

export const deleteCart = (customerId, companyId, data) => http(`/shoppingcar/delete?customerId=${customerId}&companyId=${companyId}`, 'POST', headers, data)

export const getConfig = () => http(configUrl, 'GET', headers)

export const getLanguage = () => http(languageUrl, 'GET', headers)
