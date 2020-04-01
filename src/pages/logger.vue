<template>
  <div>
    <div class="logger_header">
      <div class="logger_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="logger_title">
        <font>登录</font>
      </div>
    </div>
    <div class="form">
      <form>
        <input type="text" placeholder="用户名/手机号" v-model="users" maxlength="11">
        <input type="password" placeholder="密码" v-model="passw" maxlength="12">
        <router-link to="/forget">
          <span class="forget">忘记密码</span>
        </router-link>
        <router-link to="/register">
          <span class="existing">暂无账户? 立即注册</span>
        </router-link>
        <input type="button" value="立即登录" @click="submitbtn">
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
    name: 'logger',
    data() {
      return {
        users: "",
        passw: "",
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        'username',
        "code",
        'password',
        "loginuser",
        "loginpass",
        "userinfo",
        "token",
        "newpsd",
        "newpass",
      ])
    },
    watch: {
      users: function(val) {
        this.setuser(val)
      },
      passw: function(val) {
        this.setpassw(val)
      },
    },
    created() {

    },
    mounted() {
      // console.log(this.username)
      // console.log(this.code)
      // console.log(this.password)
      // console.log(this.loginuser)
      // console.log(this.loginpass)
    },
    methods: {
      //判断手机号是否存在，失去焦点事件，注册判断手机号是否存在也是这个方法
      // ifexit: function() {
      //   let $this = this
      //   let loginuser = $this.loginuser
      //   if (loginuser != "") {
      //     this.$axios.post(this.url + 'api/sginmobile', {
      //         mobile: loginuser,
      //       })
      //       .then(res => {
      //         alert(res.data.msg)
      //       })
      //   } else {
      //     alert("用户名/手机号不能为空")
      //   }
      // },
      ...mapActions({
        setuser: 'setuser',
        setpassw: 'setpassw',
        settoken: "settoken",
        setuserinfo: "setuserinfo",
        setpass: 'setpass',
        setnewpsd: "setnewpsd",
        setnewpass: "newpass",
      }),
      getuserinfo: function() {
        let $this = this;
        this.$axios.post(this.url + 'api/getuserinfo', {
            token: $this.token,
          })
          .then(res => {
            // console.log(res)
            $this.setuserinfo(res.data.data)
          })
      },
      submitbtn: function() {
        let $this = this
        let loginuser = $this.loginuser
        let loginpass = $this.loginpass
        if (loginuser != "" && loginpass != "") {
          this.$axios.post(this.url + 'api/loginpass', {
              mobile: loginuser,
              userpass: loginpass,
            })
            .then(res => {
              this.settoken(res.data.data.token)
              $this.$router.push({
                path: '/my'
              })
              alert(res.data.msg)
              $this.getuserinfo()
            })
        } else {
          alert("用户名/手机号不能为空或密码输入不正确")
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .logger_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .logger_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .logger_headimg img {
    width: 100%;
    height: 100%;
  }

  .logger_title {
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

  span {
    color: #1555eb;
    margin: 0.23rem 0 0.25rem;
  }

  .forget {
    float: left;
  }

  .existing {
    float: right;
  }
</style>
