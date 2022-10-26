import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const ListTrip = ({ item, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.rows}>
                    <View style={styles.cols}>
                        <View style={styles.textGroup}>
                            <Text style={styles.textLabel}>Name:</Text>
                            <Text style={styles.textItem}>{item.name}</Text>
                        </View>
                        <View style={styles.textGroup}>
                            <Text style={styles.textLabel}>Destination:</Text>
                            <Text style={styles.textItem}>{item.destination}</Text>
                        </View>
                    </View>
                    <View style={styles.cols}>
                        <View style={styles.textGroup}>
                            <Text style={styles.textLabel}>Date:</Text>
                            <Text style={styles.textItem}>{item.dateTrip}</Text>
                        </View>
                        <View style={styles.textGroup}>
                            <Text style={styles.textLabel}>Require Assessment:</Text>
                            <Text style={styles.textItem}>{item.require}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListTrip

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.PRIMARY,
        padding: 10,
    },
    rows: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cols: {},
    textGroup: {
        paddingVertical: 5,
        flexDirection: "row",
    },
    textLabel: {
        color: colors.PRIMARY,
        fontWeight: "bold",
        fontSize: 14,
    },
    textItem: {
        fontSize: 14,
        paddingHorizontal: 10,
    }
})