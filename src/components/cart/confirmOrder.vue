<template>
  <div class="confirmOrder">
    <div class="bgColor">
      <h1 class="main-shopcart">确认订单</h1>
    </div>
    <div class="main">
      <div class="info">
        <div class="head">商品信息</div>
        <div class="info-main" v-for="item in courseInfo" :key="item._id">
          <div class="courseInfo">
            <div class="coursebg">
              <img :src="'http://localhost:3001/' + item.pic" alt="" />
            </div>
            <div class="courseName" v-if="item.type == 1">{{ item.name }}</div>
            <div class="courseName" v-else>{{ item.title }}</div>
            <div class="coursePrice">
              <span class="nowprice">￥{{ item.price }}</span>
            </div>
          </div>
        </div>
        <ul class="foot">
          <li class="foot-item">
            应付<span class="unique">￥{{ totalPrice }}</span>
          </li>
          <li>
            <button class="btn" @click="toPayment">确认订单</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { checkout,alipay } from "@/request/pay";
import { delCarsAndAddCor } from "@/request/cart";
import {mapState} from 'vuex'
export default {
  name: "ConfirmOrder",
  data() {
    return {
      setArr: [],
      courseInfo: [],
      payment: {},
      totalPrice: null,
      orderNumber: "",
      qrCode: "1",
      timeInterVal: "",
      ids: [],
      counter: 0,
      isFinished: false,
    };
  },
  created() {
    this.order();
  },
    computed: {
      ...mapState({
          userInfo:(state)=>state.userinfo
      })
  },
  methods: {
    //获取订单
    order() {
      let selectedArr = sessionStorage.getItem("selectedArr");
      if (!selectedArr) {
        this.$message({
          message: "无订单",
          type: "error",
        });
        this.$router.push("/");
        return;
      }
      //获取到订单数据并保存
      this.setArr = JSON.parse(selectedArr);
      checkout({ setArr: this.setArr }).then((res) => {
        this.courseInfo = res.message.data;
        this.totalPrice = res.message.price;
      });
    },
    // 去支付
    toPayment() {
      if (this.totalPrice > 0) {
        let name = null
        if(this.setArr.length>1){
          name = this.setArr.length+"个课程"
        }else{
          name = "1个课程"
        }
        alipay({
          orderId:Date.now(),
          price: this.totalPrice,
          name
        }).then((res) => {
           window.location.href=res.message
        });
       }else{
         delCarsAndAddCor({course:this.setArr,_id:this.userInfo._id}).then(res=>{console.log(res)})
          sessionStorage.removeItem('selectedArr')
          this.$message({
            message:"购买成功",
            type:"success"
          })
       }  
    }
           
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
.finish {
  width: 170px;

  line-height: 30px;
  margin: 0 auto;
  display: flex;
}
.success {
  margin-left: 20px;
  width: 70px;
  font-size: 12px;
  background: rgba(54, 137, 255, 0.22);
  color: #3692ff;
  cursor: pointer;
  border-radius: 8px;
}
.error {
  width: 100px;
  font-size: 12px;
  background: linear-gradient(90deg, #fc7979 0%, #da4848 100%);
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
}
::v-deep .el-dialog {
  text-align: center !important;
  border-radius: 10px !important;
}
.dialogPrice {
  padding-bottom: 20px;
  color: #93999f;
}
.prices {
  color: #f01414;
}
.alert {
  padding: 20px 0;
  font-size: 14px;
  color: #93999f;
}
.confirmOrder {
  width: 100%;
  min-height: 900px;
  padding-bottom: 50px;
}
.bgColor {
  width: 100%;
  height: 200px;
  background-color: red;
  background: #e73c7e;
  background-size: 400% 400%;
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
.main {
  width: 1200px;
  margin: -100px auto 100px auto;
}
.main h1 {
  color: #ffffff;
  padding: 30px 0 30px 47px;
}
.info {
  width: 1200px;
  padding: 5px 0px 20px 0px;
  background: #f3f5f7;
  border-radius: 10px;
  box-shadow: 0px 2px 5px #888888;
}
.info-main {
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
.head {
  padding: 20px;
  font-size: 18px;
  color: #333333;
}
/* 课程信息 */
.courseInfo {
  display: flex;
  width: 100%;
  height: 160px;
  margin: 0 auto;
}
.coursebg {
  width: 280px;
  height: 160px;
}
.coursebg img {
  width: 100%;
  height: 100%;
}
.courseName {
  margin: 0 20px;
  width: 400px;
  height: 160px;
  font-size: 16px;
  color: #07111b;
  line-height: 160px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coursePrice {
  margin-left: 100px;
  height: 160px;
  text-align: right;
  line-height: 160px;
}
.coursePrice .nowprice {
  font-size: 18px;
  font-weight: 600;
  color: #1c1f21;
}

/* 结算 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #333333;
  margin-bottom: 10px;
  padding: 0;
}
.foot-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.foot-item:first-child {
  margin-top: 3px;
}
.old {
  margin-left: 10px;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #f01414;
}
.btn {
  margin-right: 20px;
  width: 150px;
  height: 50px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  background: #f01414;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
</style>
