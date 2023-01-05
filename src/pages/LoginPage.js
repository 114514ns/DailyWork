import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import QRCode from "qrcode.react";
import Button from '@mui/material/Button';
import { Link, Paper } from "@mui/material";
import IndexPage from "./IndexPage";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function LoginPage(props) {
    const [qrLink, setqrLink] = useState(0)
    const [response, setresponse] = useState("")
    //const [code,setcode] = useState("")
    const code = useRef("")
    const [token, setToken] = useState(0)
    const [isLogin, setLogin] = useState(0)
    const [qrCode, setQrcode] = useState("")
    const [succeed, setsucceed] = useState("null");
    useEffect(() => {
        if(null == JSON.parse(localStorage.getItem("token"))) {
            localStorage.setItem("token",JSON.stringify(
                {
                    token : null,
                    time : 0
                }
            ))
        }
        const now = new Date().getTime()
        const lastUse = JSON.parse(localStorage.getItem("token")).time
        if (now - lastUse > 3600000*24*5) {
            setLogin(false)
        }
        if(!window.localStorage.getItem("isLogin")) {
            setLogin(false)
        }
        localStorage.getItem("isLogin") ? setLogin(true) : setLogin(false)
        axios.post("https://api-prod.lulufind.com/api/v1/auth/genQrCode")
            .then(response => {
                setqrLink("https://zuoye.lulufind.com/mp/qrcode/" + response.data.data.code)
                code.current = response.data.data.code
            })
        const interval = setInterval(() => {
            axios.post("https://api-prod.lulufind.com/api/v1/auth/checkQrCode", {
                code: code.current
            }).then(response => {
                if (response.data.data.token) {
                    setresponse(response.data.data)
                    setLogin(true)
                    console.log("token: " + response.data.data.token)
                    setToken(response.data.data.token)
                    var obj = {
                        token: response.data.data.token,
                        time: new Date().getTime()
                    }
                    localStorage.setItem("token",JSON.stringify(obj))
                    localStorage.setItem("isLogin", "true")
                    window.profile = response.data.data
                    localStorage.setItem("response", JSON.stringify(response.data.data))
                    clearInterval(interval);
                }
            })
        }, 5000);
    }, [])
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/index");
        }
    }, [isLogin]);
    return (
        <div style={{
            "height": "100vh",
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "flexWrap": "wrap",
        }}>
            <Paper elevation={3}>
                <QRCode
                    id="qrCode"
                    value={qrLink}
                    imageSettings={{
                        // 中间有图片logo
                        src: `https://img1.ali213.net/glpic/2022/03/17/584_2022031725917665.webp`,
                        //height: 70,
                        //width: 70,
                        excavate: true,
                    }}

                    size={300} // 二维码的大小
                    fgColor="#000000" // 二维码的颜色
                    style={{
                        marginTop: 20,
                    }}

                />
                <Button variant="contained" style={{
                    display: "block",
                }}>点击刷新</Button>
            </Paper>
        </div>

    );
}

export default LoginPage;