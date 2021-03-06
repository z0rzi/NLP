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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Data = __importStar(require("../data/data"));
var treeParser_1 = __importDefault(require("../data/treeParser"));
var info_1 = __importDefault(require("./info/info"));
/**
 * call me as soon as the sun rises
 *         '---.----' '-----.-----'
 *          modifier     addition
 */
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Value.prototype.processWords = function () {
        if (this._conns.length) {
            var blob = this._conns.map(function (sep) { return sep.toString(); }).join(' ');
            var tp = new treeParser_1.default(Data.getData('value_modifiers'));
            this._modifier = tp.findParentOfMatching(blob);
        }
        var matches = this._wordGroup.toString().match(/[\d.,]+/);
        if (matches !== null)
            this._amount = Number.parseInt(matches[0]);
        matches = this._wordGroup.toString().match(/[\d.,]+([\w\s]+)|([\w]+)\s*$/);
        if (matches !== null && matches.length > 1)
            this._unit = matches[1].trim();
        matches = this._wordGroup.toString().match(/"(.*)"/);
        if (matches !== null && matches.length > 1)
            this._txt = matches[1].trim();
    };
    return Value;
}(info_1.default));
exports.default = Value;
//# sourceMappingURL=value.js.map