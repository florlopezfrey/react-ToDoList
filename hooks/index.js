import { useState, useEffect } from "react";
import moment from 'moment';
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers"; 

// esto se ejecuta solo cuando hay un proyecto seleccionado
export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]); // useState es una convención de React para setear lo que se necesita
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        // busca en firebase el user que le indico
        let unsubscribe = firebase
        .firestore()
        .collection('tareas')
        .where('userid', '==', '00001'); 

        // le paso el user y selectedproject y chequeo que NO exista eel proyecto en los collated Tasks (Entrada, hoy, proxs 7 dias)
        unsubscribe =
            selectedProject && !collatedTasksExist(selectedProject)
            // si se cumple lo anterior, entro y busco el id del proyecto
            ? (unsubscribe = unsubscribe.where('proyectoid', '==', selectedProject)) // ? es IF
            : selectedProject === 'HOY' // los 2 puntos equivalen a "else"
            ? (unsubscribe = unsubscribe.where(
                'fecha', '==', moment().format('DD/MM/YYYY')
            ))
            : selectedProject === 'ENTRADA' || selectedProject === 0
            ? (unsubscribe = unsubscribe.where('fecha', '==', ''))
            : unsubscribe;
        
        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({ // docs es propio  de firebase
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                // check si es en los proximos 7 días
                selectedProject === 'PROX_7'
                ? newTasks.filter(
                    task =>
                    moment(task.date, 'DD-MM-YYYY ').diff(moment(),'days') <= 7 &&  // diff es propio de moment 
                    task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            );
                    
            // esto devuelve todas las tareas que son iguales a true
            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('proyectos')
        .where('userid', '==', '00001')
        .orderBy('proyectoid')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));
            // para hacer setProjects tengo que evitar que entre en bucle infinito (porque al final esto llamando a proyectos entonces siempre entra)
            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            }
        });
    }, [projects]);

    return { projects, setProjects };
};



