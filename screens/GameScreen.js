import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, gameOverHandler } = props

    useEffect(() => {
        if (currentGuess === userChoice) {
            gameOverHandler(rounds)
        }
    }, [currentGuess, userChoice, gameOverHandler])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know that this is wrong', [{ text: 'Sorry', style: 'cancel' }])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
    }




    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} style={{ backgroundColor: Colors.secondary }}>Lower</MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} style={{ backgroundColor: Colors.primary }}>Greater</MainButton>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%'
    }
})

export default GameScreen
