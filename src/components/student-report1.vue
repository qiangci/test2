<template>
    <div>
        <el-container>
          <el-header style="height: 70px;">
            四川农业大学信息工程学院报名系统
            <span @click="loginOut" class="login-out">
              退出登录&nbsp;&nbsp;&nbsp;<img src="/static/imgs/zhux_icon.png"/>
            </span>
            
          </el-header>
          <el-container style="margin-top:25px">
            <el-row>
              <el-col :span="5" class="main-left">
                <div class="head-img">
                  <img :src="headImg"/>
                </div>
                <p class="login-name">{{ sname }}</p>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                  <el-menu-item index="1">
                    <i class="el-icon-edit"></i>
                    <span slot="title">
                      <router-link to="/modify-data">修改资料</router-link>
                    </span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">
                      <router-link to="/manage-report" v-if="department">我的报名(管理员)</router-link>
                      <router-link to="/student-report"  v-if="!department">我的报名(学生)</router-link>
                    </span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="19" class="main-right">
                <div class="right-content">
                  <el-row>
                    <el-col :span="12">
                      <div  class="content-box">
                        <h5>面试邀请</h5>
                        <div v-for="item in inviteList" class="note-box" :key="item.department">
                          <p>{{item.inviteNote}}</p>
                          <div class="sendfrom">from:{{item.department}}&nbsp;&nbsp;&nbsp;{{item.sendTime}}</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="content-box">
                        <h5>已报名</h5>
                        <div v-for="item in signUpList" class="note-box" :key="item.department">
                          <el-badge :value="item.state" class="item">
                            <h3>{{item.title}}</h3>
                          </el-badge>
                          <div class="sendfrom">to:{{item.department}}&nbsp;&nbsp;&nbsp;{{item.sendTime}}</div>
                        </div>
                      </div>
                    </el-col>

                  </el-row>  
                </div>
              </el-col>
            </el-row>
            <el-footer></el-footer>
          </el-container>
        </el-container>
    </div>

</template>

<script>
/* 引入接口文件 */
import Config from "@/common/config";

export default {
  name: "student-report",
  data() {
    return {
      sname: "", //用户名
      headImg: "", //头像地址
      department: "", //部门
      inviteList: [], //面试邀请列表
      signUpList: [] // 已报名列表
    };
  },
  mounted() {
    this.sname = Config.config.sname;
    this.headImg = Config.config.headImg;
    this.department = Config.config.department;
    this.getInviteList();
    this.getsignUpList();
  },
  methods: {
    /**
     * 获取面试邀请列表
     */
    getInviteList() {
      Config.inviteList(
        {},
        data => {
          if (data.status == "1") {
            this.inviteList = data.data;
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
        }
      );
    },
    /**
     * 获取已报名列表
     */
    getsignUpList() {
      Config.signUpList(
        {},
        data => {
          if (data.status == "1") {
            this.signUpList = data.data;
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
        }
      );
    },
    /**
     * 退出登录
     */
    loginOut() {
      Config.loginOut(
        {},
        data => {
          if (data.status == "1") {
            this.$message({
              message: "注销成功，即将退出系统！",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/");
              // this.$router.replace({path: '/login'})
            }, 1000);
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
          this.reportShow = false;
        }
      );
    }
  }
};
</script>

<style>
body {
  background: #f4f8f9;
}

.head-img {
  text-align: center;
  margin: 40px auto 40px;
  width: 180px;
  height: 180px;
  padding: 10px;
  border: 1px solid #dfdcdc;
}
.head-img img {
  width: 150px;
  height: 150px;
}

.login-name {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.content-box {
  width: 94%;
  margin: 20px auto;
  border-radius: 20px;
  min-height: 600px;
  box-shadow: 0 0 10px 4px #fafafa;
}

.content-box h5 {
  padding: 15px 15px;
  color: #e9a935;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #e6e6e6;
}

.note-box {
  width: 92%;
  padding: 15px;
  margin: 30px auto;
  border-radius: 10px;
  border: 1px solid #a9ef20;
}
.note-box p {
  text-indent: 30px;
  color: #333;
}

.sendfrom {
  margin: 5px 0;
  text-align: right;
  color: #666;
}

.el-badge__content.is-fixed {
  right: -3px;
}
.el-badge__content{
  height: 20px;
}
</style>
