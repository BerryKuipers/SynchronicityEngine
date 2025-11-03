import { IConsciousnessLayer } from '../interfaces/IConsciousnessLayer'

export default class Personality implements IConsciousnessLayer {
    readonly name = 'Personality'

    processInput(data: unknown): void {
        // TODO: implement Personality behaviour
    }

    getVibration(): number {
        // TODO: compute Personality vibration
        return 0
    }
}
