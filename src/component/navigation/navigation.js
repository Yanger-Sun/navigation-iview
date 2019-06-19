
// 导航logo处
const NAVIGATION_LOGO = {
    sanren:{
        menuName:'首页',
        matchPath:['/channels'],
        isHideSecond:true,
        url:'/um/channels',
        children:[],
        theme:'light',
        test: "helloworld",
        icon:{        
            // light: require('___logo.light.url___'),
            // dark: require('___logo.dark.url___')
        },
        test2: "helloworld2"
    }
}

// 导航
const NAVI_MENU = [
    {
        menuName:'首页',
        matchPath:['/channels'],
        url:'/um/channels',
        children:[],
        isHideSecond:true,
        icon:'',
        theme:'light'
    },
    {
        menuName:'研修中心',
        matchPath:['/schoolCenter', '/BranchList', '/createCourse', '/course', '/trainingCenter'],
        icon: require('./img/resource-center.png'),
        params:{},
        theme:'dark',
        children:[
            {
                menuName:'研修资源',
                icon:'',
                url:'/um/schoolCenter/school-lib',
                /* route:{
                    name: 'schoolLib',
                    params:{

                    },
                    queries:{

                    }
                }, */
                pathHideSecond:true,
                matchPath:[
                    '/um/schoolCenter/school-lib',
                    '/schoolCenter/school-lib/resourcedetail',
                    '/schoolCenter/resourceIntroduce',
                    '/schoolCenter/school-lib/instructiondesign',
                    '/schoolCenter/school-lib/uploadfile',
                    '/schoolCenter/school-lib/coursenote',
                    '/schoolCenter/school-lib/collegeexam'
                ]
            },
            {
                menuName:'研修活动',
                icon:'',
                url:'/um/schoolCenter/activity/list',
                pathHideSecond:true,
                matchPath:[
                    '/schoolCenter/activity/'
                ]
            },
            {
                menuName:'研修课程',
                icon:'',
                url:'/um/trainingCenter',
                pathHideSecond:true,
                matchPath:[
                    {path : '/BranchList',pathHideSecond :true},
                    '/course',
                    '/createCourse',
                    '/um/trainingCenter'
                ]

            },
            {
                menuName: '专家服务',
                icon:'',
                url:'/um/schoolCenter/specialList',
                matchPath:[
                    '/um/schoolCenter/specialList'
                ]
            }
        ],
    },
    {
        menuName:'区县主页',
        matchPath:[],
        isHideSecond:true,
        supportSchoolPlan: true,
        url:'plan/county/index',
        children:[],
        theme:'dark',
        isBlank:true,
        icon:''
    },
    {
        menuName:'学校主页',
        matchPath:[],
        isHideSecond:true,
        supportSchoolPlan: true,
        url:'plan/school/index',
        children:[],
        theme:'dark',
        isBlank:true,
        icon:''
    },
    {
        menuName:'个人工作台',
        matchPath:[],
        isHideSecond:true,
        supportSchoolPlan: true,
        url:'plan/school/workbench',
        children:[],
        theme:'dark',
        isBlank:true,
        icon:''
    },
    {
        menuName:'研社区',
        matchPath:['/researchCommunity','/communityHome','/communityActive'],
        isHideSecond:true,
        url:'/um/researchCommunity',
        children:[],
        theme:'dark',
        isBlank:false,
        icon:''
    },
    {
        menuName:'研直播',
        url: '___YanZhiBo___',
        matchPath: ['/lv/page/', '/lv/login', '/lv/register'],
        children:[],
        theme:'dark',
        icon:''
    },
    {
        menuName:'智慧教学',
        matchPath:['/work-test/'],
        url:'/um/work-test/index',
        children:[],
        isHideSecond:true,
        theme:'dark',
        icon:''
    },
    {
        menuName:'协作组',
        matchPath:['/groupHome'],
        url:'/um/groupHome',
        theme:'dark',
        isHideSecond:true,
        children:[],
        icon:''
    }
    ,
    {
        menuName:'教研分站',
        matchPath:['/jiaoyan', '/fenzhanDetail'],
        url:'/um/jiaoyan/fenzhanList',
        theme:'dark',
        isHideSecond:true,
        children:[],
        icon:''
    }
]

// 配置工具箱
const TOOL_BOX = [
    {
        toolName: '备课法宝',
        color: 'FF5C67',
        row: 1,
        children:[
            {
                name: '发布资源',
                icon: '',
                needProfile: true,
                permissonKey:"teacher:home:publish:resource",
                buttonClick:{
                    buttonname: "index_bkfb_releaseresource",
                    screenName: "t_pc/pages/index",
                },
                ref:{
                    name: 'resourceModal',
                    function: 'resourceTool'
                }
            },
            {
                name: '查找资源',
                icon: '',
                buttonClick:{
                    buttonname: "index_bkfb_searchresource",
                    screenName: "t_pc/pages/index",
                },
                url:'/um/schoolCenter/school-lib'
            },
        ]
    },
    {   
        toolName: '研修工具',
        color: 'F5A623',
        row: 3,
        children:[
            {
                name: '创建活动',
                icon: '',
                tag: '',
                needProfile: true,
                permissonKey:"teacher:home:publishActivity",
                buttonClick:{
                    buttonname: "index_yxgj_createactivity",
                    screenName: "t_pc/pages/index",
                },
                url:'/um/schoolCenter/activity/edit'
            },
            {
                name: '创建课程',
                icon: '',
                needProfile: true,
                permissonKey:"teacher:home:publish:resource",
                buttonClick:{
                    buttonname: "index_yxgj_createcourse",
                    screenName: "t_pc/pages/index",
                },
                url:'/um/trainingCenter/createCourse'
            },
            {
                name: '添加协作组',
                icon: '',
                tag: '',
                children:[
                    {
                        name: '加入协作组',
                        icon: '',                
                        buttonClick:{
                            buttonname: "index_yxgj_addgroup",
                            screenName: "t_pc/pages/index",
                        },
                        // permissonKey:'teacher:home:publish:resource',
                        ref:{
                            name: 'addCoopGroupModal',
                            function: 'showModal',
                            argument: 'addByGroup'
                        }
                    },
                    {
                        name: '创建协作组',
                        icon: '',                 
                        needProfile: true,
                        buttonClick:{
                            buttonname: "index_yxgj_addgroup",
                            screenName: "t_pc/pages/index",
                        },
                        // permissonKey:'teacher:home:createCoopGroup',
                        ref:{
                            name: 'addCoopGroupModal',
                            function: 'showModal',
                            argument: 'creatByGrade'
                        }
                    }
                ]
            },
            {
                name: '查找活动',
                icon: '',
                isBlank:true,
                buttonClick:{
                    buttonname: "index_yxgj_searchactivity",
                    screenName: "t_pc/pages/index",
                },
                url:'/um/schoolCenter/activity/list'
            },
            {
                name: '查找课程',
                icon: '',
                isBlank:true,
                buttonClick:{
                    buttonname: "index_yxgj_searchcourse",
                    screenName: "t_pc/pages/index",
                },
                url:'/um/trainingCenter'
            }
        ]
    },
    {
        toolName: '教学助手',
        color: '20C18C',
        row: 2,
        children:[
            {
                name: '英语课堂助手',
                tag: '新',
                needProfile: true,
                judgeSatgesShow:true,
                checkEnglish: true,
                judgeSatges:'小学、初中', // 默认 小学 初中 高中 
                function: 'EnglistHandler',
                isBlank: true,
                buttonClick:{
                    buttonname: "index_jxzs_englishclassassistant",
                    screenName: "t_pc/pages/index",
                },
                // url: '___DoubleTeacherUrl___',
            },
            {
                name: '计时器',
                tag: '热',
                needProfile: false,
                buttonClick:{
                    buttonname: "index_jxzs_timer",
                    screenName: "t_pc/pages/index",
                },
                ref:{
                    name: 'randomTimer',
                    function: 'timerTool'
                }
            },
            {
                name: '随机点名',
                tag: '',
                needProfile: true,
                buttonClick:{
                    buttonname: "index_jxzs_randomcall",
                    screenName: "t_pc/pages/index",
                },
                showRole:[2,3],
                judgeSatgesShow:true,
                judgeSatges:true, // 默认 小学 初中 高中 
                ref:{
                    name: 'randomTimer',
                    function: 'randomTool'
                }
            }
        ]
    },
    {   toolName: '家校互动',
        color: '5293F5',
        row: 1,
        jobCode:{
            1: '该功能仅对学科教师开放',
            4: '该功能仅对学科教师开放'
        },
        local: false,
        children:[
            {
                name: '布置作业',
                icon: '',
                needProfile: true,
                showRole:[2,3],
                judgeSatgesShow:true,
                judgeSatges:true, // 默认 小学 初中 高中 
                function: 'onclickMakeHandler',
                buttonClick:{
                    buttonname: "index_jxhd_addtest",
                    screenName: "t_pc/pages/index",
                },
                // permissonKey:"teacher:home:scrip:homework",
                url:'/um/work-test/make/selectClass'
            },
            {
                name: '添加班级',
                icon: '',
                showRole:[2,3],
                judgeSatgesShow:true,
                judgeSatges:true, // 默认 小学 初中 高中 
                children:[
                    {
                        name: '加入班级',
                        icon: '',                         
                        needProfile: true,
                        judgeSatges:true, // 默认 小学 初中 高中 
                        permissonKey:'teacher:home:joinClazz',
                        ref:{
                            name: 'addClassModal',
                            function: 'showModal',
                            argument: 'joinClassQuickModal'
                        },
                        buttonClick:{
                            buttonname: "index_jxhd_addclass",
                            screenName: "t_pc/pages/index",
                        },
                    },
                    {
                        name: '创建班级',
                        icon: '',                         
                        needProfile: true,
                        permissonKey:'teacher:home:createCoopGroup',
                        ref:{
                            name: 'addClassModal',
                            function: 'showModal',
                            argument: 'joinClassManualModal'
                        },
                        buttonClick:{
                            buttonname: "index_jxhd_addclass",
                            screenName: "t_pc/pages/index",
                        },
                    }
                ]
            }
        ]
    }
]

const FEN_MENU = {
    is_fen:false,
    menu: [
        {
            menuName:'首页',
            matchPath:'/channels',
            url:'/um/channels',
            children:[],
            icon:'',
        },
        {
            menuName:'通知公告',
            matchPath:'/schoolCenter',
            url:'/um/schoolCenter/school-lib',
            children:[],
            icon:'',
        },
        {
            menuName:'活动',
            matchPath:'/work-test',
            url:'/um/work-test/index',
            children:[],
            icon:'',
        },
        {
            menuName:'资源',
            matchPath:'/mine',
            url:'/um/mine/collect',
            children:[],
            icon:'',
        },
        {
            menuName:'研修动态',
            matchPath:'/channels',
            url:'/um/channels',
            children:[],
            icon:'',
        },
    ]
}

export {
    NAVIGATION_LOGO,
    TOOL_BOX ,
    NAVI_MENU,
    FEN_MENU 
}
