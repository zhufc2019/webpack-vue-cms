<template>
	<div>
		<mt-swipe :auto="4000">
  		<mt-swipe-item v-for='item in carouselList' :key='item.alt'>
  			<img :src="item.images.small" alt="" :class="{full:isfull}">
  		</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script type="text/javascript">
	export default {
			props:['carouselList', 'isfull']
	}
</script>

<style type="text/css" lang="scss" scoped>
	.mint-swipe {
		height: 200px;
		.mint-swipe-item {
			text-align:center;
			img {
				height:100%;
			}
		}	
	}

	.full {
		width:100%;
	}
</style>