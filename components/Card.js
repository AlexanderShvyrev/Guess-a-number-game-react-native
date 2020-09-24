import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = (props) => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
}
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //for androids only
        backgroundColor: 'white',
        padding: 20,
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 10
    }
})



export default Card
