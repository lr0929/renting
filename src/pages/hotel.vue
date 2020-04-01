<!-- 公寓入住 -->
<template>
  <div class="container">
    <div class="hotel_header">
      <div class="hotel_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="hotel_title">
        <font>公寓入住</font>
      </div>
    </div>
    <div class="form">
      <form action="">
        <input type="text" placeholder="请输入公寓名称" v-model="hotel_name" maxlength="12">
        <input type="text" placeholder="请输入房源数量" v-model="hotel_num" maxlength="5">
        <yd-cell-group>
          <yd-cell-item arrow>
            <span slot="left"></span>
            <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly placeholder="请选择所在城市">
          </yd-cell-item>
        </yd-cell-group>
        <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
        <input type="text" placeholder="请输入联系人" v-model="hotel_man" maxlength="13">
        <input type="text" placeholder="请输入联系方式" v-model="hotel_phone" maxlength="11">
        <button @click="join">立即加入</button>
      </form>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  import District from 'ydui-district/dist/jd_province_city_area_id'
  import 'vue-ydui/dist/ydui.base.css'
  export default {
    name: 'hotel',
    data() {
      return {
        show1: false,
        model1: '',
        district: District,
        hotel_name: "",
        hotel_num: "",
        hotel_man: "",
        hotel_phone: "",
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        'hotelname',
        'hotelnum',
        'hotelcity',
        'hotelman',
        'hotelphone',
        "userinfo",
      ])
    },
    watch: {
      hotel_name: function(val) {
        this.sethotelname(val)
      },
      hotel_num: function(val) {
        this.sethotelnum(val)
      },
      model1: function(val) {
        this.sethotelcity(val)
      },
      hotel_man: function(val) {
        this.sethotelman(val)
      },
      hotel_phone: function(val) {
        this.sethotelphone(val)
      },
    },
    created() {

    },
    mounted() {

    },
    methods: {
      ...mapActions({
        sethotelname: 'sethotelname',
        sethotelnum: 'sethotelnum',
        sethotelcity: 'sethotelcity',
        sethotelman: 'sethotelman',
        sethotelphone: 'sethotelphone',
        setuserinfo: 'setuserinfo'
      }),
      result1(ret) {
        this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
      getuserinfo: function() {
        let $this = this;
        this.$axios.post(this.url + 'api/getuserinfo', {
            token: $this.token,
          })
          .then(res => {
            $this.setuserinfo(res.data.data)
          })
      },
      join: function() {
        let $this = this
        let name = $this.hotelname
        let peonum = $this.hotelnum
        let address = $this.hotelcity
        let contacts = $this.hotelman
        let tel = $this.hotelphone
        let userinfo = $this.userinfo
        this.$axios.post(this.url + 'api/realname_card_apartment', {
            "token": userinfo.token,
            "name": name,
            "peonum": peonum,
            "address": address,
            "contacts": contacts,
            "tel": tel,
          })
          .then(res => {
            // console.log(userinfo.token)
            $this.getuserinfo()
            alert(res.data.msg)
          })
      }
    }
  }
</script>

<style scoped="scoped">
  .hotel_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .hotel_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .hotel_headimg img {
    width: 100%;
    height: 100%;
  }

  .hotel_title {
    width: 6.47rem;
    height: 0.53rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 0.33rem;
  }

  .form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background-color: white;
  }

  .form input {
    width: 100%;
    height: 1.05rem;
    margin: 0.28rem 0;
    border: none;
    border: 3px solid #f5f6f8;
    border-radius: 0.08rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    font-family: "microsoft yahei"
  }

  .form input:not(:first-child) {
    margin-top: 2px;
  }

  .form button {
    width: 100%;
    height: 0.88rem;
    background-color: #F23436;
    color: white;
    border: none;
    border-radius: 0.08rem;
  }
</style>
