import * as React from "react";
import {
  DetailsList,
  IColumn,
  IGroup,
  IGroupDividerProps,
  Link,
  ConstrainMode,
  CheckboxVisibility,
  Checkbox,
  IconButton
} from "office-ui-fabric-react";

export class MappingPreview extends React.Component {
  getMatchColumns = (): IColumn[] => {
    return [
      {
        key: "SelectionColumn",
        name: " ",
        minWidth: 75,
        maxWidth: 75,
        className: "SelectionColumn",
        headerClassName: "SelectionColumnHeader",
        onRender: this.renderSelectionCell,
        isRowHeader: false
      },
      {
        key: "SourceField",
        name: "Source",
        minWidth: 275,
        maxWidth: 275,
        className: "SourceCell",
        headerClassName: "SourceCellHeader",
        onRender: this.renderSourceCell
      },
      {
        key: "Equals",
        name: " ",
        minWidth: 25,
        maxWidth: 25,
        className: "EqualsCell",
        headerClassName: "EqualsCellHeader",
        onRender: this.renderEqualsCell
      },
      {
        key: "Destination",
        name: "Destination",
        minWidth: 175,
        maxWidth: 175,
        className: "DestinationCell",
        headerClassName: "DestinationCellHeader",
        onRender: this.renderDestinationCell
      }
    ];
  };

  renderSelectionCell = (item: any, index?: number, column?: IColumn) => {
    return (
      <Checkbox
        checked
        disabled
        className="Select"
        id={"SelectAttribute " + index}
      />
    );
  };

  renderSourceCell = (item: any, index?: number, column?: IColumn) => {
    return (
      <span className="SourceCell" id={"Source " + item.sourceName}>
        {item.sourceName}
      </span>
    );
  };

  renderDestinationCell = (item: any, index?: number, column?: IColumn) => {
    return (
      <span className="SourceCell" id={"Source " + item.destinationName}>
        {item.destinationName}
      </span>
    );
  };

  renderEqualsCell = (item: any, index?: number, column?: IColumn) => {
    return <span className="EqualsCell">=</span>;
  };

  getMatchGroups = (): IGroup[] => {
    return [
      {
        key: "TransferGroup",
        name: "ecef2lla",
        startIndex: 0,
        count: this.getSampleData().length
      }
    ];
  };

  getSampleData = () => {
    return [
      { sourceName: "lat", equals: "=", destinationName: "x" },
      { sourceName: "lon", equals: "=", destinationName: "y" },
      { sourceName: "height", equals: "=", destinationName: "z" }
    ];
  };

  renderGroupHeader = (props: IGroupDividerProps): JSX.Element => {
    return (
      <div className="GroupHeaderAndFooter">
        <div className="GroupHeaderContent">
          <div className="GroupHeaderTitle">
            {props.group && props.group.name}
          </div>
          <div className="GroupHeaderLinkSet">
            <Link
              className="GroupHeaderLink"
              onClick={() => {
                props.group.isSelected = true;
              }}
            >
              {props.group && props.group.isSelected
                ? "Remove attributes"
                : "Select attributes"}
            </Link>
            <Link
              className="GroupHeaderLink"
              onClick={() => {
                props.group.isSelected = false;
              }}
            >
              {props.group && props.group.isCollapsed
                ? "Expand attributes"
                : "Collapse attributes"}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <DetailsList
        columns={this.getMatchColumns()}
        groups={this.getMatchGroups()}
        items={this.getSampleData()}
        constrainMode={ConstrainMode.horizontalConstrained}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
    );
  }
}
