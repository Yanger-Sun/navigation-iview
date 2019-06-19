<template>
    <div class="g-nav-r g-nav-menu-item" >
        <tool-box :theme="navTheme"
                    v-if="userId"
                  :tool-info="toolBox"></tool-box>
        <notice-view :theme="navTheme"
                    v-if="userId"></notice-view>
        <div class="login-info">
            <User-info
                :theme="navTheme"
                :class="classNames"
                v-if="userId"
            ></User-info>
        </div>
        <!-- <p class="g-nav-login" v-if="!userId">
            <a href="#">登陆/注册</a>
        </p> -->
    </div>
</template>

<script>

    import $ from 'jquery';
    import UserInfo from '../header/user-info.vue';
    import toolBox from './tool-box-container.vue';
    import NoticeView from '../header/notice.vue';
    import {NAVIGATION_LOGO,TOOL_BOX,NAVI_MENU,FEN_MENU} from './navigation.js'
    import getUserPermission from "/app/permission/user-permission.js";
    export default {
        data(){
            return{
                toolBox: TOOL_BOX,
                userId: '',
                // classNames: 'common',
            }
        },
        components:{
            UserInfo,
            NoticeView,
            toolBox
        },
        props:{
            navTheme:{
                type:String,
                default:"light"
            },
        },
        computed: {
            currentTeacherId() {
                return this.$store.state['current-user'].userId;
            },
            classNames(){
                return `common ${this.navTheme}`;
            }
        },
        watch: {
            currentTeacherId(){
                if(this.currentTeacherId){
                    this.userId = this.currentTeacherId;
                    return ;
                }
            }
        },
        created() {
            this.$store.dispatch('getUserPermission');
        },
        methods: {
            popperShow(num){
                $('.g-nav-menu-item').eq(num).find('.ivu-poptip-rel').addClass('g-pop-show');
            },
            popperHide(num){
                $('.g-nav-menu-item').eq(num).find('.ivu-poptip-rel').removeClass('g-pop-show');
            }
        },
    }

</script>

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

    .g-nav-r{
        font-size: 14px;
        & /deep/ .g-nav-tit{
            &:hover{
                span.g-nav-menu-name{
                    color:#5293F5;
                }
                span.g-nav-menu-name.router-link-active{
                    color:#ffffff;
                }
            }
        }
        & /deep/ .g-nav-tit .ivu-poptip-rel{
            height: 100%;
            align-items: center;
            display: flex;
        }
        & /deep/ .g-nav-tit.ivu-poptip > .ivu-poptip-popper{
            left: auto !important;
            right: 0 !important;
            z-index:100 !important;
            .ivu-poptip-body{
                padding:0;
                .ivu-poptip-body-content{
                    overflow: inherit;
                }
            }
        }
        span.g-nav-menu-name{
            color: #111A38;
            cursor: pointer;
            &.router-link-active{
                color: #FFFFFF;
                &.hover{
                    color: #FFFFFF;
                }
            }
            & /deep/ .ivu-icon{
                margin-left:6px;
            }
        }
        .g-nav-r-toolbox{
            display: flex;
            flex-direction: row;
            padding: 17px 0 10px 20px;
            div.g-tool-box{
                // padding-right: 20px;
                &.col_1{
                    width: 120px;
                }
                &.col_2{
                    width: 240px;
                }
                &.col_3{
                    width: 360px;
                }
                &:last-child{
                    margin-right: 0;
                }
                p{
                    font-size: 14px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    color: rgba(17,26,56,1);
                    line-height: 20px;
                    margin-bottom: 17px;
                }
                & > ul{
                    width:calc(100% + 20px);
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    li{
                        width: 100px;
                        height: 24px;
                        background: rgba(245,245,245,1);
                        border-radius: 12px;
                        font-size: 12px;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        line-height: 24px;
                        text-align: center;
                        margin-right: 20px;
                        margin-bottom: 10px;
                        cursor: pointer;
                        overflow: visible;
                        position: relative;
                        span{
                            position:absolute;
                            width: 18px;
                            height: 18px;
                            top:-9px;
                            right:-9px;
                            text-align: center;
                            line-height: 18px;
                            font-size: 12px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: #ffffff;
                        }
                        &.c_FF5C67{
                            color: #FF5C67;
                        }
                        &.c_F5A623{
                            color: #F5A623;
                        }
                        &.c_20C18C{
                            color: #20C18C;
                        }
                        &.c_5293F5{
                            color: #5293F5;
                        }
                        & span.b_FF5C67{
                            // color: #FF5C67;
                            @include makeColor('b',#FF5C67);
                        }
                        & span.b_F5A623{
                            color: #F5A623;
                        }
                        & span.b_20C18C{
                            color: #20C18C;
                        }
                        & span.b_5293F5{
                            color: #5293F5;
                        }
                    }
                }
            }
        }
        .login-info{
            display: flex;
            align-items: center;
        }
        .g-nav-login{
            a{
                color: #111A38;
                &:hover{
                    color: #5293F5;
                }
            }
            &.dark{
                a{
                    color: #ffffff;
                    &:hover{
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>



