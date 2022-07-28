<template>
  <div class="index">
    <!--重置密码-->
    <transition-group
      name="animate__animated animate__bounce"
      appear
      enter-active-class="animate__zoomInUp"
      leave-active-class="animate__zoomOutDown"
    >
      <div class="reset" key="re">
        <el-form
          ref="resetForm"
          :model="resetForm"
          :rules="rules"
          label-width="1.2rem"
          size="small"
        >
          <img src="/image/login/avatar.svg" alt="" class="avatar" />
          <h3 class="header-title">重置密码</h3>
           <el-form-item prop="email">
            <el-input
              v-model="resetForm.email"
              placeholder="邮箱"
              prefix-icon="iconfont icon-youxiang"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              v-model="resetForm.pwd"
              placeholder="密码"
              prefix-icon="el-icon-unlock"
              show-password
              type="password"
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkpwd">
            <el-input
              v-model="resetForm.checkpwd"
              placeholder="确认密码"
              prefix-icon="el-icon-unlock"
              show-password
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="mmm" class="eyzm">
            <el-input
              v-model="resetForm.mmm"
              placeholder="验证码"
              prefix-icon="iconfont icon-yanzhengma"
            ></el-input>
            <el-button round @click="getYzm" :disabled="monut">{{
              val
            }}</el-button>
          </el-form-item>
          <div id="tyzm">
            <span v-html="img" @click="changeYZM"></span>
            <input v-model="tyzm" placeholder="请输入验证码" />
          </div>

          <el-button round @click="submitForm('resetForm')"
            >重置密码</el-button
          >
        </el-form>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { yzm, tyzm, repwd } from "@/request/user";

export default {
  name: "ResetPwd",
  metaInfo: {
      title: '重置密码', // set a title
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
          this.$refs.resetForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //登录表单信息
      resetForm: {
        email: "",
        pwd: "",
        checkpwd:""
      },
      //验证规则   注册表单和登录表单共用
      rules: {
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
    istu(){
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
      return true
    },
    //注册表单提交信息
    submitForm(formname) {
     //图像验证码判断
      if(!this.istu()){
        return;
      }
      //提交表单信息
      this.$refs[formname].validate((valid) => {
        if (this.yzm != this.resetForm.mmm) {
          this.open("验证码错误");
          return false;
        }
        if (this.email != this.resetForm.email) {
          this.open("邮箱输入错误");
          return false;
        }
        if (valid) {
          repwd(this.resetForm).then((res) => {
            if (res.status === 1) {
              this.open(res.message);
            } else {
              //跳转页面
              this.$router.push({
                name: "Login",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //获取邮箱验证码
    getYzm() {
      if (this.resetForm.email) {
        yzm({
          email: this.resetForm.email,
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
              console.log(this.val);
              clearInterval(ds);
            } else {
              this.val = s + "s重新获取";
            }
          }, 1000);
        });
      }
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
  },
};
</script>
<style lang="scss" scoped>
.index {
  /*登录注册 */
  background-color: rgb(169, 242, 255);
  .reset {
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    overflow: hidden;
    justify-content: center;
    .el-form {
      width: 400px;
      .header-title {
        font-size: 2.9rem;
        text-transform: uppercase;
        margin: 15px 0;
        color: rgb(42, 192, 42) !important;
        border-bottom: 2px solid rgb(42, 192, 42) !important;
      }
      .avatar {
        width: 100px;
        border-radius: 100%;
        overflow: hidden;
        border: 5px solid rgb(230, 250, 120);
      }
      h3 {
        font-size: 2.9rem;
        text-transform: uppercase;
        margin: 15px 0;
        color: #999;
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
}
</style>