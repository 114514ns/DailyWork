import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate } from 'react-router-dom';

class WorkCard extends Component {
    state = {
        shouldJump : false
    }
    onClick = () => {
        this.setState({
            shouldJump : true
        })
    }
    render() {
        const bull = (
            <Box
                component="span"
                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
            >
                •
            </Box>
        );
        const card = (
            <div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    </Typography>
                    <Typography variant="h5" component="div">
                        {this.props.workType}
                    </Typography>
                    <Typography sx={{ mb: 1.0 }} color="text.secondary">
                        {this.props.workTime}
                    </Typography>
                    <Typography variant="body2" style={{
                        overflow: 'hidden',
                    }}>
                        {this.props.workContent}
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant='outlined' onClick={this.onClick}>查看详情</Button>
                    {this.state.shouldJump ?<Navigate to={''+this.props.workId} replace={false}></Navigate>  : <div></div>}
                    {this.state.shouldJump ?this.setState({shouldJump : false}) : <div></div>}
                </CardActions>
            </div>
        );

        return (
            <div style={{
                width:'272px',
                margin:'0',
                height:'224px',
                marginRight: '10px',
                marginLeft: '10px',
            }}>

                <Box>
                    <Card variant="outlined">{card}</Card>
                </Box>
            </div>
        );
    }
}

export default WorkCard;