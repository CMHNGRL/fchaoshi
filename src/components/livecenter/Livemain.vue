<template>
  <div class="coursemain">
    <div class="course-main">
      <section class="search-container">
        <div class="search-item">
          <div class="title-name">课程分类：</div>
          <div class="all-items">
            <el-tag
                :class="indexObj.indexType === undefined?'category-poniter':'category-poniter category-poniter-item'"
                effect="plain"
                type="info"
                @click="buildingCondition('category',null)"
            >
              全部
            </el-tag>
            <!-- 加上category-poniter-item这个类名就相当于样式是没被选中的-->
            <el-tag
                :class="indexObj.indexType === index?'category-poniter':'category-poniter category-poniter-item'"
                effect="plain"
                type="info"
                v-for="(item,index) in category"
                :key="item._id"
                @click="buildingCondition('category',item,index)"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </div>
        <div class="search-item" style="top: 45px">
          <div class="title-name">课程难度：</div>
          <div class="all-items">
            <el-tag
                :class="indexObj.indexEasy === undefined?'category-poniter':'category-poniter category-poniter-item'"
                effect="plain"
                type="info"
                @click="buildingCondition('clevel',null)"
            >
              全部
            </el-tag>
            <el-tag
                :class="indexObj.indexEasy == index?'category-poniter':'category-poniter category-poniter-item'"
                effect="plain"
                type="info"
                v-for="(item,index) in courseLevel"
                :key="item.code"
                @click="buildingCondition('clevel',item,index)"
            >{{ item.text }}
            </el-tag>
          </div>
        </div>
      </section>
    </div>
 <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li :class="active == 1?'active item':active" @click="handleNewCourse">最新开播</li>
          <li class="item split">|</li>
          <li :class="active == 2?'active item':active" @click="handleMostBuy">最多购买</li>
          <li class="item split">|</li>
          <li class="item item-price" @click="handlePrice">
            价格
            <span class="arrow">
              <i class="el-icon-caret-top" :style="priceSort == 2?'color:#7c80fe':''"></i>
              <i class="el-icon-caret-bottom" :style="priceSort == 1?'color:#7c80fe':''"></i>
            </span>
          </li>
        </ul>
      </div>
      <div class="container-body" v-if="arrcourse && arrcourse.length != 0">
        <div class="newCourseContent">
          <ul class="courseUl">
            <li
                class="courseItem"
                v-for="item in arrcourse"
                :key="item._id"
            >
              <div class="courseInfo">
                <router-link :to="{path:'/livecourse/'+item._id}">
                  <div class="courseBg">
                    <img class="courseImg" :src="'http://localhost:3001/'+item.pic" alt=""/>
                  </div>
                </router-link>
                <div class="courseName">{{ item.name }}</div>
                <div class="courseDegree">
                  {{ levelJudge(item.level) }} ·
                  {{ item.buy_n }}人购买
                </div>
                <div class="coursePrice">
                  <div class="coursePriceZero" v-if="item.price == 0">
                    <div class="pricefree">免费学习</div>
                    <img src="../../assets/image/free.png" alt=""/>
                  </div>
                  <div v-if="item.price != 0" class="price">¥ {{ item.price}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-body" v-else>
        <el-empty
            image="/image/course-empt.png"
            description="暂无课程"
        ></el-empty>
      </div>
      <div class="pages">
        <Pagination
            v-show="totalpage > 0"
            :total="totalpage"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {getCourseAllType} from "@/request/course";
import {liveSearch} from "@/request/live";
import Pagination from "./Pagination"
export default {
  name:"LiveMain",
  components:{Pagination},
  data() {
    return {
      totalpage:0,//分页器总共有多少条数据
      active: '1', //最新课程还是最多人购买
      priceSort: '', //价格升序和降序
      indexObj: {
        indexType: undefined,
        indexEasy: undefined
      },
      category: [], //课程分类
      cur: '',
      courseLevel: [
        //课程等级
        {
          text: "初级",
          code: "1",
        },
        {
          text: "中级",
          code: "2",
        },
        {
          text: "高级",
          code: "3",
        },
      ],
      searchList: {
        type: '',
        index: ''
      },
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        entity: {
          courseName: "", //课程名称
          category: "", //课程分类
          courseLevel: 0, //课程等级（1：初级；2：中级；3：高级）
          sortBy: "startTime",
        },
      },
      arrcourse: [], //课程信息
    };
  },
  computed: {
    levelJudge() {
      return function (level) {
        if (level == 1) {
          return '初级'
        } else if (level == 2) {
          return '中级'
        } else if (level == 3) {
          return '高级'
        }
      }
    },
  },
  async activated() {
    this.getCategorys()
    this.liveSearch()
    this.getList()
  },
  deactivated() {
    //重新请求全部数据，并且将courseName置为空
    this.initLabelSort()
    this.courseSort(this.queryParams)
  },
  //通过监听路由的变化，拿到里面的Keywords值，因为该页面只有搜索才会改变路由
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (this.$route.query.keywords) {
          this.initLabelSort( this.$route.query.keywords)
          this.courseSort(this.queryParams)
        }
      }
    },
  },
  methods: {
    //获取课程分类
    getCategorys() {
      getCourseAllType().then(res => {
        this.category = res.message
      })
    },
    //初始化所有标签分类内容
    initLabelSort(courseName = ''){
      this.indexObj.indexType = undefined;
      this.indexObj.indexEasy = undefined;
      this.queryParams = {
        pageNum: 1,
        pageSize: 12,
        entity: {
          courseName: courseName, //课程名称
          category: "", 
          courseLevel: 0, //课程等级（1：初级；2：中级；3：高级）
          sortBy: "startTime",
        },
      }
      this.searchList.type ='';
      this.searchList.index = '';
    },
    //获取课程信息
    liveSearch() {
      liveSearch(this.queryParams).then(res => {
        console.log(res)
        this.arrcourse = res.message;
        //将请求回来的数据total赋值给总条数。做分页功能的处理
        this.totalpage =res.status
      })
    },
    //与上面的方法一样，多了形参，用于标签点击查询课程
    courseSort(queryParams) {
      liveSearch(queryParams).then(res => {
         this.arrcourse = res.message;
        //将请求回来的数据total赋值给总条数。做分页功能的处理
        this.totalpage =res.status
      })
    },
    //选择课程类型，课程难度
    buildingCondition(type, object, index) {
      //点击下面的分类就把路由的query值动态修改掉
      this.$router.push({
        query: {
          keywords: null
        }
      })
      //将别的页面传递过来的courseName赋值为空字符串
      this.queryParams.entity.courseName = '';
      //重新点击上面的课程分类标签之后，需要将分页器的pgeNum重新赋值为1
      this.queryParams.pageNum = 1;

      //防止重复点击多次请求数据
      if (type !== this.searchList.type || index !== this.searchList.index) {
        this.searchList.type = type
        this.searchList.index = index
      } else if (type === this.searchList.type && index === this.searchList.index) {
        return false;
      }

      if (type == 'category') {
        this.indexObj.indexType = index
        object = object ? object : -1;

        //点击课程分类，下面的课程难易程度变为全部
        this.indexObj.indexEasy = undefined;

        this.queryParams.entity.category = object.name ? object.name : '';
        this.queryParams.entity.courseLevel = 0;

      } else if (type == 'clevel') {

        // 如果是全部难易程度，初级是1，中级是2，高级是3
        this.indexObj.indexEasy = index
        this.queryParams.entity.courseLevel = index !== undefined ? index + 1 : 0;
      }
      this.liveSearch();
    },
    handleNewCourse() {
      this.active = 1;
      this.priceSort = '';
      //重新按第一页去请求
      this.queryParams.pageNum = 1;
      this.queryParams.entity.sortBy='startTime'
      this.courseSort(this.queryParams)

    },
    handleMostBuy() {
      this.active = 2
      this.priceSort = '';
      this.queryParams.pageNum = 1;
      this.queryParams.entity.sortBy='buy_n'
      this.courseSort(this.queryParams)
    },
    handlePrice() {
      this.queryParams.pageNum = 1;
      this.active = ''
      if (this.priceSort == 1 || this.priceSort == '') {
        this.queryParams.entity.sortBy = 'price-asc'
        this.courseSort(this.queryParams)
        this.priceSort = 2
      } else {
        this.queryParams.entity.sortBy = 'price-desc'
        this.courseSort(this.queryParams)
        this.priceSort = 1
      }
    },
    //分页器事件，实现和liveSearch一样，这里用于区分
    getList(){
      liveSearch(this.queryParams).then(res =>{
        //更新课程列表
        this.arrcourse = res.message;
        //总条数
        this.totalpage = res.status
      })
    },
  }

};
</script>

<style scoped>
.all .active{
  color: #2c80ff;
}

.all .split {
  color: #d2d2d2;
}
/* 课程整体样式 */
.container-body{
  min-height: 900px;
}
/* 分类开始 */
.course-main {
  padding: 20px 0;
  width: 100%;
  height: 90px;
  background: #f3f5f9;
}

.search-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}

.search-item {
  display: flex;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  height: 45px;
  transition: all 0.5s;
}

.search-item .title-name {
  width: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  text-align: justify;
  color: #333333;
  padding: 10px;
  opacity: 1;
}

.search-item .title-name:after {
  content: ".";
  width: 100%;
  display: inline-block;
  overflow: hidden;
  height: 0;
}

.search-item .all-items {
  width: calc(100% - 120px);
  min-height: 25px;
  display: flex;
  flex-wrap: wrap;
}

.title .all-list {
  width: 40px;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
  padding: 0 10px;
  align-items: center;
  text-align: center;
}

.category-poniter {
  height: 25px !important;
  line-height: 25px !important;
  margin: 10px 5px !important;
  cursor: pointer !important;
  border: none !important;
  background: rgba(44, 128, 255, 0.1) !important;
  color: #2c80ff !important;
}

.category-poniter-item {
  background: none !important;
  color: rgba(81, 87, 89, 1) !important;
}

/* 分类结束 */

/* 搜索条件开始 */
.coursemain {
  width: 100%;
}

.main-container {
  width: 1200px;
  margin: 0 auto;
}

.container-top {
  margin-top: 12px;
  margin-left: -35px;
}

.all {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}

.all .item:first-child {
  margin-right: 20px;
}

.all .item {
  margin: 0 10px;
  cursor: pointer;
}
.arrow {
  position: relative;
}

.arrow i:first-child {
  position: absolute;
  top: -1px;
}

.arrow i:last-child {
  position: absolute;
  top: 7px;
}

.check {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.up {
  position: absolute;
  top: 5px;
  left: 2px;
}

.down {
  position: absolute;
  top: 15px;
  left: 2px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}

/* 搜索调价结束 */
/* 课程内容开始 */
.newCourseContent {
  width: 1200px;
  margin: 30px auto 0px auto;
}

.newCourseContent .courseUl {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.newCourseContent .courseUl .courseItem {
  width: 285px;
  height: 280px;
  margin: 0 10px 20px 0;
}

.newCourseContent .courseUl .courseItem:hover {
  cursor: pointer;
}

.newCourseContent .courseUl .courseItem:nth-child(4n + 0) {
  margin-right: 0 !important;
}

.courseInfo {
  position: relative;
  width: 100%;
  height: 260px;
  background: #ffffff;
  box-shadow: 2px 4px 4px rgba(27, 39, 94, 0.1);
  opacity: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: margin-top 0.2s;
  -webkit-transition: margin-top 0.2s;
}

.courseInfo:hover {
  margin-top: -10px;
}

.courseBg {
  position: relative;
  width: 100%;
  height: 160px;
}

.courseImg {
  width: 100%;
  height: 100%;
}

.courseName {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.courseDegree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}

.coursePrice {
  display: flex;
  font-size: 14px;
  margin: 10px;
  justify-content: space-between;
}

.courseMemberbg {
  position: relative;
  left: 0px;
  top: 2px;
  width: 150px;
  height: 25px;
  color: red;
  font-weight: 700;
  line-height: 25px;
}

.courseMemberbg img {
  width: 15px;
  height: 10px;
  padding-left: 5px;
}

.coursePriceZero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 72px;
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
  padding: 0 1px;
  color: rgba(53, 134, 255, 1);
}

.courseMember {
  padding-left: 15px;
}

.memberlogo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  margin: 5px 5px 0 0;
}

.memberlogo img {
  width: 40px;
  height: 20px;
}

.price {
  line-height: 29px;
  left: 90px;
  color: #ff727f;
  font-weight: 700;
}
.pages {
  width: 100%;
  height: 100%;
  margin: 50px auto !important;
}
</style>
