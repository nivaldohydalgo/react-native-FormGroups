/*==================================================================================
/* Object:  EDIÇÃO DAS DESCRIÇÕES LIVRES DOS GRUPOS                               
/*----------------------------------------------------------------------------------
/* VRS001-14/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';

import { connect } from 'react-redux'
import { updateFormEditDescription } from './actions/actions'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { color } from './models/colors'

class DescriptionFreeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edição das Descrições',
        };
    }
 
    constructor(props) {
        super(props)
        this.state = { descrGroups: [] };

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                const { navigation } = this.props
                const altered = navigation.getParam('altered', null)
                const id = navigation.getParam('id', 0)
                const name = navigation.getParam('name', '')
                if ( altered === true ) {
                    const groups = this.props.appStore.groups[this.props.appStore.indGroup].freeDescription
                    let ind = id - 1
                    groups[ind].name = name
                    this.setState({ descrGroups: groups })
                    this.props.updateFormEditDescription( id, name )
                }
            }
        )        
    }

    componentDidMount() { 
        console.log('DescriptionFree.js> Executando componentDidMount() *** V001 ***')
        this.setState({ descrGroups: this.props.appStore.groups[this.props.appStore.indGroup].freeDescription })
    }

    componentWillMount(){
        console.log('DescriptionFree.js> Executando componentWillMount() *** V001 ***')
    }

    pressEditDescription = (id, name) => {
        this.props.navigation.navigate(
            'EditDescription',
            { id, name },
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewEdition}>
                    <View>
                        <Text style={styles.labelTitle}>DESCRIÇÃO LIVRE DOS GRUPOS</Text>
                    </View>

                    <View style={styles.viewGroups}>
                        <FlatList 
                            data={this.props.appStore.groups[this.props.appStore.indGroup].freeDescription}
                            extraData={this.state}
                            keyExtractor={item => String(item.id)}
                            renderItem={( {item} ) => {
                                return (
                                    <View style={styles.boxItem}>
                                        <View style={styles.viewNumberGroup}>
                                            <Text style={styles.textNumberGroup}>
                                                Grupo {item.id}:
                                            </Text>
                                        </View>
                                        <View style={styles.boxEdit}>
                                            <Text style={styles.inputText}>
                                                {item.name}    
                                            </Text>
                                        </View>
                                        <View style={styles.viewButton}>
                                            <Icon name='edit' 
                                                size={30} 
                                                color={color.color_Blue} 
                                                regular
                                                onPress={() => this.pressEditDescription(item.id, item.name)} 
                                            />    
                                        </View>
                                    </View>  
                                )
                            }}
                        />
                    </View>        
                </View>

            </View>
        );
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore,
});

const mapDispatchToProps = {
    updateFormEditDescription,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DescriptionFreeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.app_Back,
    },

    viewEdition: {
        flex: 8,
        paddingTop: 4,
    },

    viewButton: {
        flex: 1,
        margin: 4,
        marginRight: 12,
        flexDirection: 'row',
    },

    labelTitle: {
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelText,
    },

    viewGroups: {
        marginTop: 3,
        marginBottom: 40,
    }, 

    boxItem: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 6,
        marginVertical: 4,
        justifyContent: 'space-between', 
    },

    viewNumberGroup: {
        marginHorizontal: 4,
        alignItems: 'center',
    },

    textNumberGroup: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    boxEdit: {
        flex: 1,
    },

    inputText: {
//        justifyContent: 'space-between',
        fontSize: 20,
        marginHorizontal: 7,
        paddingHorizontal: 12,
        color: color.edit_Text,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: color.edit_BackEditable,
        paddingVertical: 6,
    },

    viewButton: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 10, 
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

    labelGroups: {
        color: color.edit_LabelText,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
