export interface ChargingStatusData {
    batteryCapacity: number;
    batteryCharge: number;
    batteryStartCharge: number;
    charging: boolean;
    chargingPower: number;
}

export interface StationInfo {
    cableType: 'CCS' | 'CHAdeMO' | 'Type 2';
    maxChargingPower: number;
    name: string;
}

export interface IChargingStation {
    startCharging(): void;
    stopCharging(): void;
    getStatus(): ChargingStatusData;
    getStationInfo(): StationInfo;
}


export class ChargingStation implements IChargingStation {
    private batteryCapacity: number = 81000; // in Wh
    private batteryCharge: number = 50000; // in Wh
    private batteryStartCharge: number = 0; // in Wh
    private charging: boolean = false;
    private chargingPower = 150000; // in Wh
    private chargingInterval: NodeJS.Timeout | null = null;

    public startCharging() {
        this.charging = true;
        this.batteryStartCharge = this.batteryCharge;
        this.chargingInterval = setInterval(() => {
            // How much charge is added in one second
            this.batteryCharge = this.batteryCharge + this.chargingPower / 3600 
            console.log('Current charge:', this.batteryCharge)
        }, 1000);
    }

    public stopCharging() {
        this.charging = false;
        if (this.chargingInterval) {
            clearInterval(this.chargingInterval);
            this.chargingInterval = null;
        }
    }

    public getStatus(): ChargingStatusData {
        return {
            batteryCapacity: this.batteryCapacity,
            batteryCharge: this.batteryCharge,
            batteryStartCharge: this.batteryStartCharge,
            charging: this.charging,
            chargingPower: this.charging ? this.chargingPower : 0
        }
    }

    public getStationInfo(): StationInfo {
        return {
            cableType: 'CCS',
            maxChargingPower: 150000,
            name: 'Kempower 1',
        }
    }
}
