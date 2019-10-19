#webpack-vue-cms项目
版本|日期
---|
v1.0|2019-09-01

---

####首页APP组件制作流程
1. 使用Mint-UI的Header组件，完成 **header** 区域制作
2. 使用 MUI 的Tabbar组件，完成底部 **Tabbar** 区域制作
3. 在中间区域放置 router-view，展示路由匹配的组件

####改造 App.vue 中的 Tabbar
1. **a标签**改成 **router-link标签**，**href属性**改成**to属性** 
2. 设置路由高亮：去掉 mui-active 类，在router.js中，定义linkActiveClass属性为 **mui-active**

####点击 Tabbar 链接，展示对应的路由组件
1. 在 **src** 文件夹下创建 **components文件夹-tabbar文件夹**，存放tabbar中对应的组件
2. 创建四个组件
3. 在路由入口 **router.js** 中，引入四个路由
4. 配置四个路由的匹配规则
5. 在 **App.vue** 页面入口中，创建**router-view标签**，显示对应的组件

####首页轮播图布局
1. 在HomeContainer.vue中，引入Mint-UI的 **Swipe** 组件
2. 在 **App.vue** 页面入口中，按需导入**Swipe** 组件，并注册到vue中
3. 设置 **.mint-swipe** 的高

####首页轮播图数据加载
1. 安装vue-resource
2. 引入vue-resource
3. 使用vue-resource的 this.$http.get 获取数据
4. 将数据保存到data的数组中
5. 使用 v-for 循环渲染 每个item

####改造 九宫格 区域的样式
1. 在HomeContainer.vue 引用mui的九宫格布局 grid-default
2. 修改图片和部分样式

####改造 九宫格 路由链接
1. HomeContainer.vue中九宫格部分的**a标签**改成 **router-link标签**，**href属性**改成**to属性** 
2. 创建 newslist.vue 文件
3. 在 router.js 中引入 newslist.vue 文件
4. 创建路由匹配规则

####新闻资讯页面制作
1. 使用 MUI 中的 media-list 布局
2. 使用 vue-resource 获取数据
3. 渲染数据到页面

####实现点击跳转新闻详情页
1. 每一项改造为router-link，并且提供唯一的标识符
2. 创建新闻详情组件 newsInfo.vue
3. 在路由模块中设置路由匹配规则

####实现新闻详情页数据渲染
1. 使用 this.$http.get 获取数据
2. 将数据存入data
3. 运用插值表达式将数据渲染到页面

####创建并引用评论组件
1. 创建 comments.vue 子组件
2. 在有评论的页面中，导入 comments.vue 子组件
3. 在父组件中，使用 components 属性，将评论组件注册为子组件
4. 将引入的子组件名称，在页面中以标签形式引用

####渲染评论数据
1. 通过 props 获取到 父组件的传递的id值
2. 通过 this.$http.get 获取评论数据
3. 将数据存储到data中
4. 通过插值表达式渲染评论数据

####发表评论
1. 文本框做双向数据绑定
2. 发表评论按钮绑定事件
3. 校验评论内容是否为空。如为空，则提示用户 评论内容不能为空。
<!-- 4. 通过 vue-resource 发送请求，把评论提交到服务器
5. 发表评论成功后，重新刷新列表，显示最新评论 -->
4. 另一种方法： 评论成功后，在客户端手动拼接评论对象，调用unshift方法，追加到评论开头

####影视榜单组件
1. 将 HomeContainer组件 的 影视榜单a链接 改为router-link
2. 创建billboard文件夹和movieInfo.vue组件
3. 在router.js中创建组件的匹配规则
4. 借助mui 的 tab-top-webview-main.html 布局。（去掉**mui-fullscreen**和**data-scroll="1"**的类）
5. 想要滑动条正常滑动，需要初始化：
  + 导入mui.js
  + 调用官方初始化方法。**由于需要操作DOM元素，所以将其放入mounted生命周期函数中否则需要手动刷新** 
  ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  ```
6. 由于mui.js中的部分语法，在webpack的严格模式下可能报错，所以，需要禁用webpack的严格模式。
  + 安装babel插件 `$ npm install babel-plugin-transform-remove-strict-mode`
  + 在babelrc文件中，加入
  ```
    {
        "plugins": ["transform-remove-strict-mode"]
    }
  ```
7. 滑动的时候报警告：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`
```
解决方法，可以加上* { touch-action: pan-y; } 这句样式去掉。
```
原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html
https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action

8. 和 App.vue 中的 `router-link` 身上的类名 `mui-tab-item` 存在兼容性问题，导致tab栏跳转失效，可以把`mui-tab-item`改名为`mui-tab-item-1`，并复制相关的类样式，来解决这个问题
9. billboard.vue中的a链接上添加点击事件，实现不同的tab栏显示不同榜单
10. 创建movieInfo.vue组件，引入并且设置路由匹配规则
11. 在movieInfo.vue组件中，使用vue-preview，设置预览图

####商品列表组件制作

####商品详情组件制作

####商品购物车组件制作


