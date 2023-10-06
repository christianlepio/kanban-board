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
    isDarkMode: false,
    draggedTask: [],
    formatDate: null, 
    swalColor: null,
    swalBg: null,
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

    setIsDarkMode: (val) => set({
        isDarkMode: val
    }),

    setSwalColor: (colorVal) => set({
        swalColor: colorVal
    }),

    setSwalBg: (bgColorVal) => set({
        swalBg: bgColorVal
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
    }, //add new task

    validateTask: (title) => {
        title = title.trim().toUpperCase()

        set(store => ({
            isTaskExist: store.tasks.some(data => data.title.toUpperCase() === title)
        }))
    }, //validate if task already exist

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

    displaySwalFire: (swalTitle, swalText, oras, txtClr, txtBg) => { 
        Swal.fire({
            icon: 'success',
            title: `${swalTitle}`,
            text: `${swalText}`,
            color: txtClr, //'#f8f9fa'
            background: txtBg, //'#212529' 
            showConfirmButton: false,
            timer: oras
        });
    }//display alert messages

})

export const useStore = create(persist(devtools(store), {name: 'store'}))