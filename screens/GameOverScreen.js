import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'


const GameOverScreen = (props) => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game Over</TitleText>
                <View style={{
                    ...styles.imageContainer, ...{
                        width: availableDeviceWidth * 0.7,
                        height: availableDeviceWidth * 0.7,
                        borderRadius: (availableDeviceWidth * 0.7) / 2,
                        marginVertical: availableDeviceHeight / 30
                    }
                }}>
                    <Image
                        // source={require('../assets/success.png')}
                        fadeDuration={1000}
                        source={{ uri: 'https://cdn.theatlantic.com/thumbor/h1SQ7_gKxnhnN9Jdd2ylWT7GXJY=/720x405/media/img/mt/2020/06/JuddApatowYellow/original.jpg' }}
                        style={styles.image}
                        resizeMode='cover' />
                </View>
                <View style={{ ...styles.infoContainer, ...{ marginVertical: availableDeviceHeight / 60 } }}>
                    <BodyText style={{ ...styles.resultText, ...{ fontSize: availableDeviceHeight < 400 ? 16 : 20 } }}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton onPress={props.configureNewGameHandler}><Text>New Game</Text></MainButton>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageContainer: {
        borderWidth: 1,
        overflow: "hidden",

    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        marginHorizontal: 30,
    },
    highlight: {
        color: Colors.secondary,
        fontFamily: "open-sans-bold",
    },
    resultText: {
        textAlign: 'center',
    }
})

export default GameOverScreen
