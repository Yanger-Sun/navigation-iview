# navigation-iview

> 一级导航+二级导航（ivew+jquery）

## 主要依赖

>  iview   jquery   vue

## 传参格式

```
[
    {
        menuName:'首页',                //导航名
        matchPath:['/channels'],        //匹配高亮样式
        url:'/um/channels',             //跳转路径(路径与路由二选一)
        route:{},                       //跳转路由(路径与路由二选一)
        children:[
            {
                                        //子导航  写法与父级导航相同 
            }
        ],                     
        isHideSecond:true,              //是否需要隐藏二级导航
        icon:'',                        //当前icon
        theme:'light'                   //匹配后导航皮肤主题  (light/dark)
    }
]
```

>>
    一级导航路径   navigation-header.vue 
    二级导航路径   navigation-secondory.vue

     导航写法参考  src/component/navigation/navigation.js
     导航组件引用参考  src/component/navigation/app-navigation.vue 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
