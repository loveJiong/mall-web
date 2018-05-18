<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <a @click="goodsDetails(msg)">
          <img v-lazy="msg.url" :alt="msg.name">
        </a>
      </div>
      <h6 class="good-title" v-html="msg.name">{{msg.name}}</h6>
      <div class="good-price pr">
        <div class="ds pa">
          <a @click="goodsDetails(msg)">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </a>
          <y-button v-if="msg.price" text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(msg)"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <p v-if="!login" title="登陆后查看">
          <span style="font-size:14px" v-if="msg.price">€</span>
          ???
        </p>
        <p v-if="(login && (msg.zk == '0' || msg.zk == '')) || !showZk">
          <span style="font-size:14px" v-if="msg.price">€</span>
          {{msg.price}}
        </p>
        <p class="have-zk" v-if="showZk && login && (msg.zk != '0' && msg.zk != '')">
          <span style="font-size:14px" v-if="msg.price">€</span>
          <span>{{zkPrice(msg.price, msg.zk)}}</span>
          <span class="origin-price">{{msg.price}}</span>
          <span class="price-zk">(-{{msg.zk}}%)</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { addCart } from '/api/getData'
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from '/utils/storage'
  export default {
    props: {
      msg: {
        price: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      goodsDetails (good) {
        let routeData = this.$router.resolve({name: 'goodsDetails'})
        window.open(`${routeData.href}?productId=${good.no}`, '_blank')
      },
      zkPrice (price, zk) {
        let num = price
        if (zk !== '0' && zk !== '' && this.computedZk) {
          num = price * (100 - zk) / 100
          num = num.toFixed(2)
        }
        return num
      },
      addCart (product) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            let data = {
              goods: [{
                no: product.no,
                count: this.addByBag ? product.bagCount : 1,
                price: this.zkPrice(product.price, product.zk),
                totalprice: this.zkPrice(product.price, product.zk)
              }]
            }
            addCart(getStore('userId'), this.companyId, data)
            this.ADD_CART({
              productId: product.no,
              salePrice: this.zkPrice(product.price, product.zk),
              productName: product.name,
              productImg: product.url,
              productNum: this.addByBag ? product.bagCount : 1,
              bagcount: product.bagCount
            })
          } else { // 未登录 vuex
            // this.ADD_CART({
            //   productId: product.no,
            //   salePrice: this.zkPrice(product.price, product.zk),
            //   productName: product.name,
            //   productImg: product.url
            // })
            this.$router.push({path: '/user'})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: product.url})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart', 'companyId', 'addByBag', 'showZk', 'computedZk'])
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 350px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }
    .origin-price {
      font-size: 12px;
      text-decoration: line-through;
    }
    .price-zk {
      font-size: 12px;
    }
  }
</style>
