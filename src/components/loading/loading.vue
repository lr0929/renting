<template>
  <div class="loading">
    <div class="box8">
      <div class="arc"></div>
      <div class="arc"></div>
      <div class="arc"></div>
      <div class="arc"></div>
      <div class="arc"></div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped="scoped">
  .loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,.3);
      pointer-events: none;
      cursor: not-allowed;
  }
  .box8 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100px;
    height: 50px;
    padding: 14px 13px;
    margin: 58px 5px;
    box-sizing: border-box;
    float: left;
  }

  .box8 .arc {
    width: 5px;
    height: 25px;
    float: left;
    margin-left: 5px;
  }

  .arc {
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    float: left;
    margin: 0 2px;
  }

  @keyframes article {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  .arc:nth-of-type(1) {
    animation: article .6s .1s infinite alternate;
  }

  .arc:nth-of-type(2) {
    animation: article .6s .2s infinite alternate;
  }

  .arc:nth-of-type(3) {
    animation: article .6s .3s infinite alternate;
  }

  .arc:nth-of-type(4) {
    animation: article .6s .3s infinite alternate;
  }

  .arc:nth-of-type(5) {
    animation: article .6s .2s infinite alternate;
  }

  .arc:nth-of-type(6) {
    animation: article .6s .1s infinite alternate;
  }

  .arc:nth-of-type(7) {
    animation: article .6s .1s infinite alternate;
  }

  .arc:nth-of-type(8) {
    animation: article .6s .2s infinite alternate;
  }

  .arc:nth-of-type(9) {
    animation: article .6s .3s infinite alternate;
  }

</style>
