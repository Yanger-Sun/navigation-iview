<template>
    <div>
        <header :class="['g-nav-header',navTheme]">
            <section class="g-nav-top">
                <slot name="g-option-back"></slot>
                <!-- logo处 -->
                <div class="g-nav-l">
                    <a  :href="logo.url  || toLink(logo,1)"  
                        :target="logo.isBlank?'_blank':'_self'" 
                        v-if="logo && JSON.stringify(logo) !== '{}'" 
                        :class="['g-nav-logo',navTheme]">
                        <img :src="logo.icon[navTheme]"
                             alt="" srcset="">
                    </a>
                    
                    <div>
                        <ul class="g-nav-l-menu">
                            <li class="g-nav-menu-item g-pop-parent"
                                v-for="(menu,index) in formateMenu"
                                :key="index">
                                <!-- 无二级导航 -->
                                <template v-if="!menu.children || menu.children.length == 0">
                                    <router-link :target="menu.isBlank?'_blank':'_self'" 
                                        @click="toPath(menu,menu,index)" 
                                        v-if="hasRoute && menu.route && (menu.route.name || menu.route.path)" 
                                        :to="menu.route" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </router-link>
                                    <!-- <a v-if="menu.url || menu.route" :href="menu.url || toLink(menu,1)" :target="menu.isBlank?'_blank':'_self'" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </a> -->
                                    <a v-else-if="menu.domain" 
                                        href="javascript:void(0);" 
                                        @click="toPath(menu,menu,index)" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </a>
                                    <a v-else :href="menu.url" 
                                        :target="menu.isBlank?'_blank':'_self'" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </a>
                                </template>
                                <!-- 带二级导航显示 -->
                                <Poptip v-else trigger="hover"
                                        @on-popper-show="popperShow(index)"
                                        @on-popper-hide="popperHide(index)"
                                        class="g-nav-tit"
                                        placement="bottom" >
                                    
                                    <!-- 更多显示 -->
                                    <span v-if="menu.menuName=='更多'" 
                                            :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]"  >{{menu.menuName}}</span>
                                    <!-- 路由跳转 -->
                                    <router-link v-else-if="hasRoute && menu.children[0].route && (menu.children[0].route.name || menu.children[0].route.path)"  
                                                :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]"
                                                :target="menu.children[0].isBlank?'_blank':'_self'" 
                                                @click="toPath(menu.children[0],menu,1)" :to="menu.children[0].route" >
                                                <!-- <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]"> -->
                                                    {{menu.menuName}}
                                                <!-- </span> -->
                                    </router-link>
                                    <!-- 自定义链接 -->
                                    <a v-else-if="menu.children[0].domain" 
                                        href="javascript:void(0);" 
                                        @click="toPath(menu.children[0],menu,1)" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </a>
                                    <!-- url跳转 -->
                                    <a v-else 
                                        :href="menu.children[0].url" 
                                        :target="menu.isBlank?'_blank':'_self'" >
                                        <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                                    </a>

                                    <div slot="content">
                                        <ul class="g-pop-l">
                                            <li :class="showActive(item,menu,itemIndex) ? 'active':''"
                                                v-for="(item,itemIndex) in menu.children"
                                                :key="itemIndex">

                                                <router-link :target="item.isBlank?'_blank':'_self'" @click="toPath(item,menu,itemIndex)" v-if="hasRoute && item.route && (item.route.name || item.route.path)"
                                                    :to="item.route">
                                                    {{item.menuName}}
                                                </router-link>
                                                <!-- <a :href="item.url  || toLink(item,2)" :target="item.isBlank?'_blank':'_self'" >{{item.menuName}}</a> -->
                                                <a v-else-if="item.domain" 
                                                    @click="toPath(item, menu, itemIndex)">{{item.menuName}}</a>
                                                <a :href="item.domain ? makeUrl(item) : item.url" 
                                                    :target="item.isBlank?'_blank':'_self'" 
                                                    v-else>{{item.menuName}}</a>

                                            </li>
                                        </ul>
                                    </div>
                                </Poptip>
                            </li>
                        </ul>
                    </div>
                </div>
                <slot name="g-nav-r"></slot>
            </section>
        </header>

    </div>
</template>

<style lang="scss" scoped>

    $key_name: (
        c:"color",
        b:"background"
    );
    @mixin makeColor($type,$color) {
        @each $key, $val in $key_name{
            @if $key == $type{
                #{$val}:$color;
            }
        }
    }

    .g-nav-header{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 60px;
        &.light{
            background: #ffffff;
            .g-nav-top{
                a.g-nav-menu-name,
                span.g-nav-menu-name{
                    text-decoration: none;
                    color: #111A38;
                    cursor: pointer;
                    &.active,&:hover,&.router-link-active{
                        border-bottom: 2px solid #5293F5;
                        color: #5293F5;
                    }
                    & /deep/ .ivu-icon{
                        margin-left:6px;
                    }
                }
                & /deep/ .ivu-poptip-rel.g-pop-show .g-nav-menu-name{
                    border-bottom: 2px solid #5293F5;
                    color: #5293F5;
                    cursor: pointer;
                }
                & /deep/ .ivu-poptip-popper{
                    top:60px !important;
                    min-width: auto;
                    background: #ffffff;
                    z-index: 100;
                }
            }
        }
        &.dark{
            background: #07111A;
            height:40px;
            .g-nav-top{
                    a.g-nav-menu-name,
                    span.g-nav-menu-name{
                    text-decoration: none;
                    color: #999FA7;
                    cursor: pointer;
                    &.active,&:hover,&.router-link-active{
                        color: #FFFFFF;
                    }
                }
                & /deep/ .ivu-poptip-popper{
                    min-width: auto;
                    top:40px !important;
                    background: #ffffff;
                    z-index: 100;
                }
                & /deep/ .ivu-poptip-rel.g-pop-show .g-nav-menu-name{
                    color: #FFFFFF;
                    cursor: pointer;
                }
                .user-home-info /deep/ .ivu-poptip .user-profile{
                    img{
                        border:1px solid #ffffff;
                        border-radius: 50%;
                    }
                    span{
                        color: #FFFFFF;
                    }
                }
            }
        }
        .g-nav-top{
            width: 1180px;
            height: 100%;
            margin: 0 auto;
            display:flex;
            justify-content: space-between;
            & > div{
                display: flex;
                align-items: center;
                & /deep/ .ivu-poptip-arrow{
                    display: none;
                }
                & /deep/ .ivu-poptip-popper{
                    padding-top: 1px;
                    &/deep/ .ivu-poptip-inner{
                        border-radius: 0;
                        box-shadow: 0 1px 6px rgba(0,0,0,.2);
                    }
                    & /deep/ .ivu-poptip-body{
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
                & /deep/ .ivu-poptip-inner{
                        box-shadow: 0 1px 6px rgba(0,0,0,.2);
                    ul.g-pop-l{
                        padding: 5px 0;
                        background: #ffffff;
                        // text-align: center;
                        li{
                            a{
                                color: rgba(17,26,56,1);
                                display: inline-block;
                                padding: 0 36px;
                                width: 100%;
                                text-decoration: none;
                                box-sizing: border-box;
                            }
                            font-size: 14px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            line-height: 20px;
                            margin-bottom: 10px;
                            cursor: pointer;
                            &:last-child{
                                margin-bottom: 0;
                            }
                            &.active a,&:hover a{
                                color: #5293F5;
                                text-decoration: none;
                            }
                        }
                    }
                }
                a.g-nav-menu-name,
                span.g-nav-menu-name{
                    text-decoration: none;
                    font-size: 14px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    line-height: 20px;
                    cursor: pointer;
                }
                &.g-nav-l{
                    align-items: center;
                    .g-nav-logo{
                        margin-right: 40px;
                        &.light{
                            // width: 98px;
                            height:40px;
                        }
                        &.dark{
                            // width: 60px;
                            height:26px;
                        }
                        img{
                            // width: 100%;
                            height: 100%;
                        }
                    }
                    & > div{
                        height: 100%;

                    }
                    .g-nav-l-menu{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        height: 100%;
                        margin: 0;
                        & > li{
                            a{
                                cursor: pointer;
                                text-decoration: none;
                            }
                            padding: 0 20px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
    .navigation-back{
        width:100%;
        height:60px;
        background: #ffffff;
        section{
            width:1180px;
            height: 60px;
            margin:0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(17,26,56,1);
            line-height:20px;
            overflow: hidden;
            p{
                img{
                    width: 8px ;
                    height: 14px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .back-border{
                    width:1px;
                    height:14px;
                    background:#F5F5F5;
                    margin-left:15px;
                    margin-right: 15px;
                    vertical-align: middle;
                    display: inline-block;
                }
            }
            .right-tit{
                float:right;
                color: #999fa7;
                font-weight: 400;
                font-size: 14px;
            }
        }
    }
    .nav-fenzhan{
        width: 100%;
        height: 60px;
        background: #FFFFFF;
        ul{
            width:1180px;
            height:100%;
            margin:0 auto;
            display: flex;
            align-items: center;
            li{
                position: relative;
                cursor: pointer;
                a.g-nav-menu-name,
                span.g-nav-menu-name{
                    text-decoration: none;
                    margin:0 20px;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    line-height:25px;
                    color: #111A38;
                }
                span.nav-sec-border{
                    width:24px;
                    height:2px;
                    background:rgba(82,147,245,1);
                    border-radius:2px;
                    position:absolute;
                    bottom:-7px;
                    left:50%;
                    margin-left: -12px;
                    display: none;
                }
                &:hover,&.router-link-active{
                    a.g-nav-menu-name,
                    span.g-nav-menu-name{
                        text-decoration: none;
                        color:#5293F5;
                    }
                    span.nav-sec-border{
                        display:block;
                    }
                }
            }
        }
    }
</style>

<script>
    import $ from 'jquery'
    export default {
        data(){
            return{
                showSecondary:false,
                secondaryInfo:{},
                secondarySelect:"",
                formateMenu:[],
                navTheme:this.theme
            }
        },
        props:{
            theme:{
                type:String,
                default:'light'
            },
            logo:{
                type:Object,
                default:()=>{}
            },
            fenNav:{
                type:Object,
                default:()=>{}
            },
            menuList:{
                type:Array,
                default:()=>[]
            },
            showNumber:{
                type:Number,
                default: 7
            }
        },
        components:{
        },
        computed: {
            hasRoute(){
                return this.$route || false;
            },
            currentRoutePath() {
                return this.$route && this.$route.path || '';
            },
            currentRouteName() {
                return this.$route && this.$route.name || '';
            },
            currentRouteMatch(){
                return this.$route && this.$route.matched.length && this.$route.matched[0].path || ''
            },
            nowHref(){
                return location.href;
            }
        },
        watch: {
            showNumber(){
                this.dealMenu();
            },
            menuList(){
                this.dealMenu();   
            },
            '$route':'getPath'
        },
        created() {
            this.dealMenu();
        },
        mounted() {
            this.dealMenu();
        },
        methods: {
            dealMenu(){
                let matchPath = [];
                this.menuList.length > this.showNumber ? this.menuList.slice(this.showNumber-1).forEach(item=>{
                    typeof item.matchPath === 'string' ? matchPath.push( item.matchPath ) 
                                                        : matchPath.push( ...item.matchPath )                
                }) : [];
                let remainMenu = this.menuList.length > this.showNumber ? {
                        menuName:'更多',
                        matchPath:matchPath,
                        children:[...this.menuList.slice(this.showNumber-1)],
                        icon:''
                    }:{};
                let endMenu = this.menuList.length > this.showNumber ? [].concat(this.menuList.slice(0,this.showNumber - 1),remainMenu) : this.menuList;
                this.formateMenu = endMenu;         
                this.getPath();
            },
            //下拉二级导航高亮处理
            showActive(item, menu, itemIndex){
                let showActiveFlag =  ((this.currentRoutePath && (item.url || item.route) && (item.url && item.url.indexOf(this.currentRoutePath) > -1) || (this.hasRoute && item.route )&& (item.route.path === this.currentRoutePath || item.route.name === this.currentRouteName) )  || this.matchPath(item)) ? true : false;

                // this.$emit('on-update-select',item,menu,itemIndex);

                return showActiveFlag;
            },

            // 一级导航高亮
            showHeaderActive(menu){
                let children = this.getChildren(menu);
                let index = children && children.findIndex(item=>(this.currentRoutePath.indexOf(item.url)>-1 || (this.hasRoute && item.route) && (item.route.name === this.currentRouteName || item.route.path === this.currentRoutePath)));
                return ((children.length && index > -1) || this.currentRoutePath.indexOf(menu.url)>-1  || location.href.indexOf(menu.url)>-1 || this.matchPath(menu)) ? true : false
            },

            //获取二级菜单
            getChildren(menu){
                if(!menu.children || !menu.children.length) {
                    return [];
                }
                let children = menu.children.filter((v,i)=>{
                    return v.url || v.domain || (this.hasRoute && v.route && (v.route.path || v.route.name));
                })
                return children;
            },

            // 匹配路径
            matchPath(menu){
                let matchFlag  = false;
                if(!menu || !menu.matchPath){
                    return false;
                }
                menu.matchPath.forEach((v,i)=>{
                    if(this.currentRouteMatch.indexOf(v) > -1 || this.currentRouteMatch.indexOf(v.path) > -1 || this.currentRoutePath.indexOf(v) > -1 || this.currentRoutePath.indexOf(v.path) > -1 || location.href.indexOf(v)>-1 || location.href.indexOf(v.path)>-1){
                        matchFlag = true;
                    }
                })
                return matchFlag;

            },

            //通过链接进入，对应导航及二级菜单显示与高亮
            getPath(){
                let menuIndex = '';
                let selectMenu = [];
                let selectItem = {};
                let theme = '';

                let findIndex = this.menuList.findIndex(item=>(item.url===this.currentRoutePath || (this.hasRoute && item.route && (item.path === this.currentRoutePath || item.name === this.currentRouteName))));

                this.menuList.forEach((v,i)=>{
                    let children = this.getChildren(v);
                    let index = children && children.findIndex(item=>(item.url===this.currentRoutePath || location.href.indexOf(item.url)>-1 || (this.hasRoute && item.route && (item.route.name === this.currentRouteName || item.route.path === this.currentRoutePath))));
                    if((this.currentRoutePath.indexOf(v.url) >-1 || location.href.indexOf(v.url)>-1 || (this.hasRoute && v.route && (this.currentRoutePath ===  v.route.path || this.currentRouteName ===  v.route.name )) || index > -1 || this.matchPath(v)  || this.matchPath(v.children))){
                        theme = (v.children && v.children.length && index > -1 && v.children[index].theme)|| v.theme;
                        selectMenu.push(v);
                        if(index > -1){
                            menuIndex = index;
                            selectItem = v.children[menuIndex];
                        }else{
                            menuIndex = findIndex;
                        }
                        return ;
                    }
                    if(selectItem){

                        return ;
                    }
                })

                if(theme){
                    this.navTheme = theme;
                    this.$emit('on-update-theme',this.navTheme);
                    this.$emit('update-is-match', false)
                    this.$emit('on-update-select',selectItem,selectMenu[0],menuIndex);
                }else{
                    return ;
                }
            },
            toPath(self,  parent, itemIndex){
                if(self.domain){
                    window.open(self.domain,self.isBlank?'':'_self')
                }
                if(itemIndex){
                    this.$emit('update-is-match', false)
                    this.$emit('on-update-select', self, parent, itemIndex);
                }
            },
            toLink(self,num){
                console.log(num)
                let nowLink = this.$router.resolve(self.route)
                return nowLink.href;
            },
            makeUrl(menu){
                return `${makeUrl.domain}${menu.url}`
            },
            popperShow(num){
                $('.g-nav-menu-item').eq(num).find('.ivu-poptip-rel').addClass('g-pop-show');
            },
            popperHide(num){
                $('.g-nav-menu-item').eq(num).find('.ivu-poptip-rel').removeClass('g-pop-show');
            }
        },
    }
</script>
