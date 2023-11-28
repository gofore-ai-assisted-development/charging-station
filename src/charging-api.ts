import { IChargingStation, StationInfo } from './charging-station';

export interface ChargingStatus {
    chargedCapacityKwH: number;
    capacityPercentage: number;
    charging: boolean;
    chargingPowerKwH: number;
}

export class ChargingApi {
    private station: IChargingStation;

    constructor(station: IChargingStation) {
        this.station = station;
    }

    getStatus(): ChargingStatus {
        const status = this.station.getStatus();
        return {
            chargedCapacityKwH: (status.batteryCharge - status.batteryStartCharge) / 1000,
            capacityPercentage: status.batteryCapacity === 0 ? 0 : (status.batteryCharge / status.batteryCapacity) * 100,
            charging: status.charging,
            chargingPowerKwH: status.charging ? status.chargingPower / 1000 : 0 
        };
    }

    startCharging(): void {
        this.station.startCharging();
    }

    stopCharging(): void {
        this.station.stopCharging();
    }

    getStationInfo(): StationInfo {
        return this.station.getStationInfo();
    }
}
