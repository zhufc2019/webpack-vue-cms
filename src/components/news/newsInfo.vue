<template>
	<div class="newsInfo-container">
		<!-- 标题 -->
		<h2 class="title">{{ newsInfo.title }}</h2>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>
				<span>上映时间：</span><span v-for='value in newsInfo.attrs.pubdate'>{{value + ' '}}</span>
			</span>
			<span>
				<span>时长：</span><span v-for='value in newsInfo.attrs.movie_duration'>{{value+'&nbsp;'}}</span>
			</span>
		</p>

		<hr>
		<!-- 内容 -->
		<div class="imgContainer"><img :src="newsInfo.image" alt=""></div>

		<div class="content">
			{{newsInfo.summary}}
		</div>

		<!-- 评论 -->
		<comments :id='this.id'></comments>

		
	</div>

</template>

<script>
	import { Toast } from 'mint-ui'
	import comments from '../subcomponents/comments.vue'

	export default {
		data() {
			return {
				id:this.$route.params.id,
				newsInfo:{}
			}
		},
		created() {
			console.log(this);
			this.getNewsInfo();
		},
		methods:{
			getNewsInfo() {
				this.$http.get('https://douban.uieee.com/v2/movie/' + this.id).then(result => {
					if (result.status === 200) {
						console.log(result);
						this.newsInfo = result.body;
					} else{
						Toast('新闻加载失败');
					}
				})
			}
		},
		components:{
			'comments': comments
		}

}
</script>

<style lang='scss' scoped>
	.newsInfo-container {
		padding:0 3px;
		position: relative;
	.title {
		font-size:18px;
		text-align:center;
		margin:15px 0;
		color:red;
	}
	.imgContainer {
		text-align:center;
	}
	hr {
    border-top: 1px solid #ccc;
  }
	.subtitle {
		font-size:13px;
		color:#226aff;
		border-bottom:1px soild #000;
		display:flex;
		justify-content:space-between;
	}
	.content {
		text-indent:2em;
		margin-top:2em;
	}
} 


</style>