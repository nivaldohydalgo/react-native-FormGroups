/*==================================================================================
/* Object:  EDIÇÃO DE UMA DESCRIÇÃO LIVRE DE GRUPO                               
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, } from 'react-native';

import Button from './components/Button';
import { color } from './models/colors'

const ws = {
    gdName: '',
}

class EditDescriptionScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edição da Descrição',
        };
    }
 
    constructor(props) {
        super(props);
        this.state = { showButtons: true, nameGroup: '', idGroup: 1  };
    }

    componentDidMount() { 
        const { navigation } = this.props
        let id = navigation.getParam('id', 1)
        let name = navigation.getParam('name', '')
        gdName = name
        this.setState({ 
            idGroup: id, 
            nameGroup: name,
        })         
 
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
    
    /*-- Funções dos Buttons Cancel e Save  --*/
    /*----------------------------------------*/

    pressSave = () => {
        let altered = true
        if ( gdName === this.state.nameGroup ) {
            altered = false
        }
        this.props.navigation.navigate('DescriptionFree', {
            altered,
            id: this.state.idGroup,
            name: this.state.nameGroup
        })
    }

    pressCancel = () => {
        let altered = false
        this.props.navigation.navigate('DescriptionFree', {
            altered,
            id: 0,
            name: '',
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewEdition}>
                    <Text style={styles.inputLabel}>DESCRIÇÃO DO GRUPO {this.state.idGroup}</Text>
                    <TextInput style={styles.inputText}
                        editable = {true}
                        maxLength = {16}
                        onChangeText={(nameGroup) => this.setState({nameGroup})}
                        value={this.state.nameGroup}
                    />
                </View>

                { this.state.showButtons
                ?
                    <View style={styles.viewButton}>
                        <Button title='Cancelar' 
                            icon='times'
                            type='font-awesome' 
                            name='Cancelar' 
                            color={color.color_Red} 
                            onClick={this.pressCancel} 
                        />
                        <Button title='Salvar' 
                            icon='save'
                            type='font-awesome' 
                            name='Salvar' 
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

export default EditDescriptionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.app_Back,
    },

    viewEdition: {
        flex: 8,
        paddingTop: 12,
    },

    viewButton: {
        flex: 1,
        margin: 4,
        flexDirection: 'row',
    },

    inputLabel: {
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelText,
    },

    inputText: {
        justifyContent: 'space-between',
        fontSize: 20,
        marginHorizontal: 7,
        paddingHorizontal: 12,
        color: color.edit_Text,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: color.edit_BackEditable,
    },

});
