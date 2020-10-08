import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
            <View style={{ ...styles.button, ...props.style }}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 10,
        textAlign: 'center',

    }
})

export default MainButton