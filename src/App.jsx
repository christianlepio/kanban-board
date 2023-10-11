import './App.css'
import Columns from './components/Columns'
import ProjName from './components/ProjName'
import Task from './components/Task'
import { useStore } from './stores/store' 
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

function App() {
  const { 
    tasks, 
    projName, 
    arrState, 
    activeTask, 
    onDragStart, 
    onDragEnd, 
    onDragOver
   } = useStore(store => store)

  return (
    <>
      <div className="mx-4">
        <main>
          <ProjName />
          {projName !== null &&
            <div className="row justify-content-center">
              <DndContext
                collisionDetection={pointerWithin}
                onDragStart={(e)=>onDragStart(e)}
                onDragEnd={onDragEnd} 
                onDragOver={(e)=>onDragOver(e, tasks)}
              >
                {arrState.length > 0 ?
                  arrState.map((col, i) => (
                    <Columns 
                      key={i} 
                      state={col.state} 
                    />
                  ))
                  : null
                }                
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
