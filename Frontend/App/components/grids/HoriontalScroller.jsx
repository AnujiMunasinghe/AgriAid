import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CropData from '../datasets/CropData';

const HorizontalScroller = (props) => {
    const urls = [
        {
            "id": "Star Fruit (B10)",
            "url": "https://drive.google.com/uc?id=13ULSI89Uc_4r4WMe9RKZQCKyu_8ly_IS"
        },
        {
            "id": "Dragon Fruit (Hylocereus)",
            "url": "https://drive.google.com/uc?id=1AM1HILgXZZ0_-8_Arv8rLvPPIRbnz_HV"
        },
        {
            "id": "Brinjal (Amanda)",
            "url": "https://drive.google.com/uc?id=1BY6wYsj-3QLQceO7yzDrULFiqgqbx_az"
        },
        {
            "id": "Radish (Japanese)",
            "url": "https://drive.google.com/uc?id=1CQQnn7HP5heoWqfdxSqzRppYE_eyZrGR"
        },
        {
            "id": "Maize (MI1)",
            "url": "https://drive.google.com/uc?id=1C_HSnTsLtJ4AD6G8CiQEhCJE_uBZbQr6"
        },
        {
            "id": "Lettuce (Iceberg)",
            "url": "https://drive.google.com/uc?id=1DmkuxAhdWG5Z-9guky5MO7QC-dsfJL1q"
        },
        {
            "id": "Cauliflower (Phenomenal)",
            "url": "https://drive.google.com/uc?id=1IN7pSOBbPReOqJ6PLhNUer3EhCgTMXpx"
        },
        {
            "id": "Bitter Groud (Neerogee)",
            "url": "https://drive.google.com/uc?id=1LV5styvA7SqE2K9dAj7wG46Rc0RVPgrB"
        },
        {
            "id": "Mangosteen (Arunima)",
            "url": "https://drive.google.com/uc?id=1MSxbCQqfiG6ZxlqaeGh7hi2pqxtTOMrB"
        },
        {
            "id": "Cucumber (Hordi)",
            "url": "https://drive.google.com/uc?id=1RotTYxmPBcuCK9cAKLDZYPelhEfCdGdr"
        },
        {
            "id": "Bean (Hordi)",
            "url": "https://drive.google.com/uc?id=1UhhWdW4HXyOSLOZHhCN1TxiQCGSZo8ki"
        },
        {
            "id": "Luffa (Asiri)",
            "url": "https://drive.google.com/uc?id=1X7eXTl_pAPp4seGu6AAK1C3zQcPqD-hR"
        },
        {
            "id": "Okra (OKH1)",
            "url": "https://drive.google.com/uc?id=1_UaBBuZYZ6hOeXfRQCffze-_29syjwaz"
        },
        {
            "id": "Winged Bean (Krishna)",
            "url": "https://drive.google.com/uc?id=1c4q_ou_umIyWL2ZHIMQ_BovY2jCqf2LU"
        },
        {
            "id": "Pineapple (MD2)",
            "url": "https://drive.google.com/uc?id=1e7L7kbW23Ti3WxFtMR8NgZhEokkl1XEa"
        },
        {
            "id": "Tomato (Hordi)",
            "url": "https://drive.google.com/uc?id=1jyUd-xvu_cIdHyAf9H3JZBeeQAuH6XNh"
        },
        {
            "id": "Cabbage (Exotic)",
            "url": "https://drive.google.com/uc?id=1l8GYiDS1z3k8HShOcCbhZQUEw-SYjRDr"
        },
        {
            "id": "Strawberry (Camarosa)",
            "url": "https://drive.google.com/uc?id=1lsjs4cLHMNz8asmotbzcnBuWySCmQR52"
        },
        {
            "id": "Snake Gourd (TA2)",
            "url": "https://drive.google.com/uc?id=1nMjMzx7iiWaa7dbly_COVDw9RgXMwT6T"
        },
        {
            "id": "Grape (Isabella)",
            "url": "https://drive.google.com/uc?id=1nsAXwoNIQzrkhBQQQy-0laedQT28uJX_"
        },
        {
            "id": "Guava (Rosy)",
            "url": "https://drive.google.com/uc?id=1pinXh15_Mj4cG2l8xXY__UnzV4YpY61U"
        },
        {
            "id": "Beet  Root (Detroit)",
            "url": "https://drive.google.com/uc?id=1s7qlq6_PrvfeexAZCpyGS3qGfdsahJYt"
        },
        {
            "id": "Passion Fruit (Frederick)",
            "url": "https://drive.google.com/uc?id=1sUdzt-FdFUuCiqjlqScGS6jPtosP1F_N"
        },
        {
            "id": "Carrots (Teracotta)",
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



    const getImagePathForTheName = (name) => {
        const matchedUrl = urls.find((item) => item.id === name);
        if (matchedUrl) {
            return matchedUrl.url;
        } else {
            // Return a default URL or handle the case when the name doesn't have a matching URL
            return "https://drive.google.com/uc?id=DEFAULT_URL_ID";
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recommended Crops</Text>

            {props.CropList[0] !== '_DEFAULT' && (
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        {chunks[selected].map((item, index) => (
                            <View key={index} style={styles.item}>
                                <CropData Icon={item.image} Name={item.name} url={getImagePathForTheName(item.name)} />
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
