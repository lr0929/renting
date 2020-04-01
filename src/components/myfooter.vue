<template>
  <div class="myfooter" :active="active()">
    <ul>
      <li class="myfooter_li active" @click="addactive(0)">
        <router-link to="/">
          <i>
            <svg t="1575255617744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2500" width="200" height="200">
              <path d="M951.168 526.154a30 30 0 0 1-42.427 0c-0.044-0.045-0.081-0.1-0.125-0.14l-0.007 0.007-382.545-382.54a20 20 0 0 0-28.284 0l-382.545 382.54a30 30 0 1 1-42.426-42.426L476.567 79.837a50 50 0 0 1 70.71 0l403.758 403.758-0.006 0.006c0.045 0.045 0.094 0.081 0.139 0.126a30 30 0 0 1 0 42.427z m-72.246-221.373a30 30 0 0 1-30-30v-100h-100a30 30 0 0 1 0-60h130a30 30 0 0 1 30 30v130a30 30 0 0 1-30 30z m-698 237.25a30 30 0 0 1 29.994 29.75h0.006v307a20 20 0 0 0 20 20h137v-235a50 50 0 0 1 50-50h188a50 50 0 0 1 50 50v235h137a20 20 0 0 0 20-20v-302.7a30 30 0 1 1 59.656-4.554c0 0.084 0 0.166-0.006 0.25h0.35v337.004a50 50 0 0 1-50 50h-227V693.365a20 20 0 0 0-20-20h-128a20 20 0 0 0-20 20v265.416h-227a50 50 0 0 1-50-50v-337h0.006a30 30 0 0 1 29.994-29.75z"
                fill="#8a8a8a" p-id="2501"></path>
            </svg><strong></strong>
          </i>
          租房
        </router-link>
      </li>
      <li class="myfooter_li" @click="addactive(1)">
        <router-link to="/issue">
          <i>
            <svg t="1575256090590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3654" width="200" height="200">
              <path d="M512.8 587.9c-5 0-10-1.3-14.5-3.9L309.6 475c-8.9-5.2-14.5-14.8-14.5-25.1V232.1c0-10.3 5.5-19.9 14.5-25.1L498.3 98c8.9-5.2 20-5.2 29 0L716 207c8.9 5.2 14.5 14.8 14.5 25.1V450c0 10.3-5.5 19.9-14.5 25.1l-188.7 109c-4.5 2.5-9.5 3.8-14.5 3.8zM335.4 443.5l177.4 102.4 177.4-102.4V238.7L512.8 136.2 335.4 238.7v204.8z"
                fill="#8a8a8a" p-id="3655"></path>
              <path d="M710.3 930c-5 0-10-1.3-14.5-3.9l-188.7-109c-8.9-5.2-14.5-14.8-14.5-25.1V574.2c0-10.3 5.5-19.9 14.5-25.1l188.7-108.9c8.9-5.2 20-5.2 29 0l188.7 109c8.9 5.2 14.5 14.8 14.5 25.1v217.9c0 10.3-5.5 19.9-14.5 25.1l-188.7 109c-4.5 2.4-9.5 3.7-14.5 3.7zM532.9 785.6L710.3 888l177.4-102.4V580.7L710.3 478.3 532.9 580.7v204.9z"
                fill="#8a8a8a" p-id="3656"></path>
              <path d="M315.3 930.7c-5 0-10-1.3-14.5-3.9l-188.7-109c-8.9-5.2-14.5-14.8-14.5-25.1V574.9c0-10.3 5.5-19.9 14.5-25.1l188.7-108.9c8.9-5.2 20-5.2 29 0l188.7 109c8.9 5.2 14.5 14.8 14.5 25.1v217.9c0 10.3-5.5 19.9-14.5 25.1L329.8 927c-4.5 2.4-9.5 3.7-14.5 3.7zM137.9 786.2l177.4 102.4 177.4-102.4V581.4L315.3 479 137.9 581.4v204.8z"
                fill="#8a8a8a" p-id="3657"></path>
            </svg>
          </i>
          发房源
        </router-link>
      </li>
      <li class="myfooter_li" @click="addactive(2)">
        <router-link to="/my">
          <i>
            <svg t="1575256231741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="5638" width="200" height="200">
              <path d="M511.970429 559.100186A279.550093 279.550093 0 0 1 314.302198 81.881862a279.550093 279.550093 0 1 1 395.361887 395.361887 277.719479 277.719479 0 0 1-197.693656 81.856437z m0-514.606083c-129.668529 0-235.05599 105.451024-235.05599 235.05599s105.451024 235.05599 235.05599 235.05599S747.013707 409.167772 747.013707 279.550093 641.588108 44.494103 511.970429 44.494103z"
                p-id="5639" fill="#8a8a8a"></path>
              <path d="M957.699641 1023.94915a22.247052 22.247052 0 0 1-22.247052-22.247052c0-107.43419-43.922036-208.486654-123.655468-284.57157C731.758586 640.715084 625.290553 598.763501 511.970429 598.763501s-219.788156 41.951583-299.813979 118.354314C132.423018 793.202731 88.500982 894.267908 88.500982 1001.752948a22.247052 22.247052 0 0 1-44.494103 0 427.93157 427.93157 0 0 1 36.930105-174.582147 445.424109 445.424109 0 0 1 100.505823-142.241291 468.179665 468.179665 0 0 1 148.73743-95.662322 489.358858 489.358858 0 0 1 363.580385 0 468.179665 468.179665 0 0 1 148.73743 95.662322 445.424109 445.424109 0 0 1 100.505822 142.241291A427.93157 427.93157 0 0 1 979.946692 1001.752948a22.247052 22.247052 0 0 1-22.247051 22.196202z"
                p-id="5640" fill="#8a8a8a"></path>
            </svg>
          </i>
          我的
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  export default {
    name: 'index',
    data() {
      return {
        url: 'http://49.235.188.239:3002/',
      }
    },
    computed: {
      ...mapGetters([
        "userinfo",
        "token"
      ])
    },
    created() {

    },
    mounted() {

    },
    methods: {
      ...mapActions({
        setuserinfo: 'setuserinfo'
      }),
      active() {
        let $ = this.$jq;
        setTimeout(function() {
          // console.log(this)
          let i = sessionStorage.getItem("footeractive")
          if (i == undefined) {
            sessionStorage.setItem("footeractive", 0)
          }
          // console.log($)
          $(".myfooter_li").removeClass("active");
          $(".myfooter_li").find("svg path").attr("fill", "#8a8a8a");
          $(".myfooter_li").eq(i).addClass("active")
          $(".myfooter_li").eq(i).find("svg path").attr("fill", "#ea5f40");
        }, 1)
      },
      addactive(i) {
        sessionStorage.setItem("footeractive", i)
        if (i == 1) {
          let $this = this;
          this.$axios.post(this.url + 'api/identity', {
              token: $this.token,
            })
            .then(res => {
              if (i == 1 && $this.userinfo.root == 0) {
                alert(res.data.msg)
                $this.addactive(2)
                $this.$router.push({
                  path: "/my"
                })
              }
            })
        }
      },
    }
  }
</script>

<style>
  .myfooter {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999999;
    width: 100%;
    height: .97rem;
    overflow: hidden;
  }

  .myfooter ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f2f2f2;
    background: #fff;
  }

  .myfooter ul li {
    height: 100%;
  }

  .myfooter ul li a {
    display: block;
    font-size: .2rem;
    color: #888888;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .myfooter ul li a i {
    padding-top: .1rem;
    width: 100%;
    height: .4rem;
  }

  .myfooter ul li a i svg {
    display: block;
    margin: auto;
    width: .4rem;
    height: .4rem;
  }

  .myfooter .active a {
    color: #ea5f40;
  }
</style>
