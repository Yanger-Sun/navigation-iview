<template>
    <div class="app-header">
        <header-view class="app-header-m"
                     :theme="theme"
                     :logo='logo'
                     :menu-list='menuList'
                     :fen-nav='fenNav'
                     @update-is-match="updateIsMatch"
                     @on-update-select='updateSelect'
                     @on-update-theme='updateTheme'>
            <div :class="[theme, 'header-back']" slot="g-option-back" v-if="domain==='zgjiaoyan'">
                <a href="http://www.zgjiaoyan.com/" target="_blank">返回旧版</a>
            </div>
            <template slot="g-nav-r">
                <!-- <header-right :navTheme="theme"></header-right>  -->
            </template>
        </header-view> 

        <!-- 二级菜单显示 -->
        <navigation-secondary v-if="showSecondary"
                              @update-select="updateSelect"
                              @update-is-match="updateIsMatch"
                              :secondary-select="secondarySelect"
                              :secondary-info="secondaryInfo"></navigation-secondary>

    </div>
</template>

<style lang="scss" scoped>
    .app-header{
        padding: 0;
        margin: 0;
        .school-tools-modal{
            position: relative;
            z-index: 1000;
        }
        .app-header-m{
            padding: 0;
            margin: 0;
            & /deep/ .g-nav-top{
                position: relative;
            }
        }
        .header-back{
            position: absolute;
            padding: 2px 5px;
            border: 1px solid #111A38;
            border-radius:4px;
            left: -76px;
            top: 0;
            bottom: 0;
            width: 68px;
            height:26px;
            margin: auto;
            text-align: center;
            a{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(17,26,56,1);
                line-height:20px;
            }
            &.dark{
                box-sizing: border-box;
                border-color: #FFFFFF;
                a{
                    color: #FFFFFF;
                }
            }
        }
    }
</style>


<script>

import headerView from './navigation-header.vue';
// import headerRight from './navi-header-right.vue';
// import NoticeView from '../header/notice.vue';
import navigationSecondary from './navigation-secondary.vue';

// import {getSubstationPrefix} from '/lib/tools'
import {NAVIGATION_LOGO, TOOL_BOX, NAVI_MENU, SANREN_NAVI, FEN_MENU} from './navigation.js'

export default {
    data(){
        return{
            theme: "dark",
            // menuList: NAVI_MENU,
            menuList: [],
            fenNav: FEN_MENU,
            secondaryInfo:{},
            secondarySelect:'',
            showSecondary:false,
            ynSchoolManager:false,
            isMatch:false, //是否匹配出来的页面
            domain: '',
            infos:{}
        }
    },
    components:{
        headerView,
        // headerRight,
        navigationSecondary,

    },
    computed: {
        userId() {
            return this.infos.userId;
        },
        // 是否订阅数学或英语
        ynSubjectInRange(){
            return (this.infos.publishStatus && this.infos.publishStatus.ynSubjectInRange) || false;
        },
        // 用户角色
        role(){
            return this.infos.job && this.infos.job.code;
        },
        // 学段处理
        stages(){
            return this.infos.teacherStageRefSubjects || [];
        },
        // 学段获取
        checkStageName(){
            return this.stages.map((item)=>{
                return item.stageName
            })
        },
        //是否支持校本 
        supportSchoolPlan() {
            if (this.role == 2 || this.role == 3) {
                return this.infos.school.supportSchoolPlan;
            } else {
                return false;
            }
        },
        // 是否为学校管理员
        isSchoolManage(){
            return this.infos.ynSchoolManager;
        },
        // domain  根据教研网进行判断
        // logo: NAVIGATION_LOGO['sanren'],
        logo(){
            // switch (this.domain){
            //     case 'zgjiaoyan':
            //         return NAVIGATION_LOGO['zgjiaoyan'];
            //          break;
            //     default:
            //         return NAVIGATION_LOGO['sanren'];
            // }
            return NAVIGATION_LOGO['sanren'];
        },
        actionMenu(){
            // if(!this.userId){
            //     return SANREN_NAVI
            // }
            return  NAVI_MENU;
        },
    },
    watch:{
       $route(to,from){
            console.log(to.path);
        },
        supportSchoolPlan(){
            this.getMenuList();
        },
        role(){
            this.getMenuList();
        },
        ynSubjectInRange(){
            this.getMenuList();
        },
        isSchoolManage(){
            this.getMenuList();
        },
        logo(){
            this.getMenuList();
        },
        actionMenu(){
            this.getMenuList();
        }
    },
    mounted(){
        this.getMenuList();
        // this.domain = getSubstationPrefix();
        // this.$store.dispatch("requestCurrentUserInfo",{noErrorCheck: true});
        // this.$store.dispatch('getUserPermission',{noErrorCheck: true});
    },
    methods: {

        // 导航处理
        getMenuList(){
            let delay_menu = [];

            if(this.supportSchoolPlan/1 == 0){
                delay_menu = this.actionMenu.filter(item=>{
                    return item.supportSchoolPlan != true ;
                });
            }else if(this.supportSchoolPlan/1 == 1){
                
                delay_menu = this.actionMenu.filter(item=>{
                    if(!this.isSchoolManage){
                        // 如果不是学校管理员
                        return item.supportSchoolPlan != false && item.menuName != "智慧教学" && item.menuName != "学校主页";
                    }
                    //  校本不支持展示智慧教学
                    return item.supportSchoolPlan != false && item.menuName != "智慧教学";
                });
                //  顺序排列  协作组 > 研社区 > 研直播 > 教研分站
                //           研社区 > 研直播 > 协作组 > 教研分站
                let temp2 = delay_menu[delay_menu.length-2];
                delay_menu.splice(-2,1);
                delay_menu.splice(-3,0,temp2);
            }
            
            delay_menu[0] = this.logo ;

            if(this.domain === 'zgjiaoyan'){
                delay_menu = delay_menu.filter(item=>{
                    return item.menuName != "教研分站";
                });
            }

            if((this.role == 2 || (this.role == 3 && this.checkThreeRange())) && this.ynSubjectInRange){
                this.menuList = delay_menu;
            }else {
                this.menuList = delay_menu.filter(item=>{
                    return item.menuName != "智慧教学";
                });
            }
        },

        updateTheme(theme){
            this.theme = theme;
        },
        updateSelect(self, parent, itemIndex, formSecond, matchHide){
            if(this.isMatch && itemIndex > -1 && parent.children[itemIndex].pathHideSecond && formSecond){
                this.showSecondary = !matchHide || false;
            }else if(parent.isHideSecond){
                this.showSecondary = false;
            }else{
                this.showSecondary = true;
            }
            // this.showSecondary = (self && !self.pathShowSecond) ? !self.pathShowSecond : !parent.isHideSecond;
            if(!parent.isHideSecond){
                this.secondaryInfo = parent;
                this.secondarySelect = itemIndex;
            }
        },
        updateIsMatch(status, matchIndex){
            this.isMatch = status;
        },
        // 查看是否在小学初中高中
        checkThreeRange(){
            return this.checkStageName.indexOf('小学') > -1 || this.checkStageName.indexOf('初中') > -1 || this.checkStageName.indexOf("高中") > -1;
        }
    },
}
</script>
