import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css'
import { ChargingApi } from './charging-api';
import { IChargingStation, StationInfo } from './charging-station';
import { ChargingStation } from './charging-station';
import BatteryGauge from 'react-battery-gauge';

function App() {
  const [stationInfo, setStationInfo] = useState<StationInfo>({
    name: '',
    maxChargingPower: 0,
    cableType: 'CCS'
  });

  useEffect(() => {
    const station: IChargingStation = new ChargingStation()
    const api = new ChargingApi(station);
    const info = api.getStationInfo();
    setStationInfo(info);
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
      <Content>
        <Part>Part 1</Part>
        <Part>
          <BatteryGauge
            value={0.5}
            orientation='vertical'
            charging={false}
            size={150}
          />
        </Part>
        <Part>Part 3</Part>
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

export default App
