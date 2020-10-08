import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton';
// import * as ScreenOrientation from 'expo-screen-orientation'


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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>Round {numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)

const GameScreen = (props) => {

    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)


    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, gameOverHandler } = props

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [])

    useEffect(() => {
        if (currentGuess === userChoice) {
            gameOverHandler(pastGuesses.length)
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
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess:</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} style={{ backgroundColor: Colors.secondary }}><Ionicons name='md-remove' size={24} color='white' /></MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} style={{ backgroundColor: Colors.primary }}><Ionicons name='md-add' size={24} color='white' /></MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{ ...styles.buttonContainer, ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 } }}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} style={{ backgroundColor: Colors.secondary }}><Ionicons name='md-remove' size={24} color='white' /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} style={{ backgroundColor: Colors.primary }}><Ionicons name='md-add' size={24} color='white' /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View >
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
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 500 ? '80%' : '100%',
        marginTop: 15
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

export default GameScreen
