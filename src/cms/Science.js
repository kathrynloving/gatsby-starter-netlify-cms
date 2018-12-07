import React, { Component } from "react";
import CMS from 'netlify-cms'

export class ScienceControl extends Component {
  getValue() {
    return this.props.value ? this.props.value : "";
  }

  render() {
    const MarkdownControl = CMS.getWidget("markdown").control;
    return (
      <div>
        <MarkdownControl {...this.props} />
      </div>
    );
  }
}

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function get_result(endpoint) {
  const ul = document.getElementById('science'); 
  var url = 'https://api.explorablelabs.com/descriptors/smiles/'+ endpoint
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}

function test_func(endpoint) {
  return endpoint
}

const MarkdownPreview = CMS.getWidget("markdown").preview;
export const SciencePreview = props => (
  <div>
    <p>{props.value}</p>
    <hr /><MarkdownPreview {...props} />
    <h1>Science</h1>
    <ul id="science"></ul>
    <p>Input: {props.value}</p>
    <p>Output:
      {get_result(props.value)}
    </p>
  </div>
);
