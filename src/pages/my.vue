<template>
  <div class="container">
    <!-- 房客 -->
    <div class="tenant" v-show="userinfo.root==='0'">
      <div class="myheader">
        <div class="myhead">
          <div class="myhead_con">
            <div class="account_info">
              <div class="account_img">
                <label>
                  <img :src="url+userinfo.headimg">
                  <input type="file" @change="changeImg" hidden="hidden">
                </label>
              </div>
              <div class="account_name">
                <font>{{userinfo.mobile}}</font>
              </div>
            </div>
            <div class="toggle">
              <div class="toggle_con" @click="toggle_one('1')">
                <font>切换为房东</font>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="personal_list">
        <div class="personal_con" v-for="(item,index) in personlist" @click="routerlink_peo(index)">
          <div :to="item.url" :click="item.classname" class="personal_conlist">
            <font>{{item.title}}</font>
            <img src="../assets/img/personal_conlistimg.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="landlord" v-show="userinfo.root==='1'">
      <!-- 房东 -->
      <div class="myheader">
        <div class="myhead">
          <div class="myhead_con">
            <div class="account_info">
              <div class="account_img">
                <label>
                  <img :src="url+userinfo.headimg">
                  <input type="file" @change="changeImg" hidden="hidden">
                </label>
              </div>
              <div class="account_name">
                <font>{{userinfo.mobile}}</font>
              </div>
            </div>
            <div class="toggle">
              <div class="toggle_con" @click="toggle_one('0')">
                <font>切换为房客</font>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="personal_list">
        <div class="personal_con" v-for="(item,index) in personlists" @click="routerlink_lan(index)">
          <div class="personal_conlist">
            <font>{{item.title}}</font>
            <img src="../assets/img/personal_conlistimg.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  import myfooter from "../components/myfooter.vue"
  export default {
    name: 'my',
    components: {
      myfooter
    },
    data() {
      return {
        // isshow: true,
        // orshow: false,
        holdImg: require("../assets/img/personal_headimg.jpg"),
        url: 'http://49.235.188.239:3002/',
        personlist: [{
          title: "我的预约",
          url: "/myment",
        }, {
          title: "我的收藏",
          url: "/collect",
        }, {
          title: "实名认证",
          url: "/identity",
        }, {
          title: "联系客服",
          url: "",
        }, {
          title: "意见反馈",
          url: "",
        }, {
          title: "修改密码",
          url: "/amend",
        }, {
          title: "退出登录",
          url: "",
        }],
        personlists: [{
          title: "预约管理",
          url: "/management",
        }, {
          title: "我的发布",
          url: "/release",
        }, {
          title: "实名认证",
          url: "/identity",
        }, {
          title: "联系客服",
          url: "",
        }, {
          title: "意见反馈",
          url: "",
        }, {
          title: "修改密码",
          url: "/amend",
        }, {
          title: "退出登录",
          url: "",
        }]
      }
    },
    computed: {
      ...mapGetters([
        "userinfo",
        "token"
      ])
    },
    created() {},
    mounted() {
      if (this.token === "") {
        this.$router.push({
          path: "/logger",
        })
      }
    },
    watch:{
      token(){
        if(this.token===""){
          this.$router.push({
            path: "/logger",
          })
        }
      }
    },
    methods: {
      ...mapActions({
        setuserinfo: 'setuserinfo',
        settoken:"settoken"
      }),

      routerlink_peo: function(index) {
        // console.log(index)
        let $this = this;
        if (index === 6) {
          $this.tenant_exit()
        } else {
          $this.$router.push({
            path: $this.personlist[index].url
          })
        }
      },
      routerlink_lan: function(index) {
        // console.log(index)
        let $this = this;
        if (index === 6) {
          $this.tenant_exit()
        } else {
          $this.$router.push({
            path: $this.personlists[index].url
          })
        }
      },
      getuserinfo: function() {
        let $this = this;
        this.$axios.post(this.url + 'api/getuserinfo', {
            token: $this.token,
          })
          .then(res => {
            $this.setuserinfo(res.data.data)
            $this.holdImg = $this.url + $this.userinfo.headimg
          })
      },
      changeImg: function(e) {
        let $this = this
        //获取上传的图片里面的信息
        // console.log(e.target.files[0])
        let holdImg = e.target.files[0];
        //调用图片上传的函数
        $this.upload(holdImg)
          .then(res => {
            $this.getuserinfo()
            // console.log(res)
          })
      },
      upload: function(holdImg) {
        let $this = this
        let token = $this.userinfo.token
        let formData = new FormData()
        formData.append("headimg", holdImg)
        formData.append("token", token)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        return this.$axios.post(this.url + 'api/setheadimg', formData, config)
      },
      toggle_one: function(root) {
        let $this = this
        let userinfo = $this.userinfo
        this.$axios.post(this.url + 'api/change_identity', {
            "token": userinfo.token,
            "root": root
          })
          .then(res => {
            $this.getuserinfo()
          })
      },
      tenant_exit: function() {
        let $this = this
        let userinfo = $this.userinfo
        this.$axios.post(this.url + 'api/overlogin', {
            "token": userinfo.token,
          })
          .then(res => {
            $this.settoken("")
            $this.getuserinfo()
            alert(res.data.msg)
            $this.$router.push({
              path: "/",
            })
          })
      },
    },

  }
</script>

<style>
  .myheader {
    width: 100%;
    height: 2.86rem;
    background-image: url(../assets/img/personal_header.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .myhead {
    padding: 0 0.33rem;
    box-sizing: border-box;
  }

  .myhead_con {
    width: 100%;
    display: flex;
    padding-top: 0.6rem;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .account_info {
    width: 3.68rem;
    height: 1.19rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .account_img {
    width: 1.19rem;
    height: 1.19rem;
    position: relative;
  }

  .account_img input {
    width: 1.19rem;
    height: 1.19rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .account_img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .account_name {
    margin-left: 0.15rem;
    color: white;
  }

  .toggle {
    position: relative;
  }

  .toggle_con {
    width: 1.86rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color: white;
    text-align: center;
    color: #f8a794;
    border-radius: 0.3rem 0 0 0.3rem;
    position: absolute;
    right: -0.32rem;
  }

  .personal_list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .personal_con {
    width: 100%;
    height: 1.19rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .personal_conlist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
  }

  .personal_conlist img {
    width: 0.15rem;
    height: 0.24rem;
  }

  .personal_conlist font {
    color: #F8A794;
    font-size: 0.29rem;
  }
</style>
