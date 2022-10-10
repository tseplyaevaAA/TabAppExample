import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../styles/color';
import { StatusBar } from 'expo-status-bar';

const BackgroundView = (props) => {
    return (
        <View style={styles.containerStyle}>
            
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        flex: 1,
        backgroundColor: '#e2f4ff'
    },

});

export default BackgroundView;