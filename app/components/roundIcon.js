import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Pressable } from "@react-native-material/core";

const RoundIcon = ({ antIconName, size, color, style, onPress }) => {
    return (
        <TouchableWithoutFeedback 
            onPress={onPress}
        >
            <View
                style={[styles.icon, { ...style }]}
            >
                <AntDesign
                    name={antIconName}
                    size={size || 24}
                    color={color || colors.LIGHT}
                />
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 20,

    },
});

export default RoundIcon;
