import React, { useEffect, useState } from 'react';
import PositiveButton from '../../../../components/buttons/PositiveButton';
import MarketGrid from '../../../../components/grids/MarketGrid';
import SelectionDropdown from '../../../../components/inputs/SelectionDropdown';

import {
    StyleSheet,
    View,
    Alert
} from 'react-native';

const CurrentMarket = (props) => {

    const [crop, setCrop] = useState('')
    const [region, setRegion] = useState('')

    const [showConditions, setShowConditions] = useState(false)
    const [modelData, setModelData] = useState()

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

    const get_InputDATA = async () => {
        if (!crop || !region) {
            Alert.alert('Error', 'Please fill in all required fields')
            return
        }
        setModelData({
            Type: "current",
            Crop: crop,
            Place: region,
            Data: [0, 0, 0]
        })
        setShowConditions(true)

        // const cropData = {
        //     name: crop,
        //     region: region,
        //     type: 'current'
        // }

        // await props.posting_Data(cropData)
    }

    useEffect(() => {
        if (!showConditions) {
            setCrop('')
            setRegion('')
        }
    }, [showConditions])


    return (
        <View>
            <View style={styles.form}>

                <View style={{ position: 'relative', zIndex: 999 }}>
                    <SelectionDropdown Label='Select Crop *' List={props.CropList} Selected={setCrop}></SelectionDropdown>
                </View>

                <View style={{ position: 'relative', zIndex: 998 }}>
                    <SelectionDropdown Label='Select Region *' List={Regions} Selected={setRegion}></SelectionDropdown>
                </View>

                <View style={{ marginHorizontal: '30%' }}>
                    <PositiveButton Title='Enter' press_Action={get_InputDATA}></PositiveButton>
                </View>
            </View>

            <View style={{ position: 'relative', zIndex: -2 }}>
                {showConditions &&
                    <MarketGrid  {...modelData} setShowConditions={setShowConditions} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: '9%',
        height: 145,
        justifyContent: 'space-between',
        marginVertical: 60
    }
})

export default CurrentMarket;