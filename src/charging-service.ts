import { ChargingApi } from "./charging-api";

export interface ChargingStatus {
    chargedCapacityKwH: number;
    capacityPercentage: number;
    charging: boolean;
}

export class ChargingService {
    constructor(private chargingApi: ChargingApi) {}

    public startCharging() {
        this.chargingApi.startCharging();
    }

    public stopCharging() {
        this.chargingApi.stopCharging();
    }
    
    public getStatus(): ChargingStatus {
        const status = this.chargingApi.getStatus();
        return {
            chargedCapacityKwH: (status.batteryCharge - status.batteryStartCharge) / 1000,
            capacityPercentage: (status.batteryCharge) / status.batteryCapacity,
            charging: status.charging
        }
    }
}    
