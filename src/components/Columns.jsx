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
    let { tasks } = useStore(store => store) //get tasks to zustand store

    const { isDarkMode } = useStore(store => store)
    const { icon } = useStore(store => 
        store.arrState.find(item => item.state === state )
    ) //find item with a specific state

    tasks = useMemo(
        () => tasks.filter(task => task.state === state),
        [tasks, state]
    ) //to memoize tasks

    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks]) //to memoize task ids used for sortable context

    const taskCount = useMemo(() => {
        return tasks.reduce((total) => total + 1, 0) //to get total using reduce function
    },[tasks, state])

    const { 
        setNodeRef 
    } = useSortable({
        id: state,
        data: {
            type: "Column", 
            state,
        }
    }) //get setNodeRef from useSortable dnd hook

    return (
        <>  
            {/**set node ref to column you want to drop task */}
            <div ref={setNodeRef} className="col-md-3">
                <div className='my-4'>
                    <div 
                        className={(isDarkMode ? 'taskCol' : null)+" rounded-3 border shadow-sm border-top "+(state)} 
                        
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
                        className={(isDarkMode ? 'taskCol' : 'bg-light shadow-sm border border-light-subtle')+" overflow-y-auto taskColus mt-3 py-1 rounded-3 rounded-3 column "+(state)} 
                    >
                        <SortableContext //all content inside will be sortable
                            items={tasksIds} //assign items to sorted
                            strategy={verticalListSortingStrategy} //to get dynamic size of task vertically
                        >
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