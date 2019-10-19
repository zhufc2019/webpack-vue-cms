const path = require('path');
// const webpack=require('webpack');//在配置文件中启用热更新的第二步
//导入在内存中生成的HTML页面
const htmlWebpackPlugin = require('html-webpack-plugin');
//VueLoaderPlugin 作用是将定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//提供node中的模块操作，向外暴露了一个配置对象
module.exports = {
	// mode 配置选项，告知 webpack 使用相应模式的内置优化。
	mode: 'production',
	// 在配置文件中，需要指定入口和出口
	entry:path.join(__dirname,'./src/main.js'),//入口，表示webpack打包哪个文件
	output:{
		path:path.join(__dirname,'./dist'),//指定打包好的文件输出到哪个目录
		filename:'bundle.js'//指定输出文件的名称
	},
	// devServer: {//配置dev-server命令参数的第二种形式，比在package.json中配置麻烦
 //    port:3000,//默认8080
 //    open:true,//打开浏览器
 //    contentBase:'src',//指定托管根目录
 //    hot:true,//在配置文件中启用热更新的第一步
 //    host:192.168.0.103
  // },
  plugins:[//配置插件的节点（webpack中，所有末尾带s的节点都是数组）
    // new webpack.HotModuleReplacementPlugin(),//new一个热更新模块对象，在配置文件中启用热更新的第三步
    // new htmlWebpackPlugin({// 创建一个在内存中生成 HTML  页面的插件
    // 	template:path.join(__dirname, './src/index.html'),//指定模板页面，以在内存中生成页面
    // 	filename:'index.html'//生成的页面名称
    // })
    new VueLoaderPlugin()
  ],
  module:{//配置第三方模块加载器
  	rules:[//第三方模块的匹配规则
  		{ test:/\.css$/, use:['style-loader','css-loader'] }, // 配置处理 .css 文件的第三方loader 规则
  		// { test:/\.less$/, use:['style-loader','css-loader','less-loader']}
  		{ test:/\.scss$/, use:['style-loader','css-loader','sass-loader'] },
  		{ test:/\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=10240&name=[name].[ext]?[hash:8]'},//配置处理图片路径的loader
  		{ test:/\.(woff2|woff|eot|svg|ttf)$/, use:'url-loader' },////配置处理字体图标路径的loader
  		//需要通过exclude排除掉node_modules文件夹，因为不需要打包编译第三方loader中的js
  		{ test:/\.js$/, use:'babel-loader',exclude:/node_modules/ },
      { test:/\.vue$/, use:'vue-loader'}
  	]
  },
  resolve:{
    alias:{//定义路径别名
      //修改vue被导入的路径
      "vue$":"vue/dist/vue.min.js"
    }
  }
}