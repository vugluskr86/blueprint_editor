import React from 'react';
import './App.scss';

import FlexLayout from "flexlayout-react";
import Locations from "./components/Locations";
import Property from "./components/Property";
import Files from "./components/Files";
import NodeEditor from "./components/NodeEditor";

export default class App extends React.Component {
  state: {
    model: any
  } = {
    model: null
  };

  propRef:React.RefObject<Property> = React.createRef();
  locRef:React.RefObject<Locations> = React.createRef();

  constructor(props = {}) {
    super(props);

    const layout = {
      global: { tabEnableClose: false },
      borders: [{
        type:"border",
        location: "bottom",
        children:[{
          type: "tab",
          name: "Files",
          component: "Files"
        }]
      },{
        type:"border",
        location: "right",
        children:[{
          type: "tab",
          name: "Property",
          component: "Property"
        }]
      }],
      layout: {
        type: "tabset",
        weight: 100,
        children: [
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Locations",
                component: "Locations"
              },
              {
                type: "tab",
                name: "Text",
                component: "text"
              },
              {
                type: "tab",
                name: "NodeEditor",
                component: "NodeEditor"
              },
            ]
          }
        ]
      }
    };

    this.state = {
      model: FlexLayout.Model.fromJson(layout)
    };
  }

  componentDidMount() {}

  factory(node:any) {
    var component = node.getComponent();
    if (component === "text") {
      return <div className="panel">Panel {node.getName()}</div>;
    }
    if (component === "Property") {
      return <Property ref={this.propRef} onChange={(values:any)=>{
        console.log('change', values);
        if(this.locRef.current) {
          this.locRef.current.updateNode(values);
        }
      }} />;
    }
    if (component === "Locations") {
      return <Locations ref={this.locRef} onClick={(ev:any)=>{
        if(this.propRef.current) {
          this.propRef.current.setValues({
            id: ev.entity.id,
            name: ev.entity.name,
            color: ev.entity.color,
          });
        }
      }} />;
    }
    if (component === "Files") {
      return <Files />;
    }
    if (component === "NodeEditor") {
      return <NodeEditor />;
    }
  }

  render() {
    return (
      <div className="App">
        <FlexLayout.Layout
          model={this.state.model}
          factory={this.factory.bind(this)}
        />
      </div>
    );
  }
}

