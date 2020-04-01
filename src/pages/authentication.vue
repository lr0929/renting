<template>
  <div>
    <!-- 房东实名认证 -->
    <div class="landlord_cert">
      <div class="certification_header">
        <div class="certification_headimg">
          <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
        </div>
        <div class="certification_title">
          <font>房东认证</font>
        </div>
      </div>
      <div class="certification_intro">
        <div class="intro_base">
          <div class="intro_name">
            <label>姓名</label>
            <input type="text" placeholder="请填写您的姓名" v-model="authent_name" maxlength="13">
          </div>
          <div class="intro_card">
            <label>证件号码</label>
            <input type="text" placeholder="请填写真实的身份证号码" v-model="authent_card" maxlength="18">
          </div>
        </div>
        <div class="intro_detail">
          <div class="detail_title">
            <font>个人身份证明</font>
          </div>
          <div class="detail_explain">
            <font>请上传个人手持身份证及正反面</font>
          </div>
          <div class="detail_card">
            <div class="cert_img">
              <label>
                <input type="file" hidden="hidden" @change="holdchange">
                <img :src="holdImg" alt="">
                <font>上传手持身份证人像面</font>
              </label>
            </div>
            <div class="cert_img">
              <label>
                <input type="file" hidden="hidden" @change="portraitchange">
                <img :src="portImg" alt="">
                <font>上传身份证人像面</font>
              </label>
            </div>
            <div class="cert_img">
              <label>
                <input type="file" hidden="hidden" @change="emblemchange">
                <img :src="embleImg" alt="">
                <font>上传身份证国徽面</font>
              </label>
            </div>
          </div>
          <div class="upload_explain">
            <p>说明:此处,上传身份证证件信息仅用于
              <font>个人认证资料时使用,请放心上传</font>
            </p>
          </div>
          <div class="submitbtn">
            <button @click="refer">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"

  export default {
    name: 'authentication',
    data() {
      return {
        authent_name: "",
        authent_card: "",
        url: 'http://49.235.188.239:3002/',
        cardimg: [],
        holdImg: require("../assets/img/certification_front.jpg"),
        portImg: require("../assets/img/certification_fronts.jpg"),
        embleImg: require("../assets/img/certification_reverse.jpg"),
      }
    },
    computed: {
      ...mapGetters([
        'authentname',
        'authentcard',
        "userinfo",
        "token"
      ])
    },
    watch: {
      authent_name: function(val) {
        this.setauthentname(val)
      },
      authent_card: function(val) {
        this.setauthentcard(val)
      },
    },
    created() {

    },
    mounted() {

    },
    methods: {
      ...mapActions({
        setauthentname: 'setauthentname',
        setauthentcard: 'setauthentcard',
        setuserinfo: 'setuserinfo',
        setloading: "setloading"
      }),
      holdchange: function(e) {
        let $this = this
        //获取上传的图片里面的信息
        // console.log(e.target.files[0])
        let holdimg = e.target.files[0];
        //调用图片上传的函数
        $this.upload(holdimg)
          .then(res => {
            $this.holdImg = $this.url + res.data.url
            $this.cardimg.push(res.data.url)
            // console.log(res)
          })
      },
      upload: function(holdimg) {
        let $this = this
        let formData = new FormData()
        formData.append("_img", holdimg)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          } //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
        };
        return this.$axios.post(this.url + 'api/_img', formData, config)

      },
      portraitchange: function(e) {
        let $this = this
        let portImg = e.target.files[0];
        $this.upload(portImg)
          .then(res => {
            $this.portImg = $this.url + res.data.url
            $this.cardimg.push(res.data.url)
            // console.log(res)
          })
      },
      uploads: function(portImg) {
        let $this = this
        // let fileReader = new FileReader()
        // fileReader.readAsDataURL(portImg)
        // fileReader.onload = function(e) {
        //   $this.portImg = e.target.result
        // }
        let formData = new FormData()
        formData.append("_img", portImg)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          } //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
        };
        return this.$axios.post(this.url + 'api/_img', formData, config)
      },
      emblemchange: function(e) {
        let $this = this
        let embleImg = e.target.files[0];
        $this.upload(embleImg)
          .then(res => {
            $this.embleImg = $this.url + res.data.url
            $this.cardimg.push(res.data.url)
            // console.log(res)
          })
      },
      uploades: function(embleImg) {
        let $this = this
        let formData = new FormData()
        formData.append("_img", embleImg)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          } //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
        };
        return this.$axios.post(this.url + 'api/_img', formData, config)
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
      refer: function() {
        let $this = this;
        let authentname = $this.authentname
        let authentcard = $this.authentcard
        $this.$axios.post($this.url + 'api/realname_card_landlord', {
            name: authentname,
            card: authentcard,
            cardimg: $this.cardimg,
            token: $this.token,
          })
          .then(res => {
            // console.log(res)
            $this.setuserinfo(res.data.data)
            alert(res.data.msg)
          })
      }
    }
  }
</script>

<style scoped="scoped">
  .container {
    background-color: #ececec;
  }

  .certification_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .certification_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .certification_headimg img {
    width: 100%;
    height: 100%;
  }

  .certification_title {
    width: 6.47rem;
    height: 0.53rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 0.33rem;
  }

  .certification_intro {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .intro_base {
    width: 100%;
    height: 3.08rem;
    margin-bottom: 0.4rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background-color: white;
  }

  .intro_base div {
    border-bottom: 1px solid #f5f3f4;
    margin-bottom: .1rem;
  }

  .intro_name {
    display: flex;
    flex-wrap: wrap;
  }

  .intro_base label {
    width: 100%;
    padding-top: 0.47rem;
    font-size: 0.28rem;
  }

  .intro_base input {
    width: 100%;
    margin: 0.2rem 0;
    border: none;
    font-size: 0.35rem;
  }

  .intro_detail {
    width: 100%;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }

  .detail_title {
    width: 100%;
    padding-top: 0.3rem;
    font-size: 0.29rem;
  }

  .detail_explain {
    width: 100%;
    margin: .2rem 0;
  }

  .detail_card {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .cert_img {
    position: relative;
  }

  .cert_img input {
    width: 2.14rem;
    height: 1.4rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .detail_card img {
    display: block;
    width: 2.14rem;
    height: 1.4rem;
  }

  .detail_card font {
    display: block;
    width: 2.14rem;
    font-size: 0.21rem;
    text-align: center;
    color: #c5c5c5;
  }

  .upload_explain {
    width: 100%;
    display: flex;
    color: #c5c5c5;
  }

  .upload_explain p {
    width: 100%;
    margin: 0.45rem 0 0.85rem;
  }

  .upload_explain p font {
    margin-left: 0.48rem;
  }

  .submitbtn button {
    width: 6.78rem;
    height: 0.94rem;
    color: white;
    background-color: #f23436;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0.08rem;
    font-size: 0.37rem;
  }
</style>
