import React, { useEffect, useState } from 'react'
import '../styles/toggleTheme.css'
// import LogoKo from '../assets/imgs/logoko.jpg'
import ProjectModal from './ProjectModal'
import AddTaskModal from './AddTaskModal'
import { useStore } from '../stores/store'

const ProjName = () => {
    const [indicator, setIndicator] = useState(false)
    const [btnBg, setBtnBg] = useState('')
    const { 
        projName, 
        isDarkMode, 
        setIsDarkMode, 
        setSwalColor, 
        setSwalBg 
    } = useStore(store => store)

    const handleEditProj = () => {
        setIndicator(!indicator)        
    }

    useEffect(() => {
        setIndicator(indicator)
    },[indicator])

    useEffect(() => {
        if (isDarkMode) {
            setIsDarkMode(true)
            document.querySelector("html").setAttribute('data-bs-theme', 'dark');
            setBtnBg('bg-warning border-warning')
            setSwalColor('#f8f9fa')
            setSwalBg('#212529')
        }else{
            setSwalColor(null)
            setSwalBg(null) 
        }
    },[isDarkMode])

    const toggleThemeBtn = (e) => {
        if (e.target.checked) {
            setIsDarkMode(true)
        }else{
            setIsDarkMode(false)
            document.querySelector("html").setAttribute('data-bs-theme', 'light');
            setBtnBg('')
        }
    }

    return (
        <>
            <div className={'rounded-3 px-3 shadow-sm mt-3 border-top border-info border-5 ' + (isDarkMode ? 'projHeader' : null)}>
                <div className='d-flex justify-content-between border-bottom py-2'>
                    <div className='pt-1'>
                        <span className={'fs-5 fw-bold ' + (!isDarkMode ? 'text-secondary' : null)}><i className="bi bi-kanban fs-5"></i> KANBAN</span>
                    </div>

                    <div className="d-flex justify-content-end">
                        <i className={(isDarkMode ? 'bi bi-moon-stars' : 'bi bi-brightness-low-fill text-warning') + "  lh-lg fs-6 mx-2 align-self-center"}></i> &nbsp;
                        <div className='form-check form-switch align-self-center'>                    
                            <input 
                                className={"toggleBtn form-check-input "+btnBg} 
                                type="checkbox" 
                                role="switch" 
                                id="flexSwitchCheckChecked" 
                                onChange={toggleThemeBtn} 
                                defaultChecked={isDarkMode} 
                            />                    
                        </div>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between py-2 mt-1'>
                    <div>
                        <h6 className={"fs-6 lh-lg mt-1 mx-2 " + (!isDarkMode ? 'text-secondary' : null)}>{projName ? projName : 'Project-name'}
                            &nbsp;<span 
                                    className={'rounded-pill py-1 px-2 ' + (!isDarkMode ? 'hover-pen' : 'hover-pen1')}
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
                                className={"btn btn-sm rounded-4 lh-lg " + (!isDarkMode ? 'btn-light text-secondary' : 'btn-outline-secondary')}
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