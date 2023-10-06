import { create } from 'zustand'
import { format } from 'date-fns'
import Swal from 'sweetalert2';
//install using npm i uuid
import { v4 as uuid } from 'uuid'
//devtools is for debugging while persist is to save task in local storage
import { devtools, persist } from 'zustand/middleware'

const store = (set) => ({
    projName: null, 
    tasks: [],
    isTaskExist: false, 
    draggedTask: [],
    formatDate: null, 
    arrState: [
        {
        state: 'To-Do',
        icon: 'bi bi-view-list'
        }, 
        {
        state: 'In Progress',
        icon: 'bi bi-hourglass-split'
        }, 
        {
        state: 'For Testing',
        icon: 'bi bi-wrench-adjustable-circle'
        }, 
        {
        state:'Done',
        icon: 'bi bi-check-circle'
        }
    ],

    setProjName: (projTitle) => set({
        projName: projTitle
    }),

    setDateFormat: () => {
        const date = new Date()
        const dateFomatted = format(date, 'yyyyMMddHHmmssT')

        set({
            formatDate: dateFomatted
        })
    },

    addTask: (title, description, state) => {
        set(store => ({
            tasks: [
                {
                    id: uuid(), 
                    title: title.trim(), 
                    description: description.trim(), 
                    state: state.trim(),
                    date: store.formatDate, 
                }, ...store.tasks
            ]
        }))
    },

    validateTask: (title) => {
        title = title.trim().toUpperCase()

        set(store => ({
            isTaskExist: store.tasks.some(data => data.title.toUpperCase() === title)
        }))
    },

    setIsTaskExist: () => set({
        isTaskExist: false
    }, false, 'isTaskExist'),

    setDraggedTask: (id, title, description) => set(
        {draggedTask: [{
            id: id, 
            title: title, 
            description: description,
        }]},
        false, 
        'setDraggedTask'
    ), //set or determine task that has been dragged

    //move task or change it's previous state to it's dropped state
    moveTask: (id, title, description, state, date) => set(
        store => ({ 
            tasks: store.tasks.map(
                task => task.id === id ? {id, title, description, state, date} : task                
                )}
            ),
            false, 
            'moveTask'
    ),

    //update task
    updateTask: (id, title, description) => set(store => ({
        tasks: store.tasks.map(task => {
            if (task.id === id && (task.title !== title || task.description !== description)) {
                return {...task, title: title, description: description }
            }
            return task
        })
    })),

    deleteTask: (id) => set(
        store => (
            {tasks: store.tasks.filter(task => task.id !== id)}
        ), 
        false, 
        'deleteTask'
    ), //delete task to array tasks: []

    displaySwalFire: (swalTitle, swalText, oras) => { 
        Swal.fire({
            icon: 'success',
            title: `${swalTitle}`,
            text: `${swalText}`,
            // color: swalColor,
            // background: swalBg, 
            showConfirmButton: false,
            timer: oras
        });
    }

})

export const useStore = create(devtools(store), {name: 'store'})