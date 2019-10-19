<template>
	<div class="billboardCon">
		<!-- 顶部滑动条 -->
		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
						<a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html" @click='getIntheaters'>
							正在热映
						</a>
						<a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html" @click='getComingsoon'>
							即将上映
						</a>
						<a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html" @click='getTop250'>
							Top250
						</a>
						<a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html" @click='getWeekly'>
							口碑榜
						</a>
						<a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html" @click='getUsbox'>
							北美票房榜
						</a>
						<a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html" @click='getNewmovies'>
							新片榜
						</a>
					</div>
				</div>
		</div>

		<!-- 详情区 -->
		<div class="mui-card" v-for='item in showThis' :key='item.id'>
			<!--内容区-->
			<div class="mui-card-content">
				<router-link :to="'/home/movieInfo/' + item.id">
					<img :src="item.images.medium" alt="">
				</router-link>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer" style="font-weight:bold;color:#2f2f2f;">{{item.title}}</div>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	import { Toast,Indicator } from 'mint-ui'

	export default {
		data(){
			return {
				showThis:[],
				timeid:null,
				
			}
		},
		created() {
			this.getIntheaters();
		},
		mounted(){
			//初始化滑动插件
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods:{
			getIntheaters() {
				this.$http.get('https://douban.uieee.com/v2/movie/in_theaters').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
							
						}else {
							Toast('加载失败')
						}
				})
			},
			getComingsoon() {
				this.$http.get('https://douban.uieee.com/v2/movie/coming_soon').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
						}else {
							Toast('加载失败')
						}
				})
			},
			getTop250() {
				this.$http.get('https://douban.uieee.com/v2/movie/top250').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
						}else {
							Toast('加载失败')
						}
				})
			},
			getWeekly() {
				this.$http.get('https://douban.uieee.com/v2/movie/weekly').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
						}else {
							Toast('加载失败')
						}
				})
			},
			getUsbox() {
				this.$http.get('https://douban.uieee.com/v2/movie/us_box').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
						}else {
							Toast('加载失败')
						}
				})
			},
			getNewmovies() {
				this.$http.get('https://douban.uieee.com/v2/movie/new_movies').then(result => {
						if(result.status === 200) {
							console.log(result);
							this.showThis = [];
							this.showThis = result.body.subjects;
							Indicator.open('加载中...');
							this.timeid = setTimeout(() => {
								Indicator.close();
								clearTimeout(this.timeid);
							},2000);
						}else {
							Toast('加载失败')
						}
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	* { 
		touch-action: pan-y; 
		
	}
	.billboardCon {
		text-align: center;
	}
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    border-bottom: 2px solid #007aff; 
    text-decoration:none;
	}

	.mui-card {
		font-weight: 700;
		display: inline-block;
		width: 47%;
		  margin: 10px 5px;
		img {
			height: 100%;
    	width: 100%;
		}
	}
</style>

