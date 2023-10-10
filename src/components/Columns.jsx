import React, { useMemo } from 'react'
import '../styles/columns.css'
import Task from './Task'
import { useStore } from '../stores/store'
import { SortableContext, useSortable } from '@dnd-kit/sortable'

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
            <div 
                ref={setNodeRef}
                className='my-4'
            >
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
                    className={"overflow-y-auto taskColus rounded-3 mt-2 px-2 column "+(state)} 
                >
                    <SortableContext items={tasksIds}>
                        {tasks.length > 0 ?
                            tasks.map((item) => {
                                return (
                                    <Task 
                                        key={item.id}
                                        item={item} 
                                    />
                                )
                            }) :
                            <p className='fst-italic text-center text-secondary py-2 pt-4'>No task here...</p>           
                        }   
                    </SortableContext>             
                </div>
            </div>
        </>
    )
}

export default Columns