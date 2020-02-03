import * as React from "react";
import {
  Dropdown,
  IDropdownOption,
  Link,
  TextField,
  PrimaryButton,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { MappingPreview } from "./MappingPreview";
import { DexCommandBar } from "./CommandBar";
import { observable } from "mobx";
import { UploadDialog } from "./UploadDialog";
import { observer } from "mobx-react";

// winky face
export class HomeStore {
  @observable isUploadVisible: boolean = false;
  @observable lastDeploy: string = "";
  @observable inProgress: boolean = false;
  @observable options: IDropdownOption[] = [];

  constructor() {
    this.refreshDropdownOptons();
    this.refreshLastDeploy();
  }

  openUploadModal = () => {
    this.isUploadVisible = true;
  };

  closeUploadModal = () => {
    this.isUploadVisible = false;
  };

  refreshDropdownOptons = () => {
    fetch("/Transform/GetFiles").then(response => {
      response.json().then(value => {
        let fileNames: string[] = value;

        this.options = fileNames.map((filename, index) => {
          return {
            key: "key" + index,
            text: filename
          };
        });
      });
    });
  };

  refreshLastDeploy = () => {
    fetch("/Transform/GetLastDeploy").then(response => {
      response.text().then(value => {
        this.lastDeploy = value;
      });
    });
  };
}

@observer
export class Home extends React.Component {
  @observable store: HomeStore = new HomeStore();
  @observable selectedOption: IDropdownOption;

  constructor(props: any) {
    super(props);
    initializeIcons();
  }

  deployConversion = () => {
    var formData = new FormData();
    formData.append(
      "fileName",
      this.selectedOption ? this.selectedOption.text : "test.java"
    );

    this.store.inProgress = true;

    fetch("/Transform/Deploy", {
      method: "POST",
      body: formData
    })
      .then(response => {
        this.store.refreshLastDeploy();
        this.store.inProgress = false;
      })
      .catch(error => {
        console.log(error);
        this.store.inProgress = false;
      });
  };

  renderBody() {
    return (
      <div className="DexterBody">
        <header className="Instructions">
          {"Choose an existing mapping, or "}
          <Link
            className="UploadLink"
            onClick={() => this.store.openUploadModal()}
          >
            upload a new Dexter-generated map
          </Link>
          {" to deploy."}
        </header>

        <div className="DeploymentDestination">
          <p>Deployment Destination: </p>
          <TextField
            className="DepDestinationBox"
            disabled
                    placeholder="https://github.com/jjgccg/f35v2"
          ></TextField>
        </div>

        <div className="DeploymentInformation">
          <p>Deployment Site - Last update: </p>
          <TextField
            className="DepInformationBox"
            disabled
            placeholder={this.store.lastDeploy}
          ></TextField>
        </div>

        <Dropdown
          className="ConversionDropdown"
          options={this.store.options}
          placeholder="Select an option"
          defaultSelectedKey={"d1"}
          onChange={(event, option) => {
            if (option) {
              this.selectedOption = option;
            }
          }}
        ></Dropdown>
        <MappingPreview />
        <PrimaryButton
          disabled={this.selectedOption == undefined}
          className="DeploymentButton"
          primary
          onClick={() => this.deployConversion()}
        >
          {this.store.inProgress == true ? (
            <Spinner size={SpinnerSize.small}></Spinner>
          ) : (
            "Deploy"
          )}
        </PrimaryButton>
      </div>
    );
  }

  render() {
    return (
      <>
        <DexCommandBar store={this.store} />

        {this.renderBody()}

        {this.store.isUploadVisible && (
          <UploadDialog store={this.store}></UploadDialog>
        )}
      </>
    );
  }
}
