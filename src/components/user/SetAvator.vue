<template>
  <div class="setavator">
    <div class="setavator-header">
      <p>设置头像</p>
      <img :src="avatar" style="opacity: 0" />
    </div>
    <div class="setavator-container">
      <el-row style="margin: 10px">
        <el-col :span="2">
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          />
        </el-col>
        <el-col :span="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <div class="upload">
            <el-upload
              action="#"
              :http-request="requestUpload"
              :show-file-list="false"
              :before-upload="beforeUpload"
              name="img"
            >
              选择头像
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col>
          <p class="setavator-tip">
            推荐640x640像素，JPG/PNG,5M以内。头像修改后，部分页面次日生效。
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-button class="cancel" @click="cancel">取消</el-button>
        </el-col>
        <el-col :span="9">
          <el-button class="cancel" @click="uploadImg()">确认</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { mapState, mapActions } from "vuex";
import { uploadAvatar,updateAvatar,getInfo} from "@/request/user";
import { Loading } from "element-ui";

export default {
  name: "SetAvator",
  components: {
    VueCropper,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      title: "修改头像",
      imgUrl: "",
      options: {
        img: "", //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        outputType: "png", //裁剪生成图片的格式（jpeg || png || webp）
        fixedBox: true, // 固定截图框大小 不允许改变
      },
      previews: {},
      files: null,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),

    //给该插件设计默认的用户图片！！！
    avatar() {
      if (!this.$store.getters.user_pic) {
        return "http://localhost:3001/"+this.userInfo.user_pic;
      } else {
        return "http://localhost:3001/"+this.$store.getters.user_pic;
      }
    },
  },

  methods: {
    ...mapActions(["saveUserInfo"]),
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload(file) {
      this.files = file;
      if (file.type.indexOf("image/") == -1) {
        this.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        //将文件内容读入内存,将图片保存data:url
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob((data) => {
        let formData = new FormData();
        //blob转file
        const file = new File([data], data.type, {
          type: data.type,
        });
        formData.append("img", file);
        var basisiloading = Loading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        uploadAvatar(formData)
          .then((res) => {
            this.imgUrl = res.filename;
          //更新信息
            updateAvatar({
              user_pic: this.imgUrl,
              nickName: this.userInfo.nickName,
            })
              .then((res) => {
                if (res.status==0) {
                  this.$message({
                    message: "上传头像成功",
                    type: "success",
                  });
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    basisiloading.close();
                  });
                  this.getUserInfo();
                } else {
                  this.$message({
                    message: "上传头像失败，请重新上传",
                    type: "error",
                  });
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    basisiloading.close();
                  });
                }
              })
              .catch((err) => {
                this.$message({
                  message: err,
                  type: "error",
                  duration: 800,
                });
                basisiloading.close();
              });
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "error",
              duration: 800,
            });
            basisiloading.close();
          });
      });
    },
   
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
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    cancel() {
      this.options = {
        outputType: "png",
        img: this.userInfo.avatar
          ? this.userInfo.avatar
          : "/image/common/avator.png", //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      };
    },
  },
};
</script>
<style scoped>
html {
  touch-action: manipulation;
}

.setavator {
  touch-action: none;
  position: relative;
}

.setavator-header {
  height: 60px;
  border-bottom: 1px solid #ccc;
}

.setavator-header p {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 60px;
  color: #333333;
}

.setavator-container {
  width: 900px;
  height: 500px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.avatar-upload-preview {
  position: absolute;
  top: 10px;
  transform: translateX(50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgb(126, 120, 120);
  overflow: hidden;
}

.setavator-tip {
  width: 100%;
  height: 42px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}

.upload {
  position: absolute;
  bottom: 0;
  left: 65%;
  width: 103px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: rgba(0, 102, 255, 1);
}

.cancel {
  width: 103px;
  height: 40px;
  text-align: center;
  color: #fff;
  background: rgba(0, 102, 255, 1);
}

.img {
  width: 200px;
  height: 20px;
  border: 1px solid red;
}
</style>
