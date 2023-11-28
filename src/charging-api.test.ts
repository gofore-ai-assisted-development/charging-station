// tests/charging-api.test.ts
import { ChargingApi, ChargingStatus } from '../src/charging-api';
import { IChargingStation, StationInfo } from '../src/charging-station';

describe('ChargingApi', () => {
    let station: IChargingStation;
    let api: ChargingApi;

    beforeEach(() => {
        station = {
            startCharging: jest.fn(),
            stopCharging: jest.fn(),
            getStatus: jest.fn().mockReturnValue({
                batteryCapacity: 100,
                batteryCharge: 50,
                batteryStartCharge: 0,
                charging: false,
                chargingPower: 0
            }),
            getStationInfo: jest.fn().mockReturnValue({
                cableType: 'Type 2',
                maxChargingPower: 10000,
                name: 'Station 1'
            })
        };
        api = new ChargingApi(station);
    });

    test('getStatus returns correct status', () => {
        const status: ChargingStatus = api.getStatus();
        expect(status).toEqual({
            chargedCapacityKwH: (station.getStatus().batteryCharge - station.getStatus().batteryStartCharge) / 1000,
            capacityPercentage: (station.getStatus().batteryCharge / station.getStatus().batteryCapacity) * 100,
            charging: station.getStatus().charging,
            chargingPowerKwH: station.getStatus().charging ? station.getStatus().chargingPower / 1000 : 0 
        });
    });

    test('startCharging starts charging', () => {
        api.startCharging();
        expect(station.startCharging).toHaveBeenCalled();
    });

    test('stopCharging stops charging', () => {
        api.stopCharging();
        expect(station.stopCharging).toHaveBeenCalled();
    });

    test('getStationInfo returns correct info', () => {
        const info: StationInfo = api.getStationInfo();
        expect(info).toEqual(station.getStationInfo());
    });

    test('capacityPercentage should be 0 if battery capacity is 0', () => {
        station.getStatus = jest.fn().mockReturnValue({
            batteryCapacity: 0,
            batteryCharge: 0,
            batteryStartCharge: 0,
            charging: false,
            chargingPower: 0
        });
        const status: ChargingStatus = api.getStatus();
        expect(status.capacityPercentage).toBe(0);
    });
});
