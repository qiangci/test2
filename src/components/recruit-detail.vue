<template>
    <div>
        <el-container>
          <el-header style="height: 70px;">
            四川农业大学信息工程学院报名系统
            <router-link to="/manage-report">我的报名</router-link>
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
                <div class="right-content-detail">
                  <el-row>
                    <el-col :span="10" class="imgs-box">
                      <el-carousel :interval="4000" indicator-position="outside" height="480px">
                        <el-carousel-item v-for="item in detailImgs" :key="item.name">
                          <div class="detail-imgs">
                            <img :src="item.img" />
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </el-col>
                    <el-col :span="14" style="position:relative">
                      <div class="detail-title">
                        <el-badge :value="detailText.state" class="item">
                            <h3>{{detailText.title}}</h3>
                          </el-badge>
                      </div>
                      <div class="detail-time">
                        <span>{{detailText.department}}</span>
                        <span>{{detailText.time}}</span>
                      </div>
                      <div class="detail-content">
                        {{detailText.content}}
                      </div>
                      <div class="detail-files" v-if="showEnclosure">
                        <label>附件：</label> 
                        <div v-for="item in detailText.enclosure" style="padding-left:40px">
                          <a href="item.enclosureAdress">{{item.enclosureName}}</a>
                        </div>
                      </div>

                      <el-button type="primary" plain @click="dialogFormVisible = true" class="report-btn" v-if="!department">点击报名</el-button>
                      <el-dialog :visible.sync="dialogFormVisible">
                        <el-form>
                          <el-form-item label="请上传报名表" label-width="120px">
                            <el-upload  class="recruit-imgs" action="https://jsonplaceholder.typicode.com/posts/"
                              :headers="myHeader" :before-remove="beforeRemove">
                              <el-button size="small" type="primary" plain>选择文件<i class="el-icon-upload el-icon--right"></i></el-button>
                              <!-- <div slot="tip" class="el-upload__tip">请上传报名表</div> -->
                            </el-upload>
                          </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
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
  name: "recruit-detail",
  data() {
    return {
      sname: "", //用户名
      headImg: "", //头像地址
      department: "", //部门
      detailImgs: [], // 详情图片列表
      detailText: {},
      dialogFormVisible: false,
      myHeader: { "Content-Type": "multipart/form-data" },
      showEnclosure: false // 是否显示附件
    };
  },
  mounted() {
    this.sname = Config.config.sname;
    this.headImg = Config.config.headImg;
    this.department = Config.config.department;
    this.getdetailImgs();
    this.getdetailText();
  },
  methods: {
    /**
     * 移除附件进行提示
     */
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    /**
     * 获取图片列表
     */
    getdetailImgs() {
      Config.detailImgList(
        {},
        data => {
          if (data.status == "1") {
            this.detailImgs = data.data;
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
     * 获取详情内容
     */
    getdetailText() {
      Config.detailText(
        {},
        data => {
          if (data.status == "1") {
            this.detailText = data.data;
            if (this.detailText.enclosure.length > 0) {
              this.showEnclosure = true;
            } else {
              this.showEnclosure = false;
            }
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

/* .main-left {
  min-height: 612px;
  border-radius: 4px;
  border: 1px solid #fff;
}

.main-right {
  background: #f4f8f9;
} */

.right-content-detail {
  width: 95%;
  min-height: 612px;
  border-radius: 4px;
  border: 1px solid #fff;
  margin: 0 auto;
  background-color: #fff;
}

.right-content-detail .el-row {
  height: 612px;
}

.right-content-detail .el-row .el-col {
  height: 100%;
}

.imgs-box {
  padding: 20px 10px 10px;
}

.el-carousel {
  height: 100%;
}
.el-carousel__item img {
  width: 100%;
}

.detail-imgs {
  width: 95%;
  height: 95%;
  border: 1px solid #eee;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background-color: #f1f1f1;
  border-radius: 4px;
}

.el-carousel__indicators {
  height: 85px;
}

.el-carousel__indicator {
  padding: 36px 11px;
}

.el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

.detail-title {
  text-align: center;
  padding: 40px 0 30px;
  font-size: 24px;
  font-weight: bold;
  color: #666;
}

.detail-time {
  text-align: center;
  color: #999;
}

.detail-time span {
  padding: 0 15px;
}

.detail-content {
  text-indent: 2rem;
  line-height: 2;
  margin: 30px 40px;
  font-size: 16px;
}
.detail-files {
  position: relative;
  padding-left: 40px;
}
.detail-files div {
  padding-bottom: 10px;
  color: #409eff;
}

.detail-files label {
  position: absolute;
  left: 40px;
  color: #666;
}

.report-btn {
  position: absolute;
  right: 60px;
  bottom: 120px;
}

.el-badge__content.is-fixed {
  right: -3px;
}
.el-badge__content{
  height: 20px;
}
</style>
