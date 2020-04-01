<template>
  <div class="containerg">
    <div class="top">
      我的发布
    </div>
    <div class="banner">
      <div class="left">
        <div :class="tab=='title'?'title2':'title'" @click="go('title')">
          <span>整租</span>
        </div>
      </div>
      <div class="right">
        <div :class="tab=='title2'?'title2':'title'" @click="go('title2')">
          <span>合租</span>
        </div>
      </div>
    </div>
    <div :class="tab=='title'?'show ':'hide '">
      <div class="bottom" v-for="(item,index) in list">
        <div class="b_left">
          <span class="imag">
            <img src="../assets/img/rel1.jpg" />
          </span>
          <div class="box">
            <span class="hezu">{{item.house_type}}</span>
            <span class="yue">{{item.rent}}/月</span>
          </div>
        </div>
        <div class="b_right">
          <p>待审核</p>
          <p>{{item.house_name}}</p>
          <p>{{item.house_apartment}}|{{item.house_area}}m<sup>2</sup></p>
          <p>{{item.house_address}}</p>
        </div>
      </div>
    </div>
    <div :class="tab=='title2'?'show':'hide'">
      <div class="bottom">
        暂无数据
      </div>
      
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        list:[],
        tab: "title"
      }
    },
    components: {

    },
    created() {

    },
    mounted() {
      let $this = this
      let id = this.$route.query.id
      let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
      $this.$axios.post('http://49.235.188.239:3002/api/myrelease', {
          house_type: "整租",
          token: token,
          pageid: 1
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
          $this.list=res.data.data
          console.log(res)
        })
    },
    methods: {
      go: function(str) {
        this.tab = str
      }
    }

  }
</script>

<style scoped="scoped">
  * {
    padding: 0;
    margin: 0;
  }

  .containerg .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .containerg {
    width: 100%;
  }

  .containerg .top {
    width: 100%;
    text-align: center;
    height: .76rem;
    line-height: .76rem;
    border-bottom: 0.01rem solid #f1f1f1;
  }

  .containerg .banner {
    width: 100%;
    height: .88rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containerg .left {
    width: 50%;
  }

  .containerg .right {
    width: 50%;
    text-align: center;
  }

  .containerg .title {
    text-align: center;
  }

  .containerg .title2 {
    width: .71rem;
    height: .87rem;
    line-height: .87rem;
    margin: auto;
    color: #ff4f42;
    border-bottom: .1rem solid #ff4f42;
  }

  .containerg .bottom {
    width: 100%;
    height: 2.93rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containerg .bottom2 {
    width: 100%;
    height: 2.93rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containerg .b_left {
    padding-left: .4rem;
    box-sizing: border-box;
    text-align: center;
    width: 40%;
  }

  .containerg .b_left .imag {
    float: left;
  }

  .containerg .b_left .box {
    width: 2.10rem;
    height: .68rem;
    line-height: .68rem;
    display: flex;
    float: left;
    margin-top: -2rem;
    text-align: center;
    margin-left: .1rem;
  }

  .containerg .b_left .box .hezu {
    width: 30%;
    background: #fdcd5d;
    color: #fff;
    display: inline-block;
  }

  .containerg .b_left .box .yue {
    width: 70%;
    background: #f5393a;
    color: #fff;
    display: inline-block;
  }

  .containerg .b_left span {
    display: inline-block;
  }

  .containerg .b_right {
    width: 60%;
    padding-left: .4rem;
    box-sizing: border-box;
  }

  .containerg .b_right p {
    margin: 0.1rem;
  }

  .containerg .b_right p:first-child {
    width: 1.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    color: #000000;
    float: right;
    margin: -.2rem;
  }

  .containerg .b_right p:nth-child(2) {
    font-size: .35rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .containerg .b_right p:nth-child(3) {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .containerg .b_right p:last-child {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
