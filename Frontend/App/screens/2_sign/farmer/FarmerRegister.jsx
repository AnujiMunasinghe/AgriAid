import { useRoute } from '@react-navigation/native';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import LongButton from '../../../components/buttons/LongButton';
import LoginHeader from '../../../components/headers/LoginHeader';
import CredentialField from '../../../components/inputs/CredentialField';
import PasswordField from '../../../components/inputs/PasswordField';

const FarmerRegister = ({ navigation }) => {
    const route = useRoute()

    const [role, setRole] = useState('')
    const [status, setStatus] = useState('hide')

    const [header, setHeader] = useState('')
    const [title, setTitle] = useState('')

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    const [designation, setDesignation] = useState('')
    const [workplace, setWorkplace] = useState('')

    const submit_Values = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userName) {
            Alert.alert("Error", "Please enter a username.");
            return;
        }
        if (!userEmail) {
            Alert.alert("Error", "Please enter your email address.");
            return;
        }
        if (!emailRegex.test(userEmail)) {
            Alert.alert("Error", "The email address you entered is invalid. Please enter a valid email address.");
            return;
        }
        if (role === "Professional") {
            if (!designation) {
                Alert.alert("Error", "Please enter your designation.");
                return;
            }
            if (!workplace) {
                Alert.alert("Error", "Please enter your workplace.");
                return;
            }
        }
        if (!userPassword) {
            Alert.alert("Error", "Please enter a password.");
            return;
        }
        if (!userConfirmPassword) {
            Alert.alert("Error", "Please confirm your password.");
            return;
        }
        if (userPassword !== userConfirmPassword) {
            Alert.alert("Error", "The password and confirm password fields do not match. Please try again.");
            return;
        }

        const newUser = {
            name: userName,
            designation: designation,
            workplace: workplace,
            email: userEmail,
            password: userPassword,
            role: role,
            visible: status,
        };

        try {
            const response = await Axios.post("http://192.168.43.134:8000/register", newUser);
            if (response.status === 201) {
                Alert.alert("Success", "User registered successfully.");
                navigation.navigate('FarmerLogin', route.params)
            } else {
                Alert.alert("Error", "Failed to register user. Please try again.");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                Alert.alert("Error", error.response.data.message || "Failed to register user. Please try again.");
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                Alert.alert("Error", "No response received from server. Please try again.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                Alert.alert("Error", "Failed to register user. Please try again.");
            }
        }

    };


    useEffect(() => {

        if (route.params == 0) {
            setRole('Farmer')
            setStatus('show')
            setHeader('Farmer Registration');
            setTitle('Farmer ID');
        }
        else if (route.params == 1) {
            setRole('Professional')
            setHeader('Agricultural Professional Registration');
            setTitle('Agricultural Professional ID');
        }
        else if (route.params == 2) {
            setRole('Admin')
            setStatus('show')
            setHeader('Site Administrator Registration');
            setTitle('Site Administrator ID');
        }
        else {
            console.log('_ERROR')
        }

    }, []);


    return (
        <View style={styles.body}>
            <LoginHeader Title={header}></LoginHeader>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <ScrollView>
                    <View style={styles.fields}>
                        <View style={styles.singleField} >
                            <CredentialField Label='Full Name' Placeholder='Your name' Change={(value) => setUserName(value)} />
                        </View>
                        <View style={styles.singleField} >
                            <CredentialField Label='Email Address' Placeholder='example@gmail.com' Change={(value) => setUserEmail(value)} />
                        </View>
                        {role == 'Professional' && (
                            <View style={styles.singleField} >
                                <CredentialField Label='Designation' Placeholder='Your designation' Change={(value) => setDesignation(value)} />
                            </View>)}
                        {role == 'Professional' && (
                            <View style={styles.singleField} >
                                <CredentialField Label='Workpalce' Placeholder='Your workplace' Change={(value) => setWorkplace(value)} />
                            </View>)}
                        <View style={styles.singleField} >
                            <PasswordField Label='Password' Placeholder='Your password' Change={(value) => setUserPassword(value)} />
                        </View>
                        <View style={styles.singleField} >
                            <PasswordField Label='Confirm Password' Placeholder='Confirm Password' Change={(value) => setUserConfirmPassword(value)} />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <LongButton Title='Register' press_Action={submit_Values}></LongButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        height: '100%'
    },

    container: {
        flex: 1,
    },

    singleField: {
        marginVertical: '2.5%'
    },

    fields: {
        marginTop: '8%',
    },

    button: {
        marginTop: '20%',
        marginBottom: '15%'
    }
})

export default FarmerRegister;