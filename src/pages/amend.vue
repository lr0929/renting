<!-- 修改密码 -->
<template>
  <div>
    <div class="forget_header">
      <div class="forget_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="forget_title">
        <font>修改密码</font>
      </div>
    </div>
    <div class="form">
      <form>
        <input type="text" placeholder="用户名/手机号" @blur="ifexit" v-model="user" maxlength="11">
        <div class="code">
          <input type="text" placeholder="验证码" v-model="code" maxlength="6">
          <button v-show="show" @click="getCode">获取验证码</button>
          <button v-show="!show">{{count}}秒</button>
        </div>
        <input type="password" placeholder="旧密码" v-model="oldpass" maxlength="12" @blur="ifoldpsd">
        <input type="password" placeholder="新密码" v-model="newpass" maxlength="12">
        <router-link to="/logger">
          <input type="button" value="立即修改" @click="alter">
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  export default {
    name: 'amend',
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        user: "",
        code: "",
        oldpass: "",
        newpass: "",
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        'usernames',
        'codes',
        'oldpsd',
        'newpsd',
        'loginpass',
        'loginuser',
      ])
    },
    watch: {
      user: function(val) {
        this.setkey(val)
      },
      code: function(val) {
        this.setcode(val)
      },
      oldpass: function(val) {
        this.setoldpsd(val)
      },
      newpass: function(val) {
        this.setnewpsd(val)
      },
    },
    created() {

    },
    mounted() {

      // console.log(this.newpsd)
    },
    methods: {
      ifexit: function() {
        let $this = this
        let usernames = $this.usernames
        this.$axios.post(this.url + 'api/sginmobile', {
            mobile: usernames,
          })
          .then(res => {
            alert(res.data.msg)
          })
      },
      getCode() {
        let $this = this
        let usernames = $this.usernames
        this.$axios.get(this.url + 'api/getcode?mobile=' + usernames, {
            params: {
              mobile: usernames,
            }
          })
          .then(res => {
            $this.code = res.data.code
          })
        const time_count = 60;
        if (!this.timer) {
          this.count = time_count;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= time_count) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      ...mapActions({
        setkey: 'setkey',
        setcode: 'setcode',
        setoldpsd: 'setoldpsd',
        setnewpsd: 'setnewpsd',
      }),
      ifoldpsd: function() {
        let $this = this
        let oldpsd = $this.oldpsd
        let usernames = $this.usernames
        this.$axios.post(this.url + 'api/judgeoldpass', {
            mobile: usernames,
            code: "111",
            userpass: oldpsd,
          })
          .then(res => {
            alert(res.data.msg)
          })
      },
      alter: function() {
        let $this = this
        let username = $this.usernames
        let code = $this.codes
        let oldpass = $this.oldpsd
        let newpass = $this.newpsd
        let equal = $this.loginpass
        if (username != "" && code != "" && oldpass != "" && newpass != "") {
          if (oldpass === equal) {
            this.$axios.post(this.url + 'api/changePass', {
                mobile: username,
                code: "111",
                userpass: newpass,
              })
              .then(res => {
                alert(res.data.msg)
              })
          }

        }
      }
    }
  }
</script>

<style scoped="scoped">
  .forget_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .forget_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .forget_headimg img {
    width: 100%;
    height: 100%;
  }

  .forget_title {
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
    margin-top: 2.84rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    height: 1.03rem;
    margin-top: 0.23rem;
    border: none;
    border: 3px solid #f5f6f8;
    border-radius: 0.08rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }

  input:first-child {
    margin-top: 0;
  }

  input:last-child {
    height: 0.9rem;
    background-color: #F23436;
    color: white;
    border-radius: 0.15rem;
    margin-top: 0.23rem;
  }

  .code {
    margin-top: 0.23rem;
    position: relative;
  }

  .code button {
    width: 1.75rem;
    height: 0.7rem;
    border: none;
    background-color: transparent;
    font-weight: bold;
    position: absolute;
    top: 15%;
    right: 5%;
    outline: none;
  }
</style>
