import React from "react";
import { FaChevronDown, FaInbox, FaCalendarAlt, FaRegCalendar  } from 'react-icons/fa';

export const Sidebar = () => (
    <div className="sidebar" data-testid="sidebar">
        <ul className="sidebar__generic">
            <li data-testid="inbox" className="inbox">
                <span><FaInbox/></span><span>Entrada</span>
                </li>
            <li data-testid="today" className="today">
                <span><FaRegCalendar/></span><span>Hoy</span>
            </li>
            <li data-testid="next_7" className="next_7">
                <span><FaCalendarAlt/></span><span>Próximos 7 días</span>
            </li>
        </ul>

        <div className="sidebar__middle">
            <FaChevronDown/>
            <h2>Proyectos</h2>
        </div>

        <ul className="sidebar__proyectos">
            aca van los proyectos
        </ul>

        aca va un Add-Proyect component
    </div>
);