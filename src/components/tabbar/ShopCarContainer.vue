<template>
	<div class="shopcarCon">
		<div class="goodslist">
			<!-- 商品项目区 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for='(item,index) in goodslist' :key='item.id'>
						<!-- 复选框 -->
						<div class="inputCon">
							<form class="mui-input-group">
								<div class="mui-input-row mui-checkbox mui-left">
									<input name="checkbox" value="Item 1" type="checkbox" v-model='$store.getters.getGoodsSelected[item.id]' @change='selectedChange(item.id,$store.getters.getGoodsSelected[item.id])'>
								</div>
							</form>
						</div>				

						<!-- 图片	 -->
						<img :src="item.img" alt="">

						<!-- 商品信息 -->
						<div class="info">
							<h1>{{item.name}}</h1>
							<div>
								<span class="price">￥{{item.price}}</span>
								<numbox :initCount='item.count' :goodsid='item.id'></numbox>
							</div>
						</div>

						<div class="del">
							<a href="#" @click.prevent='remove(item.id)'>删除</a>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 结算区 -->
			<div class="mui-card accountsCon">
				<div class="mui-card-content">
					<div class="mui-card-content-inner accounts">
						<div class="left">
							<p>总计(不含运费)</p>
							<p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总计<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
						</div>
						<mt-button type='danger'>去结算</mt-button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import numbox from '../subcomponents/shopCar_numbox.vue'
	export default {
		data() {
			return {
				goodslist:[]
			}
		},
		created() {
			this.getGoodsList();
		},
		methods:{
			getGoodsList() {
				var car = JSON.parse(localStorage.getItem('car') || '[]');
				console.log(car);
				car.forEach(item => {
					this.goodslist.push(item);
				})
				console.log(this.goodslist);
			},

			remove(id){
				this.goodslist
				this.$store.commit('removeFormCar',id)
			},
			selectedChange(id,val) {
				console.log(id+'---'+val)
				this.$store.commit('updateGoodsSelected',{
					id,
					checked:val
				})
			}
		},
		components:{
			numbox
		}
	}
</script>

<style lang='scss' scoped>
	.shopcarCon {
		background-color: #eee;
		overflow:hidden;
		
		.goodslist {
			img {
				width: 30%;
			}

			.mui-card-content-inner {
				display: flex;
				border-bottom: 1px solid #a5a5a5;
				.inputCon {
					width: 3.5em;
					margin-left: -15px;
					
					img {
						margin-left: 20px;
					}
					.mui-input-row.mui-checkbox.mui-left {
						height:70px;
						input {
    					left: 20%;
    					top: 56%;
    				}
					}			
				}   		
			}
		}

		.info {
			margin-left: 10px;
			h1 {
				font-size: 16px;
    		font-weight: 700;
			}
			
			.price {
				color:#e76648;
			}
		}

		.del {		
			margin-left: 10px;
    	text-align: center;
    	line-height: 6.3em;
    	font-size: 1.3em;
    	width: 3em;

    	a {
    		color: #f00;
    	}
		}
		.accountsCon {
			margin-bottom: 6em;
			.accounts {
				display:flex;
				justify-content:space-between;
				align-item:center;
				span {
					font-size: 1.5em;
   				margin: 0 5px;
			}
				.red {
					color:#f00;
				}
			}
		}
		

	}
</style>