import { Modal, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { HStack, IconButton } from "@react-native-material/core";
import React, { useEffect, useState } from 'react'
import RoundIcon from '../../components/roundIcon'
import colors from '../../constants/colors';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

import moment from "moment";

const TripsModal = ({ trip, isEdit, title, visible, onClose, onSubmit }) => {
    const [date, setDate] = useState(new Date);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [name, setName] = useState("")
    const [destination, setDestination] = useState("")
    const [dateTrip, setDateTrip] = useState(`${moment(date).format("DD/MM/YYYY")}`)
    const [checked, setChecked] = useState('Yes');
    const [descr, setDescr] = useState("")

    useEffect(() => {
        if (isEdit) {
            setName(trip.name);
            setDestination(trip.destination);
            setDateTrip(trip.dateTrip);
            setChecked(trip.require);
            setDescr(trip.descr);
        }
    }, [isEdit])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setDateTrip(moment(currentDate).format("DD/MM/YYYY"))
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const onChangeInput = (text, value) => {
        if (value === 'name') setName(text);
        if (value === "destination") setDestination(text)
        if (value === "descr") setDescr(text)
    }

    const handleSubmit = () => {
        if (!name.trim() && !destination.trim() && !dateTrip.trim() && !checked.trim()) return onClose()
        if (isEdit) {
            onSubmit(name, destination, dateTrip, checked, descr)
        } else {
            if (name === '' || destination === '' || dateTrip === '' || checked === '') return Alert.alert("Missing input")
            onSubmit(name, destination, dateTrip, checked, descr)
            setName("")
            setDestination("")
            setDescr("")
            setDate(new Date)
            setShow(false)
            onClose();
        }

    }

    const handleCloseModal = () => {
        onClose();
    }
    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType="slide">
                <TouchableOpacity onPress={() => handleCloseModal()}>
                    <View style={styles.header}>
                        <RoundIcon antIconName={"close"} color={colors.PRIMARY} style={{ backgroundColor: colors.LIGHT, padding: 0 }} />
                        <Text style={{
                            fontSize: 20,
                            color: colors.PRIMARY,
                            paddingHorizontal: 5,
                        }}>Close</Text>
                    </View>
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => {
                    setShow(false);
                    Keyboard.dismiss;
                }
                } accessible={false}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                        <Text style={styles.headerText}>{title}</Text>
                        <View style={styles.formContainer}>
                            <Text style={styles.labelInput}>Name trip:</Text>
                            <TextInput value={name} onChangeText={(text) => onChangeInput(text, "name")} style={styles.textInput} />
                            <Text style={styles.labelInput}>Destination:</Text>
                            <TextInput value={destination} onChangeText={(text) => onChangeInput(text, "destination")} style={styles.textInput} />
                            <Text style={styles.labelInput}>
                                Date of the Trip:
                            </Text>
                            <Text style={styles.pickTime} onPress={() => { setShow(!show) }}>{dateTrip}</Text>
                            <View
                                style={{
                                    display: show === true ? "block" : "none",
                                    backgroundColor: colors.LIGHT,
                                    marginBottom: 20,
                                }}
                            >
                                <RNDateTimePicker
                                    style={{
                                        height: 100,
                                        backgroundColor: colors.GREYGREEN,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    dateFormat="DD-MM-YYY"
                                    onChange={onChange}
                                    display="spinner"
                                />
                            </View>
                            <Text style={styles.labelInput}>Require Risks Assessment:</Text>
                            <View style={styles.radioGroup}>
                                <View style={styles.radioLabelGroup}>
                                    <Text style={styles.radioButtonLabel}>Yes:</Text>
                                    <View style={styles.radioButton}>
                                        <RadioButton
                                            color={colors.PRIMARY}
                                            value="Yes"
                                            status={checked === 'Yes' ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked('Yes')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.radioLabelGroup}>
                                    <Text style={styles.radioButtonLabel}>No:</Text>
                                    <View style={styles.radioButton}>
                                        <RadioButton
                                            color={colors.PRIMARY}
                                            value="No"
                                            status={checked === 'No' ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked('No')}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.labelInput}>Description:</Text>
                            <TextInput value={descr} onChangeText={(text) => onChangeInput(text, "descr")} style={styles.textInput} />
                            <View style={styles.submitButtonGroup}>
                                <RoundIcon
                                    style={{
                                        marginHorizontal: 10,
                                    }}
                                    onPress={handleSubmit}
                                    antIconName="check" />
                                <RoundIcon
                                    style={{
                                        marginHorizontal: 10,
                                    }}
                                    onPress={handleCloseModal}
                                    antIconName="close" />
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default TripsModal

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    backIcon: {
        height: "auto",
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        position: "fixed",
        width: "100%",
    },
    headerText: {
        fontSize: 25,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 20,
        color: colors.PRIMARY,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
    },
    labelInput: {
        padding: 0,
        fontSize: 20,
        color: colors.PRIMARY,
        fontWeight: "bold",
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        color: colors.PRIMARY,
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 25,
    },
    pickTime: {
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        color: colors.PRIMARY
    },
    radioButtonLabel: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: colors.PRIMARY,
    },
    radioButton: {
        width: 40,
        height: 40,
        borderColor: colors.PRIMARY,
        borderWidth: 2,
        borderRadius: 50,
        padding: 0,
    },
    radioLabelGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        paddingVertical: 20,
    },
    submitButtonGroup: {
        flexDirection: "row",
        justifyContent: "center",
    }

})