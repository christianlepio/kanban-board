import React, { useMemo } from 'react'
import '../styles/columns.css'
import Task from './Task'
import { useStore } from '../stores/store'
import { 
    SortableContext, 
    useSortable, 
    verticalListSortingStrategy 
} from '@dnd-kit/sortable'

const Columns = ({state}) => {
    let { tasks } = useStore(store => store)

    const { isDarkMode } = useStore(store => store)
    const { icon } = useStore(store => 
        store.arrState.find(item => item.state === state )
    )

    tasks = useMemo(
        () => tasks.filter(task => task.state === state),
        [tasks, state]
    )

    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks])

    const taskCount = useMemo(() => {
        return tasks.reduce((total) => total + 1, 0)
    },[tasks, state])

    const { 
        setNodeRef 
    } = useSortable({
        id: state,
        data: {
            type: "Column", 
            state,
        }
    })

    return (
        <>  
            <div ref={setNodeRef} className="col-md-3">
                <div className='my-4'>
                    <div 
                        className={(isDarkMode ? 'taskCol' : null)+" rounded-3 shadow-sm border-top border-4 "+(state)} 
                        
                    >
                        <div className='d-flex justify-content-between py-3 px-3'>
                            <h6 className={"fs-6 align-self-end " + (!isDarkMode ? 'text-secondary' : null)}>
                                &nbsp; <i className={icon}></i> {state}
                            </h6>
                            <span 
                                className={'badge lh-lg rounded-pill ' + (!isDarkMode ? 'text-secondary bg-light' : 'border')}
                            >
                                &nbsp; {taskCount} &nbsp;
                            </span>
                        </div>
                    </div>

                    <div 
                        className={(isDarkMode ? 'taskCol' : 'bg-light')+" overflow-y-auto taskColus mt-3 py-1 rounded-3 rounded-3 column "+(state)} 
                    >
                        <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                            {tasks.length > 0 ?
                                tasks.map((item) => {
                                    return (
                                        <Task 
                                            key={item.id}
                                            item={item} 
                                        />
                                    )
                                }) :
                                <small><p className='fst-italic text-center text-secondary py-2 pt-4'>No task here...</p></small>           
                            }   
                        </SortableContext>             
                    </div>
                </div>
            </div>
        </>
    )
}

export default Columns