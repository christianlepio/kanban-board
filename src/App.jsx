import './App.css'
import Columns from './components/Columns'
import ProjName from './components/ProjName'
import Task from './components/Task'
import { useStore } from './stores/store' 
import { 
  DndContext, 
  DragOverlay, 
  pointerWithin 
} from '@dnd-kit/core'
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
   } = useStore(store => store) //this is how to call variable/functions in zustand

  return (
    <>
      <div className="mx-4">
        <main>
          <ProjName />
          {projName !== null &&
            <div className="row justify-content-center">
              <DndContext
                collisionDetection={pointerWithin} //dnd algo, drop within the cursor pointer 
                onDragStart={(e)=>onDragStart(e)}
                onDragEnd={onDragEnd} 
                onDragOver={(e)=>onDragOver(e, tasks)}
              > {/* initialize drag and drop context */}
                {arrState.length > 0 ?
                  arrState.map((col, i) => (
                    <Columns 
                      key={i} 
                      state={col.state} 
                    />
                  ))
                  : null
                }                
                {createPortal( //this is usually used for modal or popovers
                  //for content shadow effect
                  <DragOverlay> 
                    {activeTask && (
                      <Task 
                        item={activeTask}
                      />
                    )}
                  </DragOverlay>, 
                  document.body //to popover the body
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
