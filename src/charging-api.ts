export class ChargingApi {
    private batteryCapacity: number = 81000;
    private batteryCharge: number = 50000;
    private batteryStartCharge: number = 10000;
    private charging: boolean = false;

    public startCharging() {
        this.charging = true;
        this.batteryStartCharge = this.batteryCharge;
    }

    public stopCharging() {
        this.charging = false;
    }

    public getStatus() {
        return {
            batteryCapacity: this.batteryCapacity,
            batteryCharge: this.batteryCharge,
            batteryStartCharge: this.batteryStartCharge,
            charging: this.charging
        }
    }

}
