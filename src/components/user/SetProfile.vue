<template>
  <div class="setprofile">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="profile-tabs">
      <el-tab-pane label="基本信息" name="first" class="profile-pane">
        <div class="changeInfo" @click="showBasisBtn">修改<i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <el-form
            ref="basisForm"
            :model="basisForm"
            label-width="100px"
            style="width: 500px"
        >
          <el-form-item label="姓名" prop="realName">
            <el-input
                v-model="basisForm.name"
                :disabled="isDis"
                placeholder="无"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
                v-model="basisForm.nickName"
                placeholder="无"
                :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="basisForm.sex" :disabled="isDis">
              <el-radio label="男">男生</el-radio>
              <el-radio label="女">女生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
                v-model="basisForm.age"
                placeholder="无"
                :disabled="isDis"
                type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
                v-model="basisForm.birthday"
                type="date"
                placeholder="无"
                :disabled="isDis"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input
                v-model="basisForm.address"
                placeholder="无"
                :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="sign">
            <el-input
                v-model="basisForm.sign"
                placeholder="无"
                :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item v-show="basisOpen">
            <el-row>
              <el-col :span="12"><el-button @click="cancel">取消</el-button></el-col>
              <el-col :span="12"><el-button type="primary" @click="basisSubmit">确认</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getInfo,updateUserInfo} from "@/request/user";
import  {Loading} from 'element-ui'
export default {
  name:"SetProfile",
  data() {
    return {
      activeName: "first",
      basisForm:{},
      isDis: true,
      basisOpen:false,
      rules: {
        certificateNumber: [
          { required: true, message: '请输入数字', trigger: 'blur' },
          { pattern: /^\d$/, message: '只能输入数字' }
        ]
      }

    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  beforeMount() {
    this.basisForm = this.userInfo;
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    //获取用户个人信息
    getUserInfo(){
        //获取当前登录用户邮箱
        let email = sessionStorage.getItem('email')
        getInfo({email}).then(res=>{
          if(res.status==0){
            //用Vuex保存用户的个人信息
            this.saveUserInfo(res.message)
          }else{
                this.$message({
                  message:res.message,
                  type:'error'
                })
                 this.saveUserInfo({})
              }
      })
    },
    handleClick() {},
    basisSubmit(){
      console.log(this.basisForm)
      // 时间格式化
      if(this.basisForm.birthday) {
        this.basisForm.birthday = this.dateFormat(this.basisForm.birthday, 'yyyy-MM-dd')
      }
      let basisiloading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //更新信息
      updateUserInfo({
            ...this.basisForm
          }).then((res) => {
            if (res.status === 0) {
              this.getUserInfo();
              this.isDis = true;
              this.isbasisOpen = false
              this.$message({
                message: res.message,
                type: "success",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                basisiloading.close();
              });
            }else {
              this.$message({
                message: "更新信息失败",
                type: "error",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                basisiloading.close();
              });
            }
          }).catch(err => {
            this.$message({
              message:err,
              type:'error',
              duration:800
            })
            basisiloading.close();
          });
        
    

    },
    showBasisBtn(){
      this.isDis = false;
      this.basisOpen = true
    },
    cancel() {
      this.isDis = true;
      this.basisOpen = false;
      this.basisForm = this.userInfo;
    },
    // 时间格式化
    dateFormat(datetime, fmt){
      datetime = new Date(datetime)
      var o = {
        "M+": datetime.getMonth() + 1, //月份
        "d+": datetime.getDate(), //日
        "h+": datetime.getHours(), //小时
        "m+": datetime.getMinutes(), //分
        "s+": datetime.getSeconds(), //秒
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
        "S": datetime.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
  },
};
</script>

<style scoped>
.setprofile {
  position: relative;
}
.profile-tabs {
  width: 100%;
  height: 800px;
  padding-top: 20px;
}
.profile-pane {
  width: 100%;
  height: 800px;
}
.changeInfo {
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(101, 142, 255, 1);
  text-align: center;
  /* border:1px solid red; */
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.fa-pencil-square-o {
  margin-left:5px;
}
</style>
