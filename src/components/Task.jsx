import React, { useEffect, useState } from 'react'
import '../styles/task.css'
import { useStore } from '../stores/store'
import { format } from 'date-fns'
import EditTaskModal from './EditTaskModal'
import Swal from 'sweetalert2';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Task = ({ item }) => {
  const task = useStore((store) => 
        store.tasks.find((task) => task.id === item.id)
        )

  const { 
    arrState, 
    moveTask, 
    deleteTask, 
    displaySwalFire, 
    isDarkMode, 
    swalColor, 
    swalBg
  } = useStore(store => store)

  const [indicator, setIndicator] = useState(false)

  useEffect(()=>{
      setIndicator(indicator)
  },[indicator])

  const handleDeleteTask = (id, title) => {
    let delTitle = title
    Swal.fire({
      title: `Delete task "${delTitle}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: swalColor,
      background: swalBg, 
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.isConfirmed) {
        deleteTask(id)
        displaySwalFire(
          'Task deleted!', 
          `Task '${delTitle}' was successfully deleted!`, 
          3000, 
          swalColor, 
          swalBg
        )
      }
    })
  }

  const handleMoveTask = (id, title, description, state) =>{
    const date = new Date()
    const dateFomatted = format(date, 'yyyyMMddHHmmssT')
    moveTask(id, title, description, state, dateFomatted)
    displaySwalFire(
      'Status changed!', 
      `Task '${title}' has been moved to state '${state}'!`, 
      4000,
      swalColor,
      swalBg 
    )
  }

  const { 
    setNodeRef, 
    attributes, //used for dragging
    listeners, //used for dragging
    transform, //used for css
    transition, //used for css
    isDragging //returns true/false
  } = useSortable({
      id: task.id,
      data: {
          type: "Task", 
          task,
      }
  })

  const style = {
      transition,
      transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return <div 
            ref={setNodeRef}
            style={style}
            className={'my-2 rounded-3 shadow-sm task-drag mx-2 ' + (isDarkMode ? 'bg-dark' : 'border')}
        >

        </div>
  }

  return (
    <>
      <div 
        ref={setNodeRef}
        style={style} //apply styling
        className="card my-2 rounded-3 border-light-subtle shadow-sm mx-2"
      >
        <div className="card-body">
          <div className='d-flex justify-content-between'>
            <div className='align-self-center'><h6 className="card-title fs-6 text-secondary">{task.title}</h6></div>
            <div 
              //apply these to draggable content
              {...attributes} 
              {...listeners}
              className='rounded-3 align-self-start task-move'
            >
              <i className="fa-solid fa-grip-vertical text-secondary mt-1 mx-2 lh-sm"></i>
            </div>
          </div>  
          <div className='overflow-y-auto mt-3' style={{maxHeight: '7vh', minHeight: '4vh'}}>        
            <small><p className="card-text fst-italic">{task.description.trim().length !== 0 ? 
              task.description : 'Description...'}
            </p></small>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between text-body-secondary">
          <div>
            <button 
              type='button' 
              className={"btn btn-sm rounded-3 " + (!isDarkMode ? 'btn-light' : 'btn-outline-secondary')} 
              data-bs-toggle="modal" 
              data-bs-target={'#modal'+task.id}
            >
              <i className="bi bi-three-dots-vertical fs-6"></i>
            </button>

            {/* this is modal dialog box */}
            <div className="modal fade" id={'modal'+task.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0"}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-sliders"></i> {task.title}</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        
                        <div className="modal-body py-4 mb-3">
                            <p className="fs-6 fw-lighter mb-2 text-body-secondary">
                              <small><i className={"bi bi-circle-fill "+(task.state)}></i>&nbsp; {task.state}</small>
                            </p>
                            <ul className={"list-group list-group-flush border rounded-4 shadow-sm"}>
                                <li 
                                  className={(isDarkMode ? 'option-hover1' : 'option-hover') + " list-group-item fw-medium text-secondary"}                                   
                                  data-bs-target={'#modalEdit'+task.id}
                                  data-bs-toggle="modal"
                                  onClick={() => setIndicator(!indicator)}
                                >
                                    <i className="bi bi-pencil-square text-warning"></i> Edit
                                </li>
                                <li 
                                  className={(isDarkMode ? 'option-hover1' : 'option-hover') + " list-group-item fw-medium text-secondary"} 
                                  data-bs-dismiss="modal" 
                                  onClick={() => handleDeleteTask(task.id, task.title)}
                                >
                                    <i className="bi bi-x-circle text-danger"></i> Delete
                                </li>
                                <li 
                                  className={(isDarkMode ? 'option-hover1' : 'option-hover') + " list-group-item fw-medium text-secondary"} 
                                  type='button' 
                                  data-bs-toggle="collapse" 
                                  data-bs-target={"#collapse"+task.id} 
                                  aria-expanded="false" 
                                  aria-controls={"collapse"+task.id}  
                                >
                                    <i className="bi bi-shuffle text-success"></i> Change Status

                                    <ul className='collapse multi-collapse list-group mt-2 list-group-flush border rounded-4' id={"collapse"+task.id}>
                                      {arrState.map((dataState, index) => {
                                        if (dataState.state !== task.state) {
                                          return(
                                            <li 
                                              key={index} 
                                              className={(isDarkMode ? 'option-hover1' : 'option-hover') + ' list-group-item fw-medium text-secondary'} 
                                              data-bs-dismiss="modal"
                                              onClick={() => handleMoveTask(task.id, task.title, task.description, dataState.state)}
                                            >
                                              <small><i className={dataState.icon}></i>&nbsp; {dataState.state}</small>
                                            </li>)
                                        }
                                      })}
                                    </ul>
                                </li>
                                
                            </ul>

                        </div>                        
                    </div>
                </div>
            </div>
            {/* this is modal dialog box */}
            
            <EditTaskModal 
              modalItems={task}
              indicator={indicator}
            />

          </div>
          <div>
            <i className={"bi bi-circle-fill lh-lg mx-2 "+(task.state)}></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task