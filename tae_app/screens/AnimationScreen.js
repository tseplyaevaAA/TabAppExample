import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Easing, Image, ScrollView, Animated as animated, TouchableOpacity, Text } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import CustomButton from '../components/CustomButton';
import { MAIN_INFO_TITLE_COLOR, NAME_COLOR, WHITE_COLOR } from '../styles/color';
import { REACT, ROCKET } from '../styles/images';
import { scale } from '../utility/utility';

import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';



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

    //the third animation
    const rotation = useSharedValue(0);
    const translateY = useSharedValue(0);
    const [thirdUsed, setThirdUsed] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            //transform: [{ translateX: offset.value * 255 }],
            transform: [{ rotateZ: `${rotation.value}deg` }]
        };
    });

    const animatedStyleParent = useAnimatedStyle(() => {
        return {
            //transform: [{ translateX: offset.value * 255 }],
            transform: [{ translateY: translateY.value }]
        };
    });

    function start3() {
        setThirdUsed(!thirdUsed)
        rotation.value = withRepeat(withTiming(90, { duration: 1500 }), -1, true)
        translateY.value = withRepeat(withSequence(withTiming(-50, { duration: 750 }),
            withTiming(0, { duration: 750 }),
            withTiming(50, { duration: 750 }),
            withTiming(0, { duration: 750 }),
        ), -1, true)
    }

    function stop3() {
        setThirdUsed(!thirdUsed)
        //rotation.value = rotation.value //will stop rotation where it stopped working incorrect for now
        rotation.value = 0
        translateY.value = 0
    }

    return (
        <BackgroundView>
            <View style={{ margin: scale(10), backgroundColor: WHITE_COLOR, borderRadius: 10 }}>
                <Text style={styles.textStyle}>{!firstUsed ? 'Press the icon' : 'Press again'}</Text>
                <animated.View style={{ transform: [{ translateX: translateX }], opacity, height: scale(20), width: scale(20), }}>
                    <TouchableOpacity onPress={startAnimateFirst}>
                        <Image style={{ height: scale(20), width: scale(20) }} source={REACT}></Image>
                    </TouchableOpacity>
                </animated.View>
            </View>
            <View style={{ flexDirection: 'row', height: scale(20), backgroundColor: WHITE_COLOR, margin: scale(10), borderRadius: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <animated.View
                    style={
                        {
                            opacity: fadeAnim
                        }}
                >
                    <Image style={{ height: scale(20), width: scale(20) }} source={REACT}></Image>
                </animated.View>
                <CustomButton text={!secondUsed ? 'Show' : 'Hide'} action={!secondUsed ? fadeIn : fadeOut}></CustomButton>
            </View>
            <View style={{padding:scale(5), flexDirection: 'row', height: 'auto', backgroundColor: WHITE_COLOR, margin: scale(10), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[{ height: scale(60), width: scale(60), backgroundColor: '#3b3673', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }]}>
                    <Animated.View style={[{ height: scale(20), width: scale(20) }, animatedStyleParent]}>
                        <Animated.View style={[{ height: scale(20), width: scale(20), justifyContent: 'center', alignItems: 'center' },
                            animatedStyle]}>
                            <Image style={{ height: scale(20), width: scale(20) }} source={ROCKET}></Image>
                        </Animated.View>
                    </Animated.View>
                </View>
                    <CustomButton text={!thirdUsed ? 'Start' : 'Stop'} action={!thirdUsed ? start3 : stop3}></CustomButton>
            </View>

        </BackgroundView>
    )
}

const styles = StyleSheet.create({

    textStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: NAME_COLOR,
    },

});

export default AnimationScreen;