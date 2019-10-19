<template>
	<div>
		<!-- 轮播图 -->
		<swiper :carouselList='carouselList' :isfull='true'></swiper>

		<!-- 九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		    <img src="../../images/menu1.png" alt="">
		    <div class="mui-media-body">影视资讯</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/billboard">
		    <img src="../../images/menu2.png" alt="">
		    <div class="mui-media-body">影视榜单</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		    <img src="../../images/menu3.png" alt="">
		    <div class="mui-media-body">图书购买</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		    <img src="../../images/menu4.png" alt="">
		    <div class="mui-media-body">留言反馈</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		    <img src="../../images/menu5.png" alt="">
		    <div class="mui-media-body">视频专区</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		    <img src="../../images/menu6.png" alt="">
		    <div class="mui-media-body">个人中心</div></router-link></li>

		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import swiper from '../subcomponents/swiper.vue'

	export default {
		data() {
			return{
				carouselList:[]
			}
		},
		created(){
			this.getCarousel();
		},
		methods:{
			getCarousel() { 
				this.$http.get('https://douban.uieee.com/v2/movie/in_theaters?start=0&count=20').then(result => {
					if(result.status === 200) {
						var res = result;
						var carouselList = this.carouselList;
						console.log(res);
						for(var i = 0; i < 5; i++) {
							var info = res.body.subjects[i];
							console.log(info);
							carouselList.push(info);						
						}	
						console.log(this.carouselList);			
					}else {
						Toast('轮播图加载失败');
					}
				})
			}
		},
		components:{
			swiper
		}
	}
</script>

<style lang='scss' scoped>

	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		padding: 5px 15px;
	}

	.mui-grid-view.mui-grid-9 {
		background-color: #fff;
		border: none;
		
		img {
    	width: 60px;
    	height: 60px;
  	}

  	.mui-media-body {
  		font-size:13px;
  	}
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border:none;
	};
</style>