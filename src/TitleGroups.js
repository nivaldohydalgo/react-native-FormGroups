/*==================================================================================
/* Object:  EDIÇÃO DO TITULO DOS GRUPOS                               
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           **** PRONTO ****
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, } from 'react-native';

import { connect } from 'react-redux'
import { updateFormTitleGroups } from './actions/actions'

import Button from './components/Button';
import { color } from './models/colors'

class TitleGroupsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edição do Titulo',
        };
    }
 
    constructor(props) {
        super(props);
        this.state = { showButtons: true, valueTitle: 'Grupos de...' };
    }

    componentDidMount() { 
        if ( this.props.appStore.groups[this.props.appStore.indGroup].titleForm != null 
            && this.props.appStore.groups[this.props.appStore.indGroup].titleForm != undefined ) {
            this.setState({ valueTitle: this.props.appStore.groups[this.props.appStore.indGroup].titleForm })         
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
    
    /*-- Funções dos Buttons Cancel e Save  --*/
    /*----------------------------------------*/

    pressSave = () => {
        this.props.updateFormTitleGroups(this.state.valueTitle)
        this.props.navigation.goBack()
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewEdition}>
                    <Text style={styles.inputLabel}>TITULO DOS GRUPOS</Text>
                    <TextInput style={styles.inputText}
                        editable = {true}
                        maxLength = {30}
                        onChangeText={(valueTitle) => this.setState({valueTitle})}
                        value={this.state.valueTitle}
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

const mapStateToProps = store => ({
    appStore: store.appStore
});

const mapDispatchToProps = {
    updateFormTitleGroups,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleGroupsScreen)

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
