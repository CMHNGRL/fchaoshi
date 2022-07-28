<template>
    
  <div class="mine">
  <Header></Header>
    <div class="mine-container">
      <div class="mine-left">
        <div class="m-l-top">
          <div class="top-main">
            <img :src="'http://localhost:3001/'+userInfo.user_pic" v-if="userInfo.user_pic"/>
            <img v-else :src="avatorImg" />
            <p class="avator-name">{{userInfo.nickName ? userInfo.nickName : ''}}</p>
          </div>
        </div>
        <div class="m-l-t-center">
          <div class="center-main">
            <div class="m-l-t-c-title">用户中心</div>
          </div>
        </div>
        <div class="m-l-t-bottom">
          <div class="bottom-main">
            <div style="width: 100%;" v-for="(item,index) in navList" :key="item.id" >
              <router-link :to="item.linkUrl">
                <div
                    class="user-list-item"
                    :class="navCurrent === index ? 'active' : ''"
                >
                  <p>{{item.title}}<i class="el-icon-arrow-right"></i></p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mine-right">
        <router-view ></router-view>
      </div>
    </div>
  <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/index/Header.vue";
import Footer from "@/components/index/Footer.vue";
import { mapState } from 'vuex'
export default {
    name:"userPy",
    metaInfo: {
      title: '用户中心', // set a title
    },
    
  data() {
    return {
      avatorImg: '/image/header/avator1.png',
      nickName: '',
      navList: [
        {
          id: 1,
          title: "我的课程",
          linkUrl: "/about/mycourse",
        },
        {
          id: 2,
          title: "我的消息",
          linkUrl: "/about/message",
        },
      ],
      navCurrent: 0,
    };
  },
  computed:{
    ...mapState({
        userInfo:(state) => state.userinfo
      }),
  },
  components: {
    Header,
    Footer
  },
  watch:{
    $route:{
      immediate:true,
      handler(to,from){
       let url =  to.fullPath.split('/')[2]
        if(url == 'mycourse'){
          this.navCurrent = 0
        }else if(url == 'message'){
          this.navCurrent = 1
        }
      }
    }
  },
    
};
</script>

<style scoped>

.mine-container {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  display: flex;
}
.mine-left {
  width: 200px;
  height: 600px;
  background: rgba(249, 250, 252, 1);
  margin: 20px 0;
}
.m-l-top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-main {
  width: 150px;
  height: 200px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #838383;
}
.top-main img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(249, 250, 252, 1);
  box-sizing: border-box;
}
.avator-name {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1c1f21;
  margin: 8px 0;
}
.m-l-t-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-main {
  width: 150px;
  height: 40px;
  display: flex;
  flex-direction: column;
}
.m-l-t-c-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #1c1f21;
  border-bottom: 1px solid rgba(112, 112, 112, 0.5);
}
.m-l-t-bottom {
  margin-top: 10px;
}
.bottom-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-main .user-list-item {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}
.el-icon-arrow-right {
  margin-left: 60px;
}
.bottom-main .active {
  background: rgba(101, 142, 255, 1);
  color: #fff;
}
.mine-right {
  width: 950px;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>
