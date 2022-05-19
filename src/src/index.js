import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import pkg from '../package.json';
import theme from '@iobroker/adapter-react-v5/Theme';
import Utils from '@iobroker/adapter-react-v5/Components/Utils';

window.adapterName = 'web';
window.sentryDSN = 'https://5ad729dbed504d15aa8bde423cae9a8e@sentry.iobroker.net/57';
let themeName = Utils.getThemeName();

console.log('iobroker.' + window.adapterName + '@' + pkg.version + ' using theme "' + themeName + '"');

function build() {
    return ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(themeName)}>
                <App
                    onThemeChange={_theme => {
                        themeName = _theme;
                        build();
                    }}
                />
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById('root')
    );
}

build();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
