import './App.css'
import Columns from './components/Columns'
import ProjName from './components/ProjName'
import { useStore } from './stores/store' 
import { DndContext } from '@dnd-kit/core'

function App() {
  const { projName } = useStore(store => store)
  return (
    <>
      <div className="mx-4">
        <main>
          <ProjName />
          {projName !== null &&
            <div className="row justify-content-center">
              <DndContext>
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
              </DndContext>
            </div>
          }
        </main>
        <footer>
            <p className="text-center fs-6">&copy; christianlepio. All rights reserved.</p>          
        </footer>     
      </div>
    </>
  )
}

export default App
