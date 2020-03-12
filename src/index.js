import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline"
import store from "./store";
import theme from './theme'

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
