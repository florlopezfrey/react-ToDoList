import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => { // el provider suele ser el top level que pasa la info a los consumers
    
    const [ selectedProject, setSelectedProject ] = useState('ENTRADA'); // vienen de Hooks
    
    return (
        <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </SelectedProjectContext.Provider>
    );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);

