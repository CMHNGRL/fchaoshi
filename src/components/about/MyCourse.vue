<template>
  <div class="my-course" style="margin-top: 20px">
    <el-tabs v-model="activeName" class="course-tabs" @tab-click="handleClick">
      <el-tab-pane label="视频课程" name="course">
        <CourseItem :courseList="courseList" :type="type"></CourseItem>
        <pagination
          v-show="totalpage > 0"
          :total="totalpage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getCourse(1)"
        />
      </el-tab-pane>
      <el-tab-pane label="直播课程" name="live">
        <CourseItem :courseList="courseList" :type="type"></CourseItem>
        <pagination
          v-show="totalpage > 0"
          :total="totalpage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getCourse(2)"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getMyCourse } from "@/request/mycourse";
import CourseItem from "./CourseItem.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "MyCourse",
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
  },
  components:{
      CourseItem,
    Pagination
  },
  data() {
    return {
      activeName: "course",
      courseList: [],
      type:1,
      totalpage:0,
      query: {
        pageSize: 3,
        pageNum: 1,
      },
    };
  },
  methods: {
      //获取视频课程
    getCourse(type){
        getMyCourse({_id:this.userInfo._id,type,query:this.query})
        .then((res) => {
          this.courseList = res.message.obj
          this.type=type
          this.totalpage =res.message.length
        })
        .catch((err) => {
          console.log("请求课程失败！");
        });
    },
    //切换
    handleClick() {
      if (this.activeName === "course") {
        //视频课程
        this.getCourse(1);
      } else if (this.activeName === "live") {
        //直播课程
        this.getCourse(2)
      }
      this.query= {pageSize: 3,pageNum: 1}
    },
  },
  mounted() {
    this.getCourse(1);
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
