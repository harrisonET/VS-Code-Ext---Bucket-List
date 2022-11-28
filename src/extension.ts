import * as vscode from 'vscode';
import {stateManager} from './stateManager';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.addToBucketList', () => {
		const state = stateManager(context);		
		const activeEditor = vscode.window.activeTextEditor;

		var list = state.read().latestList;

		if(list === undefined){
			list = [];
		}

		//check for value not null
		if(activeEditor?.document.fileName){
			list = addWithRemoveDuplicates((list as string[]), activeEditor?.document.fileName);
		}
		console.log(JSON.stringify(list));

		state.write(list);

		vscode.window.showInformationMessage('Added to Bucket List!');
	});

	disposable = vscode.commands.registerCommand('extension.resetBucketList', () => {
		const state = stateManager(context);
		state.reset();
		vscode.window.showInformationMessage('Bucket List Resetted!');
	});

	context.subscriptions.push(disposable);
}

export function addWithRemoveDuplicates(list: string[], path: string)	{
	list.push(path);

	let uniqueList = list.filter((element, index) => {
		return list.indexOf(element) === index;
	});

	return uniqueList;
}

// This method is called when your extension is deactivated
export function deactivate() {}
