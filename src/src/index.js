import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { StylesProvider, createGenerateClassName } from '@mui/styles';

import { Theme, Utils } from '@iobroker/adapter-react-v5';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import pkg from '../package.json';

window.adapterName = 'web';
window.sentryDSN = 'https://5ad729dbed504d15aa8bde423cae9a8e@sentry.iobroker.net/57';
let themeName = Utils.getThemeName();

console.log(`iobroker.${window.adapterName}@${pkg.version} using theme "${themeName}"`);

const generateClassName = createGenerateClassName({
    productionPrefix: 'web',
});

function build() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    return root.render(
        <StylesProvider generateClassName={generateClassName}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={Theme(themeName)}>
                    <App
                        onThemeChange={_theme => {
                            themeName = _theme;
                            build();
                        }}
                    />
                </ThemeProvider>
            </StyledEngineProvider>
        </StylesProvider>,
    );
}

build();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
