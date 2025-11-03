import { IConsciousnessLayer } from '../interfaces/IConsciousnessLayer'

export default class Engine {
    private layers: IConsciousnessLayer[]

    constructor(layers: IConsciousnessLayer[]) {
        this.layers = layers
    }

    run(): void {
        // TODO: implement simulation loop
    }
}
