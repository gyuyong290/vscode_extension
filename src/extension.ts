// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from 'console';
import * as vscode from 'vscode';

// child 명시를 위한 tree Item
export class amdpItem extends vscode.TreeItem {
	public children: amdpItem[] = [];  // branches of this tree item
	constructor(label: string) {
		super(label, vscode.TreeItemCollapsibleState.None);
	}

	public addChildItem(child: amdpItem) {
		this.children.push(child);
	}
}

// view를 통해 원하는 항목(데이터 등) 노출
export class amdpProvider implements vscode.TreeDataProvider<any> {
	private items: amdpItem[] = [];

	// 생성자
	constructor() {}

	// getTreeItem(element: T): TreeItem | Thenable<TreeItem>
	// 뷰에서 보여질 element인 TreeItem 리턴
	getTreeItem(element: amdpItem) {
		log("getTreeItem function is called");
		// need to edit
		const item = new vscode.TreeItem(element.label!, element.collapsibleState);
		return item;
	}


	// getChildren(element?: T): ProviderResult<T[]>
	// children/주어진 element/root 리턴
	getChildren(element?: amdpItem): amdpItem[]  {
		if(element) {
			return element.children;
		} else {
			return [];
		}
	}

}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "case-study" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('case-study.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from case study!');
	});

	context.subscriptions.push(disposable);

	vscode.window.registerTreeDataProvider('viewtest', new amdpProvider);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
