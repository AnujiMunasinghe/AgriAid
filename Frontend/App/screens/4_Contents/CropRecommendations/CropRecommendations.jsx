import Axios from "axios";
import { React, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import PositiveButton from '../../../components/buttons/PositiveButton';
import HoriontalScroller from '../../../components/grids/HoriontalScroller';
import BodyHeader from '../../../components/headers/BodyHeader';
import SelectionDropdown from '../../../components/inputs/SelectionDropdown';


const CropRecommendations = () => {
    const [crops, setCrops] = useState(['_DEFAULT'])

    const [selectRegion, setSelectRegion] = useState('')
    const [selectQuarter, setSelectQuarter] = useState('')

    const [showConditions, setShowConditions] = useState(false)

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
        'January - April',
        'May - August',
        'September - December',
    ]

    const get_Recommendations = async () => {
        let quatar = selectQuarter
        let region = selectRegion

        if (!quatar || !region) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        switch (quatar) {
            case "January - April":
                quatar = 'Jan - April'
                break;
            case "May - August":
                quatar = 'May - Aug'
                break;
            case "September - December":
                quatar = 'Sep - Dec'
                break;
            default:
                break;
        }

        try {
            const response = await Axios.get("http://192.168.1.5:8000/crop-recommendation-details", {
                params: {
                    region: region,
                    quatar: quatar
                }
            });
            if (response.status === 200) {
                const data = response.data;
                // Handle the retrieved data here 
                console.log(data.Crops);
                // setModelData({
                //     Crop: crop,
                //     Type: 'current',
                //     Region: region,
                //     Data: [data.Price, data.Demand, data.Supply]
                // }) 
                const cropNames = data.Crops[0].split(", "); // Split the string into an array of crop names

                const updatedCrops = cropNames.map((cropName) => {
                    return {
                        image: "",
                        name: cropName
                    };
                });

                setCrops(updatedCrops);
                setShowConditions(true)
            } else {
                Alert.alert("Error", "Failed to retrieve data. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx 
                Alert.alert("Error", error.response.data.error || "Failed to retrieve data. Please try again.");
            } else if (error.request) {
                // The request was made but no response was received 
                Alert.alert("Error", "No response received from server. Please try again.");
            } else {
                // Something happened in setting up the request that triggered an Error 
                Alert.alert("Error", "Failed to retrieve data. Please try again.");
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <BodyHeader Title='Crop Recommendations'></BodyHeader>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <SelectionDropdown
                        Label="Select Region *"
                        List={Regions}
                        Selected={setSelectRegion}
                        expand={true}
                    />
                    <SelectionDropdown
                        Label="Select Quarter *"
                        List={Quarters}
                        Selected={setSelectQuarter}
                        expand={true}
                    />
                    <PositiveButton Title='Enter' press_Action={get_Recommendations}></PositiveButton>
                </View>

                {showConditions && <>
                    <View style={{ width: '100%', marginBottom: 50, position: 'relative', zIndex: -5 }}>
                        <HoriontalScroller CropList={crops}></HoriontalScroller>
                    </View>
                </>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white"
    },
    form: {
        marginHorizontal: '9%',
        height: 145,
        justifyContent: 'space-between',
        marginVertical: 60
    },

    text: {
        color: 'black'
    }
})

export default CropRecommendations;