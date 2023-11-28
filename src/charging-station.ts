export interface IChargingStation {
    startCharging(): void;
    stopCharging(): void;
    getStatus(): {
        batteryCapacity: number;
        batteryCharge: number;
        batteryStartCharge: number;
        charging: boolean;
        chargingPower: number;
    };
    getStationInfo(): {
        cableType: string;
        maxChargingPower: number;
        name: string;
    };
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

    public getStatus() {
        return {
            batteryCapacity: this.batteryCapacity,
            batteryCharge: this.batteryCharge,
            batteryStartCharge: this.batteryStartCharge,
            charging: this.charging,
            chargingPower: this.charging ? this.chargingPower : 0
        }
    }

    public getStationInfo() {
        return {
            cableType: 'CCS',
            maxChargingPower: 150000,
            name: 'Kempower 1',
        }
    }
}
