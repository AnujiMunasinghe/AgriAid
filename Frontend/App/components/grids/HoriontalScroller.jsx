import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CropData from '../datasets/CropData';

const HorizontalScroller = (props) => {
    const urls = [
        {
            "url": "https://drive.google.com/uc?id=13ULSI89Uc_4r4WMe9RKZQCKyu_8ly_IS"
        },
        {
            "url": "https://drive.google.com/uc?id=1AM1HILgXZZ0_-8_Arv8rLvPPIRbnz_HV"
        },
        {
            "url": "https://drive.google.com/uc?id=1BY6wYsj-3QLQceO7yzDrULFiqgqbx_az"
        },
        {
            "url": "https://drive.google.com/uc?id=1CQQnn7HP5heoWqfdxSqzRppYE_eyZrGR"
        },
        {
            "url": "https://drive.google.com/uc?id=1C_HSnTsLtJ4AD6G8CiQEhCJE_uBZbQr6"
        },
        {
            "url": "https://drive.google.com/uc?id=1DmkuxAhdWG5Z-9guky5MO7QC-dsfJL1q"
        },
        {
            "url": "https://drive.google.com/uc?id=1IN7pSOBbPReOqJ6PLhNUer3EhCgTMXpx"
        },
        {
            "url": "https://drive.google.com/uc?id=1LV5styvA7SqE2K9dAj7wG46Rc0RVPgrB"
        },
        {
            "url": "https://drive.google.com/uc?id=1MSxbCQqfiG6ZxlqaeGh7hi2pqxtTOMrB"
        },
        {
            "url": "https://drive.google.com/uc?id=1RotTYxmPBcuCK9cAKLDZYPelhEfCdGdr"
        },
        {
            "url": "https://drive.google.com/uc?id=1UhhWdW4HXyOSLOZHhCN1TxiQCGSZo8ki"
        },
        {
            "url": "https://drive.google.com/uc?id=1X7eXTl_pAPp4seGu6AAK1C3zQcPqD-hR"
        },
        {
            "url": "https://drive.google.com/uc?id=1_UaBBuZYZ6hOeXfRQCffze-_29syjwaz"
        },
        {
            "url": "https://drive.google.com/uc?id=1c4q_ou_umIyWL2ZHIMQ_BovY2jCqf2LU"
        },
        {
            "url": "https://drive.google.com/uc?id=1e7L7kbW23Ti3WxFtMR8NgZhEokkl1XEa"
        },
        {
            "url": "https://drive.google.com/uc?id=1jyUd-xvu_cIdHyAf9H3JZBeeQAuH6XNh"
        },
        {
            "url": "https://drive.google.com/uc?id=1l8GYiDS1z3k8HShOcCbhZQUEw-SYjRDr"
        },
        {
            "url": "https://drive.google.com/uc?id=1lsjs4cLHMNz8asmotbzcnBuWySCmQR52"
        },
        {
            "url": "https://drive.google.com/uc?id=1nMjMzx7iiWaa7dbly_COVDw9RgXMwT6T"
        },
        {
            "url": "https://drive.google.com/uc?id=1nsAXwoNIQzrkhBQQQy-0laedQT28uJX_"
        },
        {
            "url": "https://drive.google.com/uc?id=1pinXh15_Mj4cG2l8xXY__UnzV4YpY61U"
        },
        {
            "url": "https://drive.google.com/uc?id=1s7qlq6_PrvfeexAZCpyGS3qGfdsahJYt"
        },
        {
            "url": "https://drive.google.com/uc?id=1sUdzt-FdFUuCiqjlqScGS6jPtosP1F_N"
        },
        {
            "url": "https://drive.google.com/uc?id=1yyEIiqmYg_AwUUisz0KcSMSbW4GHpSyw"
        }
    ]

    const [selected, setSelected] = useState(0);

    const chunkSize = 5;
    const chunks = [];

    const pageCount = Math.ceil(props.CropList.length / chunkSize);

    for (let i = 0; i < props.CropList.length; i += chunkSize) {
        chunks.push(props.CropList.slice(i, i + chunkSize));
    }

    const goNext = (page) => {
        setSelected(page);
    };


    const getRandomUrl = () => {
        const randomIndex = Math.floor(Math.random() * urls.length);
        return urls[randomIndex].url;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recommended Crops</Text>

            {props.CropList[0] !== '_DEFAULT' && (
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        {chunks[selected].map((item, index) => (
                            <View key={index} style={styles.item}>
                                <CropData Icon={item.image} Name={item.name} url={getRandomUrl()} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {props.CropList[0] !== '_DEFAULT' && (
                <View style={styles.pageNumRow}>
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <TouchableOpacity
                            onPress={() => goNext(index)}
                            key={index}
                            style={[
                                styles.pageNumber,
                                selected === index && styles.selectedPageNumber,
                            ]}
                        >
                            <Text style={styles.number}>{index + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '15%',
        marginTop: '10%',
    },
    heading: {
        color: 'black',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 25,
    },
    scrollViewContainer: {
        height: 330,
    },
    item: {
        marginVertical: 5,
    },
    pageNumRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    pageNumber: {
        height: 27,
        width: 24,
        backgroundColor: '#1E8341',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        borderRadius: 5,
    },
    selectedPageNumber: {
        backgroundColor: 'green', // Update with desired style for selected page number
    },
    number: {
        color: 'white',
        fontWeight: '800',
    },
});

export default HorizontalScroller;
