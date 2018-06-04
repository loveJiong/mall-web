<template>
  <div class="category-item">
    <div style="">
      <div class="category-img">
        <a @click="toCategory(msg)">
          <img v-lazy="msg.url" :alt="msg.name">
        </a>
      </div>
      <h6 class="category-title" v-html="msg.name">{{msg.name}}</h6>
      <div class="category-price pr">
        <div class="ds pa">
          <a @click="toCategory(msg)">
            <y-button :text="language.categoryList.toDetail" style="margin: 0 5px"></y-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { mapState } from 'vuex'
  export default {
    props: {
      msg: {
        price: 0
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapState(['language'])
    },
    methods: {
      toCategory (category) {
        window.open(window.location.origin + '/#/goods?categoryId=' + category.guid + '&categoryName=' + category.name)
      }
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .category-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 350px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .category-price p {
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

    .category-img {
      img {
        margin: 50px auto 10px;
        @include wh(275px, 206px);
        display: block;
      }
    }
    .category-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }
    .category-title {
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

  }
</style>
