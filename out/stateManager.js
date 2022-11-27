"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateManager = void 0;
function stateManager(context) {
    return {
        read,
        write,
        reset
    };
    function read() {
        return {
            latestList: context.globalState.get('latestList')
        };
    }
    function reset() {
        context.globalState.update('latestList', []);
    }
    async function write(latestList) {
        await context.globalState.update('latestList', latestList);
    }
}
exports.stateManager = stateManager;
//# sourceMappingURL=stateManager.js.map