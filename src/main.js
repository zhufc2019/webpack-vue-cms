//入口文件
import Vue from 'vue'

import app from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


import 'bootstrap/dist/css/bootstrap.min.css'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true

// import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//安装注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//一进入网站就从本地存储中，读取购物车数据
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
	state:{
		car:car,
	},
	mutations:{
		//点击加入购物车，将商品信息加载到store的car数组中
		addToCar(state,goodsInfo) {
			var flag = false;
			state.car.some(item => {
				//如果之前购物车中已经有该商品，则修改数量即可
				if(item.id === goodsInfo.id) {
					item.count += parseInt(goodsInfo.count);
					flag = true;
					return true;
				}
			})
			//之前没有该商品，则将商品信息 push 到数组中即可
			if(!flag) {
				state.car.push(goodsInfo);
			}

			//将car数组保存到localStorage，实现本地持久存储
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		//更新购物车中count
		updateGoodsInfo(state,goodsInfo) {
			state.car.some(item => {
				if(item.id === goodsInfo.id) {
					item.count = parseInt(goodsInfo.count);
				}
			})

			localStorage.setItem('car', JSON.stringify(state.car));
		},
		//根据id，删除store中对应的商品
		removeFormCar(state,id) {
			state.car.some((item,i) => {
				if (item.id === id) {
					state.car.splice(i,1);
					return true;
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		//同步购物车中商品的选中状态
		updateGoodsSelected(state,info) {
			state.car.some(item => {
				if(item.id === info.id) {
					item.checked = info.checked;
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters:{
		getAllCount(state) {//获取所有商品的数量
			var c = 0;
			state.car.forEach(item => {
				c += item.count
			})

			return c;
		},
		getGoodsSelected(state) {//获取复选框选中状态
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.checked;
			})

			return o;
		},
		getGoodsCountAndAmount(state) {//获取商品总数和总价
			var o = {
				count:0,
				amount:0
			};
			state.car.forEach(item => {
				if(item.checked) {
					o.count += item.count;
					o.amount += item.price * item.count;
					console.log(o.count,o.amount);
				}
			})

			return o;
		}
	}
})

var vm = new Vue({
	el: '#app',
	render: (c) => c(app),
	router,
	store
})