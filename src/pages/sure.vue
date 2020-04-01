<template>
	<div class="containeri">
		<div class="one">
			<span><a href="javascript:history.back(-1)"><img src="../assets/img/y_left.png" alt=""></a></span>
			<p class="fang">确认预约</p>
		</div>
		<div class="box">
			<div class="center">
				<div class="left"><img src="../assets/img/y_img.jpg" alt=""></div>
				<div class="right">
					<p class="frist">{{filelist[0].house_name}}</p>
					<p class="sceond">{{filelist[0].house_type}}</p>
					<p class="thrid">{{filelist[0].house_apartment}}|{{filelist[0].house_area}}m<sup>2</sup></p>
					<p class="fouth">￥{{filelist[0].rent}}元/月</p>
				</div>
			</div>
			<div class="bottom">
				<div class="once">
					<span>看房时间</span>
					<span class="color">{{filelist[0].look_time}}</span>
				</div>
        <div class="once" >
        	<span>联系人</span>
        	<span class="color">{{filelist[0].contacts_name}}</span>
        </div>
        <div class="once" >
        	<span>电话号码</span>
        	<span class="color">{{filelist[0].contacts_mobile}}</span>
        </div>
				<div class="fource">
					<div>留言</div>
					<div><textarea id="text" cols="30" rows="10" placeholder="请输入留言">{{filelist[0].contacts_msg}}</textarea></div>
				</div>
			</div>
			<div class="button">
				<div class="lefts" @click="leftthe">
					<span>确认</span>
				</div>
				<div class="rights" @click="fightthe">
					<span>拒绝</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        filelist:[],


			}
		},
		components: {

		},
		created() {

		},
		mounted() {
			let $this=this
      let id=this.$route.query.id
			let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
			$this.$axios.post('http://49.235.188.239:3002/api/ok_subscribe_info', {
					// "token": token,
					"id": id //预约id
				})
				.then(res => {
          $this.filelist=res.data.data
          console.log($this.filelist)
				})
		},
		methods: {
      leftthe:function(){
        let $this=this
         let id=this.$route.query.id
         console.log(id)
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post('http://49.235.188.239:3002/api/ok_subscribe', {
        		"token": token,
        		"id": id //预约id
        	})
        	.then(res => {
            console.log(res)
        	})
      },
      fightthe:function(){
        let $this=this
         let id=this.$route.query.id
        let token = JSON.parse(sessionStorage.getItem("vuex")).userinfo.userinfo.token
        $this.$axios.post('http://49.235.188.239:3002/api/no_subscribe', {
        		"token": token,
        		"id": id //预约id
        	})
        	.then(res => {
            console.log(res)
        	})
      }
		}

	}
</script>

<style scoped="scoped">
	.containeri {
		width: 100%;
	}

	.containeri .box {
		width: 6.84rem;
		margin: 0 auto;
	}

	.containeri .one {
		width: 100%;
		height: 1rem;
		text-align: center;
		border-bottom: 0.01rem solid #ccc;
	}

	.containeri .one span {
		float: left;
		width: .4rem;
		height: .4rem;
		margin: .25rem;
		box-sizing: border-box;
	}

	.containeri .one span img {
		width: 100%;
		height: 100%;
	}

	.containeri .fang {
		font-size: .35rem;
		line-height: 1rem;
		margin-right: 0.8rem;

	}

	.containeri .center {
		height: 3.64rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.containeri .center .left {
		width: 60%;
	}

	.containeri .center .right {
		width: 40%;
		box-sizing: border-box;
	}

	.containeri .right .frist {
		padding: .2rem 0 0 .2rem;
		font-size: .35rem;
		font-weight: 600;
	}

	.containeri .right .sceond {
		padding: .2rem 0 0 .2rem;
		color: #a7a7a7;
	}

	.containeri .right .thrid {
		padding: .2rem 0 0 .2rem;
		color: #a7a7a7;
	}

	.containeri .right .fouth {
		padding: .2rem 0 0 .2rem;
		color: red;
	}

	.containeri .bottom {
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		flex-direction: column;
		font-size: .32rem;
	}

	.containeri .once {
		display: flex;
		justify-content: space-between;
		height: 1.1rem;
		line-height: 1.1rem;
	}

	.containeri .once .color {
		color: #a7a7a7;
	}

	.containeri #text {
		list-style: none;
		border: none;
		resize: none;
		width: 100%;
		height: 100%;
		cursor: pointer;
		margin-top: .2rem;
	}

	.containeri .button {
		display: flex;
		justify-content: space-between;
	}

	.containeri .button .lefts {
		background: #f9493c;
		width: 3.22rem;
		height: 1.05rem;
		border-radius: .1rem;
	}

	.containeri .button .rights {
		width: 3.22rem;
		height: 1.05rem;
		background: #c6bdbe;
		border-radius: .1rem;
	}

	.containeri .button .lefts span {
		font-size: .35rem;
		color: #fff;
		display: block;
		line-height: 1.05rem;
		text-align: center;
	}

	.containeri .button .rights span {
		font-size: .35rem;
		color: #fff;
		text-align: center;
		line-height: 1.05rem;
		display: block;
	}
</style>
