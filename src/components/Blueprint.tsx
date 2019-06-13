import * as React from "react";
import { DefaultNodeModel, DiagramModel, DiagramEngine, DiagramWidget, BaseEvent, BaseModel } from "storm-react-diagrams";
import Toolbar, { ToolbarAction } from "./Toolbar";


/**
 * Default blueprint node model
 *
 * @class BlueprintNodeModel
 * @extends {DefaultNodeModel}
 */
export class BlueprintNodeModel extends DefaultNodeModel {

  properties = {}

  constructor(name: string, color:string, inputs: string[], outputs: string[], properties: any) {
    super(name, color);

    for(let i = 0; i < inputs.length; i++) {
      this.addInPort(inputs[i]);
    }
    for(let i = 0; i < outputs.length; i++) {
      this.addOutPort(outputs[i]);
    }

    Object.assign(this.properties, properties);
  }

  getProperties(): any {
    return this.properties;
  }

  setProperties(properties: any): void {
    this.properties = properties;
  }
}

export type BlueprintToolbarAction = ToolbarAction;
export type BlueprintProp = {
    actions?: BlueprintToolbarAction[];
    onClick?(event: any): void;
}

type BlueprintState = {
  model: DiagramModel,
  engine: DiagramEngine,
}

/**
 * Blueprint render component
 *
 * @export
 * @class Blueprint
 * @extends {React.Component}
 */
export default class Blueprint<
    P extends BlueprintProp = BlueprintProp,
    S extends BlueprintState = BlueprintState
  > extends React.Component<P, S> {
  state: S = {
    model: new DiagramModel(),
    engine: new DiagramEngine(),
  } as S;

  constructor(props:P) {
    super(props);
    this.state.engine.installDefaultFactories();
    this.state.engine.setDiagramModel(this.state.model);
  }

  getSelected() {
    return this.state.model.getSelectedItems()
  }

  getFirstSelected() {
    const sel = this.getSelected();
    return sel.length > 0 ? sel[0] : null;
  }

  updateEventListeners() {
    const nodes = this.state.model.getNodes();
    const keys = Object.keys(nodes);
    for(let i = 0; i < keys.length; i++) {
      const node = nodes[keys[i]];
      node.addListener({
        selectionChanged: (event: any) => {
          if(this.props.onClick) {
            this.props.onClick(event)
          }
        },
      });
    }
  }

  updateNode(updated:any) {
    const nodes = this.state.model.getNodes();
    const keys = Object.keys(nodes);
    for(let i = 0; i < keys.length; i++) {
      if(keys[i] === updated.id) {
        // const node = nodes[keys[i]];
        //(node as BlueprintNodeModel).setProperties(updated);
      }
    }
  }

  render() {
    return (
      <div className="blueprint-view">
        <Toolbar actions={this.props.actions} />
        <DiagramWidget
          className="srd-demo-canvas blueprint-diagram"
          diagramEngine={this.state.engine}
        />
      </div>
    );
  }
}