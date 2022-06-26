/*==================================================================================
/* Object:  EDIÇÃO DOS MEMBROS DO GRUPO                             **** PRONTO ****
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, Keyboard, } from 'react-native';

import { connect } from 'react-redux'
import { addMember, editMember, deleteMember } from './actions/actions'

import Icon from 'react-native-vector-icons/FontAwesome5'
import Button from './components/Button';

import { color } from './models/colors'
import { Styles } from './models/styles'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
    typeEdit: 'I',
    posEdit: 0,
}

class EditMemberScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
        };
    }

    constructor(props) {
        super(props);
        this.state = { 
            showButtons: true,
            typeEdit: 'I',
            idMember: 0,
            nameMember: '',
            manMember: 0,
            womanMember: 0,
        };
    }

    componentDidMount() { 
        const { navigation } = this.props
        ws.typeEdit = navigation.getParam('typeEdit', 'I')
        ws.posEdit = navigation.getParam('posEdit', 0)
        this.setState({ typeEdit: ws.typeEdit, })

        if ( this.props.appStore.language === 'us' ) {
            ws.lang = langUS
        } else {
            ws.lang = langBR
        }

        if ( ws.typeEdit !== 'I' ) {
            this.setState({ 
                idMember:    this.props.appStore.members[ws.posEdit].id, 
                nameMember:  this.props.appStore.members[ws.posEdit].name,
                manMember:   this.props.appStore.members[ws.posEdit].man, 
                womanMember: this.props.appStore.members[ws.posEdit].woman, 
            })
        } 

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        );
    }

    /*-- Funções para exibir/esconder os Buttons --*/
    /*---------------------------------------------*/

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    keyboardDidShow = () => {
        this.setState({ showButtons: false })
    }
    
    keyboardDidHide = () => {
        this.setState({ showButtons: true })
    }
    
    /*-- Funções para add/subtract Man e Woman --*/
    /*-------------------------------------------*/

    pressMan = ( operator ) => {
        let qt = this.state.manMember + this.state.womanMember
        if ( operator === '+' ) {
            if ( qt < 6 ) {
                this.setState({ manMember: this.state.manMember + 1 })
            }
        } else {
            if ( this.state.manMember > 0 ) {
                this.setState({ manMember: this.state.manMember - 1 })
            } 
        }
    }

    pressWoman = ( operator ) => {
        let qt = this.state.manMember + this.state.womanMember
        if ( operator === '+' ) {
            if ( qt < 6 ) {
                this.setState({ womanMember: this.state.womanMember + 1 })
            }
        } else {
            if ( this.state.womanMember > 0 ) {
                this.setState({ womanMember: this.state.womanMember - 1 })
            } 
        }
    }

    /*-- Funções Save e Cancel --*/
    /*---------------------------*/

    pressSave = () => {
        let valid = true

        if ( this.state.typeEdit != 'E' ) {
            if ( this.state.nameMember === '' ) {
                valid = false
                Alert.alert( ws.lang.editGroup_AlertErrTitle,
                    ws.lang.editMember_ErrName,
                    [ {text: 'OK',} ], {cancelable: true},
                )      
            }
            let qtMember = this.state.manMember + this.state.womanMember
            if ( valid && qtMember <= 0 ) {
                valid = false
                Alert.alert( ws.lang.editGroup_AlertErrTitle,
                    ws.lang.editMember_ErrQuantity,
                    [ {text: 'OK',} ], {cancelable: true},
                )      
            }
        }        

        if ( valid ) {
            switch (ws.typeEdit) {
                case 'I':
                    this.props.addMember( 
                        this.props.appStore.idGroup,
                        this.state.nameMember,
                        this.state.manMember,
                        this.state.womanMember,
                    )
                    break;
                case 'A':
                    this.props.editMember( 
                        this.state.idMember,
                        this.state.nameMember,
                        this.state.manMember,
                        this.state.womanMember,
                    )
                    break;
                case 'E':
                    this.props.deleteMember( 
                        this.state.idMember,
                    )
                    break;
                default:
                    null
            }        
            this.props.navigation.goBack()
        }
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    /*-- Icones Male e Female --*/
    /*--------------------------*/

    iconMale = () => { 
        return (
            <View style={styles.viewUnitIcon}>
                <Icon name='male' 
                size={40} 
                color={color.icon_Man} 
                />    
            </View>
        ) 
    } 

    iconFemale = () => { 
        return ( 
            <View style={styles.viewUnitIcon}>
            <Icon name='female' 
                size={40} 
                color={color.icon_Woman} 
            />    
            </View> 
        )
    }

    render() {
        return (

            <View style={Styles.container}>
                <View style={Styles.boxPage}>

                    <View style={Styles.viewItem}>
                        <Text style={Styles.inputLabel}>{ws.lang.editMember_Name}</Text>
                        { this.state.typeEdit != 'E' ? 
                            <TextInput style={Styles.inputText}
                                editable = {true}
                                maxLength = {22}
                                onChangeText={(nameMember) => this.setState({nameMember})}
                                value={this.state.nameMember}
                            />
                        : 
                            <View style={Styles.editNonEditable}>
                                <Text style={Styles.showText}>
                                    {this.state.nameMember}
                                </Text>
                            </View>
                        }
                    </View>

                    <View style={Styles.viewItem}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.inputLabel}>{ws.lang.editMember_QtMan}</Text>
                        </View>
                        <View style={Styles.viewShowNumber}>
                            <View style={Styles.viewButtonNumberLeft}>
                                { this.state.typeEdit != 'E' ? 
                                    <Icon name='minus-circle' 
                                        size={32} 
                                        color={color.icon_Red} 
                                        onPress={() => this.pressMan('-')} 
                                    />    
                                : null }
                            </View>
                            { this.state.typeEdit != 'E' ? 
                                <View style={Styles.viewValueNumber}>
                                    <Text style={Styles.textValueNumber}>
                                        {this.state.manMember}
                                    </Text>
                                </View>
                            : 
                                <View style={Styles.viewValueNoEditable}>
                                    <Text style={Styles.textValueNumber}>
                                        {this.state.manMember}
                                    </Text>
                                </View>
                            }
                            <View style={Styles.viewButtonNumberRight}>
                                { this.state.typeEdit != 'E' ? 
                                    <Icon name='plus-circle'
                                        size={32} 
                                        color={color.icon_Blue} 
                                        onPress={() => this.pressMan('+')} 
                                    />    
                                : null }
                            </View>
                        </View>
                    </View>

                    <View style={Styles.viewItem}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.inputLabel}>{ws.lang.editMember_QtWoman}</Text>
                        </View>
                        <View style={Styles.viewShowNumber}>
                            <View style={Styles.viewButtonNumberLeft}>
                                { this.state.typeEdit != 'E' ? 
                                    <Icon name='minus-circle' 
                                        size={32} 
                                        color={color.icon_Red} 
                                        onPress={() => this.pressWoman('-')} 
                                    />    
                                : null }
                            </View>
                            { this.state.typeEdit != 'E' ? 
                                <View style={Styles.viewValueNumber}>
                                    <Text style={Styles.textValueNumber}>
                                        {this.state.womanMember}
                                    </Text>
                                </View>
                            : 
                                <View style={Styles.viewValueNoEditable}>
                                    <Text style={Styles.textValueNumber}>
                                        {this.state.womanMember}
                                    </Text>
                                </View>
                            }
                            <View style={Styles.viewButtonNumberRight}>
                                { this.state.typeEdit != 'E' ? 
                                    <Icon name='plus-circle'
                                        size={32} 
                                        color={color.icon_Blue} 
                                        onPress={() => this.pressWoman('+')} 
                                    />    
                                : null }
                            </View>
                        </View>
                    </View>

                    { this.state.womanMember > 0 || this.state.manMember > 0 
                    ?
                        <View style={styles.viewIcons}>
                            { this.state.manMember > 0 ? <this.iconMale /> : null }
                            { this.state.manMember > 1 ? <this.iconMale /> : null }
                            { this.state.manMember > 2 ? <this.iconMale /> : null }
                            { this.state.manMember > 3 ? <this.iconMale /> : null }
                            { this.state.manMember > 4 ? <this.iconMale /> : null }
                            { this.state.manMember > 5 ? <this.iconMale /> : null }
                            { this.state.womanMember > 0 ? <this.iconFemale /> : null }
                            { this.state.womanMember > 1 ? <this.iconFemale /> : null }
                            { this.state.womanMember > 2 ? <this.iconFemale /> : null }
                            { this.state.womanMember > 3 ? <this.iconFemale /> : null }
                            { this.state.womanMember > 4 ? <this.iconFemale /> : null }
                            { this.state.womanMember > 5 ? <this.iconFemale /> : null }
                        </View>
                    : null
                    }

                </View>

                { this.state.showButtons
                ?
                    <View style={Styles.boxFooter}>
                        <Button title='Cancelar' 
                            icon='times'
                            type='font-awesome' 
                            name={ws.lang.buttonCancel}  
                            color={color.color_Red} 
                            onClick={this.pressCancel} 
                        />
                        <Button title='Salvar' 
                            icon='save'
                            type='font-awesome' 
                            name={ws.lang.buttonSave} 
                            color={color.color_Green} 
                            onClick={this.pressSave} 
                        />
                    </View> 
                : null
                }

            </View>
        );
    }
}

// this.state.typeEdit != 'E' ? Styles.viewValueNumber : Styles.editNonEditable

const mapStateToProps = store => ({
    appStore: store.appStore,
});

const mapDispatchToProps = {
    addMember, 
    editMember, 
    deleteMember, 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMemberScreen)

const styles = StyleSheet.create({
    viewIcons: {
        marginTop: 32,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: color.button_Border,
        backgroundColor: color.edit_BackNoEditable,
    },

    viewUnitIcon: {
        marginHorizontal: 3,
    }
});
