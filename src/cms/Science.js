import React, { Component } from "react";
import CMS from 'netlify-cms';
import SmilesDrawer from 'smiles-drawer';

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
  var url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/assay/aid/1000/summary/JSON"
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}

function draw_smiles(smiles) {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas1');
  canvas.setAttribute('width', '100');
  canvas.setAttribute('height', '100');
  canvas.setAttribute('alt', smiles);
  document.body.appendChild(canvas);
  let options = { width: 300, height: 300, overlapResolutionIterations: 4 };
  let smilesDrawer = new SmilesDrawer.Drawer(options);
  SmilesDrawer.parse(smiles, function(tree) {
    smilesDrawer.draw(tree, 'canvas1', 'light', false);
  }, function(err) {
    console.log(err);
  });
}

function test_func(endpoint) {
  return endpoint
}

const MarkdownPreview = CMS.getWidget("markdown").preview;
export const SciencePreview = props => (
  <div id="drawscience">
    <div>
      <p>{props.value}</p>
      <hr /><MarkdownPreview {...props} />
      <h1>Science</h1>
      <ul id="science"></ul>
      <p>Input: {props.value}</p>
      <p>Output:</p>
      {draw_smiles(props.value)}
    </div>
  </div>
);
