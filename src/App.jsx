import { useState } from 'react'
import './App.css'
import Columns from './components/Columns'
import ProjName from './components/ProjName'
import Task from './components/Task'
import { useStore } from './stores/store' 
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

function App() {
  const { tasks, projName, activeTask, onDragStart, onDragEnd, onDragOver } = useStore(store => store)
  // const [activeTask, setActiveTask] = useState(null)

  // const onDragStart = (e) => {
  //   if (e.active.data.current?.type === "Task") {
  //       setActiveTask(e.active.data.current.task)
  //       return
  //   }
  // }

  // const onDragEnd = (e) => {
  //   setActiveTask(null)
  // }

  return (
    <>
      <div className="mx-4">
        <main>
          <ProjName />
          {projName !== null &&
            <div className="row justify-content-center">
              <DndContext
                onDragStart={(e)=>onDragStart(e)}
                onDragEnd={onDragEnd} 
                onDragOver={(e)=>onDragOver(e, tasks)}
              >
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
                {createPortal(
                  <DragOverlay>
                    {activeTask && (
                        <Task 
                            item={activeTask}
                        />
                    )}
                  </DragOverlay>, 
                  document.body
                )}
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
