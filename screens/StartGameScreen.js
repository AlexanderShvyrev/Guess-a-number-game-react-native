import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';



const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Enter number between 1 and 99', [{ text: "Okay", style: 'destructive', onPress: resetInputHandler }])
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton style={{ backgroundColor: Colors.primary }} onPress={() => props.startGameHandler(selectedNumber)}>Start Game</MainButton>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} >
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <MainButton
                                onPress={resetInputHandler}
                                style={{ backgroundColor: Colors.secondary }}>Reset</MainButton>
                        </View>
                        <View style={styles.button}>
                            <MainButton
                                style={{ backgroundColor: Colors.primary }}
                                onPress={confirmInputHandler}
                            >Confirm</MainButton>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    button: {
        width: 100,

    },
    input: {
        width: 50,
        textAlign: 'center',
        color: Colors.primary
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
})

export default StartGameScreen
