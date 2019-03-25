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
                <p class="login-name" v-if="sname">{{ sname }}</p>
                <p class="login-name" v-if="department">{{ department }}</p>
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                  <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">
                      <router-link to="/home">首页</router-link>
                    </span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">
                        <router-link to="/manage-report" v-if="department">我的报名(管理员)</router-link>
                        <router-link to="/student-report"  v-if="!department">我的报名(学生)</router-link>
                      </span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <i class="el-icon-edit"></i>
                    <span slot="title">
                      <router-link to="/modify-data">资料修改</router-link>
                    </span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="19" class="main-right">
                <div class="right-content">
                <el-row :gutter="30">
                  <el-col :span="12">
                    <div  class="content-box">
                      <h5>招新消息</h5>
                      <ul class="department-list">
                        <router-link to="/recruit-detail">
                          <li v-for="item in departmentList" v-bind:key="item.id">
                            <span>{{item.title}}</span>
                            <span>{{item.time}}</span>
                          </li>
                        </router-link>
                      </ul>
                    </div>
                    
                  </el-col>
                  <el-col :span="12">
                    <div class="content-box">
                      <h5>部门风采</h5>
                        <ul class="department-list">
                          <router-link to="/recruit-detail">
                            <li v-for="item in TranslationList" v-bind:key="item.id">
                              <span>{{item.title}}</span>
                              <span>{{item.time}}</span>
                            </li>
                          </router-link>
                        </ul>
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
/* 引入公共方法 */
import Util from "@/common/util";

export default {
  name: "home",
  data() {
    return {
      sname: "", //姓名
      headImg: "", //头像地址
      department: "", //部门
      TranslationList: [], // 部门风采列表
      departmentList: []
    };
  },
  mounted() {
    this.sname = Config.config.sname;
    this.headImg = Config.config.headImg;
    this.department = Config.config.department;
    this.getTranslationList();
    this.getdepartmentList();
  },
  methods: {
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
    },

    /**
     * 获取部门风采列表
     */
    getTranslationList() {
      Config.TranslationList(
        { type: 2},
        data => {
          if (data.status == "1") {
            this.TranslationList = data.data;
          } else {
            this.$message.error("请求超时，请稍后重试");
          }
        },
        err => {
          console.log(err);
          this.$message.error("请求超时，请稍后重试");
        }
      );
    },

    /**
     * 获取招新消息列表
     */
    getdepartmentList() {
      Config.TranslationList(
        {type: 1},
        data => {
          if (data.status == "1") {
            this.departmentList = data.data;
          } else {
            this.$message.error("请求超时，请稍后重试");
          }
        },
        err => {
          console.log(err);
          this.$message.error("请求超时，请稍后重试");
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

.department-title {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  padding: 10px;
}

.right-content {
  padding: 10px;
  background-color: #fff;
}

.department-list {
  height: 516px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.department-list li {
  padding: 17px;
  border-bottom: 1px solid #f1f1f1;
}

.department-list li span:last-child {
  color: #999;
  float: right;
}


</style>
