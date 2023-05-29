import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CropData = (props) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: props.url,
                }}
            />
            <Text style={styles.text}>{props.Name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'green',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CropData;
