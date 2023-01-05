import axios from 'axios';
import React, { Component } from 'react';
import WorkCard from "../compoments/WorkCard";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Navigate } from 'react-router-dom';
class WorkList extends Component {
    state = {
        response: [],
        shouldShow: false,
        jumpTo:0
    }
    randomWork = (max, min) => {
        var r = Math.floor(Math.random() * (max - min + 1)) + min
        return r
    }
    getType(type) {
        var value = "";
        switch (type) {
            case 1:
                value = "语文"
                break;
            case 2:
                value = "数学"
                break;
            case 3:
                value = "英语"
                break;
            case 4:
                value = "物理"
                break;
            case 5:
                value = "化学"
                break;
            case 6:
                value = "政治"
                break;
            case 7:
                value = "历史"
                break;
            case 8:
                value = "地理"
                break;
            case 9:
                value = "生物"
                break;
            default:
                value = "其他"
        }
        return value;
    }
    componentDidMount() {
        axios({
            method: 'post',
            url: 'https://lulu.lulufind.com/mrzy/mrzypc/findWorkNewVersion',
            params: {
                start: 0,
                limit: 10,
                num: 12
            }
        }).then(response => {
            this.setState({
                response: response.data,
                shouldShow: true
            })
        })
    }
    handleClick = ()=> {
        var id = this.randomWork(1000,this.state.response.data[0].workId)
        this.setState({jumpTo:id})
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                height: '100%',
                //width: '80%',
                flexWrap: 'wrap',
            }} className='deepFocus animate__bounceInLeft'>
                {this.state.shouldShow ? this.state.response.data.map((item) => {
                    return <WorkCard
                        key={item.workId}
                        workType={this.getType(item.workType)}
                        workTime={item.workTime}
                        workContent={item.workDetail}
                        workId={item.workId}>
                    </WorkCard>
                }) : <div></div>}

                <Tooltip title="这个班你绝对不认识.." arrow>
                    <Button variant="contained" sx={{
                        width: '82px',
                        height: '39px',
                        position: 'relative',
                        marginLeft: '5%'
                    }}
                    onClick = {this.handleClick}
                    >随机</Button>
                </Tooltip>
                {this.state.jumpTo===0?<></>:<Navigate to={this.state.jumpTo}/>}
            </div>
        );
    }
}

export default WorkList;