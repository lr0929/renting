<template>
  <div id="main">
    <div class="main">
      <div class="heate">
        <a href="javascript:history.back(-1)"><img src="../assets/img/pre.png" alt=""></a>
        <input type="text" placeholder="位置/小区/公寓名/地铁站">
      </div>
      <div class="nav">
        <div class="nav_how" @click="crity">
          <span>观音桥</span>
          <img src="../assets/img/xianla_1.png" alt="" v-if="show">
          <img src="../assets/img/xiangshang.png" alt="" v-else>
        </div>
        <div class="nav_how" @click="zhu">
          <span>租金</span>
          <img src="../assets/img/xiala.png" alt="" v-if="b">
          <img src="../assets/img/xiangshang.png" alt="" v-else>
        </div>
        <div class="nav_how" @click="shai">
          <span>更多筛选</span>
          <img src="../assets/img/xiala.png" alt="" v-if="c">
          <img src="../assets/img/xiangshang.png" alt="" v-else>
        </div>
        <div class="nav_how" @click="order">
          <span>推荐顺序</span>
          <img src="../assets/img/xiala.png" alt="" v-if="e">
          <img src="../assets/img/xiangshang.png" alt="" v-else>
        </div>
      </div>
      <div class="city" v-if="a">
        <el-cascader :options="options" class="cader"></el-cascader>
      </div>
      <div class="monly" v-if="b">
        <div class="centent">
          <span>选择价格空间</span>
          <span>{{hove}}</span>
        </div>
        <div class="jia">
          <p @click="monlylisttap(index)" :class="{price:item.active}"  v-for="(item,index) in monlylist">{{item.value}}</p>
        </div>
        <div class="sub">
          <button class="vive" :class="{monlylistactive:monlylistactive}" @click="cz">重置</button>
          <button class="tijiao" @click="noper">确认筛选</button>
        </div>
      </div>
      <div class="monly" v-if="c">
        <div class="file">出租类型</div>
        <div class="file_img">
          <p @click="router(index)" :class="{titlecolor:item.top}" v-for="(item,index) in file">
            <img :src="item.top? item.imgs:item.img">
            <span>{{item.title}}</span>
          </p>

        </div>
        <div class="file">选择户型</div>
        <div class="file_btn">
          <button class="home" :class="{bom:item.hive}" @click="agin(index)" v-for="(item,index) in btn">{{item.title}}</button>
        </div>
        <div class="sub">
          <button class="vive" :class="{filelist:filelist}" @click="comv">重置</button>
          <button class="tijiao" @click="tijiao">确认筛选</button>
        </div>
      </div>
      <div class="move" v-if="e">
        <div class="move_first" @click="dp(index)" v-for="(item,index) in bug"><span>{{item.title}}</span><img v-if="item.sky"
            :src="item.img"></div>
      </div>
      <div class="list" v-if="datashow" v-for="(item,index) in list">
        <div class="list_img">
          <img :src="'http://49.235.188.239:3002/'+item.house_imgs" alt="">
        </div>
        <div class="list_info">
          <div class="p">{{item.house_name}}</div>
          <div class="over">{{item.house_apartment}}|{{item.house_area}}m<sup>2</sup></div>
          <div class="over">{{item.house_type}}:{{item.rent}}元/月</div>
          <div class="allow">
            <span>集中供暖</span>
            <span>电梯房</span>
            <span>允许做饭</span>
          </div>
        </div>
      </div>

    </div>
    <div class="opent" v-if="!datashow">
      暂无数据
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datashow:false,
        face: "",
        filelist: false,
        file: [{
            img: require("../assets/img/images/lo_06.png"),
            imgs: require("../assets/img/images/lo_07.png"),
            title: "整租",
            top: false
          },
          {
            img: require("../assets/img/images/lo_06.png"),
            imgs: require("../assets/img/images/lo_07.png"),
            title: "整租",
            top: false
          },
          {
            img: require("../assets/img/images/lo_06.png"),
            imgs: require("../assets/img/images/lo_07.png"),
            title: "整租",
            top: false
          }
        ],
        bug: [{
            title: "推荐排序",
            img: require("../assets/img/gouone.png"),
            sky: false
          },
          {
            title: "租金从高到低",
            img: require("../assets/img/gouone.png"),
            sky: false
          },
          {
            title: "租金从低到高",
            img: require("../assets/img/gouone.png"),
            sky: false
          }
        ],
        show: false,
        type: [{
          img: "../assets/img/images/lo_06.png",
          name: "整租",

        }],
        btn: [{
            title: "不限",
            hive: false
          },
          {
            title: "两室一厅",
            hive: false
          },
          {
            title: "一室一厅",
            hive: false
          },
          {
            title: "三室一厅",
            hive: false
          }
        ],
        a: false,
        b: false,
        c: false,
        e: false,
        list: [{
            img: "../assets/img/images/listone_03.png",
            name: "鹏瑞南海A3市一厅一卫一",
            info: "3市一厅一卫 | 128cm ",
            back: "距离公交车站103m"
          },
          {
            img: "../assets/img/images/listone_03.png",
            name: "鹏瑞南海A3市一厅一卫一",
            info: "3市一厅一卫 | 128cm ",
            back: "距离公交车站103m"
          },
          {
            img: "../assets/img/images/listone_03.png",
            name: "鹏瑞南海A3市一厅一卫一",
            info: "3市一厅一卫 | 128cm ",
            back: "距离公交车站103m"
          }
        ],
        name: [{
            names: "行政区域",
            crtys: "江北区",
            joups: "观音桥",
          },
          {
            names: "行政区域",
            crtys: "江北区",
            joups: "观音桥",
          },
          {
            names: "行政区域",
            crtys: "江北区",
            joups: "观音桥",
          }
        ],
        monlylistactive: false,
        hove: "不限",
        monlylist: [{
            value: "不限",
            active: true,

          },
          {
            value: "0-1000",
            active: false,

          },
          {
            value: "1000-2000",
            active: false,

          },
          {
            value: "2000-3000",
            active: false,

          },
          {
            value: "3000-4000",
            active: false,
          },

        ],

        options: [{
          value: 'zhinan',
          label: '行政地区',
          children: [{
            value: 'shejiyuanze',
            label: '江北区',
            children: [{
              value: 'yizhi',
              label: '观音桥'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        enjon:"",
        befor:"",
        sky:"",
        search:this.$route.query.search
      }
    },
    created() {

    },
    comments: {

    },
    components: {
      // crty
    },
    mounted() {
      this.listfile()
    },
    methods: {
      listfile: function() {
        let $this = this
        $this.$axios.post("http://49.235.188.239:3002/api/selecthouse", {
          search:$this.search, //搜索框内容
          address: "", //地址
          rent: '不限', //租金 值:不限，[0,1000]
          house_type: "不限", //房源类型 值：不限，整租，合租
          house_apartment: "不限", //户型 值：不限，一室，二室...
          orderby: 0, //排序：0：推荐排序，1：租金从高到低，2：租金从低到高
          pageid: 1 //当前第几页
        }).then(res => {
          if (res.data.stu===200) {
            $this.datashow=true
          } else{
            $this.datashow=false
          }
          $this.list = res.data.data
        })
      },
      noper: function() {
        let rent = this.face.split("-")
        let $this = this
        $this.$axios.post("http://49.235.188.239:3002/api/selecthouse", {
          search: $this.search, //搜索框内容
          address: "", //地址
          rent: rent, //租金 值:不限，[0,1000]
          house_type: "不限", //房源类型 值：不限，整租，合租
          house_apartment: "不限", //户型 值：不限，一室，二室...
          orderby: 0, //排序：0：推荐排序，1：租金从高到低，2：租金从低到高
          pageid: 1 //当前第几页
        }).then(res => {
          if (res.data.stu===200) {
            $this.datashow=true
          } else{
            $this.datashow=false
          }
          $this.list = res.data.data
          console.log($this.list)
        })
      },
      dp: function(index) {
        let $this = this;
        console.log($this.face)
        let rent="不限"
        if($this.face!=""){
           rent = $this.face.split("-")
        }
        $this.$axios.post("http://49.235.188.239:3002/api/selecthouse", {
          search: $this.search, //搜索框内容
          address: "", //地址
          rent: rent, //租金 值:不限，[0,1000]
          house_type: "不限", //房源类型 值：不限，整租，合租
          house_apartment: "不限", //户型 值：不限，一室，二室...
          orderby: index, //排序：0：推荐排序，1：租金从高到低，2：租金从低到高
          pageid: 1 //当前第几页
        }).then(res => {
          if (res.data.stu===200) {
            $this.datashow=true
          } else{
            $this.datashow=false
          }
          $this.list = res.data.data
          console.log($this.list)
        })
        for (let s in this.bug) {
          $this.bug[s].sky = false
        }
        $this.bug[index].sky = true
      },
      tijiao:function(){
        let house_type = this.enjon
        let house_apartment = this.befor
        let $this = this
        $this.$axios.post("http://49.235.188.239:3002/api/selecthouse", {
          search:$this.search, //搜索框内容
          address: "", //地址
          rent: "不限", //租金 值:不限，[0,1000]
          house_type: house_type, //房源类型 值：不限，整租，合租
          house_apartment: house_apartment, //户型 值：不限，一室，二室...
          orderby: 0, //排序：0：推荐排序，1：租金从高到低，2：租金从低到高
          pageid: 1 //当前第几页
        }).then(res => {
          if (res.data.stu===200) {
            $this.datashow=true
          } else{
            $this.datashow=false
          }
          $this.list = res.data.data
          console.log($this.list)
        })
        },
      router: function(index) {
        let $this=this
        $this.enjon = $this.file[index].title
        $this.filelist = true;
        for (let s in this.file) {

          $this.file[s].top = false
        }
        $this.file[index].top = true
      },
      agin: function(index) {
        let $this=this
        this.filelist = true;
        $this.befor = $this.btn[index].title
        this.btn.forEach((item, i) => {
          if (index == i) {
            item.hive = true
          } else {
            item.hive = false
          }
        })
      },
      comv: function() {
        this.filelist = false;
        for (let s in this.file) {
          this.file[s].top = false
        }
        this.btn.forEach((item, i) => {
          item.hive = false
        })
      },
      monlylisttap: function(index) {
        let $this = this
        $this.monlylistactive = true;
        $this.monlylist.forEach((item, i) => {
          if (index == i) {
            $this.face = item.value
            $this.hove = item.value
            item.active = true
          } else {
            item.active = false
          }
        })
      },
      cz: function() {
        this.monlylistactive = false;
        this.monlylist.forEach((item, i) => {
          item.active = false
        })
      },
      crity: function() {
        let $this = this
        $this.$axios.get('http://49.235.188.239:3002/api/getcity', {
            id: 1,

          })
          .then(res => {
            $this.options = res.data
            console.log(this.options)
          })
        this.show = !this.show
        this.a = !this.a
        this.b = false
        this.c = false
        this.e = false
      },
      zhu: function() {
        this.b = !this.b
        this.a = false
        this.c = false
        this.e = false
      },
      shai: function() {
        this.c = !this.c
        this.a = false
        this.e = false
        this.b = false
      },
      order: function() {
        this.e = !this.e
        this.a = false
        this.b = false
        this.c = false
      }
    },

  }
</script>

<style scoped="scoped">
  .heate img{
    width: .4rem;
    height: .4rem;
  }
  .opent{
    text-align: center;
  }
  .titlecolor {
    color: #221f1f;
  }

  .cader {
    margin-top: 0.2rem;
    width: 100%;
    height: .6rem;
    border: none;
  }

  .el-input__inner {
    border: none;
    outline: none;
  }

  .monlylistactive {
    background: #f74a39;
    color: #FFFFFF;
  }

  .filelist {
    background: #f74a39;
    color: #FFFFFF;
  }

  .price {
    color: #f83f3a;
  }

  #main {
    width: 100%;
    height: auto;
  }

  .main {
    width: 100%;
    height: 2.59rem;
    padding: 0;
    margin: 0;
  }

  .heate {

    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .heate img {}

  .heate input {
    width: 5.15rem;
    height: 0.73rem;
    border-radius: 0.255rem;
    border: none;
    outline: none;
    text-align: center;
    background: #f8f8f8;
    color: #d2d2d2;
    margin-right: .75rem;
  }

  .nav {
    width: 100%;
    height: 1.37rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .3rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    box-sizing: border-box;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }

  .nav_how {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .nav_how img {
    width: 0.5rem;
  }

  .list {
    width: 100%;
    height: 2.87rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .list_img {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list_img img {
    width: 2.81rem;
    height: 2.01rem;
  }

  .list_info {
    width: 60%;
    height: 100%;
    font-size: .4rem;
  }

  .list_info .p {
    margin-top: 0.35rem;
    padding-left: 0.15rem;
    box-sizing: border-box;
    width: 3.89rem;
    height: 0.38rem;
    line-height: 0.38rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .city {
    width: 100%;
    height: 1rem;
    /* background: #42B983; */
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: .4rem;
  }

  .name {
    width: 2.25rem;
    height: 0.9rem;
  }

  .crty {
    width: 2.25rem;
    height: 0.9rem;
    background: #f8f8f8;
  }

  .joup {
    width: 2.25rem;
    height: 0.9rem;
    background: #ccc;
  }

  .allow {
    width: 100%;
    height: 0.3rem;
    display: flex;
    margin-top: 0.1rem;
    justify-content: space-around;
    align-items: center;
    font-size: .3rem;
  }

  .allow span {
    display: block;
    color: #d4597e;
  }

  .allow span:last-child {
    color: #66d4ac;
  }

  .over {
    padding-left: 0.15rem;
    box-sizing: border-box;
    color: #ccc;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .monly {
    width: 100%;
    height: 7.46rem;
    /* background: #42B983; */
  }

  .centent {
    width: 100%;
    height: 1.62rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: .4rem;
  }

  .centent span:last-child {
    color: #f09aa7;
  }

  .jia {
    width: 100%;
    height: 3.98rem;
    font-size: .3rem;
    text-align: center;
  }

  .jia p {
    width: 3rem;
    margin: 0.4rem auto;
  }

  .sub {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .vive {
    width: 1.8rem;
    height: 1rem;
    border-radius: 0.2rem;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-size: .35rem;
  }

  .tijiao {
    width: 4rem;
    height: 1rem;
    border-radius: 0.15rem;
    border: none;
    outline: none;
    color: #ffffff;
    background: #f5363b;
    font-size: .35rem;
  }

  .file {
    width: 100%;
    height: .7rem;
    padding-top: 0.3rem;
    padding-left: 0.5rem;
    box-sizing: border-box;
    font-size: .4rem;
  }

  .file_img {
    width: 100%;
    height: 2rem;
    font-size: .3rem;
    display: flex;
    color: #bababa;
    justify-content: space-around;
  }

  .file_img p {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .file_img img {
    width: 0.88rem;
    display: block;
    height: 0.88rem;
    margin: 0 auto;
  }

  .file_img span {
    margin-top: 0.1rem;
    display: block;
  }

  .file_btn {
    width: 100%;
    height: 2rem;
    font-size: .35rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .file_btn .bom {
    width: 1.5rem;
    height: .9rem;
    background: #fed15a;
    color: #FFFFFF;
    border-radius: 0.3rem;
    border: none;
    outline: none;
  }

  .home {
    width: 1.5rem;
    height: .9rem;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    color: #000000;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
  }

  .move {
    width: 100%;
    height: 3rem;
    font-size: 0.35rem;
  }

  .move_first {
    width: 100%;
    height: 1rem;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    border-bottom: 1px solid #CCCCCC;
  }

  .move_first span {
    width: 70%;
    display: block;
    float: left;
    line-height: 1rem;
    padding-left: 0.6rem;
    box-sizing: border-box;
  }

  .move_first img {
    display: block;
    float: right;
    margin-top: 0.2rem;
    margin-right: 0.3rem;
  }
</style>
