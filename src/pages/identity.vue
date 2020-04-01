<!-- 身份类型 -->
<template>
  <div>
    <div class="identity_header">
      <div class="identity_headimg">
        <a href="javascript:history.back(-1)"><img src="../assets/img/certification_header.jpg" alt=""></a>
      </div>
      <div class="identity_title">
        <font>身份类型</font>

      </div>
    </div>
    <div class="identity_select">
      <div class="identity_titles">
        <font>请选择您的身份</font>
      </div>
      <label class="identity_person" v-for="(item,index) in genre" :class="{person:item.isactive}">
        <div class="person_text">
          <p>{{item.p}}</p>
          <font>{{item.font}}</font>
        </div>
        <div class="identity_checks">

          <input type="radio" name="select" v-model="radioval" :value="index">
          <img :src="item.selImg" alt="">
        </div>
      </label>
    </div>
    <div class="submitbtn_next">
      <button @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  export default {
    name: 'identity',
    data() {
      return {
        radioval: 0,
        genre: [{
            p: "个人身份",
            font: "平台用户,海量房源等你来住",
            isCheck: true,
            isactive: true,
            selImg: require("../assets/img/identity_sure.jpg"),
          },
          {
            p: "房东身份",
            font: "个人房东入驻,可发布合租、整租房源",
            isCheck: false,
            isactive: false,
            selImg: require("../assets/img/select.png"),
          },
          {
            p: "公寓入驻",
            font: "品牌公寓入驻，可发布合租、整租房源",
            isCheck: false,
            isactive: false,
            selImg: require("../assets/img/select.png"),
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        "userinfo",
      ])
    },
    created() {

    },
    mounted() {

    },
    watch: {
      radioval() {
        let radioval = this.radioval
        this.genre.forEach((item, index) => {
          if (radioval === index) {
            item.isactive = true
            item.selImg = require("../assets/img/identity_sure.jpg");
            item.isCheck = true;
          } else {
            item.isactive = false
            item.selImg = require("../assets/img/select.png")
            item.isCheck = false;
          }
        })
      }
    },
    methods: {
      ...mapActions({
        setuserinfo: "setuserinfo",
      }),
      next: function() {
        let radioval = this.radioval
        if (radioval == 0 && this.userinfo.root == 0) {
          this.$router.push({
            path: "/certification"
          })
        } else if (radioval == 1 && this.userinfo.root == 1) {
          this.$router.push({
            path: "/authentication"
          })
        } else if (radioval == 2 && this.userinfo.root == 0) {
          this.$router.push({
            path: "/hotel"
          })
        } else {
          alert("请检查身份类型")
        }
      },
    }
  }
</script>

<style scoped="scoped">
  .identity_header {
    width: 100%;
    height: 0.97rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid #f5f3f4;
  }

  .identity_headimg {
    width: 0.33rem;
    height: 0.53rem;
  }

  .identity_headimg img {
    width: 100%;
    height: 100%;
  }

  .identity_title {
    width: 6.47rem;
    height: 0.53rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 0.33rem;
  }

  .identity_select {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }

  .identity_titles {
    width: 100%;
    font-size: .4rem;
    padding-top: 0.57rem;
  }

  .identity_person {
    width: 6.81rem;
    height: 1.95rem;
    margin: 0.35rem 0;
    border: 1px solid #ececec;

    border-radius: 0.08rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .person {
    border-color: #d3143f;
  }

  .person_text p {
    width: 4.61rem;
    height: 0.37rem;
    margin-bottom: 0.35rem;
  }

  .identity_checks {
    position: relative;
  }

  .identity_checks input {
    width: 0.54rem;
    height: 0.54rem;

  }

  .identity_checks img {
    width: 0.54rem;
    height: 0.54rem;
    position: absolute;
    left: 0;
  }

  .identity_owner {
    width: 6.81rem;
    height: 1.95rem;
    margin: 0.35rem 0;
    border: 1px solid #ececec;
    /* border: 1px solid #d3143f; */
    border-radius: 0.08rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .owner_text p {
    width: 4.61rem;
    height: 0.37rem;
    padding-bottom: 0.35rem;
  }

  .owner_checks {
    position: relative;
  }

  .owner_checks input {
    width: 0.54rem;
    height: 0.54rem;

  }

  .owner_checks img {
    width: 0.54rem;
    height: 0.54rem;
    position: absolute;
    left: 0;
  }

  .identity_apartment {
    width: 6.81rem;
    height: 1.95rem;
    margin: 0.35rem 0;
    border: 1px solid #ececec;
    /* border: 1px solid #d3143f; */
    border-radius: 0.08rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .apartment_text p {
    width: 4.61rem;
    height: 0.37rem;
    padding-bottom: 0.35rem;
  }

  .apartment_checks {
    position: relative;
  }

  .apartment_checks input {
    width: 0.54rem;
    height: 0.54rem;

  }

  .apartment_checks img {
    width: 0.54rem;
    height: 0.54rem;
    position: absolute;
    left: 0;
  }

  .submitbtn_next {
    margin-top: 0.8rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }

  .submitbtn_next button {
    width: 100%;
    height: 1rem;
    background-color: #F23436;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-size: 0.38rem;
  }
</style>
