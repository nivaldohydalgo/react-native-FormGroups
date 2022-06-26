/*==================================================================================
/* Object:  EDIÇÃO DA DATA INICIAL PARA FORMAÇÃO DOS GRUPOS                               
/*----------------------------------------------------------------------------------
/* VRS001-13/07/2019-NIVALDO-Implantacao                           **** PRONTO ****
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, DatePickerAndroid, } from 'react-native';

import { connect } from 'react-redux'
import { updateFormInitialDate } from './actions/actions'

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5'

import Button from './components/Button';
import { color } from './models/colors'
import { prepareGroupsDescription } from './functions/functionDate'

class InitialDateScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edição da Data Inicial',
        };
    }
 
    constructor(props) {
        super(props);
        this.state = { 
            valueDate: moment(new Date()).format("DD/MM/YYYY"),
            stateDate: moment(new Date()), 
            stateDescription: [], 
        };
    }

    componentDidMount() { 

        let dt = moment(this.props.appStore.groups[this.props.appStore.indGroup].initialDate).format("DD/MM/YYYY")
        this.setState({ 
            valueDate: dt, 
            stateDate: this.props.appStore.groups[this.props.appStore.indGroup].initialDate,
        })         

        const groups = prepareGroupsDescription( 
            this.props.appStore.groups[this.props.appStore.indGroup].freeDescription,
            this.props.appStore.groups[this.props.appStore.indGroup].typeForm,
            this.props.appStore.groups[this.props.appStore.indGroup].initialDate,
        )
        this.setState({ 
            stateDescription: groups, 
        })         
    }

    /*-- Funções do Icon do DatePicker  --*/
    /*------------------------------------*/

    pressIconCalendar = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const dt= new Date(year, month, day);
                const date = moment(dt);
                const finalDate = moment(date).format('DD/MM/YYYY');
                const groups = prepareGroupsDescription( 
                    this.state.stateDescription,
                    this.props.appStore.groups[this.props.appStore.indGroup].typeForm,
                    date,
                )
                this.setState({ 
                    valueDate: finalDate, 
                    stateDate: date,
                    stateDescription: groups, 
                });
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
            
    /*-- Funções dos Buttons Cancel e Save  --*/
    /*----------------------------------------*/

    pressSave = () => {
        this.props.updateFormInitialDate(this.state.stateDate)
        this.props.navigation.goBack()
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewEdition}>
                    <View>
                        <Text style={styles.labelDate}>DATA DO PRIMEIRO GRUPO</Text>
                    </View>
                    <View style={styles.viewDateIcon}>
                        <View style={styles.viewDate}>
                            <Text style={styles.textDate}>
                                {this.state.valueDate}
                            </Text>
                        </View>
                        <View style={styles.viewButtonTitle}>
                            <Icon name='calendar-alt' 
                                size={30} 
                                color={color.color_Blue} 
                                regular
                                onPress={() => this.pressIconCalendar()} 
                            />    
                        </View>
                    </View>
                    <View style={styles.viewFormat}>
                        <Text style={styles.textFormat}>Clique no calendário para alterar a data</Text>
                    </View>
                    <View style={styles.viewGroups}>
                        <Text style={styles.labelGroups}>DESCRIÇÃO DOS GRUPOS</Text>
                        <FlatList 
                            data={this.state.stateDescription}
                            extraData={this.state}
                            keyExtractor={item => String(item.id)}
                            renderItem={( {item} ) => {
                                return (
                                    <View style={styles.boxItem}>
                                        <Text style={styles.nameGroup}>
                                            Grupo {item.id} - {item.name}
                                        </Text>
                                    </View>  
                                )
                            }}
                        />
                    </View>        
                </View>

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

            </View>
        );
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore,
    // storeDate: store.appStore.initialDate,
    // storeDescription: store.appStore.groupsDescription,
    // storeType: store.appStore.descriptionType,
});

const mapDispatchToProps = {
    updateFormInitialDate,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialDateScreen)

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

    viewDateIcon: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    },

    viewDate: { 
        flex: 1,  
        justifyContent: 'space-between',
    },   

    labelDate: {
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelText,
    },

    textDate: {
        justifyContent: 'space-between',
        fontSize: 20,
        marginHorizontal: 7,
        padding: 12,
        color: color.edit_Text,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: color.edit_BackEditable,
        textAlign: 'center',
    },

    viewButtonTitle: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 7, 
    },

    viewFormat: {
        marginHorizontal: 7, 
    },
    
    textFormat: {
        color: color.edit_LabelNote,
        fontSize: 14,
        fontWeight: 'bold',
    },

    boxItem: {
        flex: 1,
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: color.color_Yellow,
        borderColor: color.edit_Border,
        borderRadius: 8,
        marginHorizontal: 14,
        marginVertical: 3,
    },

    viewGroups: {
        marginTop: 30, 
        marginHorizontal: 16, 
        marginBottom: 150,
    }, 

    nameGroup: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    labelGroups: {
        color: color.edit_LabelText,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
