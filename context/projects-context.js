import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks';

// context ayuda a pasar data entre los componentes del reat tree sin usar props

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => { // el provider suele ser el top level que pasa la info a los consumers
    
    const { projects, setProjects } = useProjects(); // vienen de Hooks
    
    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjectsValue = () => useContext(ProjectsContext);
