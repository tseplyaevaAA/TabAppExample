import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Easing, Image, Animated as animated, TouchableOpacity, Text } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import CustomButton from '../components/CustomButton';
import { NAME_COLOR, WHITE_COLOR } from '../styles/color';
import { REACT } from '../styles/images';
import { scale } from '../utility/utility';


import RocketAnimation from '../components/RocketAnimation';

const AnimationScreen = (props) => {

    const [firstUsed, setFirstUsed] = useState(false)
    const [secondUsed, setSecondUsed] = useState(false)

    useEffect(() => {
        console.log('hello')
    });

    //the first animation
    const animate_state = {
        start: 0,
        end: 100
    }

    const value = useRef(new animated.Value(animate_state.start)).current

    const startAnimateFirst = () => {
        setFirstUsed(!firstUsed)
        animated.timing(value, { toValue: firstUsed ? animate_state.start : animate_state.end, useNativeDriver: true, duration: 1500, easing: Easing.bounce }).start()
    }

    const inputRange = [animate_state.start, animate_state.end]
    const translateX = value.interpolate({ inputRange, outputRange: [0, scale(100)] })
    const opacity = value.interpolate({ inputRange, outputRange: [1, 0.2] })

    //the second animation
    const fadeAnim = useRef(new animated.Value(0)).current;
    const fadeIn = () => {
        setSecondUsed(!secondUsed)
        animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        setSecondUsed(!secondUsed)
        animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <BackgroundView>
            <View style={styles.firstAnim}>
                <Text style={styles.textStyle}>
                    {!firstUsed ? 'Press the icon' : 'Press again'}
                </Text>
                <animated.View style={{ transform: [{ translateX: translateX }], opacity, height: scale(20), width: scale(20), }}>
                    <TouchableOpacity onPress={startAnimateFirst}>
                        <Image style={styles.image} source={REACT}></Image>
                    </TouchableOpacity>
                </animated.View>
            </View>
            <View style={styles.secondAnim}>
                <animated.View
                    style={
                        { opacity: fadeAnim }}>
                    <Image style={styles.image} source={REACT}></Image>
                </animated.View>
                <CustomButton text={!secondUsed ? 'Show' : 'Hide'} action={!secondUsed ? fadeIn : fadeOut}></CustomButton>
            </View>
            <RocketAnimation />
        </BackgroundView >
    )
}

const styles = StyleSheet.create({

    textStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: NAME_COLOR,
    },
    firstAnim:
    {
        margin: scale(10),
        backgroundColor: WHITE_COLOR,
        borderRadius: 10
    },
    image: {
        height: scale(20),
        width: scale(20)
    },
    secondAnim: {
        flexDirection: 'row',
        height: scale(20),
        backgroundColor: WHITE_COLOR,
        margin: scale(10),
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

});

export default AnimationScreen;