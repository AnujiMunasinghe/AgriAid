import React, { useEffect, useState } from 'react';

import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';


import RNDateTimePicker from '@react-native-community/datetimepicker';
import Request from '../../../../API_Callings/Request';
import AppUser from '../../../../StaticData/AppUser';
import SelectedCrop from '../../../../StaticData/SelectedCrop';
import NegativeButton from '../../../../components/buttons/NegativeButton';
import PositiveButton from '../../../../components/buttons/PositiveButton';
import BodyHeader from '../../../../components/headers/BodyHeader';
import SelectionDropdown from '../../../../components/inputs/SelectionDropdown';
import { CommonActions } from '@react-navigation/native';

const HarvestRecord = ({ navigation }) => {

    const [crop, setCrop] = useState('')
    const [cultivationId, setCultivationId] = useState('')

    const [startedDate, setStartedDate] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calender, setCalender] = useState(false)

    const [quantity, setQuantity] = useState(0)
    const [quality, setQuality] = useState('')
    const [harvested, setHarvested] = useState('Pick a date')

    const [fieldState, setFieldState] = useState(true)

    const get_StartedDate = async (choosed, id) => {
        const app_user = new AppUser

        try {
            const request = new Request
            const response = await request.GrowedCrop({ farmer: app_user.fetch().id, crop: choosed, id: id })
            const date = new Date(response.data)
            const dateString = date.toISOString().slice(0, 10)
            setStartedDate(dateString)
        }

        catch (err) {
            console.log(err)
        }
    }

    const handleTimeSelection = (event, selected) => {
        setCalender(false)
        const currentTime = selected || selectedDate;
        setSelectedDate(currentTime);
        const dateString = currentTime.toISOString().slice(0, 10)
        setHarvested(dateString)
    };

    const reset_Data = async () => {
        // try {
        //     const request = new Request
        //     const response = await request.Add_Crop('')
        // }

        // catch (err) {
        //     console.log(err)
        // }
        setQuantity(0)
        setQuality(0)
        setHarvested('Pick a date')
        setFieldState(true)

    }

    const record_Data = async () => {
        if (!crop) {
            Alert.alert("Error", "Please select a crop.");
            return;
        }
        if (!startedDate) {
            Alert.alert("Error", "Please select a start date.");
            return;
        }
        if (harvested === 'Pick a date' || !harvested) {
            Alert.alert("Error", "Please select a harvest date.");
            return;
        }
        if (quantity <= 0 || isNaN(quantity)) {
            Alert.alert("Error", "Please enter a valid quantity.");
            return;
        }
        if (!quality) {
            Alert.alert("Error", "Please select a harvested quality.");
            return;
        }

        setFieldState(false)
        if (quantity != 0 && quality != 0 && harvested != 'Pick a date') {

            const complete = new Date(harvested)
            const app_user = new AppUser
            const record = {
                farmer: app_user.fetch().id,
                crop: crop,
                start: startedDate,
                harvested: complete.toISOString().slice(0, 10),
                quantity: quantity,
                quality: quality,
                cultivationId: cultivationId
            }

            try {
                const request = new Request
                const response = await request.Record(record)
                // console.log("success", response.data)

                setQuantity(0)
                setQuality('')
                setHarvested('Pick a date')
                // navigation.navigate('MyCrops')
                navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'GrowthTrack' }, // Assuming 'Home' is the initial route
                        { name: 'MyCrops' }, // Navigate to 'MyCrops' page
                      ],
                    })
                  );
            }

            catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        const selected_crop = new SelectedCrop
        setCrop(selected_crop.fetch().name)
        setCultivationId(selected_crop.fetch().id)

        get_StartedDate(selected_crop.fetch().name, selected_crop.fetch().id)
    }, []);

    return (

        <View>
            <BodyHeader Title='Harvest Recorder'></BodyHeader>
            <ScrollView>

                <Text style={styles.title}>{crop}</Text>


                <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 15, marginTop: 30 }}>

                    <View style={{ height: 195, justifyContent: 'space-between', marginTop: 6 }}>
                        <Text style={{ color: 'black', fontSize: 16 }}>Cultivation Start Date :</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>Harvested Date :</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>Harvested Quantity :</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>Harvested Quality :</Text>
                    </View>

                    <View>
                        <View style={{ borderStyle: 'solid', height: 40, borderWidth: 2, borderColor: 'black', borderRadius: 8, backgroundColor: '#656366', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 6, marginLeft: 10, width: '60%', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>{startedDate}</Text>
                            <Text style={{ color: 'white', fontSize: 16 }}> </Text>
                        </View>

                        <View style={{ borderStyle: 'solid', height: 40, borderWidth: 2, borderColor: 'black', borderRadius: 8, backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 5, paddingVertical: 6, marginLeft: 10, width: '60%', alignItems: 'center', marginTop: 18 }}>
                            <Text style={{ color: 'grey', fontSize: 16 }}>{harvested}</Text>

                            <TouchableOpacity disabled={!fieldState} onPress={() => setCalender(true)}>
                                <Image style={{ height: 28, width: 28 }} source={require('../../../../Assets/Icons/Calender.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
                            <TextInput
                                editable={fieldState}
                                style={styles.input}
                                placeholder='Enter harvested quantity'
                                value={quantity}
                                placeholderTextColor={'grey'}
                                onChangeText={(value) => setQuantity(value)}>
                            </TextInput>

                            <Text style={{ color: 'black', position: 'relative', right: 25, fontSize: 16 }}>Kg</Text>
                        </View>

                        <View style={{ marginTop: 18 }}>
                            {/* <TextInput
                                editable={fieldState}
                                style={styles.input}
                                placeholder='Enter harvested quality'
                                value={quality}
                                placeholderTextColor={'grey'}
                                onChangeText={(value) => setQuality(value)}>
                            </TextInput> */}
                            <SelectionDropdown
                                List={["Grade A", "Grade B", "Grade C", "Grade D"]}
                                Selected={(value) => setQuality(value)}
                                expand={true}
                                textInputStyle={true}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 50, marginBottom: 200 }}>
                    <View style={{ display: 'flex', width: 140 }}>
                        <PositiveButton Title='Complete' press_Action={record_Data}></PositiveButton>
                    </View>

                    <View style={{ display: 'flex', width: 140, marginLeft: 10 }}>
                        <NegativeButton Title='Cancel' press_Action={reset_Data}></NegativeButton>
                    </View>
                </View>

                {calender && (
                    <RNDateTimePicker
                        mode="date"
                        value={selectedDate}
                        onChange={handleTimeSelection}
                    />
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 800,
        marginLeft: 25,
        marginTop: 15,
        marginBottom: 13,
        color: '#005F41'
    },

    input: {
        marginLeft: 10,
        height: 40,
        width: '60%',
        borderColor: 'black',
        borderWidth: 2,
        paddingLeft: 10,
        borderRadius: 8,
        color: 'grey',
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'white'
    },
})

export default HarvestRecord;