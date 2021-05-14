// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TestComponent from '../components/TestComponent';
import App from './App'

require('dotenv').config()

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    // <TestComponent />,
    document.body.appendChild(document.createElement('div')),
  )
})
