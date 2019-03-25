
<script>
import Util from "./util";
/*
 * 存放接口、服务地址,
 */
const config = {
  loginName: "", //登录名
  sname:"",//学生姓名
  class:"",//班级
  headImg: "", //头像地址
  department: "", //部门（普通用户部门为空）
  tel: "",
  email: "",
  inviteNote: "", //面试邀请内容

  url: "http://127.0.0.1:9090/cd_cmd",

  /**登录 */
  // login: "/static/json/login.json?",
  login: "login.vm?",

  /**退出登录 */
  loginOut: "/static/json/login.json?",
  // loginOut: "/loginout.vm?",

  /**发布报名信息 */
  addRecruitment: "/static/json/addRecruitment.json?",
  // addRecruitment: "/addRecruitment.vm?",

  /**已发布的招新信息 */
  recruitment: "/static/json/recruitment.json?",
  // recruitment: "/recruitment.vm?",

  /* 报名表列表(管理员) */
  reportList: "/static/json/reportList.json?",
  // reportList: "/reportList.vm?",

  /**忽略报名表 */
  ignore: "/static/json/login.json?",
  // ignore: "/ignore.vm?",

  /**发送面试邀请 */
  sendNote: "/static/json/login.json?",
  // sendNote: "/sendNote.vm?",

  /**修改个人资料 */
  modifyData: "/static/json/login.json?",
  // modifyData: "/modifyData.vm?",

  /**获取部门风采列表 */
  TranslationList: "/static/json/departmentTranslation.json?",
  // TranslationList: "/TranslationList.vm?",

  /**获取部门风采详情图片 */
  detailImgList: "/static/json/detailImages.json?",
  // detailImgList: "/detailImgList.vm?",

  /**获取部门风采详情 */
  detailText: "/static/json/detailText.json?",
  // detailText: "/detailText.vm?",

   /**获取面试邀请列表*/
  inviteList: "/static/json/inviteList.json?",
  // inviteList: "/inviteList.vm?",

  /**获取已报名列表 */
  signUpList: "/static/json/signUpList.json",
  // signUpList: "/signUpList.vm?",
};

/**
 * 登录接口
 */
const login = function(params, success, error) {
  let { userName, userPwd } = params;
  Util.ajax(
    `${config.login}loginName=${userName}&passWord=${userPwd}`,
    // `${config.login}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 退出登录接口
 */
const loginOut = function(params, success, error) {
  Util.ajax(
    `${config.loginOut}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 发布报名信息
 */

const addRecruitment = function(params, success, error) {
  let { title, brief } = params;
  Util.ajax(
    // `${config.addRecruitment}title=${title}&brief=${brief}`,
    `${config.addRecruitment}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取已发布的招新信息
 */

const getRecruitment = function(params, success, error) {
  Util.ajax(
    // `${config.addRecruitment}title=${title}&brief=${brief}`,
    `${config.recruitment}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取报名表数据(待处理和已处理的)
 */
const getReportList = function(params, success, error) {
  let { reportType } = params;
  Util.ajax(
    // `${config.reportList}reportType=${reportType}`,
    `${config.reportList}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 忽略报名表
 */
const ignore = function(params, success, error) {
  let { reportId } = params;
  Util.ajax(
    // `${config.ignore}reportId=${reportId}`,
    `${config.ignore}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 发送面试邀请
 */
const sendNote = function(params, success, error) {
  let { reportId,nameId } = params;
  Util.ajax(
    // `${config.sendNote}reportType=${reportType}&nameId=${nameId}`,
    `${config.sendNote}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 修改个人资料
 *
 */
const modifyData = function(params, success, error) {
  let { email, tel, inviteNote } = params;
  Util.ajax(
    `${config.modifyData}email=${email}&tel=${tel}&inviteNote=${inviteNote}`,
    // `${config.modifyData}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取部门风采列表 
 * type 1 招新信息    2部门风采
 */
const TranslationList = function(params, success, error) {
  let { type } = params;
  Util.ajax(
    // `${config.TranslationList}type=${type}`,
    `${config.TranslationList}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取详情图片列表
 */
const detailImgList = function(params, success, error) {
  let { reportId } = params;
  Util.ajax(
    // `${config.detailImgList}reportId=${reportId}`,
    `${config.detailImgList}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取部门风采详情内容
 */
const detailText = function(params, success, error) {
  let { reportId } = params;
  Util.ajax(
    // `${config.detailText}reportId=${reportId}`,
    `${config.detailText}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取面试邀请列表
 */
const inviteList = function(params, success, error) {
  Util.ajax(
    `${config.inviteList}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

/**
 * 获取已报名列表 
 */
const signUpList = function(params, success, error) {
  Util.ajax(
    `${config.signUpList}`,
    {},
    function(data) {
      success(data);
    },
    function(err) {
      error(err);
    }
  );
};

export default {
  config,
  login,
  loginOut,
  addRecruitment,
  getRecruitment,
  getReportList,
  ignore,
  sendNote,
  TranslationList,
  detailImgList,
  detailText,
  inviteList,
  modifyData,
  signUpList
};
</script>
