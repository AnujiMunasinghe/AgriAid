import Axios from "axios";
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    View
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

    const handleEnterPress = async () => {
        if (!crop || !region) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        console.log(crop);
        console.log(region);

        try {
            const response = await Axios.get("http://192.168.1.3:8000/real-crop-details", {
                params: {
                    region: region,
                    crop: crop
                }
            });

            if (response.status === 200) {
                const data = response.data;
                // Handle the retrieved data here
                console.log(data["Demand (per month)"]);
                setModelData({
                    Crop: crop,
                    Type: 'current',
                    Region: region,
                    Data: [data["Price (per Kg)"], data["Demand (per month)"], data["Supply  (per month)"]]
                })
                setShowConditions(true)
            } else {
                Alert.alert("Error", "Failed to retrieve data. Please try again.");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                Alert.alert("Error", error.response.data.error || "Failed to retrieve data. Please try again.");
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                Alert.alert("Error", "No response received from server. Please try again.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                Alert.alert("Error", "Failed to retrieve data. Please try again.");
            }
        }
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
                    List={[`Capsicum`, `Green Chilli`]}
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
