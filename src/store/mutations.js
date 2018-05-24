import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART,
  SET_CATEGORYLIST,
  CLEAR_CART,
  SET_COMPANYID,
  SET_HOST,
  SET_ADDBYBAG,
  SET_SHOWZK,
  SET_COMPUTEDZK,
  SET_LANGUAGE
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 加入购物车
  [ADD_CART] (state, {productId, salePrice, productName, productImg, productNum = 1, bagcount}) {
    let cart = state.cartList // 购物车
    let falg = true
    let goods = {
      productId,
      salePrice,
      productName,
      productImg,
      bagcount
    }
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        if (item.productId === productId) {
          if (item.productNum >= 0) {
            falg = false
            item.productNum += productNum
            item.salePrice = salePrice
          }
        }
      })
    }
    if (!cart.length || falg) {
      goods.productNum = productNum
      cart.push(goods)
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  [REDUCE_CART] (state, {productId}) {
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.productId === productId) {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 修改购物车
  [EDIT_CART] (state, {productId, productNum}) {
    let cart = state.cartList
    if (productNum) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          item.productNum = productNum
        }
      })
    } else if (productId) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          cart.splice(i, 1)
        }
      })
    }
    state.cartList = cart
    console.log(state.cartList)
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  [CLEAR_CART] (state) {
    state.cartList = []
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  [SET_CATEGORYLIST] (state, categoryList) {
    state.categoryList = []
    categoryList.forEach(category => {
      if (category.level === 0) {
        category.secondaryList = []
        state.categoryList.push(category)
      } else {
        state.categoryList[state.categoryList.length - 1].secondaryList.push(category)
      }
    })
  },
  [SET_COMPANYID] (state, companyId) {
    state.companyId = companyId
    setStore('companyId', companyId)
  },
  [SET_HOST] (state, host) {
    state.host = host
    setStore('host', host)
  },
  [SET_SHOWZK] (state, showZk) {
    state.showZk = showZk
    setStore('showZk', showZk)
  },
  [SET_ADDBYBAG] (state, addByBag) {
    state.addByBag = addByBag
    setStore('addByBag', addByBag)
  },
  [SET_COMPUTEDZK] (state, computedZk) {
    state.computedZk = computedZk
    setStore('computedZk', computedZk)
  },
  [SET_LANGUAGE] (state, language) {
    console.log(language)
    let type = getStore('languageType')
    if (type) {
      state.language = language[type]
    } else {
      type = 'Chinese'
      state.language = language[type]
      setStore('languageType', 'Chinese')
    }
  }
}
