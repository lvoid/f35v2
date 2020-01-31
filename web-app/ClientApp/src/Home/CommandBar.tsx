import * as React from "react";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react";
import { HomeStore } from "./Home";

export interface DexCommandBarProps {
  store: HomeStore;
}

export class DexCommandBar extends React.Component<DexCommandBarProps, {}> {
  items: ICommandBarItemProps[] = [
    {
      key: "upload",
      text: "Upload",
      iconProps: { iconName: "Upload" },
      onClick: () => this.props.store.openUploadModal()
    },
    {
      key: "delete",
      text: "Remove",
      iconProps: { iconName: "Delete" },
      onClick: () => console.log("Delete")
    },
    {
      key: "download",
      text: "Download",
      iconProps: { iconName: "Download" },
      onClick: () => console.log("Download")
    }
  ];

  render() {
    return (
      <>
        <CommandBar
          items={[]}
          farItems={this.items}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
      </>
    );
  }
}
