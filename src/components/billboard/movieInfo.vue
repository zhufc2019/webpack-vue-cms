<template>
	<div class="movieInfo-container">
		<!-- 标题 -->
		<h2 class="title">{{ movieInfo.title }}</h2>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>
				<span>上映时间：</span><span v-for='value in movieInfo.attrs.pubdate'>{{value + ' '}}</span>
			</span>
			<span>
				<span>时长：</span><span v-for='value in movieInfo.attrs.movie_duration'>{{value+'&nbsp;'}}</span>
			</span>
		</p>

		<hr>
		<!-- 内容 -->
		<div class="imgContainer"><img :src="movieInfo.image" alt=""></div>
		<div class="content">
			{{movieInfo.summary}}
		</div>

		<!-- 剧照 -->
		<div class="photosCon">
			<h3>剧照</h3>
			<vue-preview :slides="slide" @close="handleClose" style='text-align: center;'></vue-preview>
		</div>
	</div>
</template>

<script>
 


	export default {
		data(){
			return {
				movieInfo:{},
				id:this.$route.params.id,
				photos:[],
				slide: []
			}
		},
		created() {
			this.getMovieInfo();
			this.getPhotos();
		},
		methods:{
			getMovieInfo() {
				this.$http.get('https://douban.uieee.com/v2/movie/' + this.id).then(result => {
					if (result.status === 200) {
						console.log(result);
						this.movieInfo = result.body;
					} else{
						Toast('详情加载失败');
					}
				})
			},
			getPhotos() {
				this.$http.get('https://douban.uieee.com/v2/movie/subject/' + this.id + '/photos').then(result => {
						if (result.status === 200) {
							console.log(result);
							this.photos = result.body.photos;
							this.photos.forEach(item => {
							var slideObj = {
								src:item.image,
								msrc:item.icon,
								alt:item.album_title + '的剧照',
								title:item.alt_title,
								w: 600,
            		h: 400
							};
							this.slide.push(slideObj);
						})
						} else{
							Toast('详情加载失败');
						}
				})
			},
			handleClose () {
        console.log('close event')
      }
		}
	}
</script>

<style lang="scss" scoped>
	.movieInfo-container {
		padding:0 3px;
		position: relative;
		margin-bottom: 20%;
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
		.my-gallery {
			img {
 	    	margin-bottom: 6px;
			}
		}
		h3 {
			color: #226aff;
    	border-bottom: 2px solid;
    	padding: 8px 0px;
		}

} 
</style>