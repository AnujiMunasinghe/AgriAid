import React from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SquareButton = (props) => {

    return (
        <TouchableOpacity onPress={props.invincible ? () => { } : props.press_Action} style={props.invincible ? styles.invisibleButton : styles.button}>
            <View>
                <Text style={props.invincible ? styles.invisibleTitle : styles.title}>{props.Title_1}{"\n"}{props.Title_2}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#005F41',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '40%',
        aspectRatio: 1.1,
        margin: 10
    },
    title: {
        color: '#F8FBFA',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
    },
    invisibleButton: {
        backgroundColor: 'rgb(242,242,242)',
        color: 'rgb(242,242,242)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '40%',
        aspectRatio: 1.1,
        margin: 10
    },
    invisibleTitle: {
        color: '#F8FBFA',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(242,242,242)',
    },
})

export default SquareButton;