<template>
	<div class="goodslist">
		<!-- 编程式导航 -->
		<div class="goodsItem" v-for='item in booklist' :key='item.id' :to="'/home/goodsInfo/' + item.id" @click='goDetail(item.id)' v-cloak>
			<div class="imgCon">
				<img :src="item.images.medium" alt="">
			</div>
			<h4>{{item.title}}</h4>
			<div class="info">
				<p class="book-meta">
					<span>{{item.rating.average}}</span> / <span v-for='v in item.author'>{{v}}</span> 著 / <span v-for='v in item.translator'>{{v}}</span> 译 / <span>{{item.publisher}}</span> / <span>{{item.pubdate}}</span>
				</p>
				<p class="price">
					<del class="old" v-cloak>￥999</del>
					<span class="nowprice">￥{{item.price}}</span>
				</p>
			</div>
			<div class="button-group">
				<mt-button type="default" class='mui-button basic add'>查看详情</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				booklist:[],
				price:0,
				oldPrice:0,
				id:1003078
			}
		},
		created() {
			this.getBooks();
		},
		methods:{
			getBooks() {
				for(var i = this.id; i<=this.id + 20; i++) {
					var bookid = i;
					this.$http.get('https://douban.uieee.com/v2/book/' + bookid).then(result => {
						if (result.status === 200) {
							console.log(result);						
							this.booklist.push(result.body);
							this.price = result.body.price;
							this.id = ++bookid;
						}else{
							Toast('书籍加载失败')
						}						
					})
				}				
			},
			goDetail(id) {
				this.$router.push({name:'goodsInfo', params:{ id:id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodslist {
		display:flex;
		flex-wrap:wrap;
		padding:7px;
		justify-content:space-between;
		.goodsItem {
			width:49%;
			border:1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin:4px 0;
			display:flex;
			flex-direction:column;
			justify-content:space-between;
			.imgCon {
				text-align: center;
			}

			img {
				max-width:100%;
				max-height: 230px;
				border-radius: 3%;
			}

			.info {
				background-color: #eee;
				.book-meta {
					font-size: 12px;
    			line-height: 17px;
    			color: #9b9b9b;
				}
				.price {
					.nowprice {
    				font-size: 18px;
    				vertical-align: middle;
    				color: #e76648;
					}
				}
			}
			
			.button-group {
    		text-align: center;
    			.mui-button.add {
				  background-color: #f05f50;
				  color: #fff;
				  line-height: 41px;
    			width: 98%;
				}
			}	
		}		
	}
</style>