import * as React from "react";
import Blueprint, { BlueprintProp, BlueprintNodeModel } from "./Blueprint";
import { Chance } from "chance";

export default class Locations extends Blueprint {

    root: BlueprintNodeModel;

    static defaultProps = {
        actions: []
    }

    constructor(prop = {}) {
        super(prop);

        const ch = new Chance();

        this.root = new BlueprintNodeModel("root", ch.color(), ["in"], ["out"], {});
        this.state.model.addNode(this.root);

        this.updateEventListeners();

        if(this.props.actions) {
            this.props.actions.push({
                key: "add",
                text: "+",
                onClick: () => {
                    const name: string | null = prompt("name");
                    if(name) {
                        const node = new BlueprintNodeModel(name, ch.color(), ["in"], ["out"], {});
                        this.state.model.addNode(node);
                        this.updateEventListeners();
                        this.forceUpdate();
                    }
                }
            })
        }
    }
}