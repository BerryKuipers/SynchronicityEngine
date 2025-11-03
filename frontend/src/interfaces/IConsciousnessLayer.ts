export interface IConsciousnessLayer {
    readonly name: string
    processInput(data: unknown): void
    getVibration(): number
}
