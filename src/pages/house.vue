<template>
  <div class="containery">
    <div class="one">
      <span><a href="javascript:history.back(-1)"><img src="../assets/img/y_left.png" alt=""></a></span>
      <p class="fang">预约看房</p>
    </div>
    <div class="box">
      <div class="center">
        <div class="left"><img src="../assets/img/y_img.jpg" alt=""></div>
        <div class="right">
          <p class="frist">{{list.house_name}}</p>
          <p class="sceond">{{list.house_type}}</p>
          <p class="thrid">{{list.house_apartment}}|{{list.house_area}}m <sup>2</sup></p>
          <p class="fouth">￥{{list.rent}}元/月</p>
        </div>
      </div>
      <div class="bottom">
        <div class="once">
          <span>看房时间</span>
          <span class="color">
            <div class="block">
              <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </span>
        </div>
      </div>
      <div class="bottom">
        <div class="once">
          <span>联系人</span>
          <span class="color"><input v-model="yang1" type="text" placeholder="请输入联系人姓名" class="goes"></span>
        </div>
      </div>
      <div class="bottom">
        <div class="once">
          <span>电话号码</span>
          <span class="color"><input v-model="yang2" type="text" placeholder="请输入电话号码" class="goes"></span>
        </div>
        <div class="fource">
          <div><textarea id="text" cols="30" rows="10" placeholder="请输入留言" v-model="yang3"></textarea></div>
        </div>
      </div>

      <div class="button" @click="sub">
        <span>提交预约</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: new Date(2016, 9, 10, 18, 40),
        value2: new Date(2016, 9, 10, 18, 40),
        yang1: "",
        yang2: "",
        yang3: "",
        list: JSON.parse(this.$route.query.list),

      };
    },
    components: {

    },
    created() {

    },
    mounted() {},
    methods: {
      sub() {
        let $this = this
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        let id = this.list.id
        let uid = this.list.userinfo.id
        this.$axios.post("http://49.235.188.239:3002/api/add_subscribe", {
            token: token,
            "landlord_id": uid, //房东id
            "house_id": id, //房源id
            "contacts_name": this.yang1, //联系人
            "contacts_mobile": this.yang2, //联系人电换
            "contacts_msg": this.yang3, //留言
            "make_stu": 0 //默认值为0（这个接口写0）；预约状态：房客(0：待确认，1：预约成功，2：已取消,3:已拒绝)房东(0：接受预约，1：取消预约)
          })
          .then(res => {
            console.log(res)
          })
        console.log(this.yang1, this.yang2, this.yang3)
        $this.$router.push({
          query: {
            list: JSON.stringify($this.list)
          }
        })
        // console.log("已提交")
      }
    }
  }
</script>

<style>
  .el-date-picker__editor-wrap {
    width: 1rem;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 4.32rem;
  }

  .el-date-picker__editor-wrap .el-popper {
    width: 3rem;
  }

  .containery {
    width: 100%;
  }

  .containery .box {
    width: 6.84rem;
    margin: 0 auto;
  }

  .containery .one {
    width: 100%;
    height: 1rem;
    text-align: center;
    border-bottom: 0.01rem solid #ccc;
  }

  .containery .one span {
    float: left;
    width: .4rem;
    height: .4rem;
    margin: .25rem;
    box-sizing: border-box;
  }

  .containery .one span img {
    width: 100%;
    height: 100%;
  }

  .containery .fang {
    font-size: .35rem;
    line-height: 1rem;
    margin-right: 0.8rem;

  }

  .containery .center {
    height: 3.64rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .containery .center .left {
    width: 60%;
  }

  .containery .center .right {
    width: 40%;
    box-sizing: border-box;
  }

  .containery .right .frist {
    padding: .2rem 0 0 .2rem;
    font-size: .35rem;
    font-weight: 600;
  }

  .containery .right .sceond {
    padding: .2rem 0 0 .2rem;
    color: #a7a7a7;

  }

  .containery .right .thrid {
    padding: .2rem 0 0 .2rem;
    color: #a7a7a7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .containery .right .fouth {
    padding: .2rem 0 0 .2rem;
    color: red;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .containery .bottom {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-direction: column;
    font-size: .32rem;
  }

  .containery .once {
    display: flex;
    justify-content: space-between;
    height: 1.1rem;
    line-height: 1.1rem;
  }

  .containery .once .color {
    width: 60%;
    color: #a7a7a7;
  }

  .containery .once .color .block {
    width: 2.8rem;
  }

  .containery .once .color .goes {
    width: 3.5rem;
    border: none;
  }

  .containery .once .color i {
    margin-left: -.2rem;
    z-index: 999;
  }

  .containery #text {
    list-style: none;
    border: none;
    resize: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin-top: .2rem;
  }

  .containery .button {
    height: 1.06rem;
    background: #f9493c;
    border-radius: .2rem;
    text-align: center;
  }

  .containery .button span {
    font-size: .35rem;
    color: #fff;
    line-height: 1.06rem;
  }
</style>
