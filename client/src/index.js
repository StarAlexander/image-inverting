import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import init from './pkg/sap.js'
import wasm from './pkg/sap_bg.wasm'


await init(wasm)
const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)