import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

const CropData = (props) => {
    return (
        <>
            <View style={styles.row}>
                {/* <Image style={{ height: 80, width: 80 }} source={{ uri: props.Icon }} /> */}
                {/* <Image style={{ height: 80, width: 80 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" }} /> */}
                <Image style={{ height: 80, width: 80 }} source={require('../../Assets/Icons/vegetables.png')} />
                <Text style={styles.text}>{props.Name}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        width: 270,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        color: 'black',
        fontSize: 15
    }
})

export default CropData;