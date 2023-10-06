import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../stores/store'

const ProjectModal = ({ projModId, indicator }) => {
    const projRef = useRef()
    const [project, setProject] = useState('')
    const [isClose, setIsClose] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [isModalClose, setIsModalClose] = useState(false)

    const { projName, setProjName } = useStore(store => store) 

    useEffect(() => {
        let isModalShow =  document.querySelector(".show")
        setTimeout(() => {
            isModalShow !== null && projRef.current.focus()
        }, 500)
    }, [indicator])    

    useEffect(()=>{
        projName !== null ?
            setProject(projName) : setProject('')            
        setIsClose(false)
    },[isClose])

    useEffect(() => {
        setErrMsg('')
        setIsModalClose(false)

        const charLen = project.trim().length

        if (charLen === 0) 
            setErrMsg('This field is required!')
        else if (charLen <= 3) 
            setErrMsg('Project name must be more than 3 characters!')
        else if (charLen > 20)
            setErrMsg('Project name must be 3-20 characters only!')
        else{
            if (project.trim() !== projName) {
                setIsModalClose(true)
            }
        } 
            
    },[indicator, project])

    const submitProj = (e) => {
        e.preventDefault()
        if (!errMsg) {
            setProjName(project) 
        }       
        projRef.current.focus()
    }

    return (
        <>
            {/* this is modal dialog box */}
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id={projModId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0"}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-folder-plus"></i> Project Name</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                                onClick={()=>setIsClose(true)}
                            ></button>
                        </div>
                        <form onSubmit={submitProj}>
                            <div className="modal-body py-4">
                                
                                <div className="form-floating">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="Project name" 
                                        value = {project}
                                        onChange={(e) => 
                                            setProject(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                        }
                                        ref={projRef}
                                    />
                                    <label htmlFor="floatingInput">Project name</label>
                                </div>
                                {errMsg ? <p className='text-sm text-danger fw-lighter text-center my-2'>{errMsg}</p> : null}
                                
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-sm btn-secondary" 
                                    data-bs-dismiss="modal"
                                    onClick={()=>setIsClose(true)}
                                >Close</button>
                                <button 
                                    type="submit" 
                                    className="btn btn-sm btn-success"      
                                    data-bs-dismiss={!errMsg ? 'modal' : null}
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

export default ProjectModal