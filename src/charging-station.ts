export class ChargingStation {
    private batteryCapacity: number = 81000;
    private batteryCharge: number = 50000;
    private batteryStartCharge: number = 0;
    private charging: boolean = false;
    private chargingPower = 72000; // Tesla Supercharger
    private chargingInterval: number | null = null;

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
}
