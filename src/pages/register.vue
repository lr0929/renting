<template>
  <div>
    <div class="register_header">
      <div class="register_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="register_title">
        <font>注册</font>
      </div>
    </div>
    <div class="form">
      <form>
        <input type="text" placeholder="用户名/手机号" v-model="user"  maxlength="11">
        <div class="code">
          <input type="text" placeholder="验证码" v-model="codes" maxlength="6">
          <button v-show="show" @click="getCode">获取验证码</button>
          <button v-show="!show">{{count}}秒</button>
        </div>
        <input type="password" placeholder="密码" v-model="pass" maxlength="12">
        <router-link to="/logger">
          <span>已有账户? 直接登录</span>
        </router-link>
        <router-link to="/logger">
          <input type="button" value="立即注册" @click="enroll">
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
    name: 'register',
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        user: "",
        pass: "",
        codes: "",
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        'username',
        "code",
        'password',
      ])
    },
    watch: {
      user: function(val) {
        this.setkey(val)
      },
      codes: function(val) {
        this.setcode(val)
      },
      pass: function(val) {
        this.setpass(val)
      },

    },
    created() {

    },
    mounted() {

    },
    methods: {
      getCode() {
        let $this = this
        let username = $this.username
        this.$axios.get(this.url + 'api/getcode?mobile=' + username, {
            params: {
              mobile: username,
            }
          })
          .then(res => {
            $this.codes = res.data.code
            // console.log($this.codes)
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
        setpass: 'setpass',
      }),

      // 立即注册
      enroll: function() {
        let $this = this
        let username = $this.username
        let code = $this.code
        let password = $this.password
        // console.log(username)
        // console.log($this.code)
        // console.log($this.password)
        if (username != "" && code != "" && password != "") {
          this.$axios.post(this.url + 'api/register', {
              mobile: username,
              code: "111",
              userpass: password,
            })
            .then(res => {
              let $this = this
              // console.log(res)
              alert(res.data.msg)
            })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .register_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .register_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .register_headimg img {
    width: 100%;
    height: 100%;
  }

  .register_title {
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

  input:last-child {
    height: 0.9rem;
    background-color: #F23436;
    color: white;
    border-radius: 0.15rem;
    margin-top: 0.23rem;
  }

  span {
    color: #1555eb;
    float: right;
    margin: 0.23rem 0 0.25rem;
  }
</style>
