<template>
  <div class="lore">
    <img src="image/login/bg.png" alt="" class="bg" />
    <div class="content">
      <!--背景图片-->
      <div class="img">
        <img src="image/login/bg.svg" alt="" />
      </div>
      <!--登录、注册-->
      <div class="login-register">
        <transition-group
          name="animate__animated animate__bounce"
          appear
          enter-active-class="animate__zoomInUp"
          leave-active-class="animate__zoomOutDown"
        >
          <!--登录-->
          <div class="login" key="lo" v-show="istype">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="rules"
              label-width="1.2rem"
              size="small"
            >
              <img src="image/login/avatar.svg" alt="" class="avatar" />
              <div class="header-title">
                <h3 :class="{ fcolor: istype }" @click="changeTable">登录</h3>
                <h3 :class="{ fcolor: !istype }" @click="changeTable">注册</h3>
              </div>
              <el-form-item prop="email">
                <el-input
                  v-model="loginForm.email"
                  placeholder="邮箱"
                  prefix-icon="iconfont icon-youxiang"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input
                  v-model="loginForm.pwd"
                  placeholder="密码"
                  prefix-icon="el-icon-unlock"
                  show-password
                  type="password"
                  auto-complete="new-password"
                ></el-input>
              </el-form-item>
              <div id="tyzm">
                <span v-html="img" @click="changeYZM"></span>
                <input v-model="tyzm" placeholder="请输入验证码"/>
              </div>
              <div class="pw">
                <a @click="resetPwd">>>>已有账号，忘记密码？</a>
              </div>
              <el-button round @click="submitForm1('loginForm')"
                >登录</el-button
              >
            </el-form>
          </div>
          <!--注册-->
          <div class="register" key="re" v-show="!istype">
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="rules"
              label-width="1.2rem"
              size="small"
            >
              <img src="image/login/avatar.svg" alt="" class="avatar" />
              <div class="header-title">
                <h3 :class="{ fcolor: istype }" @click="changeTable">登录</h3>
                <h3 :class="{ fcolor: !istype }" @click="changeTable">注册</h3>
              </div>
              <el-form-item prop="name">
                <el-input
                  v-model="registerForm.name"
                  placeholder="用户名"
                  prefix-icon="el-icon-user-solid"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input
                  v-model="registerForm.pwd"
                  placeholder="密码"
                  prefix-icon="el-icon-unlock"
                  show-password
                  type="password"
                  auto-complete="new-password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkpwd">
                <el-input
                  v-model="registerForm.checkpwd"
                  placeholder="确认密码"
                  prefix-icon="el-icon-unlock"
                  show-password
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  v-model="registerForm.email"
                  placeholder="邮箱"
                  prefix-icon="iconfont icon-youxiang"
                ></el-input>
              </el-form-item>
              <el-form-item prop="mmm" class="eyzm">
                <el-input
                  v-model="registerForm.mmm"
                  placeholder="验证码"
                  prefix-icon="iconfont icon-yanzhengma"
                ></el-input>
                <el-button round @click="getYzm" :disabled="monut">{{
                  val
                }}</el-button>
              </el-form-item>
              <div id="tyzm">
                <span v-html="img" @click="changeYZM"></span>
                <input v-model="tyzm" placeholder="请输入验证码"/>
              </div>
              <div class="xyi">
                注册表示您已经同意我们的<a @click="ystk">隐私条款</a>
              </div>
              <el-button round @click="submitForm2('registerForm')"
                >注册</el-button
              >
            </el-form>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>

import { yzm, tyzm, register, login } from "@/request/user";
export default {
  name: "LoOrRe",
  metaInfo: {
      title: '登录注册', // set a title
    },
  data() {
    //自定义密码规则
    var validatePass = (rule, value, callback) => {
      //正则表达式  密码
      var passwordreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!passwordreg.test(value)) {
          callback(
            new Error("至少8-16个字符，至少要包含大写字母，小写字母和数字")
          );
        } else {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //注册表单信息
      registerForm: {
        name: "",
        pwd: "",
        checkpwd: "",
        email: "",
        mmm: "",
      },
      //登录表单信息
      loginForm: {
        email: "",
        pwd: "",
      },
      //验证规则   注册表单和登录表单共用
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" },
        ],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        checkpwd: [{ validator: validatePass2, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mmm: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度6个字符", trigger: "blur" },
        ],
      },
      //获取验证码按钮disabled状态
      monut: false,
      //获取验证码按钮内容
      val: "获取验证码",
      //邮箱验证码
      yzm: "",
      //邮箱(防止那个小可爱用邮箱a获取验证码后，用邮箱b去注册)
      email: "",
      //登录还是注册
      istype: true,
      //验证码图片
      img: "",
      //图像验证码
      tyzm: "",
      //储存图验证码
      tym: "",
    };
  },
  mounted() {
    tyzm().then((res) => {
      this.img = res.img;
      this.tym = res.txt;
    });
  },
  
  methods: {
    //图像验证码判断
    istu() {
      //判断验证码是否填写
      if (this.tyzm == "") {
        this.open("请输入图形验证码");
        tyzm().then((res) => {
          this.img = res.img;
          this.tym = res.txt;
        });
        return false;
      }
      //验证码是否正确
      if (this.tyzm != this.tym) {
        this.open("图形验证码输入错误");
        tyzm().then((res) => {
          this.img = res.img;
          this.tym = res.txt;
        });
        return false;
      }
      return true;
    },
    //登录表单提交信息
    submitForm1(formname) {
      //图像验证码判断
      if (!this.istu()) {
        return;
      }
      //提交表单信息
      this.$refs[formname].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            if (res.status === 1) {
              this.open(res.message);
            } else {
              //将token储存在sessionStorage
              sessionStorage.setItem("token", res.token);
              //将email储存在sessionStorage
              sessionStorage.setItem("email", this.loginForm.email);
              //跳转页面
              this.$router.push('/');
            }
          });
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    //注册表单提交信息
    submitForm2(formname) {
      //图像验证码判断
      if (!this.istu()) {
        return;
      }
      //提交表单信息
      this.$refs[formname].validate((valid) => {
        if (this.yzm != this.registerForm.mmm) {
          this.open("验证码错误");
          return false;
        }
        //防止用邮箱a获取验证码，却用邮箱b注册
        if (this.email != this.registerForm.email) {
          this.open("邮箱错误");
          return false;
        }
        if (valid) {
          register(this.registerForm).then((res) => {
            this.open(res.message);
          });
        } else {
          return false;
        }
      });
    },
    //获取邮箱验证码
    getYzm() {
      if (this.registerForm.email) {
        yzm({
          email: this.registerForm.email,
        }).then((res) => {
          //获取验证码
          this.yzm = res.message.code;
          //获取邮箱
          this.email = res.message.email;
          //设置时间间隔避免频繁获取验证码
          this.monut = true;
          let s = 60;
          let ds = setInterval(() => {
            s -= 1;
            if (s < 0) {
              this.monut = false;
              this.val = "获取验证码";
              clearInterval(ds);
            } else {
              this.val = s + "s重新获取";
            }
          }, 1000);
        });
      }
    },
    //切换表单
    changeTable() {
      this.istype = !this.istype;
    },
    //重置密码页面
    resetPwd() {
      this.$router.push({
        name: "Resetpwd",
      });
    },
    //提示
    open(content) {
      this.$message.alert(content, "提示", {
        confirmButtonText: "确定",
      });
    },
    //换验证码
    changeYZM() {
      tyzm().then((res) => {
        this.img = res.img;
        this.tym = res.txt;
      });
    },
    //跳转隐私条款页面
    ystk() {
      this.$router.push({
        name: "Ystk",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.lore {
  .bg {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  .content {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18rem;
    padding: 0 2rem;
    .img {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      img {
        width: 500px;
        border-radius: 100%;
        overflow: hidden;
        border: 10px solid rgb(230, 250, 120);
      }
    }
    /*登录注册 */
    .login-register {
      display: flex;
      align-items: center;
      text-align: center;
      overflow: hidden;
      .register,
      .login {
        .el-form {
          width: 400px;
          .avatar {
            width: 100px;
            border-radius: 100%;
            overflow: hidden;
            border: 5px solid rgb(230, 250, 120);
          }
          .header-title {
            display: flex;
            justify-content: space-around;
            h3 {
              font-size: 2.9rem;
              text-transform: uppercase;
              margin: 15px 0;
              color: #999;
              &:hover {
                cursor: pointer;
              }
            }
          }

          .pw {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 20px;
            display: flex;
            justify-content: right;
            text-align: center;
            .el-button {
              width: 40%;
              background: rgb(56, 179, 200);
              color: white;
              text-align: center;
            }
            a {
              cursor: pointer;
              color: rgb(43, 145, 204);
              font-size: 14px;
              padding-top: 16px;
            }
          }
          .el-button {
            width: 80%;
            background: rgb(56, 179, 200);
            color: white;
          }
          /* 邮箱验证码 */
          .eyzm {
            .el-button,
            .el-input {
              width: 30%;
            }
            .el-input {
              width: 70%;
            }
          }
          /* 协议 */
          .xyi {
            font-size: 10px;
            text-align: center;
            margin: 15px 0;
            color: #8a8888;
            a {
              color: rgb(12, 186, 255);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  #tyzm {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      width: 300px;
      height: 40px;
    }
    input {
      flex: 1;
      height: 32px;
      line-height: 32px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      &:focus {
        border: 1px solid #2d73f5;
      }
    }
  }
  /*媒体查询*/
  @media screen and (max-width: 1080px) {
    .content {
      grid-gap: 9rem;
    }
  }
  @media screen and (max-width: 1024px) {
    .el-form {
      width: 290px;
    }
    .el-formform h3 {
      font-size: 2.4rem;
      margin: 8px 0;
    }
    .img img {
      width: 360px;
    }
  }
  @media screen and (max-width: 768px) {
    .bg {
      display: none;
    }
    .content .img {
      display: none;
    }
    .content {
      grid-template-columns: 1fr;
    }
    .content .login-register {
      justify-content: center;
    }
  }
  /*登录，注册字体颜色 */
  .fcolor {
    color: rgb(119, 203, 252) !important;
    border-bottom: 2px solid rgb(119, 203, 252) !important;
  }
}
</style>