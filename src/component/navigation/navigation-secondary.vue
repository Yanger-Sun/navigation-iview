<template>
    <div class="navigation-secondary">
        <section>
            <div class="nav-sec-menu">
                <img v-if="headerMenu.icon" :src="headerMenu.icon" alt="">
                <span>{{headerMenu.menuName}}</span>
            </div>
            <ul class="nav-sec-children">
                <li :class="['nav-sec-list', index==secondarySelect?'active':'']" 
                    v-for="(menu, index) in formateMenu"
                    :key="index"
                    @click="toPath(menu, index)">

                    <template v-if="!menu.children">
                        <!-- {{menu.menuName}} -->
                        <!-- <a v-if="menu.url " :href="menu.url || toLink(menu,1)" :target="menu.isBlank?'_blank':'_self'" >
                            <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                        </a> -->
                        
                        <router-link :target="menu.isBlank?'_blank':'_self'" v-if="menu.route && (menu.route.name || menu.route.path)" :to="menu.route" >
                            <span>{{menu.menuName}}</span>
                        </router-link>
                        <a v-else-if="menu.domain" href="javascript:void(0);" @click.stop="toPath(menu)" >
                            <span :class="['g-nav-menu-name', showHeaderActive(menu) ? 'router-link-active' : '' ]">{{menu.menuName}}</span>
                        </a>
                        <a v-else :target="menu.isBlank?'_blank':'_self'" :href="menu.url" >
                            <span>{{menu.menuName}}</span>
                        </a>
                        <span class="nav-sec-border"></span>
                    </template>
                    <Poptip v-else trigger="hover" 
                            @on-popper-show="popperShow(index)"
                            @on-popper-hide="popperHide(index)" 
                            class="g-nav-tit" 
                            placement="bottom" >
                        {{menu.menuName}}
                        <span class="nav-sec-border"></span>
                        <div slot="content">
                            <ul class="g-pop-l">
                                <li :class="showActive(item, menu, itemIndex) ? 'active':''" 
                                    v-for="(item, itemIndex) in menu.children" 
                                    :key="itemIndex">
                                    
                                    <router-link :target="item.isBlank?'_blank':'_self'" v-if="item.route && (item.route.name || item.route.path)"
                                        :to="item.route">
                                        {{item.menuName}}
                                    </router-link>
                                    <a :target="item.isBlank?'_blank':'_self'" v-else-if="item.domain" @click.stop="toPath(item,itemIndex)">{{item.menuName}}</a>
                                    <a :href="item.url" :target="item.isBlank?'_blank':'_self'" v-else>{{item.menuName}}</a>

                                    <!-- <a :href="item.url  || toLink(item,2)" :target="item.isBlank?'_blank':'_self'" >{{item.menuName}}</a> -->

                                </li>
                            </ul>
                        </div>
                    </Poptip>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return {
            matchPathHide: false
        }
    }, 
    props:{
        show:{
            type:Boolean, 
            default:false
        }, 
        secondarySelect:{
            type:[Number, String]
        }, 
        secondaryInfo:{
            type:Object, 
            default:()=>{}
        }, 
    }, 
    computed: {
        headerMenu(){
            let headerMenu = {
                icon: this.secondaryInfo.icon, 
                menuName: this.secondaryInfo.menuName, 
            }
            return headerMenu;
        }, 
        showSecondary(){
            return !this.secondaryInfo.isHideSecond;
        }, 
        formateMenu(){
            if(!this.secondaryInfo.children){
                return ;
            }
            let remainMenu = this.secondaryInfo.children.length > 4 ? {
                    menuName:'更多', 
                    children:[...this.secondaryInfo.children.slice(4)], 
                    icon:''
                }:{};
            let endMenu = this.secondaryInfo.children.length > 4 ? [].concat(this.secondaryInfo.children.slice(0, 4), remainMenu) : this.secondaryInfo.children;
            return endMenu;
        }, 
        menuList(){
            return Object.assign({}, this.secondaryInfo);
        },     
        currentRoutePath() {
            return this.$route && this.$route.path || '';
        },   
        currentRouteName() {
            return this.$route && this.$route.name || '';
        }, 
        currentRouteMatch(){
            return this.$route && this.$route.matched[0].path || ''
        }
    }, 
    watch: {
        '$route':'getPath'
    }, 
    created() {
        this.getPath();
    }, 
    methods: {
        //下拉二级导航高亮处理
        showActive(menu, matchPath){
            return ( (menu.url && menu.url.indexOf(this.currentRouteMatch)>-1) || location.href.indexOf(menu.url)>-1 || (item.route && (item.route.path === this.currentRoutePath || item.route.name === this.currentRouteName)) || this.matchPath(item)) ? true : false;
        }, 
        // 匹配路径
        matchPath(menu){
            let matchFlag  = false;
            let matchPathIndex, matchPathHide ;
            if(!menu || !menu.matchPath){
                return false;
            }
            menu.matchPath.forEach((v, i)=>{
                if(this.currentRouteMatch.indexOf(v) > -1 || this.currentRouteMatch.indexOf(v.path) > -1 || this.currentRoutePath.indexOf(v) > -1 || this.currentRoutePath.indexOf(v.path) > -1 || location.href.indexOf(v)>-1 || location.href.indexOf(v.path)>-1){
                    matchFlag = true;
                    this.matchPathHide = typeof v == 'object' ? v.pathHideSecond : menu.pathHideSecond;
                }
                if(matchFlag){
                    return ;
                }
            })
            matchFlag ? this.$emit('update-is-match', true) : this.$emit('update-is-match', false);
            return matchFlag;
        }, 
        toPath(nowMenu, selectIndex){
            // if(this.$route.path.indexOf(nowMenu.url) > -1){
            //     return ;
            // }
            // this.$router.push({
            //     path: nowMenu.url
            // });
            if(self.domain){
                window.open(nowMenu.domain,nowMenu.isBlank?'':'')
            }
            if(selectIndex){
                // this.secondaryInfo.select = selectIndex;
                // this.$emit('update:secondarySelect', selectIndex);
                this.$emit('update-select', nowMenu, this.secondaryInfo, selectIndex,true);
            }
        }, 
        toLink(self,num){
            console.log(num)
            let nowLink = this.$router.resolve(self.route)
            return nowLink.href;
        },
        getPath(){
            if(!this.secondaryInfo.children){
                return ;
            }
            let menuIndex = '';
            let selectMenu = [];
            let selectItem = {};
            
            let findIndex = this.secondaryInfo.children.findIndex(item=>(this.currentRoutePath.indexOf(item.url)>-1 || this.currentRoutePath.indexOf(item.route && item.route.path)>-1 || this.currentRouteName.indexOf(item.route && item.route.name)>-1 || location.href.indexOf(item.url)>-1 || this.matchPath(item)));
            let theme = findIndex > -1 ? this.secondaryInfo.children[findIndex].theme : ''; 
             
            if(findIndex > -1){
                this.$emit('update-select', this.secondaryInfo[findIndex], this.secondaryInfo, findIndex,true, this.matchPathHide)
            }    

            if(theme){
                this.navTheme = theme;
                this.$emit('on-update-theme', this.navTheme);
                // this.$emit('on-update-select', selectItem, selectMenu[0], menuIndex);
            }else{
                return ;
            }
        }, 
        popperShow(num){
            $('.nav-sec-list').eq(num).find('.ivu-poptip-rel').addClass('g-pop-show');
        }, 
        popperHide(num){
            $('.nav-sec-list').eq(num).find('.ivu-poptip-rel').removeClass('g-pop-show');
        }
    }, 
}
</script>

<style lang="scss" scoped>

    .navigation-secondary{
        width:100%;
        height:80px;
        background: #ffffff;
        section{
            width:1180px;
            margin:0 auto;
            display: flex;
            height:80px;
            .nav-sec-menu{
                display: flex;
                align-items: center;
                margin-right:40px;
                img{
                    width:40px;
                    height:40px;
                    margin-right: 10px;
                }
                span{
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(17, 26, 56, 1);
                    line-height:25px;
                }
            }
            .nav-sec-children{
                display: flex;
                align-items: center;
                .nav-sec-list{
                    a{
                        color:rgba(17, 26, 56, 1);
                        text-decoration: none;
                    }
                    padding:0 15px;
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    line-height:22px;
                    position:relative;
                    cursor: pointer;
                    & /deep/ .ivu-poptip{
                        .g-nav-menu-name{

                        }
                    }
                    & /deep/ .ivu-poptip-inner{
                        ul.g-pop-l{
                            padding: 5px 20px;
                            margin: 0;
                            li{
                                a{
                                    color: rgba(17, 26, 56, 1);
                                    text-decoration: none;
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
                                &.active a, &:hover a{
                                    color: #5293F5;
                                }
                            }
                        }
                    }
                    & > span{
                        width:24px;
                        height:2px;
                        background:rgba(82, 147, 245, 1);
                        border-radius:2px;
                        position:absolute;
                        bottom:-7px;
                        left:50%;
                        margin-left: -12px;
                        display: none;
                    }
                    &:hover, &.active{
                        a{ 
                            color:#5293F5;
                            text-decoration: none;
                        }
                        & > span{
                            display:block;
                        }
                    }
                }
            }
        }
    }

</style>
