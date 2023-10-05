import React, { useEffect, useMemo, useState } from 'react'
import '../styles/columns.css'
import Task from './task'
import { useStore } from '../stores/store'
import classNames from 'classnames'
import { format } from 'date-fns'

const Columns = ({state}) => {
    const [drop, setDrop] = useState(false)
    const [dropTask, setDropTask] = useState(false)
    let { id, title, description, newDate } = ''

    let { tasks } = useStore(store => store)

    const { draggedTask, setDraggedTask, moveTask, setDateFormat, formatDate } = useStore(store => store)
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

    const handleDragOver = (e) => {
        e.preventDefault()
        setDrop(true) //to show broken white lines
        setDropTask(true)
        moveTask(id, title, description, state, newDate)
    } //A dragged element is over the drop target

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrop(false) //to show broken white lines
        setDropTask(false)
    } //A dragged element leaves the drop target

    const handleDrop = (e) => {
        e.preventDefault()
        setDrop(false) ////to show broken white lines
        moveTask(id, title, description, state, newDate)
        setDraggedTask([])      
        setDropTask(false)
    } //A dragged element is dropped on the target

    return (
        <>
            <div 
                className='my-4' 
                onDragOver={(e) => handleDragOver(e)} 
                onDragLeave={(e) => handleDragLeave(e)} 
                onDrop={(e) => handleDrop(e)} 
            >
                <div 
                    className={"rounded-3 shadow-sm border-top border-4 "+(state)} 
                    
                >
                    <div className='d-flex justify-content-between py-3 px-3'>
                        <h6 className="fs-6 text-secondary align-self-end">
                            &nbsp; <i className={icon}></i> {state}
                        </h6>
                        <span 
                            className='badge text-secondary bg-light lh-lg rounded-pill'
                        >
                            &nbsp; {taskCount} &nbsp;
                        </span>
                    </div>
                </div>

                <div 
                    className={classNames("overflow-y-auto rounded-3 mt-2 px-2 column "+(state), {drop: drop})} 
                    style={{maxHeight: '65vh', minHeight: '40vh'}}
                >
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
                </div>
            </div>
        </>
    )
}

export default Columns