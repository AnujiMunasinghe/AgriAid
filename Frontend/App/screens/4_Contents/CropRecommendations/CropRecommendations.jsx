import React, { useState } from 'react';
import Request from '../../../API_Callings/Request';
import PositiveButton from '../../../components/buttons/PositiveButton';
import BodyHeader from '../../../components/headers/BodyHeader';
import SelectionDropdown from '../../../components/inputs/SelectionDropdown';

import {
    Alert,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import HoriontalScroller from '../../../components/grids/HoriontalScroller';

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
        if (!selectRegion || !selectQuarter) {
            Alert.alert('Error', 'Please fill in all required fields')
            return
        }
        const request = new Request;

        const recomanded = { region: selectRegion, quarter: selectQuarter }

        try {
            const response = await request.Recommendations(recomanded)

            if (response.data != 0) {
                setCrops(response.data)
            }
            setShowConditions(true)
        } catch (err) {
            console.log(err)
        }
    }

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