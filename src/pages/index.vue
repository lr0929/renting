<!-- 首页 -->
<template>
  <div class="boxs">
    <div class="top">
      <input type="text" placeholder="请搜索小区/商圈/地址" @click="search">
    </div>
    <div class="class">

      <div v-for="item in namee">
        <router-link to="/list">
          <img src="../assets/img/zy3.png">
          <span>{{item}}</span>
        </router-link>
      </div>

    </div>
    <div class="omnibus">
      精选特辑
    </div>
    <div class="omnibus-list">
      <div v-for="item in omnibus">
        <img src="../assets/img/zy6.png">
        <span>{{item.name}}</span>
        <font>{{item.text}}</font>
      </div>
    </div>
    <div class="omnibus">
      优选房源
    </div>
    <div class="banner">
      <el-carousel :interval="4000" loop type="card" height="2.5rem">
        <el-carousel-item v-for="item in 6" :key="item">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img class="banner-icon" src="../assets/img/zy7.png">
          <div class="banner-a">如梦似幻</div>
          <span class="banner-b">【幻梦】无敌江景</span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="omnibus">
      热门推荐
    </div>
    <div class="main">
      <ul>
        <li :class="activeClass == index ? 'actives':''" v-for="(item,index) in navList" @click="tab(index)">
          {{item.city_name}}
        </li>
      </ul>
      <div class="tabCon">
        <div v-for="(itemCon,index) in tabContents" v-show="index == num">
          <!-- {{itemCon}} -->
          <div class="tablist">
            <div class="tablist-a" v-for="(item,index) in list" @click="tiao(item)">
              <div class="icon-box">
                <img src="../assets/img/zy8.png">
              </div>
              <span>{{item.house_name}}</span>
              <span>{{item.house_apartment}}</span>
              <span class="aaa">{{item.house_area}}m<sup>2</sup></span>
              <p class="p1">{{item.house_address}}</p>
              <p class="p2"><i>￥</i><b>{{item.rent}}</b>/晚起</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import myfooter from "../components/myfooter.vue"
  export default {
    components: {
      myfooter
    },
    data() {
      return {
        activeClass: -1, // 0为默认选择第一个，-1为不选择,
        omnibus: [{
            img: "../assets/img/zy6.png",
            name: "今夜特价",
            text: "特价好房,优惠多多"
          },
          {
            img: "../assets/img/zy6.png",
            name: "今夜特价",
            text: "特价好房,优惠多多"
          },
          {
            img: "../assets/img/zy6.png",
            name: "今夜特价",
            text: "特价好房,优惠多多"
          },
          {
            img: "../assets/img/zy6.png",
            name: "今夜特价",
            text: "特价好房,优惠多多"
          }
        ],
        list: {},
        namee: ["个人房源", "整租公寓", "精选特辑"],
        navList: ['九街', '鹅岭二厂', '南滨路', '洪崖洞'],
        tabContents: ['内容一', '内容二', '内容三', 'dx4'],
        num: 0
      }
    },
    created() {
      let $this = this
      $this.$axios.post("http://49.235.188.239:3002/api/selecthouse", {
          search: "", //搜索框内容
          address: "", //地址
          rent: '不限', //租金 值:不限，[0,1000]
          house_type: "不限", //房源类型 值：不限，整租，合租
          house_apartment: "不限", //户型 值：不限，一室，二室...
          orderby: 0, //排序：0：推荐排序，1：租金从高到低，2：租金从低到高
          pageid: 1 //当前第几页
        }, function(data) {

        })
        .then((data) => {
          this.list = data.data.data
          // console.log(this.list)
        });
      $this.$axios.get("http://49.235.188.239:3002/api/get_hot_city", function(data) {

        })
        .then((data) => {
          this.navList = data.data.data
          // console.log(this.navList)
        })
    },
    mounted() {

    },
    methods: {
      tab(index) {
        this.num = index,
          this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
      },
      tiao: function(item) {
        let $this = this
        // console.log(item.id)
        let id = item.id
        // this.$router.push({path:"./housing_details",query:{id:id}})
        $this.$router.push({
          path: "./housing_details",
          query: {
            id: id
          }
        })
      },
      search: function() {
        this.$router.push({
          path: "/serch"
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .boxs {
    padding-bottom: 1rem;
  }

  .top {
    height: 1.65rem;
    width: 100%;
    background: url(../assets/img/zy1.png)no-repeat;
    background-size: 100% 100%;
    padding-top: 0.3rem;
    z-index: 1;
    padding-left: 0.3rem;
    box-sizing: border-box;
    position: relative;
  }

  .icon-top {
    width: 0.20rem;
    height: 0.35rem;

  }

  .icon-top img {
    width: 100%;
    height: 100%;
  }

  .top input {
    width: 6.65rem;
    height: 0.95rem;
    border: none;
    z-index: 999;
    border-radius: 0.1rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
    background: #FFFFFF;

  }

  .class {
    margin-top: 0.3rem;
    padding: 0.8rem 0;
    display: flex;
    justify-content: space-around;
  }

  .class div {
    position: relative;
    width: 1.5rem;
    height: 1.6rem;
    border-radius: 0.1rem;
  }

  .class div img {
    break-inside: 0.1rem;
  }

  .class div span {
    text-align: center;
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.12rem;
    color: #4f504a;
  }

  .omnibus {
    font-size: 0.35rem;
    font-weight: bold;
    margin-left: 0.4rem;
  }

  .omnibus-list {
    padding: 0.2rem 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .omnibus-list div {
    width: 48.5%;
    margin-top: 0.2rem;
    position: relative;
  }

  .omnibus-list div img {
    width: 100%;
    height: 100%;
  }

  .omnibus-list div span {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.3rem;
    font-weight: bold;
    color: #2d2f2e;
  }

  .omnibus-list div font {
    position: absolute;
    top: 0.6rem;
    left: 0.2rem;
    font-size: 0.12rem;
    color: #aeacad;
  }

  .banner {
    padding: 0 0.2rem;
    position: relative;
  }

  .banner .banner-icon {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .banner .banner-a {
    position: absolute;
    width: 1.4rem;
    height: 0.45rem;
    background-color: white;
    border-radius: 0.2rem;
    bottom: 0.55rem;
    left: 0.2rem;
    font-size: 0.25rem;
    font-weight: bold;
    text-align: center;
    line-height: 0.45rem;
  }

  .banner .banner-b {
    position: absolute;
    font-size: 0.25rem;
    bottom: 0.1rem;
    left: 0.2rem;
    color: #fdf2ea;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 0.14rem;
    opacity: 0.75;
    line-height: 2rem;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__item h3[data-v-1e31bace] {
    line-height: 0.2rem;
  }

  ul {
    margin-left: 0.2rem;
    margin-top: 0.4rem;
  }

  ul li {
    list-style: none;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 0.25rem;
    padding: 0.2rem;
    color: #353535;
    box-shadow: 0px 0.03rem 0.1rem rgba(0, 0, 0, 0.3);
    margin-left: 0.3rem;
    font-weight: bold;
    border-radius: 0.1rem;
  }

  .actives {
    color: #F0F0F0;
    background-color: #f32a32;
  }

  .tablist {
    padding: 0.5rem 0.4rem 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .tablist-a {
    width: 3.2rem;
    margin-top: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .icon-box {
    width: 3.2rem;
    height: 3rem;
  }

  .icon-box img {
    width: 100%;
    height: 100%;
  }

  .tablist-a span {
    color: #b9b9b9;
    font-size: 0.24rem;
    margin-right: 0.1rem;
  }

  .tablist-a .p1 {
    margin-top: 0.1rem;
    font-size: 0.34rem;
    color: #424242;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 0.35rem;
  }

  .tablist-a .p2 {
    margin-top: 0.3rem;
    font-size: 0.2rem;
    color: #b9b9b9;
  }

  .tablist-a .p2 i {
    color: #f73a38;
  }

  .tablist-a .p2 b {
    font-size: 0.3rem;
    color: #f73a38;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 1rem;
    display: inline-block;
  }

  .aaa {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 1rem;
    display: inline-block;
  }
</style>
