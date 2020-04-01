<template>
	<div class="containerx">
		<div class="box">
			<div class="land">
				<span><a href="javascript:history.back(-1)"><img src="../assets/img/y_left.png" alt=""></a></span>
				<p class="fang">房东介绍</p>
			</div>
			<div class="cart" >
				<p class="yuan"><img :src="url+tip.headimg" alt=""></p>
				<p class="one">{{tip.mobile}}</p>
				<p class="two">{{tip.landlord}}</p>
			</div>
			<div class="ren">
				<span>认证信息</span>
			</div>
			<div class="renzheng">
				<div class="left">
					<div class="leftone">
						<img src="../assets/img/y_num.png" alt="">
						<span class="fen">真实身份</span>
					</div>
					<div class="right"><img src="../assets/img/y_ren2.jpg" alt=""></div>
				</div>
			</div>
			<div class="renzheng">
				<div class="left">
					<div class="leftone">
						<img src="../assets/img/y_num2.png" alt="">
						<span class="fen">真实姓名</span>
					</div>
					<div class="right"><img src="../assets/img/y_ren2.jpg" alt=""></div>
				</div>
			</div>
			<div class="renzheng">
				<div class="left">
					<div class="leftone">
						<img src="../assets/img/y_phone.png" alt="">,
				 		<span class="fen">手机号码</span>
					</div>
					<div class="right"><img src="../assets/img/y_ren2.jpg" alt=""></div>
				</div>
			</div>
			<div class="bottom" v-for="(item,index) in list" :key="index">
				<div class="b_left">
					<span class="imag">
						<img :src="item.img"/>
					</span>
					<div class="box">
						<span class="hezu">合租</span>
						<span class="yue">800/月</span>
					</div>
				</div>
				<div class="b_right">
					<p class="two">{{item.title2}}</p>
					<p class="three">{{item.title3}}<sup>2</sup></p>
					<p class="four">{{item.title4}}</p>
					<p class="five">{{item.title5}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url:"http://49.235.188.239:3002/",
				tip:{},
				list: [{
						img: require("../assets/img/rel1.jpg"),
						title1: "接受预约",
						title2: "洋河花园4室1厅",
						title3: "4室1厅1卫|15m",
						title4: "距离新溉路(隆旺超市)(公交站.."
					},
					{
						img: require("../assets/img/rel1.jpg"),
						title1: "已预约",
						title2: "洋河花园4室1厅",
						title3: "4室1厅1卫|15m",
						title4: "距离新溉路(隆旺超市)(公交站..",
						title5: "允许做饭"
					},

				],
				id:1
			}
		},
		components: {

		},
		created() {

		},
		mounted() {
			let $this=this
			let id=$this.id
			console.log(id)
			  this.$jq.post('http://49.235.188.239:3002/api/landlordinfo',{
				  id:id
			  })
			          .then(res => {
			            let $this = this
			            console.log(res)
						$this.tip=res.data
			          })
		},
		methods: {

		}
	}
</script>

<style scoped="scoped">
	.containerx {
		width: 100%;
		background: #f7f7f7;
	}

	.box {
		width: 6.84rem;
		margin: 0 auto;
	}

	.land {
		width: 100%;
		height: 1rem;
		text-align: center;
	}

	.land span {
		float: left;
		width: .4rem;
		height: .4rem;
		margin: .25rem;
		box-sizing: border-box;
	}

	.land span img {
		width: 100%;
		height: 100%;
	}

	.fang {
		font-size: .35rem;
		line-height: 1rem;
		margin-right: 0.8rem;

	}

	.cart {
		padding: .3rem;
		height: 3.04rem;
		background: #fff;
		margin-top: .3rem;
		text-align: center;
		box-sizing: border-box;
	}

	.cart .yuan {
		width: 1.33rem;
		height: 1.33rem;
		border-radius: 50%;
		margin: auto;
	}

	.cart .two {
		color: #a7a7a7;
	}

	.ren {
		height: 1.39rem;

	}

	.ren span {
		line-height: 1.39rem;
		font-size: .35rem;
		font-weight: 600;
	}

	.renzheng {
		height: .9rem;
		padding-top: .2rem;
		margin-top: .2rem;
		background: #fff;
		line-height: .7rem;
		box-sizing: border-box;
	}

	.left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.leftone img{
		margin-left: .2rem;
	}
	.leftone .fen{
		color: #a7a7a7;
	}
	.right {
		margin-right: .2rem;
		width: 1.30rem;
		height: .70rem;
		line-height: .7rem;
		float: right;
	}

	.right img {
		width: 100%;
		height: 100%;
	}

	.bottom {
		width: 100%;
		height: 2.93rem;
		background: #f9f9f9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .4rem 0 0 0;
		box-sizing: border-box;
	}

	.b_left {
		padding-left: .4rem;
		box-sizing: border-box;
		text-align: center;
		width: 40%;
		box-sizing: border-box;
	}

	.b_left .imag {
		float: left;
	}

	.b_left .box {
		width: 2.10rem;
		height: .68rem;
		line-height: .68rem;
		display: flex;
		float: left;
		margin-top: -2rem;
		text-align: center;
		margin-left: .1rem;
	}

	.b_left .box .hezu {
		width: 30%;
		background: #fdcd5d;
		color: #fff;
		display: inline-block;
	}

	.b_left .box .yue {
		width: 70%;
		background: #f5393a;
		color: #fff;
		display: inline-block;
	}

	.b_left span {
		display: inline-block;
	}

	.b_right {
		width: 60%;
		padding-left: .4rem;
		box-sizing: border-box;
	}

	.b_right p {
		margin: 0.2rem;
	}

	.b_right .one {
		width: 1.45rem;
		height: 0.45rem;
		line-height: 0.45rem;
		background: #ff4f42;
		color: #fff;
		text-align: center;
		border-radius: 0.2rem;
		float: right;
		margin-top: -.2rem;
	}

	.b_right .two {
		font-size: .35rem;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.b_right .three {
		color: #afafaf;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.b_right .four {
		color: #afafaf;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.b_right .five {
		color: #dd8b9f;
		font-size: .16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
