import * as React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

export type File = {
    name: string,
    directory: boolean,
    childs: File[],
}


class FileIcon extends React.Component<File, any> {
    constructor(props: File) {
        super(props);
    }

    render() {
        return <div className="file-view"><FontAwesomeIcon icon={faFile} /><span className="file-name">{this.props.name}</span></div>
    }
}

class DirectoryIcon extends React.Component<File, any> {
    constructor(props: File) {
        super(props);
    }

    render() {
        return <div className="directory-view"><FontAwesomeIcon icon={faFolder} /><span className="file-name">{this.props.name}</span></div>
    }
}

export default class Files extends React.Component<any, any> {
    state:any = {
        files: [{
            name: "12312",
            directory: true,
            childs: [{
                name: "222",
            }],
        },{
            name: "111",
        }],
    };

    constructor(props = {}) {
        super(props);
    }

    render() {
        const childs:File[] = this.state.target ? 
        (this.state.target.directory ? this.state.target.childs : this.state.files) : 
        this.state.files;
        console.log(childs);
        return <div className="files-view">{childs.map((ent) => {
            return ent.directory ? <DirectoryIcon key={ent.name} {...ent} /> : <FileIcon key={ent.name} {...ent} />;
        })}</div>
    }
}
