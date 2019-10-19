<template>
	<div class="goodsCon">
		<!-- 小球 -->
		<transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
			<div class="ball" v-show='isShow' ref='ball'></div>
		</transition>
		<!-- 轮播图 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :carouselList='carouselList'></swiper>
					</div>
				</div>
			</div>
		

		<!-- 商品购买区 -->
		<div class="mui-card">
				<div class="mui-card-header">
					<p class="title">{{goodsInfo.title}}</p>				
				</div>
				<div class="mui-card-header">
					<p>作者<span v-for='v in goodsInfo.author'>{{v}}</span></p>
					<p>评分<span>{{goodsInfo.rating.average}}</span></p>
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价<del>￥999</del>&nbsp;&nbsp;销售价<span class="nowprice">{{goodsInfo.price}}</span>
						</p>
						<div class="numboxCon">
							<span>购买数量</span><numbox @getCount='getSelectedCount'></numbox>
						</div>

						<div class="btnGroup">
							<mt-button type='primary' size='normal'>立即购买</mt-button>
							<mt-button type='danger' size='normal' @click='addToShopCar'>加入购物车</mt-button>
						</div>
					</div>
				</div>
			</div>

		<!-- 商品信息区 -->
		<div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
			<a class="mui-control-item mui-active" href="#params">商品参数</a>
			<a class="mui-control-item" href="#comments">商品评论</a>
			<a class="mui-control-item" href="#introduction">图文介绍</a>
		</div>

		<!-- 展示内容 -->
		<div class="mui-clearfix">
  		<div id="params" class="mui-control-content mui-active">
				<params :carouselList='carouselList'></params>
			</div>
			<div id="comments" class="mui-control-content">
				<comments></comments>
			</div>
			<div id="introduction" class="mui-control-content">
				<introduction :carouselList='carouselList'></introduction>
			</div>
		</div>	

	</div>
			
</template>

<script type="text/javascript">

	import swiper from '../subcomponents/swiper.vue'
	import params from './params.vue'
	import comments from './goodsComments.vue'
	import introduction from './introduction.vue'
	import numbox from "../subcomponents/goodsInfo_numbox.vue";

	export default {
		data() {
			return{
				id:this.$route.params.id,
				carouselList:[],
				goodsInfo:{},
				collections:{},
				isShow:false,
				selectedCount:0
			}
		},
		created() {
			this.getPhotos();
			// this.getCollection();
		},
		methods:{
			getPhotos() {
					this.$http.get('https://douban.uieee.com/v2/book/' + this.id).then(result => {
						if (result.status === 200) {
							console.log(result.body.images.small);						
							this.carouselList.push(result.body);
							this.goodsInfo = result.body;
						}else{
							Toast('书籍加载失败')
						}						
					})			
			},
			addToShopCar() {
				this.isShow = !this.isShow;
				var goodsInfo = {
					id:this.id, 
					count:this.selectedCount, 
					price:this.goodsInfo.price, 
					checked:true,
					name:this.goodsInfo.title,
					img:this.goodsInfo.image,
				};

				this.$store.commit('addToCar',goodsInfo);

			},
			beforeEnter(el) {
				el.style.transform = 'translate(0,0)';
			},
			enter(el,done) {
				el.offsetWidth;
				//如果结束的位置写死了，一旦页面滑动或者分辨率变化，结束位置便会不正确
				//解决方法：用购物车徽标的横纵坐标，减去小球起始位置横纵坐标，达到动态获取位移距离的目的
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				const badgePosition = document.getElementById('badge').getBoundingClientRect();
				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;
				el.style.transform = `translate(${xDist}px,${yDist}px)`;
				el.style.transition = 'all 0.5s ease';
				done();
			},
			afterEnter(el) {
				this.isShow = !this.isShow;
			},
			getSelectedCount(count) {//子组件调用父组件方法，向父组件传递count值
				this.selectedCount = count;

			}	
		},
		components:{
			swiper,
			params,
			introduction,
			comments,
			numbox
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.goodsCon {
		background-color: #eee;
		overflow:hidden;
		.ball {
			width: 15px;
    	height: 15px;
    	border-radius: 50%;
    	background-color: red;
    	position: absolute;
    	z-index: 99;
    	top: 379px;
    	left: 281px;
		}
		.mui-card {
			.mui-card-header {
				min-height: 30px;
				padding: 0px 15px;
			}
			.title{
				font-size: 1.2em;
    		font-weight: 700;
    		color: #333;
			}			
    	p {
				color: #505050;
    	}

		}
		.price {
			vertical-align: middle;
    	line-height: 30px;

    	del {
    		margin: 0 5px;
    	}

    	span {
    		margin-left: 5px;
    	}
		}
		.nowprice {
    	font-size: 18px;
    	vertical-align: middle;
    	color: #e76648;
		}

		.mui-card-content-inner {
		  position: relative;
		  padding: 0px 15px;
		}

		.numboxCon {
			display: flex;
    	justify-content: space-between;
    	span {
    		font-size: 1.2em;
    		font-weight: 700;
    		padding-top: 7px;
    	}  	
		}
		
		.btnGroup {
			margin: 10px 0;
			.mint-button--normal {
    		display: inline-block;
    		width: 49%;
    	}
		}
		.mui-clearfix {
			margin-bottom: 6em;
		}
	}
</style>