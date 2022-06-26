import React, { Component } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux'
import { setActiveMember } from './actions/actions'

import Button from './components/Button'
import { identifyIndex } from './functions/functionOther'

import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'
import { Styles } from './models/styles'

const ws = {
    lang: langBR,
    pos: 0,
}

class ListMembersScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('listMembers_HeaderTitle', ''),
        };
    }

    constructor(props) {
        super(props);

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.appStore.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ listMembers_HeaderTitle: ws.lang.listGroups_Header })
            }
        )        
    }

    pressAdd = () => {
        this.props.navigation.navigate('EditMember', { 
            title: (
                ws.lang.editMember_TitleInsert + 
                this.props.appStore.groups[this.props.appStore.indGroup].singularName
            ), 
            typeEdit: 'I', 
            posEdit: 0
        })
    }

    pressEdit = (id) => {
        ws.pos = identifyIndex( id, this.props.appStore.members )
        this.props.navigation.navigate('EditMember', { 
            title: (
                ws.lang.editMember_TitleEdit + 
                this.props.appStore.groups[this.props.appStore.indGroup].singularName
            ), 
            typeEdit: 'A', 
            posEdit: ws.pos
        })
    }

    pressDelete = (id) => {
        ws.pos = identifyIndex( id, this.props.appStore.members )
        this.props.navigation.navigate('EditMember', { 
            title: (
                ws.lang.editMember_TitleDelete + 
                this.props.appStore.groups[this.props.appStore.indGroup].singularName
            ), 
            typeEdit: 'E',
            posEdit: ws.pos
        })
    }

    pressActive = (id) => {
        this.props.setActiveMember(id)
    }

    iconMale = () => { 
        return (
            <View style={styles.viewUnitIcon}>
                <Icon name='male' 
                    size={24} 
                    color={color.icon_Man} 
                />    
            </View>
        ) 
    } 

    iconFemale = () => { 
        return ( 
            <View style={styles.viewUnitIcon}>
                <Icon name='female' 
                    size={24} 
                    color={color.icon_Woman} 
                />    
            </View> 
        )
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.boxPage}>
                    <SafeAreaView>
                        <FlatList 
                            data={this.props.appStore.members.filter(member => member.group === this.props.appStore.idGroup)}
                            extraData={this.state}
                            keyExtractor={item => String(item.id)}
                            renderItem={( {item} ) => {
                                return (
                                    <View style={Styles.boxItemFlat}>
                                        <View style={Styles.itemFlatList}>

                                            <View style={Styles.viewIconLeft}>
                                                { item.active ?
                                                    <Icon name='toggle-on' 
                                                        size={22} 
                                                        color={color.icon_On} 
                                                        regular
                                                        onPress={() => this.pressActive(item.id)} 
                                                    />    
                                                :
                                                    <Icon name='toggle-off' 
                                                        size={22} 
                                                        color={color.icon_Off} 
                                                        regular
                                                        onPress={() => this.pressActive(item.id)} 
                                                    />    
                                                }
                                            </View>
                                            
                                            <View style={Styles.viewDataFlat}>
                                                <View style={Styles.viewTitleFlat}>
                                                    <Text style={Styles.textTitleFlat}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={Styles.viewDetailFlat}>
                                                    { item.man > 0 ? <this.iconMale /> : null }
                                                    { item.man > 1 ? <this.iconMale /> : null }
                                                    { item.man > 2 ? <this.iconMale /> : null }
                                                    { item.man > 3 ? <this.iconMale /> : null }
                                                    { item.man > 4 ? <this.iconMale /> : null }
                                                    { item.man > 5 ? <this.iconMale /> : null }
                                                    { item.woman > 0 ? <this.iconFemale /> : null }
                                                    { item.woman > 1 ? <this.iconFemale /> : null }
                                                    { item.woman > 2 ? <this.iconFemale /> : null }
                                                    { item.woman > 3 ? <this.iconFemale /> : null }
                                                    { item.woman > 4 ? <this.iconFemale /> : null }
                                                    { item.woman > 5 ? <this.iconFemale /> : null }                                     
                                                </View>
                                            </View>
                                            
                                            <View style={Styles.viewIconLeft}>
                                                <Icon name='edit' 
                                                    size={26} 
                                                    color={color.icon_Blue} 
                                                    regular
                                                    onPress={() => this.pressEdit(item.id)} 
                                                    />   
                                            </View>
                                            <View style={Styles.viewIconRight}>
                                                <Icon name='trash-alt' 
                                                    size={26} 
                                                    color={color.icon_Red} 
                                                    onPress={() => this.pressDelete(item.id)} 
                                                />    
                                            </View>
                                        
                                        </View>
                                        <View style={Styles.dividerFlat}></View>
                                    </View>  
                                )
                            }}
                        />
                    </SafeAreaView>
                </View>
                <View style={Styles.boxFooter}>
                    <Button title='Incluir' 
                        icon='user-plus' 
                        name='Incluir' 
                        color={color.color_Yellow} 
                        onClick={this.pressAdd} 
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore,
});

const mapDispatchToProps = {
    setActiveMember,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListMembersScreen)

const styles = StyleSheet.create({
    viewUnitIcon: {
        marginHorizontal: 3,
    },

});
