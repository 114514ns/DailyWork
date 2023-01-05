import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { Component } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TeacherInfo from './TeacherInfo';

class WorkDetail extends Component {
    state = {
        response: {},
        ready: false,
        context: '1918',
        tabValue: 'one',
        dialogOpen: false,
        currentUserObject: {},
        images: []
    }
    handleChange = () => {
        if (this.state.tabValue === 'one') {
            this.setState({ tabValue: 'two' })
        } else {
            this.setState({ tabValue: 'one' })
        }
    }
    getId() {
        var url = window.location.href;
        var array = url.split("/")
        return array[array.length - 1];
    }
    getOpenId() {
        var openId = ""
        this.state.response.submitUser.map((ele,index) => {
            if(ele.openId.toString().startsWith('u')) {
                openId = ele.openId
            }
        })
        return openId
    }
    componentWillMount() {
        axios({
            method: 'post',
            url: 'https://lulu.lulufind.com/mrzy/mrzypc/getWorkDetail',
            params: {
                workId: this.getId()
            }
        }).then(response => {
            this.setState({ response: response.data.data })
            this.setState({ ready: true })
            response.data.data.submitUser.map((item, index) => {
                if (item.submitId) {
                    ++this.submitCount
                }
            })
        })
    }
    handleClose = () => {
        this.setState({ dialogOpen: false })
    }
    handleClick = (obj) => {
        this.setState({ dialogOpen: true })
    }
    shouldJoke = () => {
        var num = Math.floor(Math.random() * 5);
        if (num === 4) {
            return true;
        } else {
            return false;
        }
    }
    getVideoLink() {
        var num = Math.floor(Math.random() * 2);
        if (num === 0) {
            return "https://img2.lulufind.com/file/other/student/1671700536438_u20220225212d3906_109005648_.mp4";
        } else {
            return "https://img2.lulufind.com/parent_u20220225212d3906_file_166755458104718586";
        }
    }
    submitCount = 0

    render() {

        return (
            this.state.ready ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',

                }}>

                    <div style={{
                        width: '80%',
                        height: '100%',
                    }}>
                        <div style={{
                            height: '30%',
                            width: '100%',
                        }}>
                            <h1>
                                <Paper elevation={3} style={{
                                }}>
                                    {this.state.response.workDetail + ""}
                                </Paper>
                            </h1>
                        </div>
                        <Divider style={{
                            marginBottom: '2%',
                        }} />
                        <div style={{
                            height: '70%',
                            width: '100%',
                        }}>
                            <Paper elevation={3}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Tabs
                                    value={this.state.tabValue}
                                    onChange={this.handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    style={{
                                        marginLeft: '4%',
                                        marginRight: '4%',
                                    }}
                                >
                                    <Tab value="one" label={`已提交${this.submitCount}`} />
                                    <Tab value="two" label={`未提交${this.state.response.classCnt - this.submitCount}`} disabled />
                                </Tabs>
                                <div style={{

                                }}>
                                    {this.state.tabValue === 'one' ? (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}>
                                            {this.state.response.submitUser.map((item, index) => {
                                                if (item.submitId) {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <Tooltip title={item.bindName} arrow key={index}>
                                                                <Avatar
                                                                    key={item.bindOpenId}
                                                                    src={item.userAvatar}
                                                                    style={{
                                                                        width: '5%',
                                                                        height: '10%',
                                                                        marginLeft: '2%',
                                                                        marginTop: '5%',
                                                                    }}
                                                                    onClick={() => {
                                                                        this.setState({ currentUserObject: item })
                                                                        this.handleClick()
                                                                        var array = item.submitCover.split("|")
                                                                        this.setState({ images: array })
                                                                    }
                                                                    }
                                                                >
                                                                </Avatar>
                                                            </Tooltip>

                                                        </React.Fragment>
                                                    )
                                                }
                                            })}
                                        </div>
                                    ) : (<div></div>)}
                                </div>
                            </Paper>
                        </div>
                    </div >
                    <div style={{
                        width: '20%',
                        height: '100%',
                        position: 'fixed',
                        right: '0'
                    }}>
                        <TeacherInfo info={this.state.response.teacher} openId={this.getOpenId()}></TeacherInfo>
                    </div>
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        sx={{
                            animationName: "backInRight",
                            animationDirection : '1'
                        }}
                    >
                        <DialogTitle id="scroll-dialog-title">{`${this.state.currentUserObject.bindName}` + "的作业"}</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                //ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                {this.shouldJoke() ? <video controls="" autoPlay={true} name="media" width={'100%'} height={'100%'}>
                                    <source src={this.getVideoLink()} type="video/mp4"></source>
                                </video> : this.state.images ?
                                    (<div>
                                        {this.state.images.map((item, index) => {
                                            return (
                                                <img
                                                    src={item}
                                                    style={{ width: '100%' }}
                                                    alt="图片加载失败"
                                                    key={index}
                                                    onClick={() => {
                                                        window.open(item)
                                                    }}
                                                ></img>
                                            )
                                        })}
                                    </div>) : (<div></div>)}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>关闭</Button>
                        </DialogActions>
                    </Dialog>
                </div >
            ) : (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        );
    }
}

export default WorkDetail;