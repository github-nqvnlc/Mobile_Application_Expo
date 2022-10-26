import { Alert, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import colors from '../constants/colors'
import RoundIcon from '../components/roundIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Intro({onfinish}) {
    const [name, setName] = useState("")
    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onfinish) onfinish()
    }
    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.textLabel}>Enter Your Name to Continue </Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    placeholder='Enter your name ...' style={styles.textInput} />
                {name.trim().length > 2 ? <RoundIcon antIconName={"arrowright"} onPress={handleSubmit} /> : null}
            </View>
        </>
    )
}

const width = Dimensions.get("window").width - 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textLabel: {
        paddingVertical: 20,
        fontSize: 20,
        color: colors.PRIMARY,
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: colors.PRIMARY,
        marginBottom: 10,
    }
})