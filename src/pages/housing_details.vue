<!-- 房源详情 -->
<template>
  <div class="box">
    <div class="header">
      <div class="bg-icon">
        <img src="../assets/img/zy11.png">
      </div>
      <div class="prev-icon">
        <a href="javascript:history.go(-1)"> <img src="../assets/img/zy10.png"></a>
      </div>
      <div class="next-icon" @click="btn">
        <img src="../assets/img/zy9.png" v-if="a">
        <img src="../assets/img/coll.png" alt="" v-else>
      </div>
    </div>
    <div>
      <div class="money">
        <span>{{list.rent}}</span>
        <span>{{list.rent_type}}</span>
      </div>
      <div class="region">
        {{list.house_name}}
      </div>
    </div>
    <div class="standard">
      <div class="standard-a">
        <img src="../assets/img/zy12.png">
        <div class="standard-b">{{list.house_type}}</div>
      </div>
      <div class="standard-a">
        <img src="../assets/img/zy13.png">
        <div class="standard-b">{{list.house_apartment}}</div>
      </div>
      <div class="standard-a">
        <img src="../assets/img/zy14.png">
        <div class="standard-b">{{list.house_peonum}}人</div>
      </div>
      <div class="standard-a">
        <img src="../assets/img/zy15.png">
        <div class="standard-b">{{list.house_area}}m<sup>2</sup></div>
      </div>
    </div>
    <div class="location">
      <p class="location-p1">位置与周边<span>ocation And Peripheral</span></p>
      <p class="location-p2">
        <i class="el-icon-location-outline"></i>
        {{list.house_address}}
      </p>
      <div class="map">
        <div class="amap-page-container">
          <div :style="{width:'100%',height:'5rem'}">
            <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
            </el-amap>
          </div>
          <div class="toolbar">
            <span v-if="loaded">
              location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
          </div>
          <!-- <div v-on:click="req_post()">
            查询周边
          </div> -->
        </div>
      </div>
    </div>
    <div class="room">
      <p class="location-p1">房源详情<span>Room Details</span></p>
      <p class="room-p2">房源描述</p>
      <p class="room-p3">{{list.house_info}}</p>
      <p class="room-p3">{{list.house_info}}</p>
      <p class="room-p3">{{list.house_info}}</p>
    </div>
    <div class="supporting">
      <p class="location-p1">配套设施<span>Supporting Facilities</span></p>
      <div class="goods">
        <div class="goods-list" v-for="item in list.house_facilities">
          <img :src="'http://49.235.188.239:3002/'+item.img">
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="add">
      <div class="hr"></div>
      <div class="adds">
        <div class="l1">
          <img class="img1" src="../assets/img/zy18.png">
          <div class="yes-add">
            <p class="add-a">可加</p>
            <p class="add-b">共有233套房在出租</p>
          </div>
        </div>
        <div class="l2">
          <img class="img2" src="../assets/img/zy19.png">
        </div>
      </div>
    </div>
    <div class="phone-box">
      <div>拨打电话</div>
      <div @click="move">预约看房</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      const self = this;
      return {
        center: [121.59996, 31.197646],
        lng: 0,
        lat: 0,
        loaded: false,
        plugin: [{
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(result)
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }],
        a: false,
        list: {},
        name: ['双人床', '书桌', '双人床', '椅子', '无线网络', '阳台', '冰箱', '洗衣机', '空调', '沙发', '厨房', '电梯', ]

      }
    },
    components: {},
    created() {
      let $this = this
      let id = this.$route.query.id
      let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
      // console.log(token)
      $this.$jq.post('http://49.235.188.239:3002/api/houseinfo', {
          token: token,
          id: id
        }, function(data) {
          $this.list = data.data
        })
        .then(res => {})

    },
    mounted() {
      // console.log(this.$route.query.id)
    },
    methods: {
      btn: function() {
        // 获取上个页面id
        let id = this.$route.query.id
        this.a = this.a
        if (this.a = !this.a) {
          let $this = this
          let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
          $this.$jq.post('http://49.235.188.239:3002/api/collect_house', {

              "id": id, //房源id
              "token": token
            }, function(data) {
              // console.log(data)
            })
            .then(res => {})
        } else {
          let $this = this
          let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
          $this.$jq.post('http://49.235.188.239:3002/api/collect_house_close', {

              "id": id, //房源id
              "token": token
            }, function(data) {
              // console.log(data)
            })
            .then(res => {})
        }
      },
      move: function() {
        let $this = this
        let id = $this.$route.query.id
        let name = $this.$route.query.house_name
        $this.$router.push({
          path: "./house",
          query: {
            list: JSON.stringify($this.list)
          }
        })
      }
    }
  };
</script>

<style scoped="scoped">
  .box .header {
    position: relative;
  }

  .box .bg-icon {
    width: 100%;
    height: 5.2rem;
  }

  .box .bg-icon img {
    width: 100%;
    height: 100%;
  }

  .box .prev-icon {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 0.3rem;
    left: 0.38rem;
  }

  .box .prev-icon img {
    width: 100%;
    height: 100%;
  }

  .box .next-icon {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 0.3rem;
    right: 0.38rem;
  }

  .box .next-icon img {
    width: 100%;
    height: 100%;
  }

  .box .money {
    padding: 0.5rem 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .box .money span:first-child {
    font-size: 0.35rem;
    color: #f50d1a;
    font-weight: bold;
  }

  .box .money span:last-child {
    font-size: 0.12rem;
    color: #3c433b;
    display: inline-block;
    background-color: #ffd3d8;
    border-radius: 0.5rem;
    padding: 0 0.1rem;
  }

  .box .region {
    padding: 0 0.4rem;
    font-weight: bold;
    font-size: 0.35rem;
    color: #212121;
    margin-bottom: 0.5rem;
  }

  .box .standard {
    height: 2.45rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    padding: 0 0.2rem;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    font-size: 0.3rem;
    text-align: center;
    color: #929292;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .box .standard .standard-a {
    flex: 1;
    overflow: hidden;
  }

  .box .standard img {
    width: 0.51rem;
    height: 0.49rem;
    margin-bottom: 0.3rem;
  }
  .box .standard .standard-b {
    height: 0.5rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .box .location {
    padding: 0.5rem 0 0.35rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ebebeb;
  }

  .box .location .location-p1,
  .box .room .location-p1,
  .box .supporting .location-p1 {
    font-size: 0.35rem;
    font-weight: bold;
    padding-left: 0.4rem;
    box-sizing: border-box;
  }

  .box .location .location-p1 span,
  .box .room .location-p1 span,
  .box .supporting .location-p1 span {
    font-size: 0.3rem;
    color: #969696;
    display: inline-block;
    border-left: 1px solid #d8d8d8;
    padding-left: 0.15rem;
    box-sizing: border-box;
    margin-left: 0.15rem;
    line-height: 0.3rem;
  }

  .box .location .location-p2 {
    padding-left: 0.4rem;
    box-sizing: border-box;
    margin-top: 0.3rem;
    font-size: 0.3rem;
    font-weight: bold;
  }

  .box .location .location-p2 i {
    font-size: 0.4rem;
    font-weight: bold;
  }

  .box .map {
    margin-top: 0.4rem;
  }

  .box .room {
    padding: 0.5rem 0 0.6rem;
    background-color: #f9f9f9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .box .room-p2 {
    font-size: 0.3rem;
    font-weight: bold;
    padding-left: 0.4rem;
    box-sizing: border-box;
    margin-top: 0.3rem;
  }

  .box .room-p3 {
    color: #999999;
    font-size: 0.26rem;
    padding-left: 0.4rem;
    box-sizing: border-box;
    margin-top: 0.1rem;
  }

  .box .supporting {
    background-color: #f9f9f9;
    border-left: 1px solid #d8d8d8;
    padding-bottom: 0.6rem;
  }

  .box .goods {
    padding: 0 0.5rem;
    display: flex;
    flex-wrap: wrap;
  }

  .box .goods .goods-list {
    width: 20%;
    text-align: center;
    margin-top: 0.5rem;
  }

  .box .goods .goods-list img {
    width: 0.48rem;
    height: 0.5rem;
  }

  .box .goods .goods-list div {
    margin-top: 0.2rem;
    color: #858585;
    font-size: 0.3rem;
  }

  .box .add {
    background-color: #f9f9f9;
    border-bottom: 1px solid #ebebeb;
  }

  .box .hr {
    width: 85%;
    margin: auto;
    border-top: 1px solid #ebebeb;
  }

  .box .adds {
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .box .adds .img1 {
    width: 1.12rem;
    height: 1.12rem;
  }

  .box .adds .img2 {
    height: 0.5rem;
  }

  .box .add-a {
    font-size: 0.35rem;
    font-weight: bold;
  }

  .box .add-b {
    color: #979797;
  }

  .box .yes-add {
    margin-left: 0.3rem;
    display: inline-block;
  }

  .box .phone-box {
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }

  .box .phone-box div {
    width: 49.8%;
    background-color: #fe4a3b;
    font-size: 0.3rem;
    color: #FFFFFF;
  }
</style>
