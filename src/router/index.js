import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

//重复点击路由捕获错误，不报错
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const Home = () =>
    import ("../views/Home.vue");
const error = () =>
    import ('../views/404.vue')
const Login = () =>
    import ('../views/login/Login.vue')
const Ystk = () =>
    import ('../views/login/Ystk.vue')
const Resetpwd = () =>
    import ('../views/login/Resetpwd.vue')
const User = () =>
    import ('../views/User.vue')
const AboutUs = () =>
    import ('../views/AboutUs.vue')
const SetBind = () =>
    import ('@/components/user/SetBind.vue')
const SetAvator = () =>
    import ('@/components/user/SetAvator')
const SetProfile = () =>
    import ('@/components/user/SetProfile')
const Course = () =>
    import ('@/views/course/CourseDetail')
const LiveCourse = () =>
    import ('@/views/live/LiveDetail')
const OnLive = () =>
    import ('@/views/live/Onlive')
const CourseVideo = () =>
    import ('@/views/course/CourseVideo')

//试题模块
const MainExam = () =>
    import ('@/views/exam/MainExam.vue')
const MainMenu = () =>
    import ('@/views/exam/MainMenu.vue')
const ExamController = () =>
    import ('@/views/exam/ExamController.vue')
const ExamOver = () =>
    import ('@/views/exam/ExamOver.vue')

//购物车
const Cart = () =>
    import ('@/views/cart/Cart')
const ConfirmOrder = () =>
    import ('@/components/cart/confirmOrder')

//我的消息
const Message = () =>
    import ('@/components/about/Message')

const MyCourse = () =>
    import ('@/components/about/MyCourse')
const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: Home,
        }, {
            path: "/aboutus",
            name: "AboutUs",
            component: AboutUs
        },
        {
            path: "/404",
            name: 404,
            component: error,
        },
        {
            path: "*",
            redirect: "/404",
            meta: {
                title: '404'
            }
        },

        {
            path: '/login',
            name: 'Login',
            component: Login,
        }, {
            path: '/ystk',
            name: 'Ystk',
            component: Ystk,
        },
        {
            path: '/resetpwd',
            name: 'Resetpwd',
            component: Resetpwd,
        },
        //用户信息中心
        {
            path: '/user',
            component: User,
            redirect: '/user/setbind',
            children: [{
                    path: 'setbind',
                    name: 'SetBind',
                    meta: { requiresAuth: true },
                    component: SetBind
                },
                {
                    path: 'setprofile',
                    name: 'SetProfile',
                    meta: { requiresAuth: true },
                    component: SetProfile
                },
                {
                    path: 'setavator',
                    name: 'SetAvator',
                    meta: { requiresAuth: true },
                    component: SetAvator
                }
            ]
        },
        //在线视频课程中心
        {
            path: '/courseCenter',
            component: () =>
                import ('@/views/CourseCenter')
        },
        //直播课程中心
        {
            path: '/liveCenter',
            component: () =>
                import ('@/views/LiveCenter')
        },
        //课程详情
        {
            path: '/course/:id',
            name: "Course",
            component: Course,
        },
        //课程
        {
            path: '/video',
            name: "CourseVideo",
            meta: { requiresAuth: true },
            component: CourseVideo
        },
        //直播课程详情
        {
            path: '/livecourse/:id',
            name: "LiveCourse",
            component: LiveCourse,
        },
        //直播间
        {
            path: '/onlive',
            name: "OnLive",
            meta: { requiresAuth: true },
            component: OnLive,
        },
        {
            path: '/exam',
            component: MainExam,
            meta: {
                title: "题库",
                requiresAuth: true
            },
            children: [{
                    path: '/',
                    name: 'Exam',
                    component: MainMenu,
                    meta: { requiresAuth: true },
                },
                {
                    name: 'quiz',
                    path: '/quiz',
                    component: ExamController,
                    props: (route) => ({
                        number: route.query.number,
                        difficulty: route.query.difficulty,
                        category: route.query.category,
                        type: route.query.type
                    })
                }, {
                    name: 'result',
                    path: '/result',
                    component: ExamOver
                }
            ]
        }, {
            path: '/cart',
            meta: { requiresAuth: true },
            component: Cart
        },
        {
            path: '/payment',
            component: () =>
                import ('@/views/payment'),
        },
        {
            path: '/confirmOrder',
            meta: { requiresAuth: true },
            component: ConfirmOrder
        },
        // 关于我的的路由
        {
            path: '/about',
            component: () =>
                import ('@/views/About'),
            redirect: '/about/message',
            meta: { requiresAuth: true },
            children: [{
                path: 'message',
                name: 'message',
                component: Message
            }, {
                path: 'mycourse',
                name: 'mycourse',
                component: MyCourse
            }]
        },
    ],

})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        //页面是否登录
        if (sessionStorage.getItem("token")) {
            //本地存储中是否有token(uid)数据
            next(); //表示已经登录
        } else {
            //next可以传递一个路由对象作为参数 表示需要跳转到的页面
            next({
                name: "Login"
            });
        }
    } else {
        Nprogress.start()
        document.body.scrollTop = 0
        next()
    }

})
router.afterEach((to, from) => {
    Nprogress.done()
})



export default router