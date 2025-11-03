import { IConsciousnessLayer } from '../interfaces/IConsciousnessLayer'

export default class Soul implements IConsciousnessLayer {
    readonly name = 'Soul'

    processInput(data: unknown): void {
        // TODO: implement Soul behaviour
    }

    getVibration(): number {
        // TODO: compute Soul vibration
        return 0
    }
}
