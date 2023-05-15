import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Request from '../../API_Callings/Request';
import ActionPopup from '../../components/popups/ActionPopup';


const PAGE_SIZE = 10; // Number of items to be shown per page

const styles = {
    container: {
        position: 'relative',
    },
    actionPopup: {
        height: 200,
    },
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    titleCell: {
        backgroundColor: '#005F41',
        marginHorizontal: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    userRow: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 6,
    },
    options: {
        width: 24,
        height: 24,
    },
};

const UserTable = (props) => {

    const [data, setData] = useState([])
    const { height } = useWindowDimensions();
    const [reload, setReload] = useState(0)

    const [showPopup, setShowPopup] = useState(false);
    const [manage, setManage] = useState({
        id: '',
        title: '',
        description: '',
        positive: ''
    });
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [titles, setTitles] = useState([])
    // const titles = [
    //     // { head: 'User ID', width: '30%' },
    //     { head: 'Name', width: '40%' },
    //     { head: 'Created Date', width: '40%' },
    //     { head: 'Options', width: '15%' },];

    const get_Remove = (id) => {
        if (props.Type == 'Professional') {
            const data = {
                id: id,
                title: 'Remove Agricultural Professional',
                description: 'Are you sure you want to Remove this Agricultural Professional?',
                positive: props.Type
            }

            setManage(data)
        }

        if (props.Type == 'Farmer') {
            console.log('Farmer found')
            const data = {
                id: id,
                title: 'Remove Farmer',
                description: 'Are you sure you want to Remove this Farmer?',
                positive: props.Type
            }

            setManage(data)
        }

        setShowPopup(true)
    }

    const confirm_Action = async () => {
        const request = new Request

        try {
            const data = { id: manage.id }
            const response = await request.DeleteUser(data)
            setReload(1)
            setShowPopup(false)
        }

        catch (err) {
            console.log(err)
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setUsers(data.slice(newPage * pageSize, (newPage + 1) * pageSize));
    };

    const totalPages = Math.ceil(data.length / pageSize);
    const pages = Array.from(Array(totalPages).keys());

    useEffect(() => {
        const get_Requests = async () => {
            const user = { type: props.Type, status: 'show' }

            const request = new Request

            try {
                const response = await request.FetchUsers(user)
                setData(response.data)
            }

            catch (err) {
                console.log(err)
            }
        }

        get_Requests();

    }, []);

    useEffect(() => {
        const get_Requests = async () => {
            const user = { type: props.Type, status: 'show' }

            const request = new Request

            try {
                const response = await request.FetchUsers(user)
                setData(response.data)
            }

            catch (err) {
                console.log(err)
            }
        }

        get_Requests();
        setReload(0)

    }, [reload]);

    useEffect(() => {
        if (!data) return
        setUsers(data.slice(0, PAGE_SIZE))
    }, [data])

    useEffect(() => {
        console.log(props.Type);
        if (props.Type == "Farmer") {
            setTitles([{ head: 'User ID', width: '30%' }, { head: 'Name', width: '20%' }, { head: 'Created Date', width: '30%' }, { head: 'Options', width: '12%' },])
            return
        }
        if (props.Type == "Professional") {
            setTitles([
                { head: 'Name', width: '20%' },
                { head: 'Workplace', width: '20%' },
                { head: 'Designation', width: '20%' },
                { head: 'Created Date', width: '25%' },
                { head: 'Options', width: '15%' }
            ])
            return
        }
        setTitles([
            { head: 'Name', width: '40%' },
            { head: 'Created Date', width: '40%' },
            { head: 'Options', width: '15%' }
        ])
    }, [props.Type])




    return (
        <View style={styles.container}>
            {showPopup && (
                <View style={[styles.actionPopup, { height }]}>
                    <ActionPopup
                        Title={manage.title}
                        Description={manage.description}
                        Positive='Remove'
                        Close={() => setShowPopup(false)}
                        get_Action={confirm_Action}
                    />
                </View>
            )}

            {props.Type === 'Farmer' && <View style={{ marginTop: 20 }} />}

            <View style={styles.titleRow}>
                {titles.map((title, index) => (
                    <View key={index} style={[styles.titleCell, { width: title.width }]}>
                        <Text style={styles.text}>{title.head}</Text>
                    </View>
                ))}
            </View>

            <View>
                {users.map((user, index) => (
                    <View style={styles.userRow} key={index}>
                        {props.Type == "Professional" &&
                            <>
                                <Text style={{ color: 'black', width: '20%' }}>{user.name}</Text>
                                <Text style={{ color: 'black', width: '20%' }}>{user.workplace}</Text>
                                <Text style={{ color: 'black', width: '25%' }}>{user.designation}</Text>
                                <Text style={{ color: 'black', width: '25%' }}>{user.created_date.slice(0, 10)}</Text>
                            </>
                        }
                        {props.Type == "Farmer" &&
                            <>
                                <Text style={{ color: 'black', width: '32%' }}>{user.id}</Text>
                                <Text style={{ color: 'black', width: '22%' }}>{user.name}</Text>
                                <Text style={{ color: 'black', width: '32%' }}>{user.created_date.slice(0, 10)}</Text>
                            </>
                        }
                        <TouchableOpacity onPress={() => get_Remove(user.id)}>
                            <Image style={styles.options} source={require('../../Assets/Icons/Delete.png')} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Pagination */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {pages.map((p) => (
                    <TouchableOpacity key={p} onPress={() => handlePageChange(p)}>
                        <Text style={{ color: page === p ? '#005F41' : '#000', marginHorizontal: 5 }}>{p + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default UserTable;