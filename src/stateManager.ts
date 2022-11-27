import * as vscode from 'vscode';

export function stateManager(context: vscode.ExtensionContext){
    return {
        read,
        write,
        reset
    }

    function read(){
        return {
            latestList: context.globalState.get('latestList')
          }
    }

    function reset(){
        context.globalState.update('latestList', []);
    }

    async function write(latestList: any){
        await context.globalState.update('latestList', latestList );
    }
}