import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Creamos el contexto
export const PreviousLocationContext = createContext();

// Proveedor del contexto
export const PreviousLocationProvider = ({ children }) => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(location.pathname + location.hash);

    useEffect(() => {
        // Antes de actualizar la ubicación actual, guardamos la anterior
        setPrevLocation(currentLocation);
        setCurrentLocation(location.pathname + location.hash);
    }, [location]);

    return (
        <PreviousLocationContext.Provider value={prevLocation}>
            {children}
        </PreviousLocationContext.Provider>
    );
};
