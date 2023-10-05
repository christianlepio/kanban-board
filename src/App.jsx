import './App.css'
import Columns from './components/Columns'
import ProjName from './components/ProjName'
import { useStore } from './stores/store'

function App() {
  const { projName } = useStore(store => store)
  return (
    <>
      <div className="mx-4">
        <ProjName />
        {projName !== null &&
          <div className="row justify-content-center">
            <div className="col-md-3">
              <Columns state={'To-Do'} />
            </div>
            <div className="col-md-3">
              <Columns state={'In Progress'} />
            </div>
            <div className="col-md-3">
              <Columns state={'For Testing'} />
            </div>
            <div className="col-md-3">
              <Columns state={'Done'} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App
