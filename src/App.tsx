import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChargingService, ChargingStatus } from './charging-service'
import { ChargingApi } from './charging-api'

const chargingApi = new ChargingApi()
const chargingService = new ChargingService(chargingApi)

function App() {
  const [chargingStatus, setChargingStatus] = useState<ChargingStatus>({
    charging: false,
    chargedCapacityKwH: 0,
    capacityPercentage: 0,
    chargingPower: 0
  })

  useEffect(() => {
    setChargingStatus(chargingService.getStatus())
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Charging station</h1>
      <div className="card">
        <p>
          Charging: {chargingStatus.charging ? 'Yes' : 'No'}
        </p>
        <p>
          Charged capacity (kWh): {chargingStatus.chargedCapacityKwH}
        </p>
        <p>
          Capacity %: {chargingStatus.capacityPercentage}
        </p>
      </div>
    </>
  )
}

export default App
