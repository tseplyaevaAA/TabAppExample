import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Linking, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import serverHelper from '../../tae_core/ServerHelper';
import BackgroundView from '../components/BackgroundView';
import { MAIN_INFO_TITLE_COLOR, NAME_COLOR, TAB_ACTIVE_COLOR, WHITE_COLOR } from '../styles/color';
import { CATEGORY, NO_DATA } from '../utility/strings';
import { scale } from '../utility/utility';

const NewsScreen = (props) => {

    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPosts()
    }, []);

    async function fetchPosts() {
        let response = await serverHelper.fetchNews()
        if (response.data !== undefined) {
            setData(response.data)
            setRefreshing(false);
        }
    }

    function getItem(item) {
        return (
            <View style={styles.itemContainerStyle}>
                <View style={styles.headerContainerStyle}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.sourceTextStyle}>{(item.source).toUpperCase()}</Text>
                        <Text style={styles.dateTextStyle}>{((item.published_at).slice(0, 10))}</Text>
                    </View>
                    {item.image != null &&
                        <FastImage
                            style={styles.imageStyle}
                            resizeMode={'cover'}
                            source={{
                                uri: item.image,
                                priority: FastImage.priority.normal,
                            }}>
                        </FastImage>}
                </View>
                <Text style={styles.titleTextStyle} >{item.title}</Text>
                <Text style={styles.descTextStyle} >{item.description}</Text>
                <Text numberOfLines={1} style={styles.urlTextStyle} onPress={() => Linking.openURL(item.url)}>{item.url}</Text>
                <Text style={styles.categoryTextStyle} >
                    {CATEGORY + (item.category).charAt(0).toUpperCase() + item.category.slice(1)}
                </Text>
            </View>
        )
    }

    return (
        <BackgroundView>
            {data.length !== 0 ?
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => getItem(item, index)}
                    keyExtractor={(item, index) => item.description+index+item.title}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => { fetchPosts() }} />
                    }
                />
                : null
            }
            {data.length === 0 ?
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>{NO_DATA}</Text>
                </View>
                : null
            }
        </BackgroundView>
    )
}

const styles = StyleSheet.create({

    itemContainerStyle: {
        height: 'auto',
        marginHorizontal: scale(10),
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        padding: scale(5),
        marginTop: scale(10),
    },
    headerContainerStyle: {
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sourceTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: NAME_COLOR,
    },
    dateTextStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: MAIN_INFO_TITLE_COLOR,
        marginTop: scale(2)
    },
    descTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: MAIN_INFO_TITLE_COLOR,
        marginTop: scale(2),
        alignSelf: 'flex-start'
    },
    titleTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: NAME_COLOR,
        marginTop: scale(2),
        alignSelf: 'flex-start'
    },
    categoryTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: NAME_COLOR,
        marginTop: scale(4),
        alignSelf: 'flex-end'
    },
    urlTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: NAME_COLOR,
        marginTop: scale(4),
        color: TAB_ACTIVE_COLOR,
        alignSelf: 'flex-start',
    },
    noDataText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: NAME_COLOR,
    },
    noDataContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    imageStyle: {
        width: scale(40),
        height: scale(30),
        borderRadius: 10
    }
});

export default NewsScreen;