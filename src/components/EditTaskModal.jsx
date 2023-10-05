import React, { useRef, useState } from 'react'
import { useStore } from '../stores/store'

const EditTaskModal = (children) => {
    const { updateTask } = useStore(store => store)
    
    const editTaskRef = useRef()
    const [editTaskTitle, setEditTaskTitle] = useState(children.modalItems.title)
    const [editTaskDesc, setEditTaskDesc] = useState(children.modalItems.description) 
    const [errMsg, setErrMsg] = useState('')

    const handleEditTask = (e) => {
        e.preventDefault()
        updateTask(
            children.modalItems.id, 
            editTaskTitle.trim(), 
            editTaskDesc.trim()
        )
    }

    return (
        <>
            {/* this is modal dialog box */}
            <div className="modal fade" id={'modalEdit'+children.modalItems.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0"}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-pencil-square"></i> Update '{children.modalItems.title}'</h1>
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
                                {/* {errMsg ? <p className='text-sm text-danger fw-lighter text-center my-2'>{errMsg}</p> : null} */}
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
                                    data-bs-toggle="modal">Close</button>
                                <button 
                                    type="submit" 
                                    className="btn btn-sm btn-success"                                        
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