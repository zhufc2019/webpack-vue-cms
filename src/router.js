//抽离出来的路由模块

// 导入 vue-router 包
import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import newslist from './components/news/newslist.vue'
import newsInfo from './components/news/newsInfo.vue'
import billboard from './components/billboard/billboard.vue'
import movieInfo from './components/billboard/movieInfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import params from './components/goods/params.vue'

// 创建路由对象
var router = new VueRouter({
  routes: [
    { path:'/', redirect: '/home'},
    { path:'/home', component: HomeContainer },
    { path:'/member', component: MemberContainer },
    { path:'/search', component: SearchContainer },
    { path:'/shopcar', component: ShopCarContainer },
    { path:'/home/newslist', component: newslist },
    { path:'/home/newsInfo/:id', component: newsInfo },
    { path:'/home/billboard', component: billboard },
    { path:'/home/movieInfo/:id', component: movieInfo },
    { path:'/home/goodslist', component: goodslist },
    { path:'/home/goodsInfo/:id', component: goodsInfo, name:'goodsInfo'},
    // { path:'/home/goodsInfo/:id/params', component: params, name:'params'},
  ],
  linkActiveClass:'mui-active'
})

export default router