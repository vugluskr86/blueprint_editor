import * as React from "react";

import ReactJson from 'react-json-view';

export default class Property extends React.Component {
  state = {
    value: {
      name: "amigo",
      color: "",
      html: "",
      code: "",
      chart: {
        showLines: true,
        axisX: {
          showLines: true
        }
      },
      array: [1, 2, 3]
    }
  };

  constructor(props = {}) {
    super(props);
  }

  render() {
    return <div className="props-view">
        <ReactJson 
        src={this.state.value}
        theme="ashes"
        onEdit={(e)=>{}}
        onDelete={(e)=>{}}
        onAdd={(e)=>{}}
      /></div>
  }
}
