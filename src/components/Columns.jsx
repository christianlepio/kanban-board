import React, { useEffect, useMemo, useState } from 'react'
import '../styles/columns.css'
import Task from './Task'
import { useStore } from '../stores/store'
import classNames from 'classnames'
import { format } from 'date-fns'
import { SortableContext, useSortable } from '@dnd-kit/sortable'

const Columns = ({state}) => {
    const [drop, setDrop] = useState(false)
    const [dropTask, setDropTask] = useState(false)
    let { id, title, description, newDate } = ''

    let { tasks } = useStore(store => store)

    const { draggedTask, setDraggedTask, moveTask, setDateFormat, formatDate, isDarkMode } = useStore(store => store)
    const { icon } = useStore(store => 
        store.arrState.find(item => item.state === state )
    )

    tasks = useMemo(
        () => tasks.filter(task => task.state === state),
        [tasks, state]
    )

    tasks = useMemo(
        () => tasks = [...tasks].sort((a, b) => b.date - a.date), 
        [tasks, state]
    )

    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks])

    const taskCount = useMemo(() => {
        return tasks.reduce((total) => total + 1, 0)
    },[tasks, state])

    useEffect(() => {
        setDateFormat
        
        draggedTask.map(task => {
            id = task.id
            title = task.title
            description = task.description
        })

        newDate = formatDate
    }, [dropTask])

    // const handleDragOver = (e) => {
    //     e.preventDefault()
    //     setDrop(true) //to show broken white lines
    //     setDropTask(true)
    //     moveTask(id, title, description, state, newDate)
    // } //A dragged element is over the drop target

    // const handleDragLeave = (e) => {
    //     e.preventDefault()
    //     setDrop(false) //to show broken white lines
    //     setDropTask(false)
    // } //A dragged element leaves the drop target

    // const handleDrop = (e) => {
    //     e.preventDefault()
    //     setDrop(false) ////to show broken white lines
    //     moveTask(id, title, description, state, newDate)
    //     setDraggedTask([])      
    //     setDropTask(false)
    // } //A dragged element is dropped on the target

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
                // onDragOver={(e) => handleDragOver(e)} 
                // onDragLeave={(e) => handleDragLeave(e)} 
                // onDrop={(e) => handleDrop(e)} 
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
                    className={classNames("overflow-y-auto taskColus rounded-3 mt-2 px-2 column "+(state), {drop: drop})} 
                >
                    <SortableContext items={tasksIds}>
                        {tasks.length > 0 && 
                            tasks.map((item, index) => {
                                if (tasks.id === draggedTask.id) {
                                    return (
                                        <Task 
                                            key={item.id}
                                            index={index}
                                            item={item}
                                            setDropTask={setDropTask} 
                                            dropTask={dropTask} 
                                        />
                                    )
                                }else{
                                    return (
                                        <Task 
                                            key={item.id}
                                            index={index}
                                            item={item} 
                                        />
                                    )
                                }
                            })                        
                        }   
                    </SortableContext>             
                </div>
            </div>
        </>
    )
}

export default Columns