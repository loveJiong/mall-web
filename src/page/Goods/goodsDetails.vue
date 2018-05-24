<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumb">
            <div class="big">
              <img :src="product.picurl" :alt="product.name">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.name}}</h4>
          <h6 v-if="!login" class="price">
            <span :title="language.goodsDetails.lookPrice">
              <em>€</em><i>???</i></span>
          </h6>
          <h6 v-if="(login && (product.zk == '0' || product.zk == '')) || !showZk" class="price">
            <span>
              <em>€</em><i>{{product.price}}</i></span>
          </h6>
          <h6 v-if="showZk && login && (product.zk != '0' && product.zk != '')" class="have-zk price">
            <span style="font-size:14px">€</span>
            <span><i>{{zkPrice(product.price, product.zk)}}</i></span>
            <span class="origin-price">{{product.price}}</span>
            <span class="price-zk">(-{{product.zk}}%)</span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">{{language.goodsDetails.count}}</span>
          <buy-num @edit-num="editNum" :limit="99" :item="product"></buy-num>
        </div>
        <div class="buy">
          <y-button :text="language.goodsDetails.addToCart"
                    @btnClick="addCart(product)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <!-- <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png">
            <br>
            该商品暂无内容数据
          </div>
        </div>
      </y-shelf>
    </div> -->
  </div>
</template>
<script>
  import { addCart, getGoodsDetail } from '/api/getData'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '/components/shelf'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        productMsg: false,
        big: '',
        product: {
          salePrice: 0
        },
        productNum: 1,
        userId: ''
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart', 'companyId', 'addByBag', 'showZk', 'computedZk', 'language'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      async getGoodsDetail () {
        let goodsDetailRes = await getGoodsDetail(this.companyId, this.$route.query.productId)
        if (goodsDetailRes.success) {
          this.product = goodsDetailRes.data
          this.product.productNum = this.addByBag ? this.product.bagcount : 1
          this.productNum = this.addByBag ? this.product.bagcount : 1
        }
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
                no: product.id,
                count: this.productNum,
                price: this.zkPrice(product.price, product.zk),
                totalprice: this.zkPrice(product.price, product.zk) * this.productNum
              }]
            }
            addCart(this.userId, this.companyId, data)
            this.ADD_CART({
              productId: product.id,
              salePrice: this.zkPrice(product.price, product.zk),
              productName: product.name,
              productImg: product.picurl,
              productNum: this.productNum,
              bagcount: product.bagcount
            })
          } else { // 未登录 vuex
            // this.ADD_CART({
            //   productId: product.no,
            //   salePrice: this.zkPrice(product.price, product.zk),
            //   productName: product.name,
            //   productImg: product.picurl,
            //   productNum: this.productNum
            // })
            this.$router.push({path: '/user'})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: product.picurl})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      },
      // checkout (productId) {
      //   this.$router.push({path: '/checkout', query: {productId, num: this.productNum}})
      // },
      editNum (num) {
        this.productNum = num
      }
    },
    components: {
      YShelf, BuyNum, YButton
    },
    watch: {
      '$route': 'getGoodsDetail'
    },
    created () {
      this.userId = getStore('userId')
      this.getGoodsDetail()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price > span{
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
  .price {
    .origin-price {
      font-size: 12px;
      text-decoration: line-through;
    }
    .price-zk {
      font-size: 12px;
    }
  }
</style>
