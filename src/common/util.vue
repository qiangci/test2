<script>
import axios from "axios";

/**
 * 发送HTTP请求
 * @param {string} url 发送请求的地址
 * @param {Object} data 发送到服务器的数据，键值对形式
 * @param {requestCallback} success 请求成功后的回调函数
 * @param {requestCallback} error 请求失败时调用此函数
 */
const ajax = async function(url, data = {}, success, error) {
  axios
    .get(url, data, {
      withCredentials: true, //前端跨域设置
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
    .then(function(res) {
      success(res.data);
    })
    .catch(function(err) {
      error(err);
    });
};

/**
 * post提交表单
 * @param {string} url 发送请求的地址
 * @param {Object} data 发送到服务器的数据，键值对形式
 * @param {requestCallback} success 请求成功后的回调函数
 * @param {requestCallback} error 请求失败时调用此函数
 */
const postFormData = async function(url, data = {}, success, error) {
  axios
    .post(url, data, {
      withCredentials: true, //前端跨域设置
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(function(res) {
      success(res.data);
    })
    .catch(function(err) {
      error(err);
    });
};

/**
 * 保存本地数据
 */
const setStorage = function(key, value) {
  window.localStorage.setItem(key, value);
};

/**
 * 获取本地数据
 */
const getStorage = function(key) {
  return window.localStorage.getItem(key);
};

/**
 * 是否加0
 */
const padDate = function(va) {
  va = va < 10 ? "0" + va : va;
  return va;
};

/**
 * 当前时间格式化
 */
const formatDate = function(val) {
  var value = new Date(val - 0);
  var year = value.getFullYear();
  var month = padDate(value.getMonth() + 1);
  var day = padDate(value.getDate());
  return `${year}-${month}-${day}`;
};

export default {
  ajax,
  setStorage,
  getStorage,
  formatDate
};
</script>