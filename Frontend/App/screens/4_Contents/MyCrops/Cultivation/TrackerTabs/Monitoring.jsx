import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Request from '../../../../../API_Callings/Request';

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions
} from 'react-native';

const Monitoring = (props) => {
    const [reload, setReload] = useState(false)
    const { height } = useWindowDimensions();

    const [stepOne, setStepOne] = useState({ title: '', name: '', duration: '', begin: '', end: '', status: "completed" })
    const [stepTwo, setStepTwo] = useState({ title: '', name: '', duration: '', begin: '', end: '', status: "ongoing" })
    const [stepThree, setStepThree] = useState({ title: '', name: '', duration: '', begin: '', end: '', status: "pending" })
    const [stepFour, setStepFour] = useState({ title: '', name: '', duration: '', begin: '', end: '', status: "pending" })
    const [stepFive, setStepFive] = useState({ title: '', name: '', duration: '', begin: '', end: '', status: "pending" })

    const [allStages, setAllStages] = useState([])

    const stage_One = () => {
        try {
            const started = new Date(props.Grow)
            const over = new Date(started.getTime() + (props.Stages.one.duration * 7 * 24 * 60 * 60 * 1000))
            const status = getCurrentDateStatus(started, over);
            const stage = {
                title: 'Stage 01',
                name: 'Seeding',
                image: props.Stages.one.image,
                duration: props.Stages.one.duration,
                description: props.Stages.one.description,
                begin: started.toISOString().slice(0, 10),
                end: over.toISOString().slice(0, 10),
                status: status
            }

            setStepOne(stage)
        }

        catch (err) {
            setReload(true)
            console.log(err)
        }
    }

    const stage_Two = () => {
        try {

            const started = new Date(props.Grow)
            const begin = new Date(started.getTime() + (props.Stages.one.duration * 7 * 24 * 60 * 60 * 1000))
            const over = new Date(begin.getTime() + (props.Stages.two.duration * 7 * 24 * 60 * 60 * 1000))
            const status = getCurrentDateStatus(begin, over);
            const stage = {
                title: 'Stage 02',
                name: 'Vegetative',
                image: props.Stages.two.image,
                duration: props.Stages.two.duration,
                description: props.Stages.two.description,
                begin: begin.toISOString().slice(0, 10),
                end: over.toISOString().slice(0, 10),
                status: status
            }

            setStepTwo(stage)
        }

        catch (err) {
            setReload(true)
            console.log(err)
        }
    }

    const stage_Three = () => {
        try {

            const started = new Date(props.Grow)
            const begin = new Date(started.getTime() + (props.Stages.one.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.two.duration * 7 * 24 * 60 * 60 * 1000))
            const over = new Date(begin.getTime() + (props.Stages.three.duration * 7 * 24 * 60 * 60 * 1000))
            const status = getCurrentDateStatus(begin, over);
            const stage = {
                title: 'Stage 03',
                name: 'Flowering',
                image: props.Stages.three.image,
                duration: props.Stages.three.duration,
                description: props.Stages.three.description,
                begin: begin.toISOString().slice(0, 10),
                end: over.toISOString().slice(0, 10),
                status: status
            }

            setStepThree(stage)
        }

        catch (err) {
            setReload(true)
            console.log(err)
        }
    }

    const stage_Four = () => {
        try {

            const started = new Date(props.Grow)
            const begin = new Date(started.getTime() + (props.Stages.one.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.two.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.three.duration * 7 * 24 * 60 * 60 * 1000))
            const over = new Date(begin.getTime() + (props.Stages.four.duration * 7 * 24 * 60 * 60 * 1000))
            const status = getCurrentDateStatus(begin, over);
            const stage = {
                title: 'Stage 04',
                name: 'Fruit Development',
                image: props.Stages.four.image,
                duration: props.Stages.four.duration,
                description: props.Stages.four.description,
                begin: begin.toISOString().slice(0, 10),
                end: over.toISOString().slice(0, 10),
                status: status
            }

            setStepFour(stage)
        }

        catch (err) {
            setReload(true)
            console.log(err)
        }
    }

    const stage_Five = () => {
        try {

            const started = new Date(props.Grow)
            const begin = new Date(started.getTime() + (props.Stages.one.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.two.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.three.duration * 7 * 24 * 60 * 60 * 1000) + (props.Stages.four.duration * 7 * 24 * 60 * 60 * 1000))
            const over = new Date(begin.getTime() + (props.Stages.five.duration * 7 * 24 * 60 * 60 * 1000))
            const status = getCurrentDateStatus(begin, over);
            const stage = {
                title: 'Stage 05',
                name: 'Harvesting',
                image: props.Stages.five.image,
                duration: props.Stages.five.duration,
                description: props.Stages.five.description,
                begin: begin.toISOString().slice(0, 10),
                end: over.toISOString().slice(0, 10),
                status: status
            }

            setStepFive(stage)
        }

        catch (err) {
            setReload(true)
            console.log(err)
        }
    }

    const testing = () => {
        try {
            const request = new Request
            const response = request.Add_Crop('')
        }

        catch (err) {

        }
    }

    useEffect(() => {
        console.log("_________________________________________________", props.Grow);
        stage_One()
        stage_Two()
        stage_Three()
        stage_Four()
        stage_Five()
    }, []);

    useEffect(() => {
        stage_One()
        stage_Two()
        stage_Three()
        stage_Four()
        stage_Five()
    }, [reload]);

    useEffect(() => {
        const steps = [stepOne, stepTwo, stepThree, stepFour, stepFive]
        setAllStages(steps)
    }, [stepFive]);

    const getCurrentDateStatus = (beginDate, endDate) => {
        const currentDate = moment().startOf('day');
        beginDate = moment(beginDate).startOf('day');
        endDate = moment(endDate).startOf('day');

        if (currentDate.isSame(beginDate) || currentDate.isSame(endDate)) {
            return 'ongoing';
        } else if (currentDate.isBetween(beginDate, endDate)) {
            return 'ongoing';
        } else if (currentDate.isBefore(beginDate)) {
            return 'pending';
        } else if (currentDate.isAfter(endDate)) {
            return 'completed';
        } else {
            return '';
        }
    };

    return (
        <ScrollView style={{ height: height - 180 }}>
            {allStages.map((stage, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {stage.status == "completed" && <>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginHorizontal: 10 }}>
                                <Image style={{ height: 15, width: 15 }} source={require('../../../../../Assets/Icons/check.png')} />
                            </View>
                        </>}
                        {stage.status == "ongoing" && <>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
                            </View>
                        </>}
                        {stage.status == "pending" && <>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
                            </View>
                        </>}
                        {stage.status == '' && <>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
                            </View>
                        </>}
                        <View style={{ borderStyle: 'solid', borderWidth: 1 }}>
                            {stage.image != null && (
                                <Image
                                    style={styles.options}
                                    source={{ uri: stage.image }}
                                />
                            )}

                        </View>
                    </View>

                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 800 }}>{stage.title} - {stage.name} [{stage.duration} Weeks]</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 800 }}>{stage.begin} to {stage.end}</Text>
                        <Text style={{ color: 'grey', marginEnd: '32%', textAlign: 'justify' }}>{stage.description}</Text>
                    </View>
                </View>
            ))}

            {/* <Button title='press me' onPress={testing}></Button> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 25,
        borderRadius: 30,
    },

    icon: {
        color: 'black',
        fontSize: 19
    },

    options: {
        height: 100,
        width: 60,
    }
})

export default Monitoring;