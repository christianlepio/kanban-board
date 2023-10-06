import React, { useEffect, useState } from 'react'
import '../styles/task.css'
import { useStore } from '../stores/store'
import classNames from 'classnames' 
import { format } from 'date-fns'
import EditTaskModal from './EditTaskModal'
import Swal from 'sweetalert2';

const Task = ({ item, dropTask, setDropTask }) => {
  const task = useStore((store) => 
        store.tasks.find((task) => task.id === item.id)
        )

  const { 
    arrState, 
    moveTask, 
    setDraggedTask, 
    deleteTask, 
    setDateFormat,
    displaySwalFire 
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
      // color: swalColor,
      // background: swalBg, 
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.isConfirmed) {
        deleteTask(id)
        displaySwalFire('Task deleted!', `Task '${delTitle}' was successfully deleted!`, 3000)
      }
    })
  }

  const handleMoveTask = (id, title, description, state) =>{
    const date = new Date()
    const dateFomatted = format(date, 'yyyyMMddHHmmssT')
    moveTask(id, title, description, state, dateFomatted)
    displaySwalFire('Status changed!', `Task '${title}' has been moved to state '${state}'!`, 4000)
  }

  const handleDragStart = () => {
    setDraggedTask(task.id, task.title, task.description)
    setDropTask(true)
    setDateFormat()
  } //The user starts to drag an element

  const handleDragEnd = () => {
    setDraggedTask([])
    setDropTask(false)
    setDateFormat()
  } //The user has finished dragging an element

  return (
    <>
      <div 
        className={classNames("card mt-2 border-light-subtle mb-3 shadow-sm task ", {dropTask: dropTask})}
        draggable 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd} 
      >
        <div className="card-body">
          <h6 className="card-title fs-6 text-secondary">{task.title}</h6>
          <p className="card-text fs-6 fst-italic">{task.description.trim().length !== 0 ? 
            task.description : 'Description...'}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between text-body-secondary">
          <div>
            <button 
              type='button' 
              className="btn btn-sm btn-light" 
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
                                  className={"list-group-item option-hover fw-medium text-secondary"}                                   
                                  data-bs-target={'#modalEdit'+task.id}
                                  data-bs-toggle="modal"
                                  onClick={() => setIndicator(!indicator)}
                                >
                                    <i className="bi bi-pencil-square text-warning"></i> Edit
                                </li>
                                <li 
                                  className={"list-group-item option-hover fw-medium text-secondary"} 
                                  data-bs-dismiss="modal" 
                                  onClick={() => handleDeleteTask(task.id, task.title)}
                                >
                                    <i className="bi bi-x-circle text-danger"></i> Delete
                                </li>
                                <li 
                                  className={"list-group-item option-hover fw-medium text-secondary"} 
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
                                              className='list-group-item option-hover fw-medium text-secondary' 
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
            <i className={"bi bi-circle-fill lh-lg "+(task.state)}></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task