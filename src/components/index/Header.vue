<template>
  <!-- 首页头部组件 -->
  <div class="header">
    <div class="index-header">
      <div class="header-content">
        <!-- 头部logo -->
        <div class="content-logo">
          <img src="/image/logo.png" alt="" />
        </div>
        <!-- 头部导航 -->
        <div class="content-nav">
          <ul>
            <li>
              <router-link
                to="/"
                style="cursor: pointer"
                :class="active == '1' ? 'actives' : ''"
                >首 页</router-link
              >
            </li>
            <li>
              <router-link
                to="/courseCenter"
                style="cursor: pointer"
                :class="active == '2' ? 'actives' : ''"
                >课程超市</router-link
              >
            </li>
            <li>
              <router-link
                to="/liveCenter"
                style="cursor: pointer"
                :class="active == '3' ? 'actives' : ''"
                >直播课</router-link
              >
            </li>
            <li>
              <router-link
                to="/exam"
                style="cursor: pointer"
                :class="active == '4' ? 'actives' : ''"
                >题库</router-link
              >
            </li>
            <li>
              <router-link
                to="/aboutus"
                style="cursor: pointer"
                :class="active == '5' ? 'actives' : ''"
                >关于我们</router-link
              >
            </li>
          </ul>
        </div>
        <!-- 搜索、购物车、登录注册 -->
        <div class="searBuyLogin">
          <!--头部搜索框-->
          <div class="content-search">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
               <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="course">视频课程</el-dropdown-item>
                <el-dropdown-item command="live">直播课程</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <input
              type="text"
              placeholder="请输入要搜索的课程"
              v-model="keywords"
            />
            <i
              class="el-icon-search"
              style="cursor: pointer"
              @click="Search"
            ></i>
          </div>
          <div
            class="content-Shopping"
            @mouseenter="isCar = true"
            @mouseleave="isCar = false"
            style="cursor: pointer; height: 100%; width: 40px; margin-top: 50px"
          >
            <el-badge class="item">
              <router-link to="/cart">
                <i class="el-icon-shopping-cart-1"></i>
              </router-link>
            </el-badge>

            <!-- 购物车 -->
            <div class="shopcar" v-show="isCar">
              <div class="shopcar-top">
                <div class="s-t-left">我的购物车</div>
              </div>
              <div class="shopcar-center">
                <img src="/image/header/car.png" alt="" />
                <!--                <p class="car-empy">购物车空空如也</p>-->
                <p class="car-empy">快去选购你喜欢的课程吧</p>
                <p class="course-center">
                  <router-link to="/courseCenter">课程中心</router-link>
                </p>
              </div>
              <div class="shopcar-bottom">
                <p></p>
                <div class="car">
                  <img src="/image/header/car-select.png" alt="" />
                  <p class="course-center" @click="goCart">我的购物车</p>
                </div>
              </div>
            </div>
          </div>
          <!--登录模块-->
          <div class="content-login-success" v-if="isLogin">
            <div
              style="margin-left: 50px; height: 150%; margin-top: 28px"
              @mouseenter="isUserInfo = true"
              @mouseleave="isUserInfo = false"
            >
              <!-- 用户头像-->
              <img
                v-if="userInfo.user_pic"
                class="avator"
                :src="'http://localhost:3001/' + userInfo.user_pic"
                alt="头像"
              />
              <img class="avator" :src="avatarImg" alt="" v-else />
              <!-- 划过头像显示  -->
              <div class="user-info" v-show="isUserInfo">
                <div class="user-info-top">
                  <div class="u-i-t-top">
                    <img
                      class="avator"
                      :src="'http://localhost:3001/' + userInfo.user_pic"
                      alt=""
                      v-if="userInfo.user_pic"
                    />
                    <img class="avator" :src="avatarImg" alt="" v-else />
                    <div class="avator-info">
                      <p>
                        {{ userInfo.nickName ? userInfo.nickName : nickname }}
                      </p>
                    </div>
                  </div>
                  <div class="u-i-i-bottom">
                    <div
                      v-for="(item, index) in avatorList"
                      :key="item.id"
                      @mouseenter="courseColor = index"
                      @mouseleave="courseColor = -1"
                    >
                      <router-link :to="item.linkUrl">
                        <div
                          class="info-item"
                          :class="courseColor === index ? 'course-color' : ''"
                        >
                          <img :src="item.imgUrl" alt="" />
                          <p>{{ item.title }}</p>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="user-info-bottom">
                  <div class="logout" @click="goLogout">退出登录</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-login" @click="login" v-else>登录 / 注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/request/user";
import { mapState, mapActions } from "vuex";
export default {
  name: "HeaderPy",
  data() {
    return {
      isCar: false, //是否显示购物车
      isUserInfo: false, //是否显示个人信息卡片
      active: "1",
      isLogin: false, //是否登录
      command:sessionStorage.getItem('command'),
      keywords: this.$route.query.keywords || "",
      checked: false,
      avatarImg: "/image/header/avator1.png", //默认头像
      nickname: "",
      avatorList: [
        {
          id: 1,
          imgUrl: "/image/header/course.png",
          title: "我的课程",
          linkUrl: "/about/mycourse",
        },
        {
          id: 2,
          imgUrl: "/image/header/mess.png",
          title: "我的消息",
          linkUrl: "/about/message",
        },
        {
          id: 3,
          imgUrl: "/image/header/setting.png",
          title: "个人设置",
          linkUrl: "/user",
        },
      ],
      courseColor: -1, //修改头像卡片内分类的字体样式
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  deactivated() {
    //路由切换时候卡片的保留去除和输入框关键字去除
    this.keywords = "";
  },
  mounted() {
    //判断是否登录，才能获取个人信息
    if (sessionStorage.getItem("token")) {
      this.getUserInfo();
      this.isLogin = true;
    }
  },
  beforeCreate() {
    
    sessionStorage.setItem('command','course') 
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    //选择搜索
    handleCommand(command){
      this.command = command
      sessionStorage.setItem('command',command) 
    },
    //跳转到登录、注册界面
    login() {
      this.$router.push({ name: "Login" });
    },
    //获取用户个人信息
    getUserInfo() {
      //获取当前登录用户昵称
      let email = sessionStorage.getItem("email");
      getInfo({ email }).then((res) => {
        if (res.status == 0) {
          //用Vuex保存用户的个人信息
          this.saveUserInfo(res.message);
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
          this.saveUserInfo({});
        }
      });
    },
    //退出登录
    goLogout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      this.saveUserInfo({});
      window.location.href = "/";
    },
    //用户在输入框搜索课程，需要首先跳转到course页面，并且携带keywords参数
    Search() {
      if (!this.keywords) {
        this.$message({
          message: "请输入课程名称",
          type: "info",
          duration: 1000,
        });
        return;
      }
      if(this.command=='course'){
        this.$router.replace({
        path: "/courseCenter",
        query: {
          keywords: this.keywords,
        },
      });
      }else if(this.command == 'live'){
        this.$router.replace({
        path: "/liveCenter",
        query: {
          keywords: this.keywords,
        },
      });
      }
      
    },

    //购物车卡片前往购物车页面
    goCart() {
      if (this.isLogin) {
        this.$router.push("/cart");
      } else {
        this.$message({
          message: "请先登陆",
          type: "warning",
          duration: 800,
        });
      }
    },
    goOrder() {
      if (this.isLogin) {
        this.$router.push("/about/order");
      } else {
        this.$message({
          message: "请先登陆",
          type: "warning",
          duration: 800,
        });
      }
    },
  },

  watch: {
    $route: {
      immediate: true, //以初始值执行handler函数
      handler(to, from) {
        let newUrl = to.fullPath;
        // 可以用正则，也可以用字符串通过/截取
        to.fullPath.replace(/(.*)\?/, function (b) {
          newUrl = b;
        });
        if (newUrl.startsWith("/home") || newUrl == "/") {
          this.active = "1";
        } else if (
          newUrl.startsWith("/course") ||
          newUrl.startsWith("/courseInfo")
        ) {
          this.active = "2";
        } else if (newUrl.startsWith("/live") || newUrl.startsWith("/onlive")) {
          this.active = "3";
        } else if (
          newUrl.startsWith("/exam") ||
          newUrl.startsWith("/quiz") ||
          newUrl.startsWith("/result")
        ) {
          this.active = "4";
        } else if (newUrl.startsWith("/aboutus")) {
          this.active = "5";
        } else {
          this.active = "-1";
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
//顶部导航栏
.header {
  width: 100%;
  height: 100px;
  position: relative;
  //使得全部item上下居中
  .index-header {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    background: white;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 0px;
    z-index: 20;
    //宽度
    .header-content {
      position: relative;
      display: flex;
      width: 1440px;
      justify-content: space-around;
      //logo样式
      .content-logo {
        width: 160px;
        height: 55px;
        margin: 10px 0;
        cursor: pointer;
        img {
          height: 100%;
        }
      }
      //每个item样式
      .content-nav {
        width: 600px;
        height: 75px;
        ul {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 75px;
          margin: 0;
          padding: 0;
          /* height: 100%; */
          color: black;
          li a {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: #808080;
            text-align: center;
          }
        }
      }
      //搜索购物车和登录
      .searBuyLogin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 650px;
      }
    }
  }
}
.el-dropdown {
  vertical-align: top;
  width: 100px;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
  width: 100px;
}
.el-icon-arrow-down {
  font-size: 12px;
  width: 10px;
}
.el-form-item__content {
  line-height: 24px !important;
  width: 100px;
}

.el-input-box {
  border: 1px solid #dcdfe6;
}
::v-deep .el-input-box input {
  border: none !important;
  width: 150px;
}
.el-form-item {
  margin-bottom: 16px;
}
.el-checkbox {
  color: #a2a2a2 !important;
  font-weight: normal !important;
  font-size: 12px !important;
}
.el-checkbox__label {
  font-size: 12px !important;
}

.course-color {
  color: #3689ff !important;
}

.active {
  font-weight: bold;
  color: #3481ff;
}
* {
  list-style: none;
  text-decoration: none;
}

.searBuyLogin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 350px;
  height: 35px;
  border-radius: 8px;
  background: #f0f2f4;
}
.content-search input {
  padding: 0 10px;
  width: 430px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  color: #808080;
  background: #f0f2f4;
  font-size: 16px;
  outline: none;
}
.content-search i {
  color: #808080;
  font-size: 22px;
}
.content-Shopping i {
  color: #808080;
  font-size: 24px;
}
.content-login {
  height: 31px;
  font-size: 18px;
  color: #808080;
  text-align: center;
  cursor: pointer;
  width: 200px;
}
.content-login-success {
  height: 53px;
  color: #808080;
  text-align: left;
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}
.avator {
  height: 53px;
  width: 53px;
  cursor: pointer;
  border-radius: 50%;
}
.dialog-title {
  width: 400px;
  height: 30px;
  display: flex;
  align-items: center;
}
.title-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(120, 125, 130, 1);
}
.title-item span {
  margin-top: 5px;
  width: 15px;
  height: 2px;
  /* background-color: red; */
}

.active span {
  background-color: rgba(54, 137, 255, 1);
}
.dialog-register {
  width: 200px;
  height: 30px;
  color: #3689ff;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  cursor: pointer;
}
.captcha {
  width: 100%;
  background: rgba(245, 245, 245, 1);
  position: relative;
}
.captcha el-input {
  background: rgba(245, 245, 245, 1);
}
.sendcaptcha {
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3689ff;
  cursor: pointer;
}
.send {
  font-size: 12px;
  color: rgba(120, 125, 130, 1);
}
.regiterBtn {
  width: 100%;
  border-radius: 20px;
}
.backLogin {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3689ff;
  cursor: pointer;
}
.user-info {
  width: 200px;
  height: 194px;
  background-color: #fff;
  border: 1px solid rgba(248, 250, 252, 1);
  box-shadow: 0px 5px 15px 3px #888888;
  position: absolute;
  top: 87px;
  right: -40px;
  z-index: 999;
  display: block;
  border-radius: 10px;
}
.user-info-top {
  display: flex;
  width: 100%;
  height: 160px;
  border-bottom: 1px solid rgba(248, 250, 252, 1);
  flex-direction: column;
}
.u-i-t-top {
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
}
.u-i-t-top img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.avator-info {
  width: 120px;
  height: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
}
/*有会员了之后高度微调*/
.avator-info p {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.u-i-i-bottom {
  display: flex;
  height: 100px;
  width: 200px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.info-item {
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1) !important;
}
.info-item img {
  width: 14px;
  height: 16px;
}
.user-info-bottom {
  position: relative;
  width: 100%;
  height: 30px;
}
//退出登录
.logout {
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  cursor: pointer;
}
.shopcar {
  width: 200px;
  height: 220px;
  background: #fff;
  position: absolute;
  top: 87px;
  right: 130px;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 15px 3px #888888;
  border-radius: 10px;
}
.shopcar-top {
  height: 30px;
  line-height: 30px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
  box-sizing: border-box;
}
.s-t-left {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.shopcar-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  font-size: 10px;
  box-sizing: border-box;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a2a2a2;
  /* opacity: 0.56; */
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
}
.shopcar-center img {
  width: 60px;
  height: 54px;
  margin-bottom: 5px;
}
.car-empy {
  font-size: 14px;
  color: #787d82;
  margin-bottom: 5px;
}
.course-center {
  color: #3481ff;
  cursor: pointer;
}
.shopcar-bottom {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
}
.shopcar-bottom .car {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.car img {
  width: 13px;
  height: 13px;
  margin-right: 5px;
}
.actives {
  position: relative;
  color: #3689ff !important;
}
.actives::after {
  content: "" !important;
  position: absolute !important;
  bottom: -38px !important;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 2px;
  background-color: #3689ff;
  border-radius: 5px !important;
}
.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
</style>

