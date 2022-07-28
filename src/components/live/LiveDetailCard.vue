<!-- 课程介绍卡片 -->
<template>
  <div data-flex="" class="course-detail-card div p-20">
    <el-row :gutter="60" class="w-100">
      <el-col :md="14" :sm="14">
        <img
          v-if="data.pic"
          :src="'http://localhost:3001/' + data.pic"
          alt=""
          class="w-100"
          :style="{ objectFit: 'cover', maxHeight: '300px' }"
        />
        <img
          v-else
          src="/image/banner.png"
          alt="默认图片"
          class="w-100"
          :style="{ objectFit: 'cover', maxHeight: '300px' }"
        />
      </el-col>
      <el-col :md="10" :sm="10" class="p-5">
        <h1 class="f-22 p-b-10 b-b">{{ data.title }}</h1>
        <div>
          <p class="m-t-18 m-b-5 f-18">课程介绍</p>
          <div class="o-8" :style="{ lineHeight: '1.7' }">
            {{ data.decoration || "暂无简介" }}
          </div>
        </div>
        <div>
          <p class="m-t-18 m-b-5 f-18">主讲人: {{ data.tid["name"] }}</p>
          <p class="m-t-18 m-b-5 f-18">开始时间: {{ startTime }}</p>
        </div>
        <div class="a-l m-t-20" data-flex="cross:center">
          <div>
            <div v-if="!isIn">
              <button class="btn-item active">立即购买</button>
              <button class="btn-item" @click="addCar()">加入购物车</button>
            </div>
            <button class="btn-item active" @click="gointo(data._id)" v-else>
              进入直播间
            </button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addShopCar } from "@/request/cart";
import { isInMyCourse } from "@/request/mycourse";
import { getLiveDetailInfo } from "../../request/live";
import { mapState } from "vuex";

export default {
  name: "LiveDetailCard",
  props: {
    data: {
      type: Object,
    },
    courseId: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
    startTime() {
      let a = this.data.startTime.split(/T|[.]/);
      let b = a[1].split(":");
      if (b[0] < 10) {
        a[1] = Number(b[0]) + ":" + b[1] + ":" + b[2];
      }
      return a[0] + " " + a[1];
    },
  },
  methods: {
    init() {
      isInMyCourse({
        courseId: this.courseId,
        _id: this.userInfo._id,
        type: 2,
      }).then((res) => {
        this.isIn = res.message;
      });
    },
    gointo(id) {
      getLiveDetailInfo({ id }).then((res) => {
        if (res.message.onLive == 0) {
          this.$message({
            message: "直播未开启",
            type: "warning",
          });
        } else {
          this.$router.push({
            path: "/onlive",
            query: {
              live: id,
            },
          });
        }
      });
    },
    addCar() {
      if (!sessionStorage.getItem("token")) {
        this.$message({
          message: "请先登陆",
          type: "warning",
          duration: 800,
        });
      } else {
        addShopCar({
          courseId: this.courseId,
          _id: this.userInfo._id,
          type: 2,
        }).then((res) => {
          console.log(res, "car");
          if (res.status == 0) {
            this.$message({
              message: res.message,
              type: "success",
              duration: 800,
            });
          } else {
            this.$message({
              message: res.message,
              type: "error",
              duration: 800,
            });
          }
        });
      }
    },
  },
  data() {
    return {
      isIn: false,
    };
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped src="../../assets/css/base.scss" lang="scss"></style>
<style lang="scss" scoped>
.course-detail-card {
  height: 60vh;
  ::v-deep .el-icon-star-on {
    font-size: 32px;
    cursor: pointer;
  }
  ::v-deep .el-icon-star-off {
    font-size: 28px;
  }
}
.btn-item {
  width: 120px;
  height: 40px;
  /*margin: 0 20px 0 0;*/
  padding: 0px;
  border: 0px;
  outline: none;
  color: #f11d1d;
  border-radius: 23px;
  cursor: pointer;
}
.active {
  background: #f11d1d !important;
  color: #ffffff;
  margin-right: 10px;
}
.ddt {
  width: 100vw;
  height: 50vh;
}
</style>