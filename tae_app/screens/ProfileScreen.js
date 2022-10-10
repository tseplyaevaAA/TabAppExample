import { isMatch } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import CustomButton from '../components/CustomButton';
import { NAME_COLOR, TAB_INACTIVE_COLOR, WHITE_COLOR } from '../styles/color';
import { CAMERA, EDIT, EMPTY_PHOTO, USER } from '../styles/images';
import { ADDRESS, BOIGRAPHY, CANCEL, DATEBIRTH, EMAIL, NAME, PHONE, SAVE, WEBSITE } from '../utility/strings';
import { scale } from '../utility/utility';


const ProfileScreen = (props) => {

    const [modalEditProfile, setModalEditProfile] = useState(false);

    // user data
    const [name, setName] = useState("Norton Montana");
    const [email, setEmail] = useState('emailexample@gmail.com');
    const [birth, setBirth] = useState('01/01/1950');
    const [address, setAddress] = useState('502 White St.Fresno, CA 93727');
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.');
    const [website, setWebsite] = useState('www.superwebsite.com');
    const [number, setNumber] = useState('123-123-3456');

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
        console.log('hello')
    });

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

    function saveProfileData() {
        if (checkActive()) {
            setName(nname != name && nname != '' ? nname : name)
            setEmail(nemail != email && nemail != '' ? nemail : email)
            setBirth(nbirth != birth && nbirth != '' ? nbirth : birth)
            setAddress(naddress != address && naddress != '' ? naddress : address)
            setBio(nbio != '' ? nbio : bio)
            setWebsite(nwebsite != '' ? nwebsite : website)
            setNumber(nnumber != '' ? nnumber : number)
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
                                {!nameCorrect && <Text style={styles.errorStyle}>{'Name should be at least 4 symbols'}</Text>}
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
                                {!emailCorrect && <Text style={styles.errorStyle}>{'Email should be at least 6 symbols'}</Text>}
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
                                {!birthCorrect && <Text style={styles.errorStyle}>{'Date of Birth should be 10 symbols mm/dd/yyyy'}</Text>}
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
                                {!addressCorrect && <Text style={styles.errorStyle}>{'Address should be at least 10 symbols'}</Text>}
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
                    {!(number == ' ' &&  website == ' ') && <View style={[styles.infoContainer, { height: 'auto' }]}>
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
                    <TouchableOpacity
                        style={styles.editContainer}
                        onPress={() => { editProfile() }}>
                        <Image style={styles.editImageStyle} source={EDIT}></Image>
                    </TouchableOpacity>
                </View>
            </BackgroundView>
        </>
    )
}

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent:'center',
        alignItems: 'center',
        marginTop: scale(10),
    },
    baseInfoContainer: {
        //height: scale(70),
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
        backgroundColor: '#e1e2e3',
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
        color: '#929294'
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
        color: '#929294',
        marginTop: scale(2)
    },
    contactContainer: {
        flexDirection: 'row',
    },
    contactTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#929294',
    },
    editImageStyle: {
        height: scale(16),
        width: scale(12),
    },
    editContainer: {
        alignSelf: 'flex-end',
        marginTop: scale(30),
        marginRight: '5%'
    },
    editViewContainer: {
        backgroundColor: '#e2f4ff',
        flex: 1,
        flexDirection: 'column'
    },
    editFieldsContainer: {
        //flex: 0.9,
        //backgroundColor: '#BBBCCC',
        height: scale(248),
        alignItems: 'center',
        paddingVertical: scale(10)
    },
    btnResContainer: {
        //flex: 0.1,
        height: scale(25),
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: WHITE_COLOR,
    },
    textInputStyle: {
        height: scale(15),
        //height: 'auto',
        width: '90%',
        marginTop: '3%',
        //backgroundColor: WHITE_COLOR,
        borderRadius: 7,
        borderColor: TAB_INACTIVE_COLOR,
        borderWidth: 1,
        paddingHorizontal: '3%',
        justifyContent: 'center'
    },
    editItem: {
        height: 'auto',
        width: '90%',
        //backgroundColor: WHITE_COLOR,
        //borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: scale(6)
    },
    errorStyle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#de5252',
        marginTop: scale(2)
    }

});

export default ProfileScreen;