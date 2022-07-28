<template>
  <div>
    <Header />
    <div class="main-live">
      <el-row style="height: 675px" type="flex" align="middle">
        <el-col class="player-col">
          <el-row class="live-info">
            <el-col :span="2">
              <el-avatar
                :src="'http://localhost:3001/' + live.tid.user_pic"
                icon="el-icon-user-solid"
                :size="64"
                shape="circle"
              ></el-avatar>
            </el-col>
            <el-col :span="5">
              <h2>{{ live.title }}</h2>
              <div style="margin-top: 10px">
                <b>主讲人：</b>{{ live.tid.name }}
              </div>
            </el-col>
          </el-row>
          <div id="dplayer" class="player"></div>
        </el-col>
        <el-col class="danmu-col">
          <h3>弹幕列表</h3>
          <div class="danmu-box">
            <div class="danmu" ref="dan">
              <p v-for="msg in message" :key="msg._id">
                <span
                  :style="`color: ${
                    userInfo._id === msg.id ? '#FF5D23' : '#00A1D6'
                  }`"
                  >{{ msg.nick }}:</span
                >
                {{ msg.msg }}
              </p>
            </div>
            <div class="text-area">
              <el-input
                type="textarea"
                placeholder="发送弹幕"
                @keyup.enter.native="sendDanMu"
                resize="none"
                rows="3"
                show-word-limit
                v-model="textarea"
                maxlength="20"
              ></el-input>
              <div style="text-align: end">
                <el-button
                  type="primary"
                  :disabled="!userInfo._id"
                  size="small"
                  @click="sendDanMu"
                >
                  {{ userInfo._id ? "发送" : "未登录" }}
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/index/Header";
import Footer from "@/components/index/Footer";
import DPlayer from "dplayer";
import { getLiveDetailInfo } from "@/request/live";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  name: "OnLine",
  data() {
    return {
      live: {
        tid: {
          _id: "",
          user_pic: "",
          name: "",
        },
      },
      textarea: "",
      ws: {},
      message: [],
    };
  },
  methods: {
    sendDanMu() {
      if (this.textarea.trim()) {
        this.ws.send(
          JSON.stringify({
            id: this.userInfo._id,
            nick: this.userInfo.nickName,
            msg: this.textarea,
          })
        );
      } else this.$message({
        message:"请输入弹幕",
        type:"error"
      })
      this.textarea = "";
    },
    initWebSocket(wsUrl) {
      this.ws = new WebSocket(wsUrl);
      this.ws.onmessage = (msg) => {
        let result = JSON.parse(msg.data);
        this.message.push(result);
        this.$nextTick(() => {
          this.$refs.dan.scrollTop = this.$refs.dan.scrollHeight;
        });
        window.dp.danmaku.draw({
          text: result.msg,
          color: result.id === this.userInfo._id ? "#00CCFF" : "#fff",
          type: "right",
        });
      };
    },
    init() {
      let { live } = this.$route.query;
      getLiveDetailInfo({ id: live }).then((res) => {
        this.live = res.message;
        window.dp = new DPlayer({
          container: document.getElementById("dplayer"), //播放器容器
          screenshot: true, //截图功能
          video: {
            url: "http://localhost:8000" + this.live.playUrl,
          },
          autoplay: true,
          danmaku: true,
        });
        let wsUrl = "ws://localhost:8089?room=" + this.live.tid._id;
        this.initWebSocket(wsUrl);
      });
      
    },
  },
  mounted() {
    this.init();
  },
  //创建前设置样式
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "overflow: hidden;");
  },
  //销毁前清除
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<style lang="scss" scoped>
.main-live {
  width: 1400px;
  margin: 20px auto 20px;
}
.player-col {
  height: 675px;
  width: 1040px;
  border-radius: 8px;
  .live-info {
    background-color: white;
    padding: 10px 20px 10px;
    border-radius: 8px 8px 0 0;
    height: 90px;
  }
  /*在scoped的情况下使用::v-deep修改封装好的样式*/

  .player {
    width: 1040px;
    height: 585px;
  }
}
.danmu-col {
  height: 675px;
  background-color: white;
  border-radius: 8px;
  margin-left: 20px;
  h3 {
    height: 50px;
    padding: auto 10px;
    transform: translateY(30px);
  }
  .danmu-box {
    border-top: 1px solid #e9eaec;
    background-color: #f8f8f8;
    height: 585px;
    border-radius: 0 0 8px 8px;
    .text-area {
      padding: 10px;
      .el-button {
        margin-top: 10px;
      }
    }
    .danmu {
      height: 445px;
      overflow: auto;
      padding: 0 0 10px 10px;
      p {
        font-size: 12px;
        line-height: 2em;
        color: #646c7a;
      }
    }
  }
}
</style>
