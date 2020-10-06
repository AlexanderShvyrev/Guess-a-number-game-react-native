import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game Over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    // source={require('../assets/success.png')}
                    fadeDuration={1000}
                    source={{ uri: 'https://content.instructables.com/ORIG/FGE/F6F0/K1NVATVK/FGEF6F0K1NVATVK.jpg?frame=1' }}
                    style={styles.image}
                    resizeMode='cover' />
            </View>
            <View style={styles.infoContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <MainButton onPress={props.configureNewGameHandler}><Text>New Game</Text></MainButton>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 1,
        overflow: "hidden",
        marginVertical: 30

    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        marginHorizontal: 30,
        marginVertical: 20
    },
    highlight: {
        color: Colors.secondary,
        fontFamily: "open-sans-bold",
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
})

export default GameOverScreen
