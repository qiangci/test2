<template>
  <!-- <div> -->
    <div class="login-box">
      <div class="login-container">
        <p class="login-title">四川农业大学<br />信息工程学院报名系统</p>
        <div class="login-input">
          <input type="text" v-bind:class="{'active': userIndex==1}" class="user-input"   @focus="userFocus" @blur="userBlur" placeholder="请输入用户名" v-model="userInfo.userName"/>
          <input type="password" v-bind:class="{'active': pwdIndex==1}" class="pwd-input"  @focus="pwdFocus" @blur="pwdBlur" placeholder="请输入密码" v-model="userInfo.userPwd"/>
        </div>
        <div class="rem-pwd">
          <img  @click="changeRemPwd" class="rem-pwd-img" :src="remPwd?'/static/imgs/radio_on.png':'/static/imgs/radio_off.png'"/>
          <span>记住密码</span>
        </div>
        <button class="login-btn" @click="login">立即登录</button>
        <p class="rem-info">建议使用IE10+/chrome/firefox浏览器</p>
      </div>
    </div>
  <!-- </div> -->

</template>

<script>
/* 引入接口文件 */
import Config from "@/common/config";
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        userName: "",
        userPwd: ""
      },
      userIndex: -1,
      pwdIndex: -1,
      remPwd: false
    };
  },

  /**
   * 页面加载调用获取cookie值
   */
  mounted() {
      this.getCookie();
  },
  methods: {
    /**
     * 用户名输入框获得焦点
     */
    userFocus() {
      this.userIndex = 1;
    },
    /**
     * 用户名输入框失去焦点
     */
    userBlur() {
      this.userIndex = -1;
    },
    /**
     * 密码输入框获得焦点
     */
    pwdFocus() {
      this.pwdIndex = 1;
    },
    /**
     * 密码输入框失去焦点
     */
    pwdBlur() {
      this.pwdIndex = -1;
    },

    /**
     * 是否记住密码
     */
    changeRemPwd() {
      if (this.remPwd) {
        this.remPwd = false;
      } else {
        this.remPwd = true;
      }
    },

    /**
     * 发送登录请求
     */
    login() {
      if (!this.userInfo.userName) {
        this.$message("请输入用户名！");
      } else if (!this.userInfo.userPwd) {
        this.$message("请输入密码！");
      } else {
        Config.login(
          this.userInfo,
          data => {
            if (data.status == "1") {
              if (this.remPwd) {
                this.setCookie(this.userInfo.userName,this.userInfo.userPwd,1);
              }
              Config.config.headImg = data.data.headImg;
              Config.config.loginName = data.data.loginName;
              Config.config.sname = data.data.sname;
              Config.config.department = data.data.department;
              Config.config.class = data.data.class;
              Config.config.tel = data.data.tel;
              Config.config.email = data.data.email;
              Config.config.inviteNote = data.data.inviteNote;
              
              this.$router.push("home");
            } else {
              this.$message.error("用户名或密码错误！");
            }
          },
          err => {
            this.$message.error("请求超时，请稍后重试！");
          }
        );
      }
    },
    /**
     * 保存cookie
     * @param userName 用户名
     * @param pwd 密码
     * @param exdays 保存天数
     */
    setCookie(userName, userPwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + userName + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + userPwd + ";path=/;expires=" + exdate.toGMTString();
    },
    /**
     * 获取cookie
     *
     * */
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.userInfo.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.userInfo.userPwd = arr2[1];
          }
        }
      }
    },
    /**
     * 清除cookie
     */
    clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>


<style>

body {
  height: 100%;
  width: 100%;
  font-family: "微软雅黑";
  font-size: 14px;
  background: url(/static/imgs/login_bg.png) no-repeat center;
  background-size: 100%;
}
.login-box {
  position: fixed;
  top: calc(50% - 275px);
  left: calc(50% - 275px);
  width: 550px;
  height: 550px;
  background: url(/static/imgs/login_box_bg.png) no-repeat center;
  background-size: 100%;
}

.login-container {
  width: 350px;
  margin: 0 auto;
  padding: 40px 0;
}
.login-title {
  color: #666;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin: 30px auto 10px;
  line-height: 1.6;
}

.login-input input {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  padding-left: 50px;
  font-size: 16px;
  border-radius: 25px;
  border: solid 1px #d8ebff;
  outline: none;
}

.user-input {
  background: transparent url(/static/imgs/login_user_icon_off.png) no-repeat
    18px 12px;
}
.user-input.active {
  border-color: #49aaf1;
  background: transparent url(/static/imgs/login_user_icon_on.png) no-repeat
    18px 12px;
}
.pwd-input {
  background: transparent url(/static/imgs/login_password_icon_off.png)
    no-repeat 18px 12px;
}
.pwd-input.active {
  border-color: #49aaf1;
  background: transparent url(/static/imgs/login_password_icon_on.png) no-repeat
    18px 12px;
}

input::-webkit-input-placeholder {
  /*WebKit browsers*/
  color: #999;
  font-size: 16px;
}

input::-moz-input-placeholder {
  /*Mozilla Firefox*/
  color: #999;
  font-size: 16px;
}

input::-ms-input-placeholder {
  /*Internet Explorer*/
  color: #999;
  font-size: 16px;
}

.rem-pwd {
  margin: 25px auto;
  color: #7b7b7b;
  cursor: pointer;
}
.rem-pwd-img {
  vertical-align: middle;
}

.rem-pwd-img.active {
  background: transparent url(/static/imgs/radio_on.png) no-repeat center center;
}

.rem-pwd span {
  vertical-align: middle;
}

.login-btn {
  width: 100%;
  height: 50px;
  display: block;
  border: none;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 1px;
  color: #fff;
  background: linear-gradient(to right, #008df9, #31cbf8);
  box-shadow: 0px 2px 8px 0px rgba(39, 211, 248, 0.77);
  border-radius: 25px;
  cursor: pointer;
  outline: none;
}
.rem-info {
  color: #999;
  margin-top: 25px;
}
</style>
