import { IConsciousnessLayer } from '../interfaces/IConsciousnessLayer'

export default class Oversoul implements IConsciousnessLayer {
    readonly name = 'Oversoul'

    processInput(data: unknown): void {
        // TODO: implement Oversoul behaviour
    }

    getVibration(): number {
        // TODO: compute Oversoul vibration
        return 0
    }
}
