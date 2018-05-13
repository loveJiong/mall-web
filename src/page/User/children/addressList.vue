<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right" v-if="this.isAdd"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.linkMan}}</div>
            <div class="address-msg">{{item.companyAddress}}</div>
            <div class="telephone">{{item.linkTelephone}}</div>
            <!-- <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault?'( 默认地址 )':'设为默认'"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div> -->
            <div class="operation">
              <el-button type="primary" icon="edit" size="small"  @click="update(item)"></el-button>
              <!-- <el-button type="danger" icon="delete" size="small" :data-id="item.addressId" @click="del(item.addressId,i)"></el-button> -->
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md">
        <div>
          <span>公司名称</span>
          <input type="text" placeholder="公司名称" v-model="msg.companyName">
        </div>
        <div>
          <span>联系人</span>
          <input type="text" placeholder="联系人" v-model="msg.linkMan">
        </div>
        <div>
          <span>税号</span>
          <input type="text" placeholder="税号" v-model="msg.companySh">
        </div>
        <div>
          <span>地址</span>
          <input type="text" placeholder="地址" v-model="msg.companyAddress">
        </div>
        <div>
          <span>城市</span>
          <input type="text" placeholder="城市" v-model="msg.city">
        </div>
        <div>
          <span>省份</span>
          <input type="text" placeholder="省份" v-model="msg.province">
        </div>
        <div>
          <span>国家</span>
          <input type="text" placeholder="国家" v-model="msg.country">
        </div>
        <div>
          <span>邮政编码</span>
          <input type="text" placeholder="邮政编码" v-model="msg.postalCode">
        </div>
        <div>
          <span>联系电话</span>
          <input type="text" placeholder="联系电话" v-model="msg.linkTelephone">
        </div>
        <div>
          <span>电子邮箱</span>
          <input type="text" placeholder="电子邮箱" v-model="msg.linkEmail">
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save(msg)">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { getAddress, updateAddress, newAddress } from '/api/getData'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        userId: '',
        isAdd: false
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.companyName && msg.linkMan && msg.companySh && msg.companyAddress && msg.city && msg.province && msg.country && msg.postalCode && msg.linkTelephone && msg.linkEmail
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      async _addressList () {
        let addressRes = await getAddress(this.userId)
        if (addressRes.success && addressRes.data.length > 0) {
          this.addList = [addressRes.data[0]]
        } else if (addressRes.success && addressRes.data.length === 0) {
          this.isAdd = true
        }
      },
      async _addressUpdate (data) {
        let updateAddressRes = await updateAddress(data)
        if (updateAddressRes.success) {
          this.$message.success('恭喜您，更新地址成功！')
          this._addressList()
        } else {
          this.$message.error('更新地址失败，请稍后重试。')
        }
      },
      async _addressAdd (data) {
        data.customerId = this.userId
        let newAddressRes = await newAddress(data)
        if (newAddressRes.success) {
          this.$message.success('恭喜您，新增地址成功！')
          this._addressList()
        } else {
          this.$message.error('新增地址失败，请稍后重试。')
        }
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
      },
      // 保存
      save (p) {
        console.log(p)
        this.popupOpen = false
        if (!this.isAdd) {
          this._addressUpdate(p)
        } else {
          this._addressAdd(p)
        }
      },
      // 删除
      // del (addressId, i) {
      //   addressDel({addressId: addressId}).then(res => {
      //     if (res.success === true) {
      //       this.addList.splice(i, 1)
      //     } else {
      //       this.message('删除失败')
      //     }
      //   })
      // },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg = {
            companyName: item.companyName,
            linkMan: item.linkMan,
            companySh: item.companySh,
            companyAddress: item.companyAddress,
            city: item.city,
            province: item.province,
            country: item.country,
            postalCode: item.postalCode,
            linkTelephone: item.linkTelephone,
            linkEmail: item.linkEmail,
            id: item.id,
            customerId: item.customerId
          }
        } else {
          this.popupTitle = '新增收货地址'
          this.msg = {}
        }
      }
    },
    created () {
      this.userId = getStore('userId')
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    .name {
      float: left;
      text-align: left;
    }
    span {
      width: 137px;
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      margin-left: 115px; 
    }
    .tel {
      margin-left: 195px; 
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 215px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > span {
        display: inline-block;
        width: 15%;
      }
      > input {
        width: 84%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
