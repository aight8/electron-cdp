export default class DebuggerError extends Error {
    constructor(
        message: string,
        public readonly code: number,
        public readonly commandName: string
    ) {
        super(message);
    }
}