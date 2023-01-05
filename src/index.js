import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useNavigate } from "react-router-dom";
import axios from 'axios';
import md5 from 'js-md5';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.interceptors.request.use(config => {
  //console.log(JSON.parse(config.data))
  //console.log(config)
  // 在发送请求之前做些什么
  if (localStorage.getItem("isLogin")) {
    var obj = JSON.parse(localStorage.getItem("token"))
    config.headers["token"] = obj.token
    config.headers["sign"] = getSign(config.params);
  }
  return config;
}, function (error) {


  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 如果请求错误
  //一般是token过期了
  if(error.code === "ERR_BAD_REQUEST") {
    console.log("Token过期")
    console.log(location.hostname)
    localStorage.clear()
    location.replace("http://" + location.host)
  }

  return Promise.reject(error);
});

function getSign(data) {
  var salt = "SNI4HF98M3C2DJ92835GM0972GWQP93JFNDJ28NFJ2NNFBHBJHF29JF39E2"
  var varl = {};
  for (var n in data) {
    varl[n] = data[n] + "";
  }
  var d = JSON.stringify(varl);
  d = btoa(d) + salt;
  var u = md5(d)
  return u
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
