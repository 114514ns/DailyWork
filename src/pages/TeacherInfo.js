import { Margin } from '@mui/icons-material'
import { Avatar, Typography } from '@mui/material'
import React, { Component } from 'react'
import '@fontsource/roboto/500.css';
import axios from 'axios';
export default class TeacherInfo extends Component {
  state = {
    schoolName: ""
  }
  componentWillMount() {
    /*
    axios({
      method: 'post',
      url : `https://lulu.lulufind.com/mrzypc/user/getUserInfo?openId=${this.props.openId}`
    }).then(res => {
      this.setState({schoolName:res.data.data.schoolName})
    })
    */
  }
  render() {
    return (
      <div>
        <Avatar src={this.props.info.userAvatar} sx={{
          width: '30%',
          height: '30%',
          margin: 'auto',
          marginTop: '30px'
        }}></Avatar>
        <Typography variant='h4'>{`真实姓名： ${this.props.info.userRealName}`}</Typography>
        <Typography variant='h4'>{`微信名字： ${this.props.info.userName}`}</Typography>
        <Typography variant='h4'>{`手机号 ${this.props.info.userPhone}`}</Typography>
        <Typography variant='h4'>{`上次登录： ${this.props.info.userLoginTime.replace(".0", "")}`}</Typography>
        <Typography variant='h4'>{`注册时间 ${this.props.info.userRegTime.replace(".0", "")}`}</Typography>
      </div>
    )
  }
}
