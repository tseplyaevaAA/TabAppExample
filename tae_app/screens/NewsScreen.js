import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, FlatList, Image } from 'react-native';
import BackgroundView from '../components/BackgroundView';



const NewsScreen = (props) => {

    useEffect(() => {
        console.log('hello')
    });


    return (
        <BackgroundView>
            <Text>{'hi3'}</Text>
        </BackgroundView>
    )
}

const styles = StyleSheet.create({


});

export default NewsScreen;