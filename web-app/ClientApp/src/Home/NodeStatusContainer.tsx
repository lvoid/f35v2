import * as React from "react";
import { observer } from "mobx-react";
import { Icon, IconButton } from "office-ui-fabric-react";
import { observable } from "mobx";

@observer
export class NodeStatusContainer extends React.Component {
  @observable writeNodeAlive: boolean = false;
  @observable receiveNodeAlive: boolean = false;
  @observable transformNodeAlive: boolean = false;

  constructor(props: any) {
    super(props);
    this.refreshAllStatuses();
  }

  refreshAllStatuses = () => {
    this.writeNodeAlive = this.getWriteStatus();
    this.receiveNodeAlive = this.getReceiveStatus();
    this.transformNodeAlive = this.getTransformStatus();
  };

  //TODO - Actually get statuses
  getWriteStatus = () => {
    return true;
  };

  getReceiveStatus = () => {
    return false;
  };

  getTransformStatus = () => {
    return false;
  };

  render() {
    return (
      <div className="NodeStatusContainer">
        <div className="NodeStatusHeader">
          <p className="HeaderText">Node Status:</p>
          <IconButton
            className="RefreshButton"
            iconProps={{ iconName: "Refresh" }}
            onClick={() => this.refreshAllStatuses()}
          ></IconButton>
        </div>
        <div className="NodeContainer">
          <div className="Nodes">
            <div className="NodePair" id="WriteNode">
              <Icon
                iconName="globe"
                className={
                  "Node " + (this.writeNodeAlive ? "Active" : "Inactive")
                }
              ></Icon>
              <p className="NodeLabel">Node 1: Write</p>
            </div>
            <div className="NodePair" id="ReceiveNode">
              <Icon
                iconName="globe"
                className={
                  "Node " + (this.receiveNodeAlive ? "Active" : "Inactive")
                }
              ></Icon>
              <p className="NodeLabel">Node 2: Read</p>
            </div>
            <div className="NodePair" id="TransformNode">
              <Icon
                iconName="globe"
                className={
                  "Node " + (this.transformNodeAlive ? "Active" : "Inactive")
                }
              ></Icon>
              <p className="NodeLabel">Node 3: Transform</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
