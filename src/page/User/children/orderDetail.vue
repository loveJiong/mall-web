<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <div v-loading="loading" style="min-height: 10vw;" v-if="orderList.length">
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">{{language.orderDetail.goodName}}</span>
              </div>
              <div class="f-bc">
                <span class="price">{{language.orderDetail.price}}</span>
                <span class="num">{{language.orderDetail.count}}</span>
                <span class="operation">{{language.orderDetail.subtotal}}</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in orderList" :key="i">
              <div class="img-box"><img :src="item.url" alt=""></div>
              <div class="name-cell ellipsis">
                <div title="">{{showName(item)}}</div>
              </div>
              <div class="n-b">
                <div class="price">€ {{item.price}}</div>
                <div class="goods-num">{{item.count}}</div>
                <div class="subtotal"> € {{item.totalPrice}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">{{language.orderDetail.totalPrice}}</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">€ {{(+orderTotal).toFixed(2)}}</span>
            </p>
          </div>
        </div>
        <div v-loading="loading" v-else>
          <div style="padding: 100px 0;text-align: center">
            {{language.orderDetail.err}}
          </div>
        </div>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import { getOrderDetail } from '/api/getData'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderId: '',
        orderGuid: '',
        userName: '',
        tel: '',
        streetName: '',
        orderTitle: '',
        createTime: '',
        payTime: '',
        closeTime: '',
        finishTime: '',
        orderTotal: '',
        loading: true,
        countTime: 0
      }
    },
    computed: {
      ...mapState(
        ['language']
      )
    },
    methods: {
      async _getOrderDet () {
        this.loading = true
        let orderListRes = await getOrderDetail(this.userId, this.companyId, this.orderGuid)
        if (orderListRes.success) {
          this.orderList = orderListRes.data
        }
        this.loading = false
      },
      showName (good) {
        let result = good.name
        if (this.language.type === 'Spanish') {
          result = good.xname || good.name
        }
        return result
      }
    },
    created () {
      this.userId = getStore('userId')
      this.companyId = getStore('companyId')
      this.orderGuid = this.$route.query.orderGuid
      this.orderTotal = this.$route.query.orderTotal
      this.orderTitle = this.language.orderDetail.title + this.$route.query.orderId
      this._getOrderDet()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }
  
  img {
    display: block;
    @include wh(106px, 80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 150px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
    .price {
      padding-left: 107px;
    }
    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 10px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>
