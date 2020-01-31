import * as React from "react";
import { Modal, Icon, Button } from "office-ui-fabric-react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { HomeStore } from "./Home";

export interface UploadDialogProps {
  store: HomeStore;
}

@observer
export class UploadDialog extends React.Component<UploadDialogProps, {}> {
  @observable fileList: FileList;
  @observable fileChooser: HTMLInputElement | null;

  uploadTransform = () => {
    var formData = new FormData();
    let file = this.fileList.item(0);

    if (file) {
      formData.append("File", file);

      fetch("/Transform/Upload", {
        method: "POST",
        body: formData
      }).then(response => {
        this.props.store.refreshDropdownOptons();
      });
    }

    this.props.store.closeUploadModal();
  };

  selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      this.fileList = event.target.files;
    }
  };

  blockEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    this.blockEvent(event);
    let data = event.dataTransfer;
    if (data && data.files.length > 0) {
      this.fileList = data.files;
    }
  };

  renderFileInput = () => {
    return (
      <div
        onDragEnter={this.blockEvent}
        onDragOver={this.blockEvent}
        onDrop={this.onFileDrop}
      >
        <input
          ref={chooser => (this.fileChooser = chooser)}
          className={"FileChooserInput " + "Hidden"}
          type="file"
          accept={".java, .c, .ada, .cpp"}
          onChange={event => this.selectFiles(event)}
        />

        <div className="newFileDropper">
          <div className="filename">{this.fileList?.item(0)?.name}</div>
          Drop file here, or
          <div
            className="browseButton"
            onClick={() => this.fileChooser && this.fileChooser.click()}
          >
            Browse for File
          </div>
        </div>
      </div>
    );
  };

  renderModalContents() {
    return (
      <div className={"ModalBody"}>
        <header>
          <span className="ModalTitle ms-fontSize-xl ms-fontWeight-light">
            Upload a Dexter Transform
          </span>
          <span
            className="Close"
            onClick={() => this.props.store.closeUploadModal()}
            aria-hidden="true"
          >
            <Icon iconName="Cancel" className="CancelIcon" />
          </span>
        </header>

        <div className="UploadInstructions">
          <p className="Instruction">
            Choose one or more transform files to upload.
          </p>
          <p className="Instruction">
            Valid transform files include .java, .c, .cpp, and .ada
          </p>
        </div>

        {this.renderFileInput()}

        <div className="ButtonContainer">
          <Button
            primary
            className="DialogButton"
            disabled={this.fileList == undefined || this.fileList.length == 0}
            onClick={() => this.uploadTransform()}
          >
            Upload
          </Button>
          <Button
            className="DialogButton Cancel"
            onClick={() => this.props.store.closeUploadModal()}
          >
            Cancel
          </Button>
        </div>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <Modal
        className="UploadModal"
        titleAriaId="UploadModalTitle"
        isBlocking={true}
        isOpen={this.props.store.isUploadVisible}
        isClickableOutsideFocusTrap={true}
        firstFocusableSelector="Close"
      >
        {this.renderModalContents()}
      </Modal>
    );
  }
}
