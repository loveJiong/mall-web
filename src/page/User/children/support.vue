<template>
  <div>
    <y-header>
    </y-header>
    <y-shelf :title="language.support.title" class="support">
      <div class="content" slot="content">
        <div>
          <p>{{language.support.text}}</p>
          <br>
          <p>{{language.support.linkType}}</p>
          <p>{{language.support.phone}}：925788835</p>
          <p>{{language.support.wechat}}：GLORIAEUROPA</p>
          <p>{{language.support.address}}：C/FUENTECILLA 34-40 45340 ONTIGOLA TOLEDO ESPANA</p>
        </div>
        <img width="250" src="/static/images/qrcode.png">
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YHeader from '/common/header'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['language'])
    },
    components: {
      YShelf,
      YHeader
    }
  }
</script>
<style lang="scss" scoped>
  .support {
    width: 1220px;
    margin: 0 auto;
  }
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
