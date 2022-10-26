import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../../constants/colors'
import ListTrip from './ListTrip'
import TripsModal from './TripsModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTrips } from '../../contexts/TripProvider'

const TripDetail = (props) => {
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [trip, setTrip] = useState(props.route.params.item)
  console.log(props)

  const deleteTrip = async () => {
    const result = await AsyncStorage.getItem("trips");
    let trips = []
    if (result !== null) {
      trips = JSON.parse(result)
    }

    const newTrips = trips.filter(t => t.id !== trip.id)
    // setTrips(newTrips)
    await AsyncStorage.setItem("trips", JSON.stringify(newTrips))
    props.navigation.goBack()
  }
  const handleSubmitEdit = async (name, destination, dateTrip, require, descr) => {
    const result = await AsyncStorage.getItem('trips')
    let trips = []
    if (result !== null) {
      trips = JSON.parse(result)
    }

    const newTrips = trips.filter(t => {
      if (t.id === trip.id) {
        t.name = name
        t.destination = destination
        t.dateTrip = dateTrip
        t.require = require
        t.descr = descr
        setTrip(t)
      }
      return t
    })
    await AsyncStorage.setItem("trips", JSON.stringify(newTrips))
    setShow(!show)
  }

  const openExpenses = (item) => {
    props.navigation.navigate("Expense Detail", { item })
  }

  const handleDelete = () => {
    Alert.alert(
      "Are you sure?",
      "This action will delete your trip permamently!",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteTrip()
            console.log("delete done!")
          }
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel done!")
          }
        }
      ]
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.detailGroup}>
        <View style={styles.rows}>
          <View style={styles.cols}>
            <Text style={styles.labelText}>Name trip:</Text>
            <Text style={styles.labelText}>Destination:</Text>
            <Text style={styles.labelText}>Day of trip:</Text>
            <Text style={styles.labelText}>Require Assessment:</Text>
            <Text style={styles.labelText}>Description:</Text>
          </View>
          <View style={styles.cols}>
            <Text style={styles.itemText}>{trip.name}</Text>
            <Text style={styles.itemText}>{trip.destination}</Text>
            <Text style={styles.itemText}>{trip.dateTrip}</Text>
            <Text style={styles.itemText}>{trip.require}</Text>
            <Text style={styles.itemText}>{trip.descr}</Text>
          </View>

        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => {
          setShow(true)
          setIsEdit(true)
        }}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Edit Trip</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <View style={styles.buttonDelete}>
            <Text style={styles.textButton}>Delete trip</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TripsModal
        title="Edit trip"
        visible={show}
        trip={trip}
        isEdit={isEdit}
        onClose={() => { setShow(!show) }}
        onSubmit={handleSubmitEdit}
      />
    </View>
  )
}

export default TripDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  detailGroup: {
    padding: 15,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 15
  },
  rows: {
    flexDirection: "row",
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.PRIMARY,
    marginVertical: 10,
  },
  itemText: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonGroup: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.PRIMARY,
    height: 30,
    borderRadius: 7,
    marginHorizontal: 15,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 20,
    color: colors.LIGHT,
  },
  buttonDelete: {
    backgroundColor: colors.ERROR,
    height: 30,
    borderRadius: 7,
    marginHorizontal: 15,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroupExpense: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonExpense: {
    backgroundColor: colors.PRIMARY,
    height: 30,
    borderRadius: 7,
    width: 200,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
})