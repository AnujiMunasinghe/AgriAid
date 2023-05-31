import Axios from "axios";
import { React, useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    View
} from 'react-native';
import PositiveButton from '../../../../components/buttons/PositiveButton';
import MarketGrid from '../../../../components/grids/MarketGrid';
import SelectionDropdown from '../../../../components/inputs/SelectionDropdown';

const ForetastedMarket = (props) => {

    const [crop, setCrop] = useState('')
    const [region, setRegion] = useState('')
    const [quarter, setQuarter] = useState('')

    const [showConditions, setShowConditions] = useState(false)
    const [modelData, setModelData] = useState()

    const handleCropChange = (crop) => {
        setCrop(crop);
    };

    const handleRegionChange = (region) => {
        setRegion(region);
    };


    const handleQuarterChange = (quarter) => {
        setQuarter(quarter);
    };

    const handleEnterPress = async () => {
        let cropData = crop
        let regionData = region
        let quarterData = quarter

        if (!cropData || !regionData || !quarterData) {
            Alert.alert('Error', 'Please fill in all required fields')
            return
        }

        switch (crop) {
            case "Capsicum (Prarthana)":
                cropData = "Capsicum"
                break;
            case "Chili (MI-CH-HY 01)":
                cropData = "Green Chilli"
                break;

            default:
                break;
        }

        switch (quarter) {
            case "May - August 2023":
                quarterData = "Q1"
                break;
            case "September - December 2023":
                quarterData = "Q2"
                break;
            case "January - April 2024":
                quarterData = "Q3"
                break;

            default:
                break;
        }

        console.log("here");
        Axios.post('http://192.168.1.4:5000/predict', {
            Region: region,
            Quarter: quarterData,
            Crop: cropData
        })
            .then(response => {
                // Handle the API response here
                console.log(response.data);
                setModelData({
                    Crop: crop,
                    Type: 'forecasted',
                    Region: region,
                    Data: [
                        (response.data.Price * 1000).toFixed(2),     // Multiply by 1000 and format to 2 decimal points
                        (response.data.Demand * 100).toFixed(2),     // Multiply by 100 and format to 2 decimal points
                        (response.data.Supply * 100).toFixed(2)      // Multiply by 100 and format to 2 decimal points
                    ]
                })
                setShowConditions(true)
            })
            .catch(error => {
                // Handle any error that occurs during the API call
                console.error(error);
            });


    }

    useEffect(() => {
        if (!setShowConditions) {
            setCrop('')
            setRegion('')
        }
    }, [setShowConditions])

    const Regions = [
        "Colombo",
        "Gampaha",
        "Kalutara",
        "Kandy",
        "Matale",
        "Nuwara Eliya",
        "Galle",
        "Matara",
        "Hambantota",
        "Jaffna",
        "Kilinochchi",
        "Mannar",
        "Vavuniya",
        "Mullaitivu",
        "Batticaloa",
        "Ampara",
        "Trincomalee",
        "Kurunegala",
        "Puttalam",
        "Anuradhapura",
        "Polonnaruwa",
        "Badulla",
        "Moneragala",
        "Ratnapura",
        "Kegalle",
    ]

    const Quarters = [
        'May - August 2023',
        'September - December 2023',
        'January - April 2024',
    ]

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
                    List={Regions}
                    Selected={handleRegionChange}
                    expand={true}
                />
                <SelectionDropdown
                    Label='Select Quarter'
                    List={Quarters}
                    Selected={handleQuarterChange}
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

export default ForetastedMarket;