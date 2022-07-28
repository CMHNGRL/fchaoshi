<template>
  <div>
   <Header></Header>
    <div class="main">
      <div class="header">{{title}}</div>
      <div class="body">
        <div class="shang">
          <img :src="url" /> {{message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import{statePay} from '@/request/pay'
import { delCarsAndAddCor } from '@/request/cart'
import {mapState} from 'vuex'
import Header from "@/components/index/Header.vue";
export default {
  name: "PayMent",
  data() {
    return {
      state: '',
      title: "",
      message:"",
      url: "",
    };
  },
components: {
    Header,
  },
  computed: {
      ...mapState({
          userInfo:(state)=>state.userinfo
      })
  },
  created(){
      console.log(this.userInfo)
      this.getData()
  },
  methods: {
    hander() {
      this.$message({
        message: "请联系管理人员",
        type: "warning",
        duration: 800,
      });
    },
    getData(){
        let {out_trade_no,trade_no} = this.$route.query
        let data = {
            out_trade_no,
            trade_no
        }
        statePay(data).then(res=>{
            if(res.status == 0){
                this.state = true
                this.title = "支付成功"
                this.message = res.message
                this.url = '/image/pay/success.png'
                let selectedArr = sessionStorage.getItem("selectedArr");
                let setArr = JSON.parse(selectedArr);
                delCarsAndAddCor({course:setArr,_id:this.userInfo._id}).then(res=>{console.log(res)})
                sessionStorage.removeItem('selectedArr')
            }else{
                this.state = false
                this.title = "支付失败"
                this.url = '/image/pay/error.png'
                this.message = res.message
            }
        })
    },

  },
};
</script>
<style scoped lang='scss'>
.main {
  width: 900px;
  height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background: rgb(254, 254, 254);
  margin: 200px auto 0;
  .header {
    font-weight: 700;
    font-size: 20px;
    padding-left: 30px;
    height: 40px;
    line-height: 40px;
    background: rgba(247, 248, 250);
  }
  .body {
    height: 100%;
    position: relative;
    .shang {
      height: 300px;
      text-align: center;
      vertical-align: middle;
      font-size: 50px;
      font-weight: 600;
      line-height: 300px;
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      img {
        width: 100px;
      }
    }
  }
}
</style>

