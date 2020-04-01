<!-- 发布房源 -->
<template>
  <div class="boxs">
    <div class="header">
      房源信息
    </div>
    <div class="uploadings">
      <label>
        <input class="addimgs" type="file" hidden="hidden" @change="holdchange">
        <img :src="holdImg">
      </label>
    </div>
    <div class="renting">
      <el-radio-group v-model="radio">
        <el-radio :label="1">整租</el-radio>
        <el-radio :label="2">合租</el-radio>
      </el-radio-group>
    </div>
    <div class="text">
      <span>*</span><span>小区名称:</span>
    </div>
    <div class="input">
      <el-input placeholder="请输入小区名称" v-model="input1" clearable></el-input>
    </div>
    <div class="text">
      <span>*</span><span>户型:</span>
    </div>
    <div class="renting rentings">
      <el-radio-group v-model="input2">
        <el-radio :label="1" value="一室一厅">一室一厅</el-radio>
        <el-radio :label="2" value="两室一厅">两室一厅</el-radio>
        <el-radio :label="3" value="三室一厅">三室一厅</el-radio>
      </el-radio-group>
    </div>
    <div class="input inputs">
      <el-input placeholder="以上都不是，请输入户型" v-model="radioTexts" clearable></el-input>
    </div>
    <div class="text">
      <span>*</span><span>入住人数:</span>
    </div>
    <div class="input">
      <el-input placeholder="请输入最多入住人数" v-model="input3" clearable></el-input>
    </div>
    <div class="text">
      <span>*</span><span>房屋面积:</span>
    </div>
    <div class="input">
      <el-input placeholder="请输入房屋面积/平方米" v-model="input4" clearable></el-input>
    </div>
    <div class="text">
      <span>*</span><span>房源详情:</span>
    </div>
    <div class="textarea">
      <el-input type="textarea" :rows="2" placeholder="请输入房源的详细情况" v-model="textarea"></el-input>
    </div>
    <div class="text">
      <span>*</span><span>付款方式:</span>
    </div>
    <div class="renting">
      <el-radio-group v-model="radioss">
        <el-radio :label="1">押一付一</el-radio>
        <el-radio :label="2">押一付三</el-radio>
        <el-radio :label="3">半年付</el-radio>
        <el-radio :label="4">年付</el-radio>
      </el-radio-group>
    </div>
    <div class="text">
      <span>*</span><span>租金:</span>
    </div>
    <div class="input">
      <el-input placeholder="请输入每月房租/平方米" v-model="input5" clearable></el-input>
    </div>
    <div class="text">
      <span>*</span><span>配套设施:</span>
    </div>
    <div class="checkList">
      <el-checkbox-group v-model="checkList" >
        <el-checkbox v-for="(item,index) in filelist" :label="index">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="text">
      <span>*</span><span>小区位置 (定位):</span>
    </div>
    <p class="location-p2">
      <i class="el-icon-location-outline"></i>
      <span>{{formattedAddress}}</span>
    </p>
    <div class="map">
      <div class="hello">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
          <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events"
            :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        </el-amap>
        <!-- <p>当前经纬度：{{center}}</p> -->
        <!-- <p>当前地址：{{formattedAddress}}</p> -->
      </div>
    </div>
    <div class="submit" @click="btn">
      提交
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
    components: {
      myfooter
    },
    data() {
      const self = this;
      return {
        //当前位置
        formattedAddress: "",
        zoom: 12,
        //当前经纬度
        center: [106.354928, 29.613256],
        markers: [{
          position: [106.354928, 29.613256],
          events: {
            click: () => {},
            dragend: (e) => { //拖拽点标记
              // 设置点标记经纬度
              self.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
              // 设置地图中心经纬度
              self.center = [e.lnglat.lng, e.lnglat.lat];
              // 调用逆解码函数
              self.getaddress(self.center)
            }
          },
          visible: true,
          draggable: true,
          template: '<span>1</span>',
        }],
        events: {
          init: (o) => {

          },
          'moveend': () => {},
          'zoomchange': () => {},
          'click': (e) => { //点击地图
            // 设置点标记经纬度
            self.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            // 设置地图中心经纬度
            self.center = [e.lnglat.lng, e.lnglat.lat];
            // 调用逆解码函数
            self.getaddress(self.center)
          }
        },
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
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.markers[0].position = self.center;
                    self.loaded = true;
                    self.getaddress(self.center)
                    self.$nextTick();
                  }
                });
              }
            }
          },
          {
            pName: 'Geocoder',
            events: {
              init(o) {
                //定位第一次逆解码
                o.getAddress(self.center, (status, result) => {
                    self.formattedAddress = result.regeocode.formattedAddress

                })
              }
            }
          }
        ],
        url: 'http://49.235.188.239:3002/',
        radio: '',
        radios: '',
        radioss: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        chekboxId:"",
        textarea: '',
        checkList: [],
        radioText: "",
        radioTexts: "",
        holdImg: require('../assets/img/zy20.png'),
        // center: [121.59996, 31.197646],
        lng: 0,
        lat: 0,
        loaded: false,
        filelist:[],

      }
    },

    computed: {
      ...mapGetters([
        "userinfo",
        "token"
      ])
    },
    methods: {
      agin:function(index){
        console.log(index)
      },
      // 地图
      //逆解码函数
      getaddress: function(lnglat) {
        let self = this
        AMap.plugin('AMap.Geocoder', function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '010'
          })
          geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              self.formattedAddress = result.regeocode.formattedAddress
              // result为对应的地理位置详细信息
            }
          })
        })
      },
      ...mapActions({
        setuserinfo: 'setuserinfo'
      }),
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
      holdchange: function(e) {
        let $this = this
        //获取上传的图片里面的信息
        // console.log(e.target.files[0])
        let holdimg = e.target.files[0];
        //调用图片上传的函数
        $this.upload(holdimg)
          .then(res => {
            $this.holdImg = $this.url + res.data.url
            // console.log(res)
          })
      },
      upload: function(holdimg) {
        let $this = this
        let formData = new FormData()
        formData.append("_img", holdimg)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          } //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
        };
        return this.$axios.post(this.url + 'api/_img', formData, config)

      },
      btn: function() {
        let $this = this
        // console.log(this.radio)
        if ($this.radio === 1) {
          $this.radioText = "合租"
        } else {
          $this.radioText = "整租"
        }
        if ($this.checkList.length <= 0) {
          $this.$message({
                    message: '请选择配套设施',
                    type: 'warning'
                  });
          return
        }
        let token = $this.userinfo.token
        console.log()

        $this.$axios.post($this.url + 'api/addhouse', {
            house_imgs: $this.holdImg,
            house_type: $this.radioText,
            house_name: $this.input1,
            house_apartment: $this.radioTexts,
            house_peonum: $this.input3,
            house_area: $this.input4,
            house_info: $this.textarea,
            rent_type: $this.radioss,
            rent: $this.input5,
            house_facilities: $this.checkList,
            house_address: $this.formattedAddress,
            house_lnglat: $this.center,
            token: token
          })
          .then(res => {
            console.log(res)
            alert(res.data.msg)
          })
      }
    },
    mounted() {
      let $this=this
     $this.$axios.get("http://49.235.188.239:3002/api/getfacilities").then(res=>{
       $this.filelist=res.data
     })
    },
    watch: {
      radioTexts() {
        if (this.radioTexts !== "一室一厅" && this.radioTexts !== "两室一厅" && this.radioTexts !== "三室一厅") {
          this.input2 = ""
        }
      },
      input2() {
        if (this.input2 === 1) {
          console.log(this.input2)
          this.radioTexts = "一室一厅"
        } else if (this.input2 === 2) {
          this.radioTexts = "两室一厅"
        } else if (this.input2 === 3) {
          this.radioTexts = "三室一厅"
        }
      }
    }
  }
</script>

<style>
  .boxs {
    padding-bottom: 1rem;
  }

  .boxs .header {
    height: 0.95rem;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    line-height: 0.95rem;
  }

  .renting {
    height: 1.3rem;
    display: flex;
    align-items: center;
  }

  .rentings {
    height: 0.8rem;
  }

  .el-radio {
    margin-right: 0.2rem;
  }

  .el-radio-group {
    margin: auto;
  }

  .el-input__inner:focus {
    border-color: #fe4a39;
  }

  .el-textarea__inner:focus {
    border-color: #fe4a39;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: #fe4a39;
    border-color: #fe4a39;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #fe4a39;
  }

  .el-radio__label {
    font-size: 0.3rem;
    font-weight: bold;
    color: #3c3c3c;
  }

  .text {
    padding-left: 0.3rem;
    box-sizing: border-box;
  }

  .text span:first-child {
    color: #f80000;
  }

  .text span:last-child {
    color: #3c3c3c;
    font-weight: bold;
    font-size: 0.3rem;
    margin-left: 0.1rem;
  }

  .el-input__inner {
    background-color: #f8f8f8;
  }

  .input {
    width: 85%;
    margin: 0.3rem auto;
  }

  .inputs {
    margin: 0.1rem auto 0.3rem;
  }

  .textarea {
    width: 85%;
    margin: 0.3rem auto;
  }

  .checkList {
    display: flex;
    align-items: center;
    margin: 0.3rem 0;
  }

  .el-checkbox-group {
    margin: auto;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f80000;
    border-color: #f80000;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #f80000;
  }

  .location-p2 {
    padding-left: 0.4rem;
    box-sizing: border-box;
    margin-top: 0.3rem;
    font-size: 0.3rem;
    font-weight: bold;
  }

  .location-p2 i {
    font-size: 0.4rem;
    font-weight: bold;
  }

  .map {
    margin-top: 0.4rem;
    height: 6rem;
  }

  .submit {
    width: 90%;
    height: 1rem;
    background-color: #f4323b;
    font-size: 0.4rem;
    font-weight: bold;
    line-height: 1rem;
    text-align: center;
    color: #FFFFFF;
    border-radius: 0.15rem;
    margin: 0.7rem auto 0.2rem;
  }

  .uploadings {
    position: relative;
  }

  .uploadings img {
    width: 100%;
    height: 4.5rem;
  }

  .addimgs {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .hello {
    height: 5rem;
  }
</style>
