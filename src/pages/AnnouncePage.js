import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
export default class AnnouncePage extends Component {
    render() {
        return (
            <div style={{
            }}><Paper elevation={3} sx={{
            }}>
                可以直接看别人作业，每日交作业的api其实也可以看答题卡的答案，还没做出来。<br></br>


                不建议使用手机打开，排版会炸<br></br>


                这个网站是纯前端实现，只请求每日交作业的api，不会窃取隐私<br></br>

                不放心可以按f12，我保留了mapping，可以直接看到源码 <br></br>

                github：https://github.com/114514ns/DailyWork（我之前用了三年的号，前几天被封了，新开了个，）

            </Paper></div>
        )
    }
}
