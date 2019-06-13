import * as React from "react";
import { DefaultNodeModel, DiagramModel, DiagramEngine, DiagramWidget } from "storm-react-diagrams";
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
      this.addOutPort(inputs[i]);
    }

    Object.assign(this.properties, properties);
  }

  getProperties(): any {
    return this.properties;
  }
}

export type BlueprintToolbarAction = ToolbarAction;
export type BlueprintProp = {
    actions?: BlueprintToolbarAction[];
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