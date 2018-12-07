import React, { Component } from "react";
import CMS from 'netlify-cms'

const SingleControl = props => {
  const MarkdownControl = CMS.getWidget("markdown").control;
  return (
    <div>
      <MarkdownControl {...props} />
    </div>
  );
};

const SinglePreview = props => {
  const MarkdownPreview = CMS.getWidget("markdown").preview;
  return <div><hr /><MarkdownPreview {...props} /></div>;
};

const defaultSeparator = "---";

export class ScienceControl extends Component {
  getValue() {
    return this.props.value ? this.props.value : "";
  }

  handleSingleChange(value, i) {
    const newValues = this.getValue().split(
      this.props.field.get("separator", defaultSeparator)
    );
    newValues[i] = value;
    this.props.onChange(
      newValues.join(this.props.field.get("separator", defaultSeparator))
    );
  }

  render() {
    const science = this.getValue().split(
      this.props.field.get("separator", defaultSeparator)
    );
    const singleControls = science.map((singleContent, i) => (
      <SingleControl
        {...this.props}
        key={i}
        value={singleContent}
        onChange={value => this.handleSingleChange(value, i)}
      />
    ));
    return <div>{singleControls}</div>;
  }
}

export const SciencePreview = props => (
  <div>
    {props.value
      .split(props.field.get("separator", defaultSeparator))
      .map((val, i) => <SinglePreview {...props} key={i} value={val} />)}
  </div>
);
