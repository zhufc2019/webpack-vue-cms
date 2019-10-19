<template>
	<div>
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='item in newslist' :key='item.alt'>
					<router-link :to="'/home/newsInfo/' + item.id" class="">
						<img class="mui-media-object mui-pull-left" :src="item.images.small">
						<div class="mui-media-body">
							<h2>{{item.title}}</h2>
							<p class="mui-ellipsis">
								<span><span>类型：</span><span v-for='(value) in item.genres'>{{value+' '}}</span></span>
								<span><span>上映时间：</span><span v-for='( value ) in item.pubdates'>{{value+'&nbsp;&nbsp;'}}</span></span>
							</p>
						</div>
					</router-link>
				</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	export default {
		data(){
			return {
				newslist:[]
			}
		},
		created(){
			this.getNewsList();
		},
		methods:{
			getNewsList(){
				this.$http.get('https://douban.uieee.com/v2/movie/in_theaters?start=0&count=20').then(result => {
						if(result.status === 200) {
							this.newslist = result.body.subjects;				
							console.log(this.newslist);
						}else {
							Toast('新闻列表加载失败');
						}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.mui-table-view {
		li {
			h2 {
				font-size:14px;
			}
			.mui-ellipsis{
				font-size:12px;
				color:#226aff;
				display:flex;
				justify-content:space-between;
			}
		}
	}
</style>