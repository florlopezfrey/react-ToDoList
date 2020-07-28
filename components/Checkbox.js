import React from "react";
import { firebase } from "../firebase";
 
export const Checkbox = ({id}) => {
    const archiveTask = () => {
        firebase
            .firestore()
            .collection('tareas')
            .doc(id)
            .update({
                archivadas: true
            })
    };

    return (
        <div className="checkbox-holder" data-testid="checkbox-icon" onClick={() => archiveTask()}>
            <span className="checkbox" />
        </div>
    )
}