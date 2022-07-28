<template>
  <div class="fixed">
    <div class="bgColor">
      <h1 class="main-shopcart">购物车</h1>
    </div>
    <div class="container">
      <div class="main">
        <div class="nav">
          <span class="left">全部课程</span>
          <span class="right"> </span>
        </div>
        <ul class="head">
          <li class="item check">
            <el-checkbox v-model="allChecked" @change="selectAll"
              >全选</el-checkbox
            >
          </li>
          <li class="item classInfo">课程信息</li>
          <li class="item total">金额</li>
          <li class="item function">操作</li>
        </ul>
        <div v-if="orderList.length > 0">
          <ul class="haveorder" v-for="item in orderList" :key="item._id">
            <li class="order-item">
              <el-checkbox
                v-model="item.checked"
                @change="selectSingleProduct($event, item)"
              ></el-checkbox>
            </li>
            <li class="order-item info">
              <div class="courseimg">
                <img :src="'http://localhost:3001/' + item.pic" alt="" />
              </div>
              <div class="course-name" v-if="item.type == 1">
                {{ item.name }}
              </div>
              <div class="course-name" v-else>{{ item.title }}</div>
            </li>
            <li class="order-item totoalprice">￥{{ item.price }}</li>
            <li class="order-item delete">
              <a
                href="javascript:;"
                @click="deleteOrder(item._id, 1)"
                v-if="item.type == 1"
              >
                <i class="el-icon-delete"></i>
                <span class="deletd-text">删除</span>
              </a>
              <a href="javascript:;" @click="deleteOrder(item._id, 2)" v-else>
                <i class="el-icon-delete"></i>
                <span class="deletd-text">删除</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="noOrder" v-else>
          <img src="/image/norder365.png" alt="" />
          <div class="order-alert">暂无订单</div>
        </div>
        <el-divider class="line"></el-divider>
        <ul class="foot">
          <li class="foot-item">
            已选课程<span class="unique">{{ getCount }}</span>
          </li>
          <li class="foot-item">
            合计<span class="unique">{{ price }}</span>
          </li>
          <li>
            <button class="btn" @click="getSelecteds">去结算</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCarList, deleteShopCar } from "@/request/cart";
import { mapState } from "vuex";
export default {
  name: "LayOut",
  data() {
    return {
      orderList: [], //加入购物车的商品
      allChecked: false,
      selectedProducts: [], //选中的商品
      count: 0,
      price: 0,
    };
  },
  created() {
    this.getShpCarList();
  },
  watch: {
    //监听被勾选中的课程的变化，动态变换其价格
    selectedProducts: {
      immediate: true,
      handler(newval) {
        this.price = 0;
        //newval返回的是一个新的数组
        newval.forEach((item) => {
          this.price += item.price;
        });
      },
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userinfo,
    }),
    //计算总件数
    getCount() {
      return this.selectedProducts.length;
    },
  },
  methods: {
    //获取购物车数据
    getShpCarList() {
      getShopCarList({ _id: this.userInfo._id }).then((res) => {
        let list = res.message;
        list.forEach((item) => {
          item["checked"] = true;
        });
        this.orderList = JSON.parse(JSON.stringify(list)); //深拷贝
        this.selectedProducts = JSON.parse(JSON.stringify(list));
        this.allCheck();
      });
    },
    //全选的状态
    allCheck() {
      if (this.orderList.length == this.selectedProducts.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    //全选
    selectAll(e) {
      if (e) {
        this.orderList.forEach((item) => {
          item["checked"] = true;
        });
        this.selectedProducts =JSON.parse(JSON.stringify(this.orderList)) ;
      } else {
        this.orderList.forEach((item) => {
          item["checked"] = false;
        });
        this.selectedProducts = [];
      }
    },
    //单选控制全选
     selectSingleProduct(e, item) {
      if (e) {
        this.selectedProducts.push(item);
        this.allCheck();
      } else {
        for (let i = 0; i < this.selectedProducts.length; i++) {
          if (item._id === this.selectedProducts[i]._id) {
            this.selectedProducts.splice(i, 1);
          }
        }
        this.allCheck();
      }
    },
    //删除按钮的事件
    deleteOrder(id, type) {
      this.$message({
        message: "确认删除？",
        type: "warning",
      }).then(() => {
        deleteShopCar({ _id: this.userInfo._id, courseId: id, type }).then(
          (res) => {
            console.log(res, "删除购物车");
            if (res.status == 0) {
              this.$message({
                message: res.message,
                type: "success",
                duration: 800,
              });
              this.getShpCarList();
            } else {
              this.$message({
                message: res.message,
                type: "error",
                duration: 800,
              });
            }
          }
        );
      });
    },
    // 去结算页面，发送课程id和数量
    getSelecteds() {
      if (!this.selectedProducts || this.selectedProducts.length <= 0) {
        this.$message({
          message: "请选择课程之后，再去结算！",
          type: "error",
        });
        return;
      }
      let arr = new Array();
      this.selectedProducts.forEach((item) => {
        arr.push({ id: item._id,type:item.type});
      });
      //将所有课程订单信息存入sessionStorage里面，转到下一个页面
      sessionStorage.setItem("selectedArr", JSON.stringify(arr));
      this.$router.push("/confirmOrder");
    },
  },
};
</script>

<style scoped>
.fixed {
  /*position: relative;*/
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.bgColor {
  width: 100%;
  height: 200px;
  background-color: red;
  background: #e73c7e;
  background-size: 400% 400%;
}

.container {
  width: 1200px;
  margin: -100px auto 50px auto;
  background: #ebedf2;
  border-radius: 12px;
  box-shadow: 0px 2px 5px #888888;
}
.main {
  padding: 20px;
  border-radius: 5px;
  background: white !important;
  min-height: 857px;
}
.main-shop {
  position: relative;
  display: flex;
  align-content: center;
}
.main-shop i {
  font-size: 35px;
  padding: 20px 10px 0 0;
  color: #ff4400;
  font-weight: bold;
}
.main-shopcart {
  width: 1200px;
  margin: 0 auto;
  height: 42px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 35px;
  color: #ffffff;
  padding: 30px 0;
  opacity: 1;
}
.nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e6e6e6;
}
.nav .left {
  width: 80px;
  height: 26px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 0px;
  color: #ff4400;
  opacity: 1;
  border-bottom: 2px solid #ff4400;
}
.nav .right {
  width: 108px;
  height: 24px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #333333;
  opacity: 0.5;
}

/* 头部开始 */
.head {
  display: flex;
  padding: 0 10px;
  margin: 20px 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #fcfcfc;
  opacity: 1;
  border-radius: 0px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.head .item {
  width: 110px;
  font-size: 14px;
  color: #333333;
}
.head .check {
  width: 80px;
}
.classInfo {
  width: 820px !important;
  color: #333333;
}

.haveorder {
  display: flex;
  width: 1160px;
  height: 200px;
  background: #fcfcfc;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
  padding-left: 0;
}
.haveorder .order-item {
  height: 110px;
  line-height: 200px;
  margin: 5px;
}
.order-item:first-child {
  text-align: center;
  width: 80px;
}
.order-item {
  width: 110px;
  font-size: 16px;
  color: #333333;
}
.totoalprice {
  color: #e2231a;
}
.num {
  width: 120px !important;
  padding-left: 15px;
}
.info {
  display: flex;
  width: 800px !important;
  height: 200px;
  line-height: 200px;
}
.courseimg {
  margin: 40px 20px 40px 0;
  width: 200px;
  height: 120px;
}
.courseimg img {
  width: 100%;
  height: 100%;
}
.info .course-name {
  width: 600px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.delete {
  cursor: pointer;
}
.deletd-text {
  margin-left: 5px;
}

/* 订单结束 */

/* 暂无订单开始 */
.noOrder {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 200px 0;
}
.order-alert {
  height: 31px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #b5b9bc;
  opacity: 1;
  margin: 20px 120px;
}
/* 暂无订单结束 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 1160;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin-bottom: 10px;
}
.foot-item {
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #ff4400;
}
.btn {
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border: none;
  color: #ffffff;
  font-size: 22px;
  border-radius: 5px;
  background: #ff4400;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
</style>
