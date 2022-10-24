import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { WHITE_COLOR } from '../styles/color';
import { scale } from '../utility/utility';
import CustomButton from './CustomButton';
import Animated, { Clock, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { ROCKET, STAR } from '../styles/images';

var starInterval;
var starBackInterval;
var starInterval1;
var starBackInterval1;
var starInterval2;
var starBackInterval2;

const RocketAnimation = (props) => {

    //the third animation
    const rotation = useSharedValue(0);
    const translateY = useSharedValue(0);
    const translatex = useSharedValue(0);
    const translatex1 = useSharedValue(0);
    const translatex2 = useSharedValue(0);

    const [thirdUsed, setThirdUsed] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }]
        };
    });

    const animatedStyleParent = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    const animatedStyleStar = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translatex.value, }],
            opacity: translatex.value < -2 && translatex.value > -166 ? 1 : 0,
            //backgroundColor:translatex.value < -1 && translatex.value > -166 ? "#c8f5fa" : '#e33434',
        };
    });

    const animatedStyleStar1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translatex1.value, }],
            opacity: translatex1.value < -2 && translatex1.value > -166 ? 1 : 0,
        };
    });

    const animatedStyleStar2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translatex2.value, }],
            opacity: translatex2.value < -2 && translatex2.value > -166 ? 1 : 0,
            //backgroundColor:translatex2.value < -2 && translatex2.value > -175 ? "#c8f5fa" : '#e33434',
        };
    });

    function start3() {
        setThirdUsed(!thirdUsed)
        //translatex.value = withRepeat(withTiming(translatex.value - scale(28), { duration: 1500 }), -1, true)
        starInterval = setInterval(() => {
            translatex.value = withTiming(translatex.value - scale(62), { duration: 1500 })
            //translatex1.value = withTiming(translatex1.value - scale(62), { duration: 1500 })
            translatex2.value = withTiming(translatex2.value - scale(62), { duration: 1500 })
        }, 1500)

        starBackInterval = setInterval(() => {
            translatex.value = 0
            //translatex1.value = 0
            translatex2.value = 0
        }, 3000)

        setTimeout(() => {
            starInterval1 = setInterval(() => {
                translatex1.value = withTiming(translatex1.value - scale(62), { duration: 1500 })
            }, 1500)
            starBackInterval1 = setInterval(() => {
                translatex1.value = 0
            }, 3000)
        }, 1000)

        setTimeout(() => {
            starInterval2 = setInterval(() => {
                translatex2.value = withTiming(translatex2.value - scale(62), { duration: 1500 })
            }, 1500)
            starBackInterval2 = setInterval(() => {
                translatex2.value = 0
            }, 3000)
        }, 2000)


        rotation.value = withRepeat(withSequence(withTiming(-45, { duration: 750 }),
            withTiming(0, { duration: 750 }),
            withTiming(45, { duration: 750 }),
            withTiming(0, { duration: 750 }),
            withTiming(45, { duration: 750 }),
            withTiming(0, { duration: 750 }),
            withTiming(-45, { duration: 750 }),
            withTiming(0, { duration: 750 }),
        ), -1, true)

        translateY.value = withRepeat(withSequence(withTiming(-50, { duration: 1500 }),
            withTiming(0, { duration: 1500 }),
            withTiming(50, { duration: 1500 }),
            withTiming(0, { duration: 1500 }),
        ), -1, true)
    }

    function stop3() {
        setThirdUsed(!thirdUsed)
        clearInterval(starInterval)
        clearInterval(starBackInterval)
        clearInterval(starInterval1)
        clearInterval(starBackInterval1)
        clearInterval(starInterval2)
        clearInterval(starBackInterval2)
        translatex.value = 0
        rotation.value = 0
        translateY.value = 0
        translatex1.value = 0
        translatex2.value = 0
    }

    return (
        <View style={styles.thirdAnim}>
            <View style={styles.buttonContainer}>
                <CustomButton text={!thirdUsed ? 'Start' : 'Stop'} action={!thirdUsed ? start3 : stop3}></CustomButton>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.rocketContainer}>
                    <Animated.View style={[styles.image, animatedStyleParent]}>
                        <Animated.View style={[{ height: scale(20), width: scale(20), justifyContent: 'center', alignItems: 'center' },
                            animatedStyle]}>
                            <Image style={{ height: scale(20), width: scale(20) }} source={ROCKET}></Image>
                        </Animated.View>
                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Animated.View style={[{ height: scale(2), width: scale(2) }, animatedStyleStar]}>
                        <Image style={{ height: scale(2), width: scale(2) }} source={STAR}></Image>
                    </Animated.View>
                    <Animated.View style={[{ height: scale(2), width: scale(2), marginTop: scale(15) }, animatedStyleStar1]}>
                        <Image style={{ height: scale(2), width: scale(2) }} source={STAR}></Image>
                    </Animated.View>
                    <Animated.View style={[{ height: scale(2), width: scale(2), marginTop: scale(30) }, animatedStyleStar2]}>
                        <Image style={{ height: scale(2), width: scale(2) }} source={STAR}></Image>
                    </Animated.View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    thirdAnim: {
        padding: scale(5),
        flexDirection: 'column',
        height: scale(100),
        backgroundColor: WHITE_COLOR,
        margin: scale(10),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rocketContainer: {
        height: scale(60),
        width: scale(60),
        backgroundColor: '#3b3673',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'relative'
    },
    buttonContainer: {
        height: scale(20),
        width: scale(100)
    }

});

export default RocketAnimation;