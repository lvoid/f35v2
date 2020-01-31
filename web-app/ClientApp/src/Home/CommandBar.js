"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var DexCommandBar = /** @class */ (function (_super) {
    __extends(DexCommandBar, _super);
    function DexCommandBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                key: "upload",
                text: "Upload",
                iconProps: { iconName: "Upload" },
                onClick: function () { return _this.props.store.openUploadModal(); }
            },
            {
                key: "delete",
                text: "Remove",
                iconProps: { iconName: "Delete" },
                onClick: function () { return console.log("Delete"); }
            },
            {
                key: "download",
                text: "Download",
                iconProps: { iconName: "Download" },
                onClick: function () { return console.log("Download"); }
            }
        ];
        return _this;
    }
    DexCommandBar.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(office_ui_fabric_react_1.CommandBar, { items: [], farItems: this.items, ariaLabel: "Use left and right arrow keys to navigate between commands" })));
    };
    return DexCommandBar;
}(React.Component));
exports.DexCommandBar = DexCommandBar;
//# sourceMappingURL=CommandBar.js.map