import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css'
import { ChargingApi, ChargingStatus } from './charging-api';
import { IChargingStation, StationInfo } from './charging-station';
import { ChargingStation } from './charging-station';
import BatteryGauge from 'react-battery-gauge';
import QRCode from 'react-qr-code';

const station: IChargingStation = new ChargingStation()
const api = new ChargingApi(station);

function App() {
  const [stationInfo, setStationInfo] = useState<StationInfo>({
    name: '',
    maxChargingPower: 0,
    cableType: 'CCS'
  });

  const [status, setStatus] = useState<ChargingStatus>({
    chargedCapacityKwH: 0,
    charging: false,
    chargingPowerKwH: 0,
    capacityPercentage: 0,
  })

  useEffect(() => {
    const info = api.getStationInfo();
    setStationInfo(info);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentStatus = api.getStatus();
      setStatus(currentStatus);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <Header>
        <Name>{stationInfo.name}</Name>
        <OtherData>
          {stationInfo && (
            <>
              <div>{stationInfo.cableType} / {stationInfo.maxChargingPower / 1000} kWh</div>
            </>
          )}
        </OtherData>
      </Header>
      <FullWidthDiv>
      Current charging power: {status.chargingPowerKwH} kW
    </FullWidthDiv>
      <Content>
        <Part>
            <p>{Math.ceil(status.capacityPercentage)} %</p>
            <p>+{status.chargedCapacityKwH*5} km | +{status.chargedCapacityKwH} kWh</p>
        </Part>
        <Part>
          <BatteryGauge
            value={status.capacityPercentage}
            orientation='vertical'
            
            charging={status.charging}
            size={150}
          />
        </Part>
        <Part>
          <CenteredDiv>
            <QRCode
              value="http://192.168.10.53:5173"
              size={50}
            />
            <p style={{ fontSize: '0.4rem' }}>Follow on mobile</p>
          </CenteredDiv>
        </Part>
      </Content>
      <Footer>
        <Button>Play</Button>
        <Button>Pause</Button>
      </Footer>
    </>
  )
}

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
`;
const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const OtherData = styled.div`
  font-size: 1rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 3rem; // to account for the fixed header
`;

const Part = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ccc;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
`;

const CenteredDiv = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  height: 100%; // This ensures the div takes up the full height of its parent
`;

const FullWidthDiv = styled.div`
  width: 100%;
  text-align: center;
`;

export default App
