<template>
    <div>
        <Poptip trigger="hover" 
                class="g-nav-tit" 
                placement="bottom-end" >
            <span :class="['g-nav-menu-name',navTheme === 'dark' ? 'router-link-active' : '']">工具箱
                <Icon type="arrow-down-b"></Icon>
            </span>
            <div class="g-nav-r-toolbox" slot="content">
                <tool-box :tool-info="toolInfo"
                          @button-record="buttonRecord"></tool-box>
            </div>
        </Poptip>   

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
    .g-nav-tit{
        &:hover{
            span.g-nav-menu-name{
                color:#5293F5;
            }
            span.g-nav-menu-name.router-link-active{
                color:#ffffff;
            }
        }
    }
    .g-nav-tit /deep/  .ivu-poptip-rel{
        height: 100%;
        align-items: center;
        display: flex;
    }
    .g-nav-tit/deep/.ivu-poptip > .ivu-poptip-popper{
        left: auto !important;
        right: 0 !important;
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
            // overflow: hidden;
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
                    & /deep/ .ivu-select-dropdown{    
                        padding: 0;
                        margin: 0 ;
                        .ivu-dropdown-menu{
                            padding: 0;
                            margin: 0;
                            .ivu-dropdown-item{
                                border-bottom: 1px solid #f8f8f8;
                                height: 40px;
                                line-height: 20px;
                                border-radius: inherit;
                                background: none;
                                padding: 10px;
                                border-bottom: 1px solid #f8f8f8;
                                text-align: center;
                                width: 100%;
                                margin: 0;
                                &:last-child{
                                    bottom: 0;
                                }
                                &:hover{
                                    background: #f3f3f3;
                                }
                            }
                        }
                    }
                    span.tool-tag{
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
</style>

<script>

import toolBox from "/component/tool-box/tool-box.vue";
import sensors from "sa-sdk-javascript";

export default {
    data(){
        return{
           
        }
    },
    components:{
        toolBox
    },
    props:{
        theme:{
            type:String,
            default:"light"
        },
        toolInfo:{
            type:Array,
            default:()=>{}
        }
    },
    mounted() {
        
    },
    computed: {
        navTheme(){
            return this.theme
        }
    },
    methods: {
        // 埋点处理
        buttonRecord(buttonClick){
            sensors.track("buttonClick", {
                screenName: this.screenName || buttonClick.screenName,
                buttonname: buttonClick.buttonname,
            });
        }
    }
}
</script>
