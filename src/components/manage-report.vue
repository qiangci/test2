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
                  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
                    
                    <el-menu :default-active="activeTab" class="el-menu-demo" mode="horizontal" @select="changeTab">
                      <el-submenu index="1">
                        <template slot="title">发布</template>
                        <el-menu-item index="1-1">招新</el-menu-item>
                        <el-menu-item index="1-2">部门动态</el-menu-item>
                      </el-submenu>
                      <el-menu-item index="2">已发布</el-menu-item>
                      <el-menu-item index="3">待处理</el-menu-item>
                      <el-menu-item index="4">已处理</el-menu-item>
                    </el-menu>
                    <div v-if="activeTab == '1-1'">
                      <div class="box-list">
                        <form @submit.prevent="addRecruitment" enctype="multipart/form-data" ref="reportForm">
                          <div class="input-row">
                            <label>标题：</label>
                            <el-input  placeholder="请输入标题"  v-model="reportInfo.title" clearable></el-input>
                          </div>
                          <div class="input-row">
                            <label>招新简介：</label>
                            <el-input type="textarea" placeholder="请输入招新简介(不超过200字)" maxlength="200" :rows='5' v-model="reportInfo.brief"></el-input>
                          </div>
                          <div class="input-row">
                            <label>招新图片：</label>
                            <el-upload  class="recruit-imgs" action="https://jsonplaceholder.typicode.com/posts/"
                              :headers="myHeader" :before-remove="beforeRemove" :on-exceed="handleExceed" multiple :limit="6" :file-list="recruitImgs" list-type="picture">
                              <el-button size="small" type="primary" plain>选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
                              <div slot="tip" class="el-upload__tip">图片用于展示部门风采，您最多可以上传六张图片。。。</div>
                            </el-upload>
                          </div>
                          <div class="input-row">
                            <label>附件：</label>
                            <el-upload  class="recruit-imgs" action="https://jsonplaceholder.typicode.com/posts/"
                              :headers="myHeader" :before-remove="beforeRemove" :on-exceed="handleExceed" multiple :limit="3" :file-list="recruitFiles">
                              <el-button size="small" type="primary" plain>选择文件<i class="el-icon-upload el-icon--right"></i></el-button>
                              <div slot="tip" class="el-upload__tip">您可上传报名表或者相关招新文件。。。</div>
                            </el-upload>
                          </div>
                          <div class="input-row submit-btn">
                            <input type="submit" value="发布" style="margin-left: 74px;">
                          </div>
                        </form>
                      </div>
                  </div>

                  <div v-if="activeTab == '1-2'">
                      <div class="box-list">
                        <form @submit.prevent="addRecruitment" enctype="multipart/form-data" ref="reportForm">
                          <div class="input-row">
                            <label>标题：</label>
                            <el-input  placeholder="请输入标题"  v-model="reportInfo.title" clearable></el-input>
                          </div>
                          <div class="input-row">
                            <label>简介：</label>
                            <el-input type="textarea" placeholder="请输入简介(不超过200字)" maxlength="200" :rows='5' v-model="reportInfo.brief"></el-input>
                          </div>
                          <div class="input-row">
                            <label>图片：</label>
                            <el-upload  class="recruit-imgs" action="https://jsonplaceholder.typicode.com/posts/"
                              :headers="myHeader" :before-remove="beforeRemove" :on-exceed="handleExceed" multiple :limit="6" :file-list="recruitImgs" list-type="picture">
                              <el-button size="small" type="primary" plain>选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
                              <div slot="tip" class="el-upload__tip">图片用于展示部门风采，您最多可以上传六张图片。。。</div>
                            </el-upload>
                          </div>
                          <div class="input-row submit-btn">
                            <input type="submit" value="发布" style="margin-left: 74px;">
                          </div>
                        </form>
                      </div>
                  </div>

                  <div v-if="activeTab == '2'" >
                      <div v-show="!recruitListShow" class="rem-info">暂无数据</div>
                      <ul class="box-list recruit-list" v-show="recruitListShow">
                        <router-link to="/recruit-detail">
                            <li v-for="item in recruitList" :key="item.state">
                              <div class="recruit-title">
                                <el-badge :value="item.state" class="item">
                                  <h3>{{item.title}}</h3>
                                </el-badge>
                              </div>  
                              <span>{{item.releaseTime}}</span>
                              <p>{{item.brief}}</p>
                            </li>
                        </router-link>
                          
                      </ul>
                  </div>

                  <div v-if="activeTab == '3'">
                      <div v-show="!reportShow" class="rem-info">暂无数据</div>
                      <div class="box-list" v-show="reportShow">
                        <el-row class="table-title">
                          <el-col :span="3">日期</el-col>
                          <el-col :span="2">姓名</el-col>
                          <el-col :span="5">班级</el-col>
                          <el-col :span="8">报名表</el-col>
                          <el-col :span="6">操作</el-col>
                        </el-row>
                        <div v-for="item in reportList"  :key="item.name">
                            <el-row>
                              <el-col :span="3">{{item.updateTime}}</el-col>
                              <el-col :span="2">{{item.name}}</el-col>
                              <el-col :span="5">{{item.class}}</el-col>
                              <el-col :span="8">{{item.title}}</el-col>
                              <el-col :span="6">
                                <el-button type="primary" size="small" plain><a :href="item.path">下载报名表</a></el-button>
                                <el-button type="warning" size="small" plain @click="ignore(item.reportId)">忽略</el-button>
                                <el-button type="success" size="small" plain @click="sendNote(item.nameId,item.reportId)">邀请面试</el-button>
                              </el-col>
                            </el-row>
                        </div>
                      </div>

                    </div>

                    <div v-if="activeTab == '4'">
                      <div v-show="!reportShow" class="rem-info">暂无数据</div>
                      <div class="box-list" v-show="reportShow">
                        <el-row class="table-title">
                          <el-col :span="3">日期</el-col>
                          <el-col :span="2">姓名</el-col>
                          <el-col :span="6">班级</el-col>
                          <el-col :span="8">报名表</el-col>
                          <el-col :span="5">状态</el-col>
                        </el-row>
                        <div v-for="item in reportList" :key="item.name">
                            <el-row>
                              <el-col :span="3">{{item.updateTime}}</el-col>
                              <el-col :span="2">{{item.name}}</el-col>
                              <el-col :span="6">{{item.class}}</el-col>
                              <el-col :span="8">{{item.title}}</el-col>
                              <el-col :span="5" class="report-state">
                                <el-tag type="warning">{{item.state}}</el-tag>
                              </el-col>
                              
                            </el-row>
                        </div>
                      </div>
                    </div> 
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
  name: "manage-report",
  data() {
    return {
      sname: "", //姓名
      headImg: "", //头像地址
      department:"",//部门
      myHeader: { "Content-Type": "multipart/form-data" },
      activeTab: "3",
      reportType: "d", //d待处理的 y已处理的
      reportInfo: {
        title: "",
        brief: ""
      }, //发布的报名信息
      recruitImgs: [], //招新图片
      recruitFiles: [], //招新附件
      recruitList: [], //已发布的招新信息
      // releasedImgs: [],
      recruitListShow: false,
      reportList: [], //待处理的和已处理的报名表列表
      reportShow: true
    };
  },
  mounted() {
    this.sname = Config.config.sname;
    this.headImg = Config.config.headImg;
    this.department = Config.config.department;
    this.getReportList();
  },
  methods: {
    /**
     * 移除图片或者附件进行提示
     */
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    /**
     * 附件个数超出限制时进行提示
     */
    handleExceed(files, fileList) {
      // this.$message.warning(
      //   `当前限制选择 ${ max } 个文件，本次选择了 ${ files.length } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
    },

    /**
     *  切换导航栏
     */
    changeTab(key) {
      this.activeTab = key;
      if (this.activeTab == 2) {
        this.getRecruitment();
      } else if (this.activeTab == 3) {
        this.reportType = "d";
        this.getReportList();
      } else if (this.activeTab == 4) {
        this.reportType = "y";
        this.getReportList();
      }
    },

    /**
     * 发布招新信息
     */
    addRecruitment() {
      Config.addRecruitment(
        this.reportInfo,
        data => {
          console.log(data);
          if (data.status == "1") {
            this.$message({
              message: "发布成功！",
              type: "success"
            });
          } else {
            this.$message.error("操作失败，请稍后重试！");
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
        }
      );
    },

    /**
     * 获取已发布的招新信息
     */
    getRecruitment() {
      Config.getRecruitment(
        {},
        data => {
          if (data.status == "1") {
            this.recruitList = data.data;
            this.recruitListShow = true;
          } else {
            this.recruitListShow = false;
          }
        },
        err => {
          console.log(err);
          this.$message.error("操作失败，请稍后重试！");
        }
      );
    },

    /**
     * 获取报名表列表(待处理的和已审核的)
     */
    getReportList() {
      let params = {
        reportType: this.reportType
      };
      Config.getReportList(
        params,
        data => {
          if (data.status == "1") {
            this.reportList = data.data || [];
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
          this.reportShow = false;
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
              this.$router.push("login");
            }, 800);
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
          this.reportShow = false;
        }
      );
    },

    /**
     * 忽略报名表
     * @param reportId 报名表id
     */
    ignore(reportId) {
      console.log(reportId);
      let params = {
        reportId: reportId
      };
      Config.getReportList(
        params,
        data => {
          if (data.status == "1") {
            this.getReportList();
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
        }
      );
    },

    /**
     * 发送面试邀请
     * @param nameId 申请人id
     */
    sendNote(nameId, reportId) {
      let params = {
        reportId: reportId,
        nameId: nameId
      };
      Config.getReportList(
        params,
        data => {
          if (data.status == "1") {
            this.$message({
              message: "面试邀请已成功发送！",
              type: "success"
            });
            this.getReportList();
          }
        },
        err => {
          this.$message.error("操作失败，请稍后重试！");
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
.float-left {
  float: left;
}

.content-head {
  width: 100%;
  height: 70px;
  color: #fff;
  /* background-color: #136fec; */
  background: linear-gradient(to right, #008df9, #31cbf8);
}
.head-title {
  float: left;
  font-size: 26px;
  font-weight: 600;
  padding: 13px 0 14px 30px;
}

.content-container {
  padding-top: 20px;
  width: 100%;
}
.content-container-top {
  width: 100%;
  height: 55px;
  margin-bottom: 22px;
  background-color: #fff;
  box-shadow: 0px 3px 3px 0px #f0f0f0;
}

.el-menu--horizontal {
  margin-bottom: 10px;
}
.box-list {
  padding: 20px;
}

.box-list .input-row {
  padding-bottom: 20px;
}
.box-list label {
  display: inline-block;
  width: 70px;
  text-align: justify;
}

.el-input {
  height: 35px;
  width: 350px;
}

.el-textarea {
  line-height: 30px;
  width: 800px;
  vertical-align: text-top;
}
.recruit-imgs {
  display: inline-block;
  vertical-align: text-top;
  width: 830px;
}
.el-upload__tip {
  display: inline-block;
  margin-left: 10px;
}

.el-badge__content.is-fixed {
  top: 6px;
  right: 0;
}
.el-badge__content {
  height: 20px;
  line-height: 20px;
}

.submit-btn input {
  width: 140px;
  height: 40px;
  padding: 0;
  margin-top: 15px;
  border: none;
  background: #008df9;
  border-radius: 3px;
  color: #fff;
  outline: none;
  cursor: pointer;
}

.rem-info {
  text-align: center;
  padding: 100px;
  color: #333;
}

.box-list .el-row {
  line-height: 55px;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
}
.box-list .el-row:hover {
  background: #e9f6fa;
}

.box-list .el-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-list .table-title .el-col {
  font-weight: 600;
  color: #888;
}

.box-list li {
  font-size: 14px;
  line-height: 40px;
  color: #263238;
}

.recruit-list li {
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 10px 1px #f7f7f7;
  cursor: pointer;
}
.recruit-title {
  width: 90%;
  display: inline-block;
  vertical-align: middle;
}
.recruit-list h3 {
  color: #333;
  font-size: 18px;
  font-weight: 600;
}
.recruit-list span {
  color: #999;
}
.recruit-list p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.8;
  text-indent: 30px;
  width: 98%;
  margin-top: 10px;
}
.report-state {
  color: #ebca2a;
}

.el-button--small {
  padding: 8px 10px;
}
.el-button--small span,
.el-button--small a {
  font-size: 12px !important;
}
</style>

