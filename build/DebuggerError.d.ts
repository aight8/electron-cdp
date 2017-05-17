export default class DebuggerError extends Error {
    readonly code: number;
    readonly commandName: string;
    constructor(message: string, code: number, commandName: string);
}
