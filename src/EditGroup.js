/*==================================================================================
/* Object:  EDIÇÃO DOS DADOS BASICOS DO GRUPO                       **** PRONTO ****  
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, Keyboard, ScrollView } from 'react-native';

import { connect } from 'react-redux'
import { groupInsert, groupUpdate, groupDelete } from './actions/actions'

import Icon from 'react-native-vector-icons/FontAwesome5';

import Button from './components/Button';

import { color } from './models/colors'
import { Styles } from './models/styles'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
    typeEdit: 'I',
}

class EditGroupScreen extends Component {

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
            idGroup: 0,
            nameGroup: '',
            singularMember: '',
            pluralMember: '',
        };
    }

    componentDidMount() { 
        const { navigation } = this.props
        ws.typeEdit = navigation.getParam('typeEdit', 'I')
        this.setState({ typeEdit: ws.typeEdit })

        if ( this.props.appStore.language === 'us' ) {
            ws.lang = langUS
        } else {
            ws.lang = langBR
        }

        if ( ws.typeEdit !== 'I' ) {
            let ind = this.props.appStore.indGroup
            if ( ind >= 0 ) {
                this.setState({ 
                    idGroup: this.props.appStore.groups[ind].id, 
                    nameGroup: this.props.appStore.groups[ind].nameGroup,
                    singularMember: this.props.appStore.groups[ind].singularName, 
                    pluralMember: this.props.appStore.groups[ind].pluralName, 
                })
            }
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
    
    /*-- Funções de Salvar, Cancelar e Deletar --*/
    /*-------------------------------------------*/

    pressDelete = (id, name) => {
        Alert.alert(
            ws.lang.editGroup_ConfirmTitle,
            name,
            [
              { text: ws.lang.alertCancel,
                onPress: null, 
                style: 'cancel', },
              { text: 'OK', onPress: () => this.confirmedDelete(id)},
            ],
            {cancelable: true},
        );        
    }

    confirmedDelete = (id) => {
        this.props.groupDelete(id)    
        this.props.navigation.goBack()
    }

    pressSave = () => {
        let validationOk = true
        if ( this.state.nameGroup == '' ||
             this.state.singularMember == '' ||
             this.state.pluralMember == ''  
            ) {
            validationOk = false
            Alert.alert( ws.lang.editGroup_AlertErrTitle,
                ws.lang.editGroup_AlertErrMsg,
                [ {text: 'OK',} ], {cancelable: true},
            )      
        }
        if ( validationOk ) {
            if ( ws.typeEdit === 'I' ) {
                this.props.groupInsert(
                    this.state.nameGroup,
                    this.state.singularMember,
                    this.state.pluralMember,
                )
            } else {
                this.props.groupUpdate(
                    this.state.idGroup,
                    this.state.nameGroup,
                    this.state.singularMember,
                    this.state.pluralMember,
                )
            }
            this.props.navigation.goBack()
        }
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={Styles.container}>

                <View style={Styles.boxPage}>
                    <ScrollView>

                        <View style={Styles.flexDirectionRow}>
                            <View style={Styles.flexUm}>
                                <Text style={Styles.inputLabel}>{ws.lang.editGroup_LabelName}</Text>
                                <TextInput style={Styles.inputText}
                                    editable = {true}
                                    maxLength = {20}
                                    onChangeText={(nameGroup) => this.setState({nameGroup})}
                                    value={this.state.nameGroup}
                                />
                            </View>
                            { this.state.typeEdit !== 'I' 
                                ?
                                <View style={styles.iconDelete}>
                                    <Icon name='trash-alt' 
                                        size={32} 
                                        color={color.color_Red} 
                                        light
                                        onPress={() => this.pressDelete(this.state.idGroup, this.state.nameGroup,)} 
                                    />    
                                </View>
                                : null
                            }
                        </View>

                        <View style={{ marginHorizontal: 30 }}>
                            <Text style={Styles.inputLabel}>{ws.lang.editGroup_LabelSingular}</Text>
                            <TextInput style={Styles.inputText}
                                editable = {true}
                                maxLength = {16}
                                onChangeText={(singularMember) => this.setState({singularMember})}
                                value={this.state.singularMember}
                            />
                            <Text style={Styles.inputNote}>{ws.lang.editGroup_NoteSingular}</Text>

                            <Text style={Styles.inputLabel}>{ws.lang.editGroup_LabelPlural}</Text>
                            <TextInput style={Styles.inputText}
                                editable = {true}
                                maxLength = {16}
                                onChangeText={(pluralMember) => this.setState({pluralMember})}
                                value={this.state.pluralMember}
                            />
                            <Text style={Styles.inputNote}>{ws.lang.editGroup_NotePlural}</Text>
                        </View>

                    </ScrollView>
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

const mapStateToProps = store => ({
    appStore: store.appStore
});

const mapDispatchToProps = {
    groupInsert,
    groupUpdate,
    groupDelete,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGroupScreen)

const styles = StyleSheet.create({
    iconDelete: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20,
        marginRight: 8,
        marginBottom: 2,
    },
});
