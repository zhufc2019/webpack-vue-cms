<template>
	<div class="mui-numbox" data-numbox-min='0'>
   	<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
   	<input id="test" class="mui-input-numbox" type="number" value="0" @change="countChanged" ref="numbox" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
 		</div>
</template>

<script type="text/javascript">
	import mui from "../../lib/mui/js/mui.min.js";

	export default {
		mounted() {
			mui('.mui-numbox').numbox();//初始化数字输入框
		},
		methods:{
			countChanged() {
				this.$emit('getCount',parseInt(this.$refs.numbox.value))
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped></style>