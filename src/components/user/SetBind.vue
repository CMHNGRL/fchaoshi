<template>
  <div class="setbind">
    <div class="setbind-header">
      <p>账号信息</p>
      <p class="header-complete">
        完成 <span>{{ finish }}/2</span>
      </p>
    </div>
    <div class="setbind-container">
      <div class="setbind-item">
        <div class="item-img">
          <img src="/image/user/email.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-email"><span>邮箱</span> {{ userInfo.email }}</p>
          <p>可用邮箱加密登录，可用邮箱找回密码</p>
        </div>
        <div class="item-btn">修改绑定</div>
      </div>
      <div class="setbind-item">
        <div class="item-img">
          <img src="/image/user/pwd.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-email"><span>密码</span></p>
          <p>用于保护账号信息和登录安全</p>
        </div>
        <div class="item-btn" @click="changePwd">修改密码</div>
      </div>
    </div>

    <!--  修改密码对话框  -->
    <el-dialog
      title="修改密码"
      :visible.sync="pswOpen"
      width="400px"
      :before-close="handlePswClose"
    >
      <div>
        <el-form
          ref="pswForm"
          :model="pswForm"
          label-width="80px"
          :rules="pswRules"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input
              show-password
              v-model="pswForm.oldPwd"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              show-password
              v-model="pswForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input
              show-password
              v-model="pswForm.repassword"
              placeholder="请输入密码"
              @keyup.enter.native="onPswSubmit('pswForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="24">
                <el-button
                  type="primary"
                  @click="onPswSubmit('pswForm')"
                  class="changepass"
                  >确认</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { updatePwd } from "@/request/user";
export default {
  name: "setBind",
  data() {
    return {
      pswOpen: false, // 修改密码
      pswForm: {},
      pswRules: {
        oldPwd: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
        repassword: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
    finish() {
      let num = 0;
      if (this.userInfo.pwd) {
        num += 1;
      }
      if (this.userInfo.email) {
        num += 1;
      }
      return num;
    },
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    changePwd() {
      this.pswForm = {};
      this.pswOpen = true;
    },
    //关闭弹窗口
    handlePswClose() {
      this.pswOpen = false;
      this.pswForm = {};
    },
    // 修改密码
    onPswSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.pswForm.password === this.pswForm.repassword) {
            updatePwd({
              password: this.pswForm.oldPwd,
              password_new: this.pswForm.password,
              name: this.userInfo.nickName,
            }).then((res) => {
              if (res.status == 0) {
                this.$message({
                  message: "更新成功，5s后将自动退出",
                  type: "susscee",
                });
                // 退出
                setInterval(() => {
                  this.logout()
                }, 3000);
                
              } else {
                this.$message({
                  message: res.message,
                  type: "warning",
                });
              }
            });
          } else {
            this.$message({
              message: "两次密码不一样，请重新输入",
              type: "warning",
            });
          }
        } else {
          this.$message({
            message: "输入有误，请检查",
            type: "warning",
          });
        }
      });
    },
    
    //退出
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      this.saveUserInfo({});
      window.location.href = "/";
    },
  },
};
</script>

<style scoped lang='scss'>
.changepass {
  margin-left: 200px;
}

.setbind {
  width: 1000px;
  height: 700px;
  padding-top: 20px;
  .setbind-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    display: flex;
    align-items: center;
    .header-complete {
      margin-left: 40px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(161, 153, 159, 1);
      span {
        color: #ff1626;
      }
    }
  }
}

.setbind-container {
  width: 100%;
  height: 700px;
}

.setbind-item {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  height: 90px;
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  border-top: 1px solid rgba(112, 112, 112, 0.3);
}

.item-img {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img img {
  width: 28px;
  height: 40px;
}

.item-email {
  color: #ff1626;
  margin-bottom: 5px;
}

.item-email span {
  font-weight: 700;
  font-size: 18px;
  color: #333333;
  margin-right: 5px;
}

.item-center {
  width: 800px;
}

.item-btn {
  padding: 5px 20px;
  border: 1px solid rgba(112, 112, 112, 1);
  border-radius: 15px;
  cursor: pointer;
}
</style>

