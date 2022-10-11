import AsyncStorage from '@react-native-async-storage/async-storage';
import { isMatch } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import CustomButton from '../components/CustomButton';
import { BACKGROUND_COLOR, ERROR_COLOR, LIGHT_GREY_COLOR, MAIN_INFO_TITLE_COLOR, NAME_COLOR, TAB_INACTIVE_COLOR, WHITE_COLOR } from '../styles/color';
import { CAMERA, EDIT } from '../styles/images';
import { USER_DATA } from '../utility/constants';
import { ADDRESS, ADDRESS_ERROR, BIRTH_ERROR, BOIGRAPHY, CANCEL, DATEBIRTH, EMAIL, EMAIL_ERROR, NAME, NAME_ERROR, PHONE, SAVE, WEBSITE } from '../utility/strings';
import { scale } from '../utility/utility';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../redux/actions';


const ProfileScreen = (props) => {

    const [modalEditProfile, setModalEditProfile] = useState(false);
    const userData = useSelector((state) => state.userDataReducer)
    const dispatch = useDispatch()

    // user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [number, setNumber] = useState('');

    // edit data
    const [nname, setNName] = useState('');
    const [nemail, setNEmail] = useState('');
    const [nbirth, setNBirth] = useState('');
    const [naddress, setNAddress] = useState('');
    const [nbio, setNBio] = useState('');
    const [nwebsite, setNWebsite] = useState('');
    const [nnumber, setNNumber] = useState('');

    //validation
    const [nameCorrect, setNameCorrect] = useState(true);
    const [emailCorrect, setEmailCorrect] = useState(true);
    const [birthCorrect, setBirthCorrect] = useState(true);
    const [addressCorrect, setAddressCorrect] = useState(true);

    useEffect(() => {
        getUserData()
    }, [userData] )

    async function getUserData() {
        setName(userData.userData.name)
        setEmail(userData.userData.email)
        setBirth(userData.userData.birth)
        setAddress(userData.userData.address)
        setBio(userData.userData.bio)
        setWebsite(userData.userData.website)
        setNumber(userData.userData.number)
    }

    function editProfile() {
        setNameCorrect(true)
        setEmailCorrect(true)
        setBirthCorrect(true)
        setAddressCorrect(true)
        setModalEditProfile(true)
    }

    function hideEditProfile() {
        setNName('')
        setNEmail('')
        setNBirth('')
        setNAddress('')
        setNBio('')
        setNWebsite('')
        setNNumber('')
        setModalEditProfile(false)
    }

    async function saveProfileData() {
        if (checkActive()) {
            let newData = {
                name: (nname != name && nname != '' ? nname : name),
                email: (nemail != email && nemail != '' ? nemail : email),
                birth: (nbirth != birth && nbirth != '' ? nbirth : birth),
                address: (naddress != address && naddress != '' ? naddress : address),
                bio: (nbio != '' ? nbio : bio).toString(),
                website: (nwebsite != '' ? nwebsite : website),
                number: (nnumber != '' ? nnumber : number)
            }
            dispatch(setUserData(newData))
            AsyncStorage.setItem(USER_DATA, JSON.stringify(newData))
            hideEditProfile()
        }
    }

    function validateName() {
        nname.length > 3 || nname == '' ?
            setNameCorrect(true) : setNameCorrect(false)
    }
    function validateEmail() {
        nemail.length > 5 || nemail == '' ?
            setEmailCorrect(true) : setEmailCorrect(false)
    }

    function validateBirth() {
        (nbirth.length == 10 || isMatch(nbirth, 'MM/dd/yyyy') || nbirth == '') ?
            setBirthCorrect(true) : setBirthCorrect(false)
    }

    function validateAddress() {
        (naddress.length > 9 || naddress == '') ?
            setAddressCorrect(true) : setAddressCorrect(false)
    }

    function checkActive() {
        return ((emailCorrect &&
            nameCorrect &&
            birthCorrect &&
            addressCorrect) &&
            !(nname == '' && nemail == '' && nbirth == '' && naddress == '' && nbio == '' && nwebsite == '' && nnumber == '')
        ) ? true : false
    }

    return (
        <>
            {modalEditProfile &&
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}
                >
                    <ScrollView style={styles.editViewContainer}>
                        <View style={styles.editFieldsContainer}>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{NAME}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={name}
                                    value={nname}
                                    onChangeText={setNName}
                                    onSubmitEditing={() => { validateName() }}
                                    maxLength={50}>
                                </TextInput>
                                {!nameCorrect && <Text style={styles.errorStyle}>{NAME_ERROR}</Text>}
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{EMAIL}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={email}
                                    value={nemail}
                                    onChangeText={setNEmail}
                                    onSubmitEditing={() => { validateEmail() }}
                                    maxLength={30}>
                                </TextInput>
                                {!emailCorrect && <Text style={styles.errorStyle}>{EMAIL_ERROR}</Text>}
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{DATEBIRTH}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={birth}
                                    value={nbirth}
                                    onChangeText={setNBirth}
                                    onSubmitEditing={() => { validateBirth() }}
                                    maxLength={10}>
                                </TextInput>
                                {!birthCorrect && <Text style={styles.errorStyle}>{BIRTH_ERROR}</Text>}
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{ADDRESS}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={address}
                                    value={naddress}
                                    onChangeText={setNAddress}
                                    onSubmitEditing={() => { validateAddress() }}
                                    maxLength={100}>
                                </TextInput>
                                {!addressCorrect && <Text style={styles.errorStyle}>{ADDRESS_ERROR}</Text>}
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{BOIGRAPHY}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={bio}
                                    value={nbio}
                                    onChangeText={setNBio}
                                    maxLength={150}>
                                </TextInput>
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{WEBSITE}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={website}
                                    value={nwebsite}
                                    onChangeText={setNWebsite}
                                    maxLength={150}>
                                </TextInput>
                            </View>
                            <View style={styles.editItem}>
                                <Text style={styles.infoHeaderStyle}>{PHONE}</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={number}
                                    value={nnumber}
                                    onChangeText={setNNumber}
                                    maxLength={12}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.btnResContainer}>
                            <CustomButton
                                text={CANCEL}
                                active={true}
                                action={() => { hideEditProfile() }}>
                            </CustomButton>
                            <CustomButton
                                text={SAVE}
                                active={checkActive()}
                                action={() => { saveProfileData() }}>
                            </CustomButton>
                        </View>
                    </ScrollView>
                </Modal>}
            <BackgroundView>
                <View style={styles.contentContainer}>
                    <View style={styles.baseInfoContainer}>
                        <View style={styles.imageContainerStyle}>
                            <Image source={CAMERA} style={styles.imageStyle}></Image>
                        </View>
                        <View style={styles.textInfoContainer}>
                            <Text style={styles.nameStyle}>{name}</Text>
                            <View style={styles.baseTextInfoContainer}>
                                <Text style={styles.infoTitleStyle}>{EMAIL}</Text>
                                <Text style={styles.infoTextStyle} numberOfLines={2}>{email}</Text>
                            </View>
                            <View style={styles.baseTextInfoContainer}>
                                <Text style={styles.infoTitleStyle}>{DATEBIRTH}</Text>
                                <Text style={styles.infoTextStyle}>{birth}</Text>
                            </View>
                            <View style={styles.baseTextInfoContainer}>
                                <Text style={styles.infoTitleStyle}>{ADDRESS}</Text>
                                <Text style={styles.infoTextStyle} numberOfLines={3}>{address}</Text>
                            </View>
                        </View>
                    </View>
                    {bio != '' &&
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoHeaderStyle}>{BOIGRAPHY}</Text>
                            <Text style={styles.infoSubheaderStyle} numberOfLines={6}>{bio}</Text>
                        </View>
                    }
                    {!(number == ' ' && website == ' ') && <View style={[styles.infoContainer, { height: 'auto' }]}>
                        {website != ' ' &&
                            <View style={styles.contactContainer}>
                                <Text style={styles.infoHeaderStyle}>{WEBSITE}</Text>
                                <Text style={styles.contactTextStyle} numberOfLines={1}>{website}</Text>
                            </View>}
                        {number != ' ' &&
                            <View style={styles.contactContainer}>
                                <Text style={styles.infoHeaderStyle}>{PHONE}</Text>
                                <Text style={styles.contactTextStyle} numberOfLines={1}>{number}</Text>
                            </View>}
                    </View>}
                </View>
                <TouchableOpacity
                    style={styles.editContainer}
                    onPress={() => { editProfile() }}>
                    <Image style={styles.editImageStyle} source={EDIT}></Image>
                </TouchableOpacity>
            </BackgroundView>
        </>
    )
}

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: scale(10),
    },
    baseInfoContainer: {
        height: 'auto',
        width: '90%',
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(5),
        justifyContent: 'space-between'
    },
    imageContainerStyle: {
        height: scale(60),
        width: '30%',
        backgroundColor: LIGHT_GREY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    imageStyle: {
        height: scale(25),
        width: scale(25),
    },
    textInfoContainer: {
        height: 'auto',
        width: '68%',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    nameStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: NAME_COLOR,
        marginBottom: scale(4)
    },
    baseTextInfoContainer: {
        flexDirection: 'column',
        height: 'auto',
        marginBottom: scale(2)

    },
    infoTitleStyle: {
        fontSize: 12,
        fontWeight: '600',
        color: MAIN_INFO_TITLE_COLOR
    },
    infoTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        color: NAME_COLOR
    },
    infoContainer: {
        height: 'auto',
        width: '90%',
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: scale(5),
        justifyContent: 'space-between',
        marginTop: scale(10)
    },
    infoHeaderStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: NAME_COLOR,
        width: '30%'
    },
    infoSubheaderStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: MAIN_INFO_TITLE_COLOR,
        marginTop: scale(2)
    },
    contactContainer: {
        flexDirection: 'row',
    },
    contactTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: MAIN_INFO_TITLE_COLOR,
    },
    editImageStyle: {
        height: scale(16),
        width: scale(12),
    },
    editContainer: {
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        marginBottom: scale(10),
        marginRight: '5%'
    },
    editViewContainer: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
        flexDirection: 'column'
    },
    editFieldsContainer: {
        height: scale(248),
        alignItems: 'center',
        paddingVertical: scale(10)
    },
    btnResContainer: {
        height: scale(25),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputStyle: {
        height: scale(15),
        width: '90%',
        marginTop: '3%',
        borderRadius: 7,
        borderColor: TAB_INACTIVE_COLOR,
        borderWidth: 1,
        paddingHorizontal: '3%',
        justifyContent: 'center'
    },
    editItem: {
        height: 'auto',
        width: '90%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: scale(6)
    },
    errorStyle: {
        fontSize: 12,
        fontWeight: '500',
        color: ERROR_COLOR,
        marginTop: scale(2)
    }

});

export default ProfileScreen;