<template>
  <div class="containera">
    <div class="top">
      预约管理
    </div>
    <div class="banner">
      <div class="left">
        <div class="title" :class="{title2:tab==='整租'}" @click="go('整租')">
          <span>整租</span>
        </div>
      </div>
      <div class="right">
        <div class="title" :class="{title2:tab==='合租'}" @click="go('合租')">
          <span>合租</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-for="(item,index) in list" :key="index" @click="gohome(item)">
      <div class="b_left">
        <span class="imag">
          <img src="../assets/img/rel1.jpg" />
        </span>
        <div class="box">
          <span class="hezu">{{item.house_type}}</span>
          <span class="yue">{{item.rent}}/月</span>
        </div>
      </div>
      <div class="b_right" >
        <p class="one" v-if="item.make_stu===0">接受预约</p>
        <p class="one" v-if="item.make_stu===1">取消预约</p>
        <p class="two">{{item.house_name}}</p>
        <p class="three">{{item.house_apartment}}|{{item.house_area}}m<sup>2</sup></p>
        <p class="four">{{item.house_address}}</p>
        <p class="five">{{item.time}}</p>
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
      this.run_subscribe("整租")
    },
    methods: {
      gohome:function(item){
        let id=item.id
        let house_id = item.house_id
        console.log(house_id)
        this.$router.push({
          path:"/sure",
          query:({
            id:id,
            house_id:house_id
          })
        })
      },
      go: function(str) {
        this.tab = str
        this.run_subscribe(str)
      },

      run_subscribe: function(house_type) {
        let id=this.$route.query.id
        console.log(id)
        let $this = this
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post('http://49.235.188.239:3002/api/run_subscribe', {
            "house_type": "合租",
            "token": token,
            "pageid": 1
          })
          .then(res => {
            $this.list=res.data.data

          })
      },
    }


  }
</script>

<style scoped="scoped">
  * {
    padding: 0;
    margin: 0;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .containera {
    width: 100%;
  }

  .top {
    width: 100%;
    text-align: center;
    height: .76rem;
    line-height: .76rem;
    border-bottom: 0.01rem solid #f1f1f1;
  }

  .banner {
    width: 100%;
    height: .88rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    width: 50%;
  }

  .right {
    width: 50%;
    text-align: center;
  }

  .title {
    text-align: center;
  }

  .title2 {
    width: .71rem;
    height: .87rem;
    line-height: .87rem;
    margin: auto;
    color: #ff4f42;
    border-bottom: .1rem solid #ff4f42;
  }

  .bottom {
    width: 100%;
    height: 2.93rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .4rem 0 0 0;
  }

  .b_left {
    padding-left: .4rem;
    box-sizing: border-box;
    text-align: center;
    width: 40%;
  }

  .b_left .imag {
    float: left;
  }

  .b_left .box {
    width: 2.10rem;
    height: .68rem;
    line-height: .68rem;
    display: flex;
    float: left;
    margin-top: -2rem;
    text-align: center;
    margin-left: .1rem;
  }

  .b_left .box .hezu {
    width: 30%;
    background: #fdcd5d;
    color: #fff;
    display: inline-block;
  }

  .b_left .box .yue {
    width: 70%;
    background: #f5393a;
    color: #fff;
    display: inline-block;
  }

  .b_left span {
    display: inline-block;
  }

  .b_right {
    width: 60%;
    padding-left: .4rem;
    box-sizing: border-box;
  }

  .b_right p {
    margin: 0.2rem;
  }

  .b_right .one {
    width: 1.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    background: #ff4f42;
    color: #fff;
    text-align: center;
    border-radius: 0.2rem;
    float: right;
    margin-top: -.2rem;
  }

  .b_right .two {
    font-size: .35rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .b_right .three {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .b_right .four {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .b_right .five {
    color: #dd8b9f;
    font-size: .16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
