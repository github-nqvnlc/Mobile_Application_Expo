import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TripContext = createContext()

const TripProvider = ({ child }) => {
    const [trips, setTrips] = useState([])

    const findTrips = async () => {
        const trip = await AsyncStorage.getItem("trips")
        if (trip !== null) { setTrips(JSON.parse(trip)) }
    }

    useEffect(() => {
        findTrips()
    }, [])


    return (
        <TripContext.Provider value={{trips, setTrips, findTrips}}>
            {child}
        </TripContext.Provider>
    )
}

export const useTrips = () => useContext(TripContext)

export default TripProvider