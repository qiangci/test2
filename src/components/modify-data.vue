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
                <el-menu default-active="3" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
                  <div class="edit-info"> 资料修改</div>
                  <div class="edit-box">
                    <el-form label-width="100px" :model="personInfo" label-position="left">
                      <el-form-item label="点击修改头像">
                        <el-upload  class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="headImg" :src="headImg" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-form-item>
                      <el-form-item label="学号">
                        <el-input v-model="loginName" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="姓名" v-if="sname">
                        <el-input v-model="sname" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="班级" v-if="sclass">
                        <el-input v-model="sclass" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="部门" v-if="department">
                        <el-input v-model="department" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱">
                        <el-input v-model="personInfo.email"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <el-input v-model="personInfo.tel"></el-input>
                      </el-form-item>
                      <el-form-item label="面试邀请内容" v-if="department">
                        <el-input v-model="personInfo.inviteNote" type="textarea" placeholder="面试邀请内容(不超过200字)" maxlength="200" :rows='5'></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="submit-btn">
                      <input type="submit" value="保存" @click="modifyData">
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

export default {
  name: "modify-data",
  data() {
    return {
      loginName: "", //用户名
      sname:"",//学生姓名
      headImg: "", //头像地址
      department:"",//部门
      sclass:"",//班级
      personInfo: {
        email: "",
        tel: "",
        inviteNote:""
      }
    };
  },
  mounted() {
    this.loginName = Config.config.loginName;
    this.sname = Config.config.sname;
    this.headImg = Config.config.headImg;
    this.department = Config.config.department;
    this.sclass = Config.config.class;
    this.personInfo.tel = Config.config.tel;
    this.personInfo.email = Config.config.email;
    this.personInfo.inviteNote = Config.config.inviteNote;
  },
  methods: {

    /**
     * 上传头像成功
     */
    handleAvatarSuccess(res, file) {
      this.headImg = URL.createObjectURL(file.raw);
    },
    /**
     * 上传头像前对照片做检查
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    /**
     *提交修改后的个人信息
     */
    modifyData(){
      Config.modifyData(
        this.personInfo,
        data => {
          console.log(11111)
          if (data.status == "1") {
            this.$message({
              message: "资料修改成功！",
              type: "success"
            });
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

.edit-info {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: solid 1px #e6e6e6;
  font-weight: 600;
  color: #666;
}
.edit-box {
  padding: 30px;
  width: 60%;
}
.el-form-item__label {
  color: #333;
}
.el-form-item {
  margin-bottom: 30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.submit-btn input {
  width: 140px;
  height: 40px;
  padding: 0;
  margin-top: 15px;
  margin-left: 100px;
  border: none;
  background: #008df9;
  border-radius: 3px;
  color: #fff;
  outline: none;
  cursor: pointer;
}
</style>
