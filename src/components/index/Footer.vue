<template>
  <div class="footer">
    <div class="containerr">
      <div class="row">
        <div class="footer-col">
          <div class="logo">
            <img src="/image/logo.png" />
          </div>

          <div class="footer-slogan">名师授课，轻松学技术</div>
          <div class="chat">
            <div class="cicon">
              <i
                class="iconfont icon-weixin"
                style="color: rgb(54, 189, 76)"
              ></i>
              <div class="footer-weixin">
                <img src="/image/kefu.png" />
              </div>
            </div>

            <div class="cicon">
              <i class="iconfont icon-qq" style="color: rgb(28, 163, 220)"></i>
              <div class="footer-weixin">
                <img src="/image/kefu.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="footer-col2">
          <div class="col-title">平台</div>
          <a href="javascript:;">关于我们</a><br />
          <a href="javascript:;">加入我们</a><br />
        </div>
       <div class="footer-col">
          <div class="col-title">合作</div>
          <a href="javascript:;">我要投稿</a><br />
          <a href="javascript:;">友情链接</a>
        </div>
        <div class="footer-col">
          <div class="col-title">管理</div>
          <a href="javascript:;">教师后台</a><br />
          <a href="javascript:;">隐私条款</a>
        </div>
      </div>
    </div>
    <div class="copyright">
      <span>Copyright @2021-2022 品优课程超市</span>
      <span> | </span>
      <span>闽ICP备xxxxxx号</span>
    </div>
  </div>
</template>



<script>
export default {
  name:"NavFooter"
};
</script>

<style scoped lang="scss">
.footer {
  .containerr {
    width: 100%;
    background-color: rgb(25, 30, 41);
    height: 200px;
    .row {
      width: 1170px;
      margin: auto;
      height: 150px;
      display: flex;
      justify-content: space-around;
      &>div:nth-child(1) {
       margin-right: 80px;
        .logo {
          width: 200px;
          height: 100px;
          img {
            transform: translateX(50px);
            width: 150px;
            height: 80px;
          }
          color: white;
        }
        .footer-slogan {
          text-align: center;
          margin: 0 0 12px 15px;
          color: rgb(50, 235, 96);
          font-size: 22px;
          font-weight: 500;
        }
        .chat {
          .cicon {
            display: inline-block;
            margin-left: 60px;
           
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: rgb(99, 100, 105);
            text-align: center;
            padding-top: 5px;
            position: relative;
            .footer-weixin {
              position: absolute;
              left: -110px;
              top: -10px;
              img {
                width: 100px;
              }
              display: none;
            }
            .iconfont {
              font-size: 25px;
            }
            &:hover {
              cursor: pointer;
              .footer-weixin {
                display: block;
              }
            }
          }
        }
      }
      &>div:nth-child(n+2) {
        margin-top: 40px;
        flex: 1;
        .col-title{
            margin-bottom: 15px;
        }
        a{
            margin-bottom: 5px;
            cursor: pointer;
        }
        a:hover{
            color: white;
        }
       .col-title, a {
          font-size: 14px;
          color: hsla(0, 0%, 100%, 0.5);
        }
      }
    }
  }
  .copyright {
    height: 50px;
    line-height: 50px;
    background: #171918;
    text-align: center;
    color: #777;
    font-size: 12px;
    font-family: -apple-system, "Microsoft Yahei", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
  }
}
</style>