<template>
  <div class="box">
    <div class="head">
      <el-input placeholder="租" @change="koone" prefix-icon="el-icon-search" v-model="input2" clearable></el-input>
      <div class="no" @click="cannel">
        取消
      </div>
    </div>
    <div class="history">
      <div>搜索历史</div>
      <div @click="del"><img src="../assets/img/zy21.png"></div>
    </div>
    <div class="record" v-for="(item,index) in list">
      <div><img src="../assets/img/zy22.png"></div>
      <div class="record-r">
        <div>{{item.search}}</div>
        <div>{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input2: '',
        list: []
      }
    },
    methods: {
      cannel: function() {
        this.$router.push({
          path: "/"
        })
      },
      history: function() {
        let $this = this
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        // console.log(token)
        $this.$axios.post("http://49.235.188.239:3002/api/selectsearchhistory", {
          token: token
        }).then(res => {

          $this.list = res.data.data
          // console.log($this.list)
        })

      },
      koone: function() {
        let $this = this
        let search = $this.input2
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post("http://49.235.188.239:3002/api/addsearchhistory", {
          search: search,
          token: token
        }).then(res => {
          console.log(1)
          if (res.data.stu == 200) {
            console.log(0)
            $this.$router.push({
              path: "/list",
              query: {
                search: search,
              }
            })
          } else {

          }
          console.log($this.list)
        })
      },
      del: function() {
        let $this = this
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post("http://49.235.188.239:3002/api/delsearchhistory", {
          token: token,
          id: 1
        }).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.history()
    },
    watch: {

    }
  }
</script>

<style>
  body {
    background-color: #f9f9f9;
  }

  .head {
    background-color: #FFFFFF;
    height: 1.2rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }

  .el-input {
    width: 80%;
  }

  .el-input__inner {
    border-radius: 1rem;
  }

  .head .no {
    color: #f3373e;
    font-size: 0.3rem;
  }

  .history {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.35rem;
    color: #999999;
    padding: 0.5rem 0.4rem 0;
    box-sizing: border-box;
  }

  .history img {
    width: 0.4rem;
    height: 0.4rem;
  }

  .record {
    padding: 0.5rem 0.4rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .record img {
    width: 0.5rem;
    height: 0.5rem;
  }

  .record-r {
    margin-left: 0.3rem;
  }

  .record-r div:first-child {
    font-size: 0.35rem;
  }

  .record-r div:last-child {
    font-size: 0.3rem;
    color: #989898;
  }
</style>
