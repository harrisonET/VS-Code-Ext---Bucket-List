"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.addWithRemoveDuplicates = exports.activate = void 0;
const vscode = require("vscode");
const stateManager_1 = require("./stateManager");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.addToBucketList', () => {
        const state = (0, stateManager_1.stateManager)(context);
        const activeEditor = vscode.window.activeTextEditor;
        var list = state.read().latestList;
        if (list === undefined) {
            list = [];
        }
        //check for value not null
        if (activeEditor?.document.fileName) {
            list = addWithRemoveDuplicates(list, activeEditor?.document.fileName);
        }
        console.log(JSON.stringify(list));
        state.write(list);
        vscode.window.showInformationMessage('Added to Bucket List!');
    });
    disposable = vscode.commands.registerCommand('extension.resetBucketList', () => {
        const state = (0, stateManager_1.stateManager)(context);
        state.reset();
        vscode.window.showInformationMessage('Bucket List Resetted!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function addWithRemoveDuplicates(list, path) {
    list.push(path);
    let uniqueList = list.filter((element, index) => {
        return list.indexOf(element) === index;
    });
    return uniqueList;
}
exports.addWithRemoveDuplicates = addWithRemoveDuplicates;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map