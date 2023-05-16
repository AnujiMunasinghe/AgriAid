import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const RatingPopup = (props) => {
    const { height } = useWindowDimensions();
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
    };

    const handleConfirm = () => {
        props.rateAdvisor(rating)
        // props.press_Action()
    };

    return (
        <View style={[styles.popup, { height }]}>
            <View style={styles.popupAction}>
                <View style={styles.popupTitle}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '800' }}>Rate Advisory Service</Text>
                    <TouchableOpacity onPress={props.press_Action}>
                        <Text style={{ color: 'black' }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.description}>How useful was this Advice?</Text>
                    <View style={styles.ratingStars}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                                <Text style={[styles.star, value <= rating && styles.selectedStar]}>☆</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleConfirm}>
                        <Text style={styles.confirmButton}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    popup: {
        top: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 2,
    },
    popupAction: {
        backgroundColor: 'white',
        marginTop: 100,
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 10,
    },
    popupTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 6,
        marginBottom: 10,
    },
    ratingContainer: {
        alignItems: 'center',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ratingStars: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        fontSize: 30,
        color: 'black',
    },
    selectedStar: {
        color: 'gold',
    },
    confirmButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
});

export default RatingPopup;
