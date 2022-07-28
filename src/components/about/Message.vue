<template>
  <div class="my-course" style="margin-top: 20px">
    <el-tabs v-model="activeName" class="course-tabs">
      <el-tab-pane label="全部消息" name="first">
        <div class="reply" v-show="msg.length">
          <div v-for="(item, i) in msg" :key="item._id">
            <div style="cursor: pointer" @click="linkTo(item.comment.cid)">
              <el-row>
                <el-col :span="2" style="text-align: center">
                  <el-avatar
                    icon="el-icon-user-solid"
                    :size="46"
                    :src="'http://localhost:3001/' + item.user.user_pic"
                  ></el-avatar>
                </el-col>
                <el-col :span="22" class="content">
                  <el-row>
                    <el-col :span="19">
                      <b>{{ item.user.nickName }}</b>
                      <span>回复了我的评论</span>
                      <div class="text-wrap">
                        {{ item.content }}
                      </div>
                      <div class="youSay" v-show="item.youSay">
                        {{ item.you.nickName }}: {{ item.youSay }}
                      </div>
                      <p>
                        {{ item.date | fullDateFormat }}
                        <span
                          class="el-icon-chat-line-round"
                          @click.stop="
                            reply(
                              i,
                              item.comment._id,
                              item.user._id,
                              item.content
                            )
                          "
                        >
                          回复
                        </span>
                        <span
                          class="el-icon-delete"
                          @click.stop="deleteMsg(item._id)"
                          >删除</span
                        >
                      </p>
                    </el-col>
                    <el-col
                      :span="4"
                      :title="item.comment.content"
                      :offset="1"
                      class="last text-wrap"
                    >
                      {{ item.comment.content }}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <el-row
              style="margin-bottom: 20px"
              type="flex"
              align="middle"
              v-show="isShow[i]"
            >
              <el-col :span="2" style="text-align: center">
                <el-avatar
                  :size="46"
                  :src="'http://localhost:3001/' + item.you.user_pic"
                ></el-avatar>
              </el-col>
              <el-col :span="19">
                <el-input
                  type="textarea"
                  style="font-size: 12px"
                  v-model="replyMsg"
                  placeholder="输入回复内容"
                  rows="3"
                ></el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button type="primary" @click="replyUser">回复</el-button>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0">
              <el-col
                :span="22"
                :offset="2"
                style="border-bottom: 1px solid #e5e9ef"
              ></el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getMsg, deleteMsg } from "@/request/message";
import { sendCommentReply } from "@/request/comment";
import { playCourse } from "@/request/course";
export default {
  name: "MessageC",
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  data() {
    return {
      activeName: "first",
      isShow: [],
      replyMsg: "",
      msg: [],
      to: "",
      commentId: "",
      heSay: "",
      flag: "",
    };
  },
  methods: {
    deleteMsg(msgId) {
      deleteMsg(msgId, this.userInfo._id);
      deleteMsg({ _id: msgId, userId: this.userInfo._id }).then((res) => {
        this.msg = res.message.data;
        this.isShow = new Array(this.msg.length).fill(false);
        this.$message.success(res.message.message);
      });
    },
    async replyUser() {
      if (this.replyMsg.trim()) {
        let result = await sendCommentReply({
          _id: this.commentId,
          from: this.userInfo._id,
          to: this.to,
          content: this.replyMsg,
          heSay: this.heSay,
        });
        this.$message({
          type: "success",
          message: result.message[0],
        });
        this.isShow[this.flag] = false;
      } else
        this.$message({
          type: "success",
          message: "请输入内容",
        });
      this.replyMsg = "";
    },
    linkTo(id) {
      playCourse({ courseId: id }).then((res) => {
        console.log(res.message[0]);
        this.$router.push({
          path: "/video",
          query: {
            courseId: id,
            sectionId: res.message[0]._id,
          },
        });
      });
    },
    reply(j, commentId, to, heSay) {
      //重置回复文本域是否显示
      for (let i = 0; i < this.isShow.length; i++) {
        this.$set(this.isShow, i, false);
      }
      this.$set(this.isShow, j, true);
      this.flag = j;
      this.commentId = commentId;
      this.to = to;
      this.heSay = heSay;
    },
    init() {
      getMsg({ _id: this.userInfo._id }).then((res) => {
        this.msg = res.message;
        this.isShow = new Array(this.msg.length).fill(false);
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.course-tabs {
  margin-left: 20px;
}
.reply {
  width: 910px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  .content {
    color: #505050;
    margin-bottom: 10px;
    .youSay {
      color: #999;
      font-size: 12px;
      margin: 8px 0;
      border-left: 2px solid #e7e7e7;
      padding: 2px;
    }
    span {
      margin-left: 10px;
    }
    div:nth-child(3) {
      margin: 5px 0;
    }
    p:last-child {
      font-size: 12px;
      color: #999999;
      span {
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #00a1d6;
        }
        &:before {
          margin-right: 3px;
        }
      }
    }
    .last {
      height: 60px;
      overflow: hidden;
    }
  }
}
.text-wrap {
  /*换行*/
  word-wrap: break-word;
  word-break: break-all;
}
</style>
