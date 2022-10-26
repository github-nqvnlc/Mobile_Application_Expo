import { Keyboard, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../constants/colors'
import SearchBar from '../../components/SearchBar'
import RoundIcon from '../../components/roundIcon'
import TripsModal from './TripsModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListTrip from './ListTrip'
import { useTrips } from '../../contexts/TripProvider'
import NotFound from '../../components/NotFound'


const Trip = ({ user, navigation }) => {
    const [greet, setGreet] = useState("Morning")
    const [show, setShow] = useState(false)
    const [trips, setTrips] = useState([])
    const [search, setSearch] = useState("")
    const [tripSearch, setTripSearch] = useState([])
    const [resultNotFound, setResultNotFound] = useState(false)

    const findTrips = async () => {
        const trip = await AsyncStorage.getItem("trips")
        if (trip !== null) { setTrips(JSON.parse(trip)) }
    }
    const handleChangeTextSearch = async (text) => {
        setSearch(text);
        console.log(!text.trim())
        if (!text.trim()) {
            setSearch("")
            setTripSearch([])
            setResultNotFound(false)
            return await findTrips()
        }
        const filterTrip = trips.filter(trip => {
            if (trip.name.toLowerCase().includes(text.toLowerCase())
                || trip.destination.toLowerCase().includes(text.toLowerCase())
                || trip.dateTrip.toLowerCase().includes(text.toLowerCase())
            ) {
                return trip
            }
        })
        if (filterTrip.length) {
            setTripSearch([...filterTrip])
        } else {
            setResultNotFound(true)
        }
    }
    
    const handleClearSearch = async () => {
        setSearch("")
        setTripSearch([])
        setResultNotFound(false)
        return await findTrips()
    }
    

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) return setGreet("Morning");
        if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
        setGreet("Evening")
    }

    useEffect(() => {
        findGreet()
        findTrips()
    }, [trips])


    const handleSubmit = async (name, destination, dateTrip, require, descr) => {

        const trip = {
            id: Date.now(),
            name: name,
            destination: destination,
            dateTrip: dateTrip,
            require: require,
            descr: descr,
            expenses: [{
                id: Date.now(),
                name: undefined,
                dateExpense: undefined,
                amount: undefined
            }]
        }
        const updateTrips = [...trips, trip]
        setTrips(updateTrips)
        await AsyncStorage.setItem("trips", JSON.stringify(updateTrips))
    }

    const openTripDetail = (item) => {
        navigation.navigate("Trip Detail", { item })
    }
    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <TouchableWithoutFeedback onPress={
                Keyboard.dismiss
            }>
                <View style={styles.container}>
                    <Text style={styles.headerText}>{`Good ${greet}, ${user.name}`}</Text>
                    {trips.length ? (
                        <SearchBar value={search} onChangeText={handleChangeTextSearch} onClear={handleClearSearch} />
                    ) : null}
                    {resultNotFound ? <NotFound /> : <FlatList
                        style={{ marginTop: 15 }}
                        data={search ? tripSearch.reverse() : trips.reverse()}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <ListTrip onPress={() => openTripDetail(item)} item={item} />} />}

                    {!trips.length ? (
                        <View style={[StyleSheet.absoluteFill, styles.containerEmpty]}>
                            <Text style={styles.textEmpty}>Add Trips</Text>

                        </View>
                    ) : null}
                    <RoundIcon onPress={() => {
                        setShow(!show)
                    }} antIconName="plus" style={styles.addButton} />
                </View>
            </TouchableWithoutFeedback>
            <TripsModal
                title="Add new trip"
                visible={show}
                onClose={() => { setShow(!show) }}
                onSubmit={handleSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        paddingHorizontal: 15,
        paddingVertical: 35,
    },
    textEmpty: {
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "bold",
        opacity: 0.2,
    },
    containerEmpty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -99,
    },
    addButton: {
        position: "absolute",
        right: 50,
        bottom: 70,
    }

})

export default Trip;