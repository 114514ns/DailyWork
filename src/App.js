import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage.js";
import IndexPage from "./pages/IndexPage";
import UserMenu from "./compoments/Menu";
import WorkList from "./pages/WorkList";
import MouseParticles from 'react-mouse-particles'
import WorkDetail from './pages/WorkDetail';
import FilePage from './pages/FilePage';
function App() {
    const [count, setCount] = useState(0)
    const isLogin = localStorage.getItem("isLogin")
    return (
        <React.Fragment>
            <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
            <div className="App" style={{
                "height": "100vh",
                "display": "flex",
                "flexDirection": "row",

            }}>


                <div id={'left'} style={{
                    "width": "20%",
                    "height": "100vh",
                }}>
                    <UserMenu></UserMenu>
                </div>
                <div id={'right'} style={{
                    width: '80%',
                    marginRight: '8%'
                }}>
                    <Routes>
                        <Route path={'/'} element={<LoginPage></LoginPage>}></Route>
                        <Route path="/login" element={<LoginPage></LoginPage>} />
                        <Route path="/work" element={<WorkList></WorkList>} />
                        <Route path="/work/:id" element={<WorkDetail></WorkDetail>} />
                        <Route path="/index" element={<IndexPage></IndexPage>} />
                        <Route path="/disk" element={<FilePage></FilePage>} />
                    </Routes>
                </div>
            </div>
        </React.Fragment>

    );
}

export default App;
