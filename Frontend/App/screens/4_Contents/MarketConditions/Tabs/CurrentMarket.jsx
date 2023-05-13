import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import PositiveButton from '../../../../components/buttons/PositiveButton';
import MarketGrid from '../../../../components/grids/MarketGrid';
import SelectionDropdown from '../../../../components/inputs/SelectionDropdown';

const CurrentMarket = (props) => {
    const [crop, setCrop] = useState('');
    const [region, setRegion] = useState('');

    const [showConditions, setShowConditions] = useState(false)
    const [modelData, setModelData] = useState()


    const handleCropChange = (crop) => {
        setCrop(crop);
    };

    const handleRegionChange = (region) => {
        setRegion(region);
    };

    const handleEnterPress = () => {
        // Handle enter button press here
        // const cropData = {
        //     name: crop,
        //     region: region,
        //     type: 'current'
        // }

        // await props.posting_Data(cropData)
        if (!crop || !region) {
            Alert.alert('Error', 'Please fill in all required fields')
            return
        }
        setModelData({
            Crop: crop,
            Type: 'current',
            Region: region,
            Data: [0, 0, 0]
        })
        setShowConditions(true)
    };

    useEffect(() => {
        if (!setShowConditions) {
            setCrop('')
            setRegion('')
        }
    }, [setShowConditions])

    const regions = [
        'Colombo',
        'Gampaha',
        'Kalutara',
        'Kandy',
        'Matale',
        'Nuwara Eliya',
        'Galle',
        'Matara',
        'Hambantota',
        'Jaffna',
        'Kilinochchi',
        'Mannar',
        'Vavuniya',
        'Mullaitivu',
        'Batticaloa',
        'Ampara',
        'Trincomalee',
        'Kurunegala',
        'Puttalam',
        'Anuradhapura',
        'Polonnaruwa',
        'Badulla',
        'Moneragala',
        'Ratnapura',
        'Kegalle',
    ];

    return (
        <>
            <View style={styles.container}>
                <SelectionDropdown
                    Label="Select Crop"
                    List={props.CropList}
                    Selected={handleCropChange}
                    expand={true}
                />
                <SelectionDropdown
                    Label="Select Region"
                    List={regions}
                    Selected={handleRegionChange}
                    expand={true}
                />
                <PositiveButton Title='Enter' press_Action={handleEnterPress}></PositiveButton>
            </View>
            <View style={{ position: 'relative', zIndex: -2 }}>
                {showConditions && (
                    <MarketGrid {...modelData} setShowConditions={setShowConditions} />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white"
    },
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CurrentMarket;
