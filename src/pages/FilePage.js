import React, { Component } from 'react';
import FileTable from "../compoments/FileTable";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

class FilePage extends Component {
      handleUpload = (file) => {
        console.log("upload")
        var response = JSON.parse(localStorage.getItem("response"))
        console.log(response)
        axios({
            method: 'post',
            url : 'https://lulu.lulufind.com/mrzy/mrzypc/getQiniuToken',
            params : {
                keys : `parent_${response.user.openId}_file_${new Date().getTime()}`
            }
        }).then(response => {

        })
    }
    render() {
        return (
            <div>
                <span style={{
                    position : 'fixed',
                    right : '3vh',
                    top : '3vh'
                }}>
                    <Button variant="contained" component="label" onClick={this.handleUpload}>
                        上传
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </span>
                <FileTable style={{
                    marginTop : '15px'
                }}></FileTable>

            </div>
        );
    }
}

export default FilePage;
