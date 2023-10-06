import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../stores/store'

const AddTaskModal = ({projModId, indicator}) => {
    const { 
            tasks, 
            isTaskExist, 
            setDateFormat, 
            addTask, 
            validateTask, 
            setIsTaskExist, 
            displaySwalFire 
        } = useStore(store => store)

    const taskRef = useRef()
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('') 
    const [errMsg, setErrMsg] = useState('')
    const [isModalClose, setIsModalClose] = useState(false)

    useEffect(() => {
        let isModalShow =  document.querySelector(".show")
        setTimeout(() => {
            isModalShow !== null && taskRef.current.focus()
        }, 500)
    }, [indicator])

    useEffect(() => {     
        const charLen = taskTitle.trim().length

        setErrMsg('')  
        setIsTaskExist
        setIsModalClose(false)

        if (charLen === 0) 
            setErrMsg('Title field is required!')
        else if(charLen <= 3) 
            setErrMsg('Title must be more than 3 characters!')
        else if (charLen > 20)
            setErrMsg('Title must be 3-20 characters only!')
        else {
            validateTask(taskTitle)
            if (isTaskExist) 
                setErrMsg('Task title already exist!')
            else
                setIsModalClose(true)
        }
    }, [taskTitle, isTaskExist, tasks, indicator])

    const submitTask = (e) => {
        e.preventDefault()
        if (!errMsg) {
            if (taskTitle.trim().length !== 0) {
                setDateFormat()
                addTask(taskTitle, taskDesc, 'To-Do')
                setTaskTitle('')
                setTaskDesc('')
                setIsTaskExist()
                setErrMsg('')
                displaySwalFire('Task added!', `New task '${taskTitle}' has been added!`, 3000)
            }else
                taskRef.current.focus()
        }else
            taskRef.current.focus()
    }

    return (
        <>
            {/* this is modal dialog box */}
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id={projModId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0"}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-plus-circle"></i> Add Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={submitTask}>
                            <div className="modal-body">
                                <div className="form-floating my-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="Title" 
                                        value={taskTitle}
                                        onChange={(e) => 
                                            setTaskTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                        }
                                        ref={taskRef}
                                    />
                                    <label htmlFor="floatingInput">Title</label>
                                </div>
                                {errMsg ? <p className='text-sm text-danger fw-lighter text-center my-2'>{errMsg}</p> : null}
                                <div className="form-floating my-3">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Leave a description here" 
                                        id="floatingTextarea2" 
                                        style={{height: '120px'}}
                                        value={taskDesc} 
                                        onChange={(e) => 
                                            setTaskDesc(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                        }
                                    ></textarea>
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button 
                                    type="submit" 
                                    className="btn btn-sm btn-success"      
                                    disabled={isModalClose ? false : true}                                     
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* this is modal dialog box */}
        </>
    )
}

export default AddTaskModal