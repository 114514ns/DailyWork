import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserTable from "../compoments/UserTable";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class IndexPage extends Component {
    state = {
        response: {},
        ready: false,
        shouldJump : false
    }
    componentDidMount() {
        axios.get('https://api-prod.lulufind.com/mrzy/v1/user/profile')
            .then(response => {
                this.setState({
                    response: response.data.data,
                    ready: true
                })
            })
    }
    timeChange(timeStr) {
        const time = new Date(timeStr * 1000);
        return time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8);
    }

    render() {
        if(!window.localStorage.getItem("isLogin")) {
            this.setState({shouldJump:true})
        }
        return (
            this.state.shouldJump? <Navigate to="/login" /> :this.state.ready ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10vh',
                    marginRight: '10vh',

                }}>
                    <UserTable
                        realName={this.state.response.userRealName}
                        regTime={this.timeChange(this.state.response.userRegTime)}
                        brand={this.state.response.brand + " " + this.state.response.model}
                        classId={this.state.response.userNum}
                        version={this.state.response.wxVersion}
                        phone={this.state.response.userPhone}
                        school={this.state.response.school.schoolName}
                    ></UserTable>
                </div> : <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
        );
    }
}

export default IndexPage;