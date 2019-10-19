<template>
	<div class="container">
		<!-- <table v-for='item in carouselList' :key="item.id">
			<thead>
				<tr>
					<th>参数名称</th>
					<th>参数值</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>出版社</td>
					<td>{{item.publisher}}</td>
				</tr>
				<tr>
					<td>出版日期</td>
					<td>{{item.pubdate}}</td>
				</tr>
				<tr>
					<td>装饰</td>
					<td>{{item.binding}}</td>
				</tr>
				<tr>
					<td>价格</td>
					<td>{{item.price}}</td>
				</tr>
				<tr>
					<td>分类</td>
					<td>{{item.series.title}}</td>
				</tr>
				<tr>
					<td>页数</td>
					<td>{{item.pages}}</td>
				</tr>
			</tbody>
		</table> -->
		<div v-for='item in carouselList' :key="item.id" class="itemCon">
			<div>
				<span>出版社</span>&nbsp;&nbsp;<span>{{item.publisher}}</span>
			</div>
			<div>
				<span>出版日期</span>&nbsp;&nbsp;<span>{{item.pubdate}}</span>
			</div>
			<div>
				<span>装饰</span>&nbsp;&nbsp;<span>{{item.binding}}</span>
			</div>
			<div>
				<span>价格</span>&nbsp;&nbsp;<span>{{item.price}}</span>
			</div>
<!-- 			<div>
				<span>分类</span>&nbsp;&nbsp;<span>{{item.series.title}}</span>
			</div> -->
			<div>
				<span>页数</span>&nbsp;&nbsp;<span>{{item.pages}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {

			}
		},
		methods:{},
		props:['carouselList']
	}
</script>

<style type="text/css" lang="scss" scoped>
	.container {
		.itemCon {
			padding: 6px 0px;
			div{
				margin-bottom: 5px;
			}
		}
	}
</style>