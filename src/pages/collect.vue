<template>
  <div class="containerl">
    <div class="top">
      收藏
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
    <div>
      <div class="bottom" v-for="(item,index) in list" :key="index">
        <div class="b_left">
          <span class="imag">
            <img src="../assets/img/rel1.jpg" />
          </span>
          <div class="box">
            <span class="hezu">{{item.house_type}}</span>
            <span class="yue">{{item.rent}}元/月</span>
          </div>
        </div>
        <div class="b_right">
          <p class="one" @click="icon(item.house_id)">
            <img src="../assets/img/coll.png" v-if="zhang" alt="">
            <img src="../assets/img/coll2.png" v-else alt="">
          </p>
          <p class="two">{{item.house_name}}</p>
          <p class="three">{{item.house_apartment}}|{{item.house_area}}<sup>2</sup></p>
          <p class="four">{{item.house_address}}</p>
          <p class="five"><span v-for="(facilities_item,i) in item.house_facilities">{{facilities_item}}</span></p>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  export default {
    data() {
      return {
        zhang:false,
        url: "http://49.235.188.239:3002/",
        list: [

        ],
        tab: "title"
      }
    },
    components: {

    },
    created() {


    },
    mounted() {
      this.mycollection("整租")
    },
    methods: {

      go: function(str) {
        this.tab = str
        this.mycollection(str)
      },
      mycollection: function(house_type) {
        let id=this.$route.query.id
        let $this = this
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post('http://49.235.188.239:3002/api/mycollection', {
            house_type: house_type,
            token: token,
            pageid: 1,
            id: id
          })
          .then(res => {
            $this.list = res.data.data
            console.log( $this.list)
          })

      },
      icon:function(house_id){
        let $this=this

        $this.zhang=!$this.zhang
         let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$jq.post('http://49.235.188.239:3002/api/collect_house_close',{

          "id": house_id,//房源id
          "token": token
        },function(data){
          console.log(data)
        })
        .then(res => {})
      }
    }

  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .containerl .show {
    display: block;
  }

  .containerl .hide {
    display: none;
  }

  .containerl .containerl {
    width: 100%;
  }

  .containerl .top {
    width: 100%;
    text-align: center;
    height: .76rem;
    line-height: .76rem;
    border-bottom: 0.01rem solid #f1f1f1;
  }

  .containerl .banner {
    width: 100%;
    height: .88rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containerl .left {
    width: 50%;
  }

  .containerl .right {
    width: 50%;
    text-align: center;
  }

  .containerl .title {
    text-align: center;
  }

  .containerl .title2 {
    width: .71rem;
    height: .87rem;
    line-height: .87rem;
    margin: auto;
    color: #ff4f42;
    border-bottom: .1rem solid #ff4f42;
  }

  .containerl .bottom {
    width: 100%;
    height: 2.93rem;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containerl .b_left {
    padding-left: .4rem;
    box-sizing: border-box;
    text-align: center;
    width: 40%;
  }

  .containerl .b_left .imag {
    float: left;
  }

  .containerl .b_left .box {
    width: 2.10rem;
    height: .68rem;
    line-height: .68rem;
    display: flex;
    float: left;
    margin-top: -2rem;
    text-align: center;
    margin-left: .1rem;
  }

  .containerl .b_left .box .hezu {
    width: 30%;
    background: #fdcd5d;
    color: #fff;
    display: inline-block;
  }

  .containerl .b_left .box .yue {
    width: 70%;
    background: #f5393a;
    color: #fff;
    display: inline-block;
  }

  .containerl .b_left span {
    display: inline-block;
  }

  .containerl .b_right {
    width: 60%;
    padding-left: .4rem;
    box-sizing: border-box;
  }

  .containerl .b_right p {
    margin: 0.2rem;
  }

  .containerl .b_right .one {
    /* width: 1.45rem;
		height: 0.45rem;
		line-height: 0.45rem;
		background: #ff4f42;
		color: #fff;
		text-align: center;
		border-radius: 0.2rem; */
    float: right;
  }

  .containerl .b_right .two {
    font-size: .35rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .containerl .b_right .three {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .containerl .b_right .four {
    color: #afafaf;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .containerl .b_right .five {
    color: #dd8b9f;
    font-size: .16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
