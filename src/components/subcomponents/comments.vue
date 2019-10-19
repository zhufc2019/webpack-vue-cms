<template>
	<div>
		<h1 class="comment_title">评论区</h1>
		<textarea placeholder="说点什么吧..." class='comment_content' v-model='msg'></textarea>
		<mt-button type='primary' size='large' class='comment_btn' @click='postCom'>发表评论</mt-button>
		<p v-show='!flag'>暂无用户评论，快来抢个沙发吧</p>
		<h4 class="comment_title">热门评论</h4>
		<div class="cmt_list" v-show='flag'>
			<ul class="mui-table-view mui-scroll mui-table-view-chevron" id="testUl">
    		<li class="mui-table-view-cell mui-media" v-for='item in comments' :key='item.id'>
    		    <span href="javascript:;">
    		        <img class="mui-media-object mui-pull-left" :src="item.author.avatar">
    		        <div class="mui-media-body">
    		           {{item.author.name}}
    		          <p class='mui-ellipsis'>{{item.content}}</p>
    		        </div>
    		        <div class="comment-item-footer">
    		        	<span>来自安卓客户端</span><span>{{item.created_at}}</span><a class="glyphicon glyphicon-thumbs-up" style="margin-right:2px;"></a><span>{{item.useful_count}}</span><img src="https://wspic.iyingdi.com/static/images/article/reply_logo_grey_new.png" style="vertical-align: middle;width: 12px;">&nbsp;<a>回复</a>
    		        </div>
    		    </span>
    		</li>
  		</ul>

  		<mt-button type='primary' size='large' class='more_btn' plain @click='getMore'>加载更多</mt-button>
		</div>	
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				comments:[],
				flag:true,
				start:0,
				next_start:0,
				msg:'',
				list:[]
			}
		},
		created() {
			this.getComments();
		},
		methods:{
			getComments(){
				this.$http.get('https://douban.uieee.com/v2/movie/subject/' + this.id + '/comments?start='+ this.start).then(result => {
					if (result.status === 200) {
							console.log(result);
							this.comments = this.comments.concat(result.body.comments);
							this.start = result.body.next_start;
						}else{
							Toast('评论加载失败')
					}
				})
			},
			getMore() {
				this.getComments();
    	},
    	// postCom() {
    	// 	var newCom = {
    	// 		author:{
    	// 			id:Math.floor(Math.random()*(999999999-1+1))+1,
    	// 			avatar:'https://img3.doubanio.com/icon/u172745195-3.jpg',
    	// 			name:'匿名用户'
    	// 		},
    	// 		content:this.msg,
    	// 		useful_count:0,
    	// 		created_at:'2019-09-01 00:00:00'
    	// 	}
    	// 	this.list.
    	// }
		},
		props:['id']
	}
</script>

<style lang='scss' scoped>
		.comment_title {
			color:#3b68b8;
			font-weight:bold;
			margin-top:3em;
		}
		.comment_content {
			margin-bottom:5px;
		}
		.comment_btn {
			margin-bottom:15px;
		}
		.cmt_list {
			padding-bottom:80px;
		}
		.more_btn {
			margin-top:15px;
		}
		.mui-table-view {
			a {
				text-decoration:none;
				cursor:pointer;
			}
		span {
			img {
				border-radius:50%;
			}
		}
		.mui-media-body{
			color:#3b68b8;
		}		
		.mui-ellipsis {
			margin:5px 0;
			color:#757575;
			overflow: visible;
			white-space: normal;
		}
		.comment-item-footer {
			font-size:12px;
			margin-left: 51px;
			span {
				color: #9b9b9b;
    		margin-right: 10px;
			}
		}
		.mui-table-view-chevron .mui-table-view-cell {
		    padding: 5px 4px;
		}
	}
</style>