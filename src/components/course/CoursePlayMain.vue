<template>
  <div class="main">
    <div class="top">
      <span class="goBack el-icon-back" @click="goBack"> </span>
      <span class="name">{{ courseInfo.name }}</span>
    </div>
    <div class="play">
      <div class="play-left">
        <d-player
          :options="options"
          class="video-player vjs-custom-skin"
          ref="player"
        ></d-player>
        <div class="loading">
          <img src="/image/loading.gif" alt="" />
          加载中...
        </div>
      </div>
      <div class="play-right" ref="wrapper">
        <el-tabs tab-position="right">
          <el-tab-pane>
            <div slot="label" class="tabpanel-title">
              <div class="icon"><i class="el-icon-data-analysis"></i></div>
              <p class="text">章节</p>
            </div>
            <div class="chapter-container">
              <!-- playInfoList记录的是各个章节的信息包括里面的小节-->
              <dl
                class="list"
                v-for="(item, index) in playInfoList"
                :key="index"
              >
                <!--章节名称-->
                <dt>章节{{ index + 1 }}</dt>
                <!--章节内的children为一个章节里面的各个小节-->
                <dd
                  :class="chapterInfo._id === item._id ? 'active' : ''"
                  @click="play(item)"
                >
                  <div class="video-itemIcon">
                    <i class="el-icon-video-camera"></i>
                  </div>
                  <div class="item-name" :title="item.title">
                    视频：{{ item.title }}
                  </div>
                </dd>
              </dl>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="liuyan">
      <!--     写评论   -->
      <div disabled>
        <el-row type="flex" align="middle">
          <el-col :span="2">
            <el-avatar
              icon="el-icon-user-solid"
              :size="48"
              :src="'http://localhost:3001/' + userInfo.user_pic"
              :key="userInfo.user_pic"
            ></el-avatar>
          </el-col>
          <el-col :span="18">
            <el-input
              type="textarea"
              v-model="content"
              rows="3"
              placeholder="在这里写点什么吧！"
            ></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button @click="send" type="primary" :disabled="!userInfo">
              {{ userInfo ? "发表评论" : "未登录" }}
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="22"
            :push="2"
            style="margin: 1.5rem 0; border-top: 1px solid #e5e9ef"
          ></el-col>
        </el-row>
      </div>
      <!--     评论列表   -->
      <div>
        <!--      一条评论    -->
        <el-row
          class="comment"
          v-for="(comment, index) in commentList"
          :key="comment._id"
        >
          <el-col :span="2">
            <el-avatar
              icon="el-icon-user-solid"
              :size="48"
              :src="'http://localhost:3001/' + comment.uid.user_pic"
              :key="comment.uid.user_pic"
            ></el-avatar>
          </el-col>
          <el-col
            :span="22"
            class="item"
            style="
              border-bottom: 1px solid #e5e9ef;
              padding-bottom: 1rem;
              margin-bottom: 1rem;
            "
          >
            <b>{{ comment.uid.nickName }}</b>
            <div>{{ comment.content }}</div>
            <p>
              <span>{{ comment.date | fullDateFormat }}</span>
              <span v-show="userInfo._id">
                <span
                  v-if="comment.uid._id !== userInfo._id"
                  @click="showArea(comment.uid, index)"
                  class="replySpan"
                >
                  回复
                </span>
                <span
                  v-else
                  @click="deleteContent(comment._id)"
                  class="replySpan"
                  >删除</span
                >
              </span>
            </p>
            <!--   一条回复    -->
            <el-row
              v-for="item in showAllReply[index]
                ? comment.reply
                : comment.reply.slice(0, 3)"
              :key="item._id"
              style="margin: 0"
            >
              <el-col :span="1">
                <el-avatar
                  icon="el-icon-user-solid"
                  :size="24"
                  :src="'http://localhost:3001/' + item.from.user_pic"
                  :key="item.from.user_pic"
                ></el-avatar>
              </el-col>
              <el-col :span="23">
                <b>{{ item.from.nickName }}</b>
                <span style="font-size: 1.2rem; margin: 0 0.4rem">回复</span>
                <b>@{{ item.to.nickName }}</b>
                <span style="margin-left: 1rem">{{ item.content }}</span>
                <p>
                  <span>{{ item.date | fullDateFormat }}</span>
                  <span v-show="userInfo">
                    <span
                      v-if="item.from._id !== userInfo._id"
                      @click="showArea(item.from, index, item.content)"
                      class="replySpan"
                    >
                      回复
                    </span>
                    <span
                      v-else
                      @click="deleteContent(comment._id, item._id)"
                      class="replySpan"
                      >删除</span
                    >
                  </span>
                </p>
              </el-col>
            </el-row>
            <p class="toggle" v-if="comment.reply.length > 3">
              共
              <b>{{ comment.reply.length }}</b>
              条回复,
              <span
                style="margin-left: 0.8rem; color: #00a1d6"
                @click="showReply(index, $event)"
                class="replySpan"
              >
                点击查看
              </span>
            </p>
            <!-- 动态显示回复框 -->
            <div v-if="isReply[index]">
              <el-row type="flex" align="middle">
                <el-col :span="2" :pull="2">
                  <el-avatar
                    :size="48"
                    icon="el-icon-user-solid"
                    :src="'http://localhost:3001/' + userInfo.user_pic"
                  ></el-avatar>
                </el-col>
                <el-col :span="20" :pull="2">
                  <el-input
                    type="textarea"
                    v-model="replyContent"
                    rows="3"
                    :placeholder="`回复@${who.nickName}`"
                  ></el-input>
                </el-col>
                <el-col :span="2" :pull="1">
                  <el-button
                    type="primary"
                    :disabled="!userInfo._id"
                    @click="sendReply(comment._id)"
                  >
                    {{ userInfo._id ? "回复" : "未登录" }}
                  </el-button>
                </el-col>
              </el-row>
              <el-row></el-row>
            </div>
          </el-col>
        </el-row>
        <el-pagination
          background
          :current-page="page"
          layout="prev, pager, next,total"
          :total="commentCount"
          :page-size="5"
          @current-change="handleCurrent"
          hide-on-single-page
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  playCourse,
  getCouresDetailInfo,
  getDanmu,
  sendDanmu,
} from "@/request/course";
import {
  sendComment,
  getCommentPage,
  sendCommentReply,
  deleteComment,
} from "@/request/comment";
import dPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
export default {
  data() {
    return {
      //储存章节，课程信息
      playInfoList: [],
      page: 1,
      options: {
        video: {
          url: "",
        },
        danmaku: {
          user: "",
          bottom: "10%",
          unlimited: true,
        },
        theme: "#00A1D6",
        apiBackend: {
          read: async (endpoint, callback) => {
            let result = await getDanmu(this.chapterInfo._id);
            callback("", result.data);
          },
          send: async (url, data, cb) => {
            data.uid = this.userInfo._id;
            data.sid = this.chapterInfo._id;
            let result = await sendDanmu(data);
            if (result.status !== 0) {
              return this.$message({
                type: "error",
                message: result.message,
              });
            }
            this.$message({
              type: "success",
              message: result.message,
            });
            cb();
          },
        },
      },
      courseId: this.$route.query.courseId,
      sectionId: this.$route.query.sectionId,
      memberId: "11",
      chapterInfo: {}, //当前小节视频信息
      courseInfo: {},
      //评论内容
      content: "",
      commentList: [],
      commentCount: 0,
      //他说
      heSay: "",
      who: {},
      isReply: [],
      showAllReply: [],
      replyContent: "",
    };
  },
  components:{
    "d-player": dPlayer,
  },
  created() {
    this.memberId = this.userInfo._id;
    this.playVideo(this.courseId, this.sectionId);
    this.init(this.courseId);
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  methods: {
    async init(_id) {
      let result = await getCommentPage(_id);
      this.commentList = result.message.comment;
      this.commentCount = result.message.commentCount;
      this.isReply = new Array(this.commentList.length).fill(false);
      this.showAllReply = new Array(this.commentList.length).fill(false);
      console.log(this.showAllReply);
    },
    //课程播放的信息
    playVideo(courseId, sectionId) {
      console.log(courseId);
      playCourse({ courseId, sectionId })
        .then((res) => {
          if (res.status == 0) {
            this.playInfoList = res.message;
            for (let i = 0; i < this.playInfoList.length; i++) {
              //当前播放章节
              if (this.playInfoList[i]._id == sectionId) {
                this.chapterInfo = this.playInfoList[i]; //当前小节信息
                //开始没有设置player的src后面，就要通过switchVideo来设置
                this.$refs.player.dp.switchVideo({
                  url: "http://localhost:3001/" + this.playInfoList[0].video,
                  type: this.playInfoList[0].video.split(".").pop(),
                });
              }
            }
          } else {
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          this.$message({
            message: "暂无资源",
            type: "error",
          });
        });
      getCouresDetailInfo({ id: courseId }).then((res) => {
        this.courseInfo = res.message; //该课程所有信息
      });
    },

    //播放章节
    play(item) {
      console.log(item);
      //动态路由跳转是不会进行刷新页面的
      this.$router.replace({
        path: "/video",
        query: {
          courseId: this.courseId,
          sectionId: item._id,
        },
      });
    },
    goBack() {
      window.history.go(-1);
    },
    //发表评论
    async send() {
      if (!this.content.trim()) {
        this.content = "";
        return this.$message({
          message: "请输入内容",
          type: "error",
        });
      }
      let result = await sendComment({
        cid: this.courseId,
        uid: this.userInfo._id,
        content: this.content,
      });
      this.$message({
        message: result.message,
        type: "success",
      });
      //获取结果
      result = await getCommentPage(this.courseId);
      this.commentList = result.message.comment;
      this.commentCount = result.message.commentCount;
      this.content = "";
    },
    //  显示回复文本域
    showArea(who, tag, heSay) {
      for (let i = 0; i < this.isReply.length; i++) {
        this.$set(this.isReply, i, false);
      }
      this.isReply[tag] = true;
      this.who = who;
      this.heSay = heSay;
    },
    //显示所有回复
    showReply(index, event) {
      event.path[1].style.display = "none";
      this.$set(this.showAllReply, index, true);
      console.log(this.showAllReply);
    },
    //回复
    async sendReply(commentId) {
      if (!this.replyContent.trim()) {
        this.replyContent = "";
        return this.$message({
          type: "error",
          message: "请输入内容",
        });
      }
      let result = await sendCommentReply({
        _id: commentId,
        from: this.userInfo._id,
        to: this.who._id,
        content: this.replyContent,
        cid: this.courseId,
        page: this.page,
        heSay: this.heSay,
      });
      this.$message({
        type: "success",
        message: result.message[0],
      });
      this.commentList = result.message[1].comment;
      this.isReply = new Array(this.commentList.length).fill(false);
      this.commentCount = result.message[1].commentCount;
      this.replyContent = "";
    },
    //分页
    async handleCurrent(page) {
      this.page = page;
      let result = await getCommentPage(this.courseId, page);
      this.commentList = result.message.comment;
      this.isReply = new Array(this.commentList.length).fill(false);
      this.showAllReply = new Array(this.commentList.length).fill(false);
      console.log(this.showAllReply);
    },
    //删除
    async deleteContent(_id, reply) {
      let result = await deleteComment({
        _id,
        reply,
        cid: this.courseId,
        page: this.page,
      });
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.commentList = result.message.comment;
      this.isReply = new Array(this.commentList.length).fill(false);
      this.commentCount = result.message.commentCount;
    },
  },
  watch: {
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      //重新获取数据
      let sectionId = this.$route.query.sectionId;
      let courseId = this.$route.query.courseId;
      if (sectionId && courseId) {
        this.playVideo(courseId, sectionId);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
::v-deep .el-tabs__item {
  padding: unset !important;
  width: 80px !important;
  height: 100px !important;
}

::v-deep .el-tabs__nav-wrap::after {
  background: unset !important;
}

::v-deep .el-tabs__active-bar.is-right {
  width: 0 !important;
}

::v-deep .el-tabs__item.is-active .tabpanel-title {
  background: #25282a !important;
}

::v-deep .el-tabs__item.is-active .tabpanel-title .icon,
.el-tabs__item.is-active .tabpanel-title .text {
  color: #ffffff;
}

::v-deep .el-tabs__nav.is-right {
  padding: 20px 0;
  background: #1c1f21 !important;
}

::v-deep .el-tabs--right,
::v-deep .el-tabs__content,
::v-deep .el-tab-pane {
  height: 100%;
}

::v-deep .vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  bottom: 60px;
  left: 20px;
  font-size: 3.5em;
  line-height: 2em !important;
  margin-left: unset;
  top: unset;
}

.main {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 80px;
}

.top {
  padding: 0 20px;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #25282a;
  opacity: 1;
}

.top .goBack {
  font-weight: bold;
  color: #545c63;
  cursor: pointer;
}

.top .name {
  padding: 0 10px;
}
.play {
  display: flex;
  background: #25282a;
  padding: 20px;
  height: 600px;
  overflow: hidden;
}

/* 视频播放开始 */
.play-left {
  width: calc(100% - 400px);
  height: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
}

.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}

/* 视频播放结束 */
/* 播放列表开始 */
.play-right {
  color: #ffffff;
  width: 400px;
  height: 100%;
  /* overflow: scroll;*/
}

.play-right .active {
  background: rgba(255, 255, 255, 0.3);
}

.tabpanel-title {
  padding: 17px 0 18px 0;
  width: 100%;
  text-align: center;
}

.tabpanel-title .icon {
  height: 40px;
  font-size: 30px;
  line-height: 40px;
  color: #a4a5a6;
}

.tabpanel-title .text {
  height: 25px;
  line-height: 25px;
  color: #a4a5a6;
}

.chapter-container {
  height: 100%;
  overflow-y: scroll;
  padding-left: 10px;
}

.chapter-container .list {
  width: 100%;
  margin-bottom: 20px;
}

.list dt {
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  color: #ffffff;
  opacity: 1;
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.list dd {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 2px 5px;
  margin: 0 0 5px 0;
  color: #a8a9ab;
  cursor: pointer;
}

.list dd:hover {
  color: #ffffff;
}

.list dd .video-itemIcon {
  height: 30px;
  margin-right: 10px;
  font-size: 18px;
  float: left;
}

.list dd .item-name {
  float: left;
  width: calc(100% - 35px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

/* 播放列表结束 */
.video-player {
  height: 100%;
}

.loading {
  color: #ffffff;
  font-size: 20px;
  margin: 200px auto;
  width: 100px;
  text-align: center;
}

.loading img {
  width: 100%;
}

.finished {
  margin-top: 250px;
}

.over {
  color: #ffffff;
  font-size: 20px;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
}

.over .over-btn {
  width: 120px;
  height: 30px;
  margin: 20px;
  line-height: 30px;
  border-radius: 8px;
  border: 0px;
  outline: none;
  color: #ffffff;
  background: #3585ff;
}

.over .over-btn:hover {
  border: 1px solid #fff;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}

/* 课程开始 */
.course-container {
  height: 100%;
  overflow-y: scroll;
  margin-left: 10px;
  color: #a8a9ab;
}

.course-container .courseName {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-weight: bold;
}

.course-container .courseDesc {
  line-height: 25px;
  font-size: 13px;
  margin: 20px 0;
  letter-spacing: 1px;
  text-align: justify;
}

.course-container .courseImg {
  width: 100%;
  height: 150px;
  border-radius: 8px;
}

.course-container .courseImg img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.course-container .teacher {
  display: flex;
  text-align: center;
  justify-content: flex-start;
}

.course-container .teacher .teacherAvt {
  margin: 10px 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.course-container .teacher .teacherAvt img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.course-container .teacherRecommend {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

.course-container .teacher .teacherInfo {
  display: flex;
  flex-direction: column;
  margin: 15px 10px;
  text-align: left;
}

.course-container .teacher .teacherName {
  font-weight: bold;
  font-size: 16px;
}

.course-container .teacherTag {
  text-align: left;
  font-size: 13px;
}

.course-container .teacherReacher {
  width: 100%;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 25px;
  text-align: justify;
}
.liuyan {
  width: 1000px;
  margin-top: 50px;
  margin-left: 50px;
}
.comment {
  .item {
    b {
      color: #6d757a;
      font-size: 1.2rem;
      &:hover {
        color: #00a1d6;
      }
    }
    div {
      margin: 1rem 0 0.5rem;
    }
    p {
      margin: 0.8rem 0;
      color: #99a2aa;
      font-size: 1.2rem;
    }
    .replySpan {
      margin-left: 1.5rem;
      cursor: pointer;
      padding: 0.2rem;
      border-radius: 4px;
      &:hover {
        color: #00a1d6;
        background-color: #e5e9ef;
      }
    }
    .toggle {
      color: #6d757a;
    }
  }
}
</style>
