import React from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const FiveColumn = (props) => {

    return (
        <View>
            <View style={styles.titles}>
                <View style={styles.tabCrop}><Text style={{ color: "white" }}>{props.Col_1}</Text></View>
                <View style={styles.tabQuantity}><Text style={{ color: "white" }}>{props.Col_2}</Text></View>
                <View style={styles.tabQuality}><Text style={{ color: "white" }}>{props.Col_3}</Text></View>
                <View style={styles.tabDate}><Text style={{ color: "white" }}>{props.Col_4}</Text></View>
                <View style={styles.tabDate}><Text style={{ color: "white" }}>{props.Col_5}</Text></View>
            </View>

            <View>
                {/* Three data column */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titles: {
        display: 'flex',
        flexDirection: 'row'
    },

    tabCrop: {
        width: '18%',
        backgroundColor: '#005F41',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 5
    },

    tabQuantity: {
        width: '15%',
        backgroundColor: '#005F41',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 5,
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderColor: 'white',
    },

    tabQuality: {
        width: '15%',
        backgroundColor: '#005F41',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 5,
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderColor: 'white',
    },
    tabDate: {
        width: '26%',
        backgroundColor: '#005F41',
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderColor: 'white',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 5
    }
})

export default FiveColumn;