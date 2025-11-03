import { IConsciousnessLayer } from '../interfaces/IConsciousnessLayer'

export default class PhysicalMind implements IConsciousnessLayer {
    readonly name = 'PhysicalMind'

    processInput(data: unknown): void {
        // TODO: implement Physical Mind behaviour
    }

    getVibration(): number {
        // TODO: compute Physical Mind vibration
        return 0
    }
}
