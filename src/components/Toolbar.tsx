import * as React from "react";

export type ToolbarAction = {
    key: string;
    text: string;
    onClick(): void;
}

export type ToolbarProps = {
    actions?: ToolbarAction[];
}

type ToolbarState = {

}

export default class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    constructor(props:ToolbarProps) {
        super(props);
    }

    render() {
        return <div className="toolbar-view">{(this.props.actions || []).map((action:ToolbarAction, index:number)=>{
            return <button className="toolbar-button" key={action.key} onClick={()=>{ action.onClick(); }}>{action.text}</button>
        })}</div>
    }
}