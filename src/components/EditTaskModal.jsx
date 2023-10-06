import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../stores/store'
import Swal from 'sweetalert2';

const EditTaskModal = (children) => {
    const { 
        tasks, 
        isTaskExist, 
        validateTask, 
        setIsTaskExist, 
        updateTask, 
        displaySwalFire 
    } = useStore(store => store)

    const editTaskRef = useRef()
    const [editTaskTitle, setEditTaskTitle] = useState(children.modalItems.title)
    const [editTaskDesc, setEditTaskDesc] = useState(children.modalItems.description) 
    const [errMsg, setErrMsg] = useState('')
    const [isModalClose, setIsModalClose] = useState(false)

    useEffect(() => {
        setEditTaskTitle(children.modalItems.title)
        setEditTaskDesc(children.modalItems.description)

        let isModalShow =  document.querySelector(".show")
        setTimeout(() => {
            isModalShow !== null && editTaskRef.current.focus()
        }, 500)
    }, [children.indicator])   

    useEffect(() => {     
        const charLen = editTaskTitle.trim().length

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
            if (children.modalItems.title !== editTaskTitle.trim()) {
                validateTask(editTaskTitle)
                if (isTaskExist) {
                    setErrMsg('Task title already exist!')
                }
                else    
                    setIsModalClose(true)
            }

            if (children.modalItems.description !== editTaskDesc.trim()) {
                setIsModalClose(true)
            }
        }
    }, [editTaskTitle, editTaskDesc, isTaskExist, tasks, children.indicator]) 

    const handleEditTask = (e) => {
        e.preventDefault()
        if (!errMsg) {
            if (editTaskTitle.trim().length !== 0) {
                Swal.fire({
                    title: `Update task "${children.modalItems.title}"?`,
                    text: `Are you sure you want to modify task '${children.modalItems.title}'?`,
                    icon: 'question',
                    // color: swalColor,
                    // background: swalBg, 
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, modify it!'
                  }).then(res => {
                    if (res.isConfirmed) {
                        setIsTaskExist()
                        setErrMsg('')
                        updateTask(
                            children.modalItems.id, 
                            editTaskTitle.trim(), 
                            editTaskDesc.trim()
                        )
                        displaySwalFire('Task modified!', 'Task was successfully modified!', 3000)
                    }
                  })
            }else
                editTaskRef.current.focus()
        }else
            editTaskRef.current.focus()
    }

    return (
        <>
            {/* this is modal dialog box */}
            <div className="modal fade" id={'modalEdit'+children.modalItems.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0"}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-pencil-square"></i> Update task "{children.modalItems.title}"</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close"
                                data-bs-target={'#modal'+children.modalItems.id}
                                data-bs-toggle="modal"
                            ></button>
                        </div>
                        <form onSubmit={handleEditTask}>
                            <div className="modal-body">
                                <div className="form-floating my-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="Title" 
                                        value={editTaskTitle}
                                        onChange={(e) => 
                                            setEditTaskTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                        }
                                        ref={editTaskRef}
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
                                        value={editTaskDesc} 
                                        onChange={(e) => 
                                            setEditTaskDesc(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                        }
                                    ></textarea>
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-sm btn-secondary" 
                                    data-bs-target={'#modal'+children.modalItems.id}
                                    data-bs-toggle="modal">Cancel</button>
                                <button 
                                    type="submit" 
                                    className="btn btn-sm btn-success" 
                                    data-bs-dismiss="modal" 
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

export default EditTaskModal