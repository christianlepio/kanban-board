import React, { useEffect, useState } from 'react'
import '../styles/toggleTheme.css'
// import LogoKo from '../assets/imgs/logoko.jpg'
import ProjectModal from './ProjectModal'
import AddTaskModal from './AddTaskModal'
import { useStore } from '../stores/store'

const ProjName = () => {
    const [indicator, setIndicator] = useState(false)
    const { projName } = useStore(store => store)

    const handleEditProj = () => {
        setIndicator(!indicator)        
    }

    useEffect(()=>{
        setIndicator(indicator)
    },[indicator])

    return (
        <>
            <div className='rounded-3 px-3 shadow-sm mt-3 border-top border-info border-5'>
                <div className='d-flex justify-content-between border-bottom py-2'>
                    <div className='pt-1'>
                        <span className='fs-5 fw-bold text-secondary'><i className="bi bi-kanban fs-5"></i> KANBAN</span>
                    </div>

                    <div className="d-flex justify-content-end">
                        <i className="bi bi-brightness-low text-warning lh-lg fs-6 mx-2 align-self-center"></i>
                        <div className='form-check form-switch align-self-center'>                    
                            <input 
                                className={"toggleBtn form-check-input "} 
                                type="checkbox" 
                                role="switch" 
                                id="flexSwitchCheckChecked" 
                                // onChange={toggleThemeBtn} 
                                // defaultChecked={selectedTheme === 'dark'} 
                            />                    
                        </div>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between py-2 mt-1'>
                    <div>
                        <h6 className="fs-6 text-secondary lh-lg mt-1 mx-2">{projName ? projName : 'Project-name'}
                            &nbsp;<span 
                                    className='hover-pen rounded-pill py-1 px-2'
                                    data-bs-toggle="modal" 
                                    data-bs-target="#projModal"
                                    onClick={handleEditProj}
                                    ><i 
                                        type="button" 
                                        className="bi bi-pen"
                                    >
                                </i></span>
                            &nbsp;
                        </h6>
                    </div>
                    {projName !== null && 
                        <div>
                            <button 
                                className="btn btn-light btn-sm rounded-4 text-secondary lh-lg"
                                data-bs-toggle="modal" 
                                data-bs-target="#addTaskModal"
                                onClick={handleEditProj}
                            >
                                <i className="bi bi-plus-circle"></i> Task
                            </button>
                        </div>
                    }
                </div>

                <ProjectModal 
                    projModId={'projModal'} 
                    indicator={indicator}
                />

                <AddTaskModal 
                    projModId={'addTaskModal'}
                    indicator={indicator}
                />


            </div>
        </>
    )
}

export default ProjName