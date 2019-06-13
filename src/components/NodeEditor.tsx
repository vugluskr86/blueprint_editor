import Blueprint, { BlueprintProp, BlueprintNodeModel } from "./Blueprint";
import { Chance } from "chance";

export default class NodeEditor extends Blueprint {

    node: BlueprintNodeModel;

    static defaultProps = {
        actions: []
    }

    constructor(prop = {}) {
        super(prop);

        const ch = new Chance();
        
        this.node = new BlueprintNodeModel("New Node", ch.color(), [], [], {});
        this.state.model.addNode(this.node);

        if(this.props.actions) {
            this.props.actions.push({
                key: "add_in",
                text: ">",
                onClick: () => {
                    const name: string | null = prompt("name");
                    if(name) {
                        this.node.addInPort(name);
                        this.forceUpdate();
                    }
                }
            },{
                key: "add_out",
                text: "<",
                onClick: () => {
                    const name: string | null = prompt("name");
                    if(name) {
                        this.node.addOutPort(name);
                        this.forceUpdate();
                    }
                }
            })
        }
    }
}