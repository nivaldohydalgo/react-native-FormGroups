/*==================================================================================
/* Object:  CONFIGURAÇÃO DO APP                                       *** PRONTO ***             
/*----------------------------------------------------------------------------------
/* VRS001-14/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, Keyboard, Image } from 'react-native';

import { connect } from 'react-redux'
import { updateAppLanguage } from './actions/actions'

import { CheckBox } from 'react-native-elements'

import Button from './components/Button'
import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
}

class ConfigAppScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('headerConfigApp', ''),
        };
    };    
 
    constructor(props) {
        super(props);

        this.state = { 
            showButtons: true, 
            language: 'br',
        };

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ headerConfigApp: ws.lang.configApp_Header })
                this.setState({ language: this.props.language })
            }
        )        
    }

    componentDidMount() { 
        this.setState({ 
            language: this.props.language,
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
 
    /*-- Funções de seleção do tipo de descrição --*/
    /*---------------------------------------------*/

    selectLanguage = (l) => {
        if ( this.state.language != l ) {
            if ( l === 'us' ) {
                ws.lang = langUS
            } else {
                ws.lang = langBR
            }
            this.props.navigation.setParams({ headerConfigApp: ws.lang.configApp_Header })
            this.setState({ language: l })
        }
    }
    
    /*-- Funções dos Buttons Cancel e Save  --*/
    /*----------------------------------------*/

    pressSave = () => {
        this.props.updateAppLanguage(
            this.state.language,
        )
        this.props.navigation.goBack()
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewEdition}>
                    <Text style={styles.inputLabel}>
                        { ws.lang.configApp_TitleLang }
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}></View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 4, }}>
                            { this.state.language === 'br'
                            ? <Image source={require('./images/br-64.png')} style={{width: 64, height: 45}} />
                            : <Image source={require('./images/us-64.png')} style={{width: 64, height: 34}} />
                            }
                        </View>

                        <View style={{  }}>
                        <CheckBox
                            title={ ws.lang.configApp_LangBR }
                            containerStyle={styles.styleCheckBox}
                            checked={(this.state.language === 'br')}
                            onPress={() => this.selectLanguage('br')}
                        />
                        <CheckBox
                            title={ ws.lang.configApp_LangUS }
                            containerStyle={styles.styleCheckBox}
                            checked={(this.state.language === 'us')}
                            onPress={() => this.selectLanguage('us')}
                        />
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>

                </View>

                { this.state.showButtons
                ?
                    <View style={styles.viewButton}>
                        <Button title='Cancel' 
                            icon='times'
                            type='font-awesome' 
                            name={ ws.lang.buttonCancel } 
                            color={color.color_Red} 
                            onClick={this.pressCancel} 
                        />
                        <Button title='Save' 
                            icon='save'
                            type='font-awesome' 
                            name={ ws.lang.buttonSave } 
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
    language: store.appStore.language,
});

const mapDispatchToProps = {
    updateAppLanguage,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigAppScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.app_Back,
    },

    viewEdition: {
        flex: 80,
        justifyContent: 'flex-start',
    },

    viewButton: {
        flex: 12,
        margin: 4,
        flexDirection: 'row',
    },

    inputLabel: {
        marginTop: 20,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelText,
    },

    styleCheckBox: {
        margin: 0, 
        padding: 0, 
        borderWidth: 0,
        paddingBottom: 2,
        backgroundColor: color.app_Back,
    },
});
