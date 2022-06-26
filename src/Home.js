/*==================================================================================
/* Object:  TELA HOME                                                 *** PRONTO ***                             
/*----------------------------------------------------------------------------------
/* VRS001-17/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome5';

import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
}

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'FormGroups',
    };

    constructor(props) {
        super(props);
        this.state = { refresh: true, }

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.setState({ refresh: true, })
            }
        )        
    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <View style={styles.viewNameApp}>
                        <Text style={styles.textNameBig}>F</Text>
                        <Text style={styles.textNameLow}>ORM </Text>
                        <Text style={styles.textNameBig}>G</Text>
                        <Text style={styles.textNameLow}>ROUPS</Text>
                    </View>
                    <View style={styles.viewSubtitle}>
                        <Text style={styles.textSubtitle}>
                            { this.state.refresh ? ws.lang.home_Subtitle : null }
                        </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity 
                        style={styles.touchaButton}
                        onPress={() => this.props.navigation.navigate('ListGroups')}>
                        <View style={styles.viewButton}>
                            <Icon name='list-alt' type='font-awesome'
                                size={34} color={color.button_TextBlack} 
                            />  
                            <Text style={styles.textButton}>
                                { this.state.refresh ? ws.lang.home_TextButton : null }
                            </Text>  
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewFooter}>
                    <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={() => this.props.navigation.navigate('Help')} 
                        style={styles.TouchStyleLeft}>
                            <Icon name='question-circle' 
                                reverse
                                type='font-awesome'
                                size={50} 
                                color={color.button_Help} 
                            />    
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={() => this.props.navigation.navigate('ConfigApp')} 
                        style={styles.TouchStyleRight}>
                            <Icon name='cog' 
                                reverse
                                type='font-awesome'
                                size={50} 
                                color={color.button_Config} 
                            />    
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const mapStateToProps = store => ({
    language: store.appStore.language,
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.app_Back,
        justifyContent: 'space-between',
    },

    /*----------------------------------
    /*     Styles do nome do APP
    ----------------------------------*/

    viewNameApp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 10,
    },

    textNameBig: {
        color: '#B00020',
        fontSize: 60,
        fontWeight: 'bold',
    },
    
    textNameLow: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
    },

    /*----------------------------------
    /*     Styles do nome do APP
    ----------------------------------*/

    viewSubtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
    },

    textSubtitle: {
        color: '#263238',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    /*----------------------------------
    /*        Styles do RODAPE
    ----------------------------------*/

    viewFooter: {
        minHeight: 100,
    },

    TouchStyleLeft:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 20,
    },

    TouchStyleRight:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
    },

    /*----------------------------------
    /*   Styles do BUTTON Principal
    ----------------------------------*/

    touchaButton: {
        backgroundColor: color.color_Yellow,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: color.button_Border,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
    },

    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 16,
    },

    textButton: {
        color: color.button_TextBlack,
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },

});
