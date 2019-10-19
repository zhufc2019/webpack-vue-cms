<template>
	<div class="container">
		<div v-for='item in carouselList' :key='item.id'>
			<h2>{{item.title}}</h2>
			<div class="imgCon">
				<img :src="item.image" alt="">
			</div>
			<p>{{item.summary}}</p>
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
		h2 {
			color: #2f91fc;
    	text-align: center;
		}
		p {
			text-indent: 2em;
    	padding: 0 10px;
    	line-height: 1.5em;
		}
		div {
			margin-bottom: 5em;
		}
		.imgCon {
			text-align:center;
			margin-bottom:10px;
		}
	}
</style>