import React, { useEffect, useState } from 'react';
import Request from '../../../API_Callings/Request';

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

import AppUser from '../../../StaticData/AppUser';
import SelectedCrop from '../../../StaticData/SelectedCrop';
import FiveColumn from '../../../components/grids/FiveColumn';
import ThreeColumn from '../../../components/grids/ThreeColumn';
import BodyHeader from '../../../components/headers/BodyHeader';
import ActionPopup from '../../../components/popups/ActionPopup';
import CropPopup from './CropPopup';

const MyCrops = ({ navigation }) => {

    const { height } = useWindowDimensions();
    const [refresh, setRefresh] = useState(0)

    const [user, setUser] = useState('')

    const [crops, setCrops] = useState([])
    const [records, setRecords] = useState([])

    const [popup, setPopup] = useState(false)

    const [select, setSelect] = useState('')
    const [remove, setRemove] = useState(false)

    const get_Remove = (name) => {
        setSelect(name)
        setRemove(true)
    }

    const handdle_Refresh = (state) => {
        setRefresh(state)
    }

    const remove_Cultivation = async () => {
        const wanted = {
            farmer: user,
            crop: select
        }

        const request = new Request

        try {
            const response = await request.DeleteCultivation(wanted)
            await setRefresh(1)
            setRefresh(0)
            setRemove(false)
        }

        catch (err) {
            console.log(err)
        }
    }

    const plan_Cultivation = (crop, id) => {
        console.log(crop, id);
        const selected_crop = new SelectedCrop
        selected_crop.SelectedCrop(id, crop)

        navigation.navigate('Cultivation');
    }

    useEffect(() => {

        const get_Crops = async (need) => {
            const request = new Request

            try {
                const response = await request.GetCultivate({ farmer: need })
                setCrops(response.data)
            }

            catch (err) {
                console.log(err)
            }
        }

        const get_Farmer = () => {
            const app_user = new AppUser
            setUser(app_user.fetch().id)

            get_Crops(app_user.fetch().id)
        }

        get_Farmer()

        setPopup(false)
        setRemove(false)
    }, [refresh]);

    useEffect(() => {
        if (!user) return
        // console.log("user here", user);
        const get_Records_By_UserId = async (userId) => {
            const request = new Request
            try {
                const response = await request.GetRecordsByUserId(userId)
                // console.log(response.data);
                setRecords(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        get_Records_By_UserId(user)
    }, [user])


    return (
        <View style={{ position: 'relative' }}>
            {popup && (<CropPopup press_Action={() => setPopup(false)} Farmer={user} Refresher={handdle_Refresh}></CropPopup>)}

            {remove && (
                <View style={[styles.popup, { height }]}>
                    <ActionPopup
                        Title='Remove Crop'
                        Description='Are you want to remove this crop?'
                        Positive='Remove'
                        Close={() => setRemove(false)}
                        get_Action={remove_Cultivation}>
                    </ActionPopup>
                </View>
            )}

            <BodyHeader Title='My Crops'></BodyHeader>

            <View style={{ marginHorizontal: 7 }}>
                <Text style={styles.text}>Crop Cultivation Plan</Text>
                <View style={styles.grid}>
                    <ThreeColumn
                        Col_1='Crop'
                        Col_2='Cultivation Start Date'
                        Col_3='Harvesting Date'>
                    </ThreeColumn>

                    {crops.map((crop, index) => (
                        <View style={styles.list} key={index}>
                            <TouchableOpacity onPress={() => plan_Cultivation(crop.crop, crop._id)}><Text style={{ color: 'black', fontWeight: 800, width: 80 }}>{crop.crop}</Text></TouchableOpacity>
                            <Text style={styles.item}>{crop.begin.slice(0, 10)}</Text>
                            <Text style={styles.item}>{crop.end.slice(0, 10)}</Text>
                            <TouchableOpacity onPress={() => get_Remove(crop.crop)}><Image style={styles.options} source={require('../../../Assets/Icons/Delete.png')} /></TouchableOpacity>
                        </View>
                    ))}

                    <TouchableOpacity onPress={() => setPopup(true)}><View style={styles.button}><Text style={{ color: 'white' }}>+ Add Crop</Text></View></TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal: 7 }}>
                <Text style={styles.text}>Crop Cultivation History</Text>
                <View style={styles.grid}>
                    <FiveColumn
                        Col_1='Crop'
                        Col_2='Quantity'
                        Col_3='Quality'
                        Col_4='Cultivation Date'
                        Col_5='Harvested Date'
                    >
                    </FiveColumn>
                    <View style={{ height: 300 }}>
                        <ScrollView>
                            {records.map((record, index) => {
                                console.log(record);
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 2, marginBottom: 7 }} key={index}>
                                        <Text style={{ width: '18%', fontWeight: 800 }}>{record.crop}</Text>
                                        {/* <TouchableOpacity onPress={() => plan_Cultivation(record.crop)}><Text style={{ color: 'black', fontWeight: 800, width: 80 }}>{record.crop}</Text></TouchableOpacity> */}
                                        <Text style={{ width: '15%', textAlign: "center" }}>{record.quantity}</Text>
                                        <Text style={{ width: '15%', textAlign: "center" }}>{record.quality}</Text>
                                        <Text style={{ width: '26%', textAlign: "center" }}>{record.start}</Text>
                                        <Text style={{ width: '26%', textAlign: "center" }}>{record.harvested}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        borderStyle: 'solid',
        borderWidth: 2
    },

    popup: {
        position: 'absolute',
        zIndex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 800,
        marginTop: 20,
        marginBottom: 8
    },

    list: {
        marginHorizontal: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 7
    },

    item: {
        color: 'black'
    },

    options: {
        height: 17,
        width: 17
    },

    button: {
        marginVertical: 20,
        marginHorizontal: 35,
        backgroundColor: '#005F41',
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default MyCrops;