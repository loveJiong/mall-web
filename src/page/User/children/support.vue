<template>
  <div>
    <y-shelf :title="language.support.title">
      <div class="content" slot="content">
        <div>
          <p>{{language.support.text}}</p>
          <br>
          <p>{{language.support.linkType}}</p>
          <p>{{language.support.phone}}：925788835</p>
          <p>{{language.support.wechat}}：GLORIAEUROPA</p>
          <p>{{language.support.address}}：C/FUENTECILLA 34-40 45340 ONTIGOLA TOLEDO ESPANA</p>
          <!-- <br>
          <span class="support">如有疑问请联系邮箱1012139570@qq.com</span> -->
        </div>
        <img width="250" src="/static/images/qrcode.png">
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['language'])
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 30px 80px;
    text-align: center;
    > div {
      text-align: left;
      margin-bottom: 20px;
    }
  }
  .support {
    line-height: 2em;
    font-size: 22px;
    color: #999;
  }
</style>
