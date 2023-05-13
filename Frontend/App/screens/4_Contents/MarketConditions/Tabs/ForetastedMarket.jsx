import React, { useEffect, useState } from 'react';
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
        // const cropData = {
        //     name: crop,
        //     region: region,
        //     quarter: quarter,
        //     type: 'foretasted'
        // }

        // await props.posting_Data(cropData)

        if (!crop || !region || !quarter) {
            Alert.alert('Error', 'Please fill in all required fields')
            return
        }
        setModelData({
            Crop: crop,
            Type: 'forecasted',
            Region: region,
            Data: [0, 0, 0]
        })
        setShowConditions(true)
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