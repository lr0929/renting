<!-- 忘记密码 -->
<template>
  <div>
    <div class="forget_header">
      <div class="forget_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="forget_title">
        <font>忘记密码</font>
      </div>
    </div>
    <div class="form">
      <form>
        <input type="text" placeholder="用户名/手机号" @blur="ifexit" v-model="users_name" maxlength="11">
        <div class="code">
          <input type="text" placeholder="验证码" v-model="codev" maxlength="6">
          <button v-show="show" @click="getCode">获取验证码</button>
          <button v-show="!show">{{count}}秒</button>
        </div>
        <input type="text" style="height: 0.01rem;border: none;" readonly="readonly">
        <input type="password" placeholder="新密码" v-model="newpassw" maxlength="12">
        <input type="button" value="确认" @click="alter">
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
    name: 'forget',
    data() {
      return {
        show: true,
        count: '',
        timer: null,
        users_name: "",
        codev: "",
        newpassw: "",
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        'usersname',
        'codevs',
        'newpass',
      ])
    },
    watch: {
      users_name: function(val) {
        this.setusersname(val)
      },
      codev: function(val) {
        this.setcodevs()
      },
      newpassw: function(val) {
        this.setnewpass(val)
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      ifexit: function() {
        let $this = this
        let usersname = $this.usersname
        if (usersname != "") {
          this.$axios.post(this.url + 'api/sginmobile', {
              mobile: usersname,
            })
            .then(res => {
              alert(res.data.msg)
            })
        } else {
          alert("用户名/手机号不能为空")
        }
      },
      getCode() {
        let $this = this
        let usersname = $this.usersname
        this.$axios.get(this.url + 'api/getcode?mobile=' + usersname, {
            params: {
              mobile: usersname,
            }
          })
          .then(res => {
           $this.codev = res.data.code
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
        setusersname: "setusersname",
        setcodevs: "setcodevs",
        setnewpass: "setnewpass",
      }),
      alter: function() {
        let $this = this
        let usersname = $this.usersname
        let codevs = $this.codevs
        let newpass = $this.newpass
        if (usersname != "" && codevs != "" && newpass != "") {
          this.$axios.post(this.url + 'api/changePass', {
              mobile: usersname,
              code: "111",
              userpass: newpass,
            })
            .then(res => {
              alert(res.data.msg)
              $this.$router.push({
                path:"/logger",
              })
            })
        }
      },
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
    margin-top: 0.65rem;
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
