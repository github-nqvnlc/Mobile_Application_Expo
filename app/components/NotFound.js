import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundIcon from './roundIcon'
import colors from '../constants/colors'

const NotFound = () => {
    return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
            <RoundIcon
                antIconName={"frowno"}
                size={100}
                color={colors.PRIMARY}
                style={{
                    backgroundColor: "transparent",
                }}
            />
            <Text style={{
                color: colors.PRIMARY,
                fontSize: 20,
                marginTop: 20,
                textTransform: "uppercase"
            }}>Result not found</Text>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        zIndex: -1,
    },
})