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

        this.root = new BlueprintNodeModel("root", ch.color(), [], [], {});
        this.state.model.addNode(this.root);

        if(this.props.actions) {
            this.props.actions.push({
                key: "add",
                text: "+",
                onClick: () => {
                    const name: string | null = prompt("name");
                    if(name) {
                        this.forceUpdate();
                    }
                }
            })
        }
    }
}