import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, FlatList, Image } from 'react-native';
import BackgroundView from '../components/BackgroundView';



const AnimationScreen = (props) => {

    useEffect(() => {
        console.log('hello')
    });


    return (
        <BackgroundView>
            <Text >{'hi2'}</Text>
        </BackgroundView>
    )
}

const styles = StyleSheet.create({


});

export default AnimationScreen;