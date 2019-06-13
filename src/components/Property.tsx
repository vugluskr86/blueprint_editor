import * as React from "react";

import ReactJson from 'react-json-view';

export type PropertyProps = {
  onChange?(values:any):void;
}

export default class Property extends React.Component<PropertyProps, any> {
  state = {
    value: {}
  };

  constructor(props = {}) {
    super(props);
  }

  public setValues(value:any) {
    this.setState({ value });
  }

  render() {
    return <div className="props-view">
        <ReactJson 
        src={this.state.value}
        theme="ashes"
        onEdit={(e:any)=>{ 
          this.setState({ value: e.updated_src });
          if(this.props.onChange) {
            this.props.onChange(e.updated_src);
          }
         }}
        onDelete={false}
        onAdd={(e)=>{}}
      /></div>
  }
}
