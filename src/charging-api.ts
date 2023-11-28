import { ChargingStation } from './charging-station';

export interface ChargingStatus {
    chargedCapacityKwH: number;
    capacityPercentage: number;
    charging: boolean;
    chargingPower: number;
}

export class ChargingApi {
    constructor(private chargingStation: ChargingStation) {}

    startCharging() {
        this.chargingStation.startCharging();
    }

    stopCharging() {
        this.chargingStation.stopCharging();
    }

    getChargingStatus(): ChargingStatus {
        return {
            chargedCapacityKwH: this.chargingStation.chargedCapacityKwH,
            capacityPercentage: this.chargingStation.capacityPercentage,
            charging: this.chargingStation.charging,
            chargingPower: this.chargingStation.chargingPower,
        };
    }

}
