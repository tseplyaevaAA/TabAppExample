import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR } from '../styles/color';
import { scale } from '../utility/utility';

const CustomButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.containerStyle, { borderColor: props.active ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR }]}
            onPress={props.action}>
            <Text style={[styles.textStyle, { color: props.active ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR }]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        height: '70%',
        width: '30%',
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginTop: scale(4)
    },
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold'
    }

});

export default CustomButton;