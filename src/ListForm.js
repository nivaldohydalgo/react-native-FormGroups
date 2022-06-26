/*==================================================================================
/* Object:  SORTEIA E EXIBE OS GRUPOS (ALTERA, EXCLUIR E MARCA RESPONSÁVEL)                        
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { Alert, SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux'
import { Icon, Badge } from 'react-native-elements'
import IconFA from 'react-native-vector-icons/FontAwesome5'

import Button from './components/Button'
import SelectList from './components/SelectList'

import { identifyIndex, identifyGroup } from './functions/functionOther'

import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'
import { Styles } from './models/styles'

const ws = {
    lang: langBR,
    qtGroups: 0,
    arrayMembers: [],
    arrayGroups: [],       // Array dos grupos      
    oneGroup: {},          // Objeto de um grupo
    arrayList: [],         // Array da lista de grupos/membros
    oneItem: {},           // Objeto de um item da lista
    qtGrouped: 0,
}

const modelGroup = {
    id: 0,              // numero do grupo
    name: '',           // nome do grupo
    amount: 0,          // quantidade de membros
}

const modelList = {
    id: 0,              // id para o flatlist
    group: 0,           // numero do grupo
    order: 0,           // ordem:  0=grupo  1=responsável  2=demais
    name: '',           // nome do membro ou do grupo(data,etc)
    person: 0,          // quantidade de pessoas (?=no grupo  2=casal  1=demais)
}

class ListFormScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('listFormHeaderTitle', ''),
        };
    };

    constructor(props) {
        super(props);
        this.state = { 
            listMembers: [],      // Array do FlatList
            /*-- Alteração do grupo do membro --*/
            editGroup: false,     // Exibir tela de edição do grupo do membro
            gdSelected: 0,        // Grupo do membro selecionado
            idSelected: 0,        // Id do membro selecionado
            nameSelected: '',     // Nome do membro selecionado
        };
    }

    componentDidMount() { 
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.appStore.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ listFormHeaderTitle: ws.lang.listForm_Header })
            }
        )        

        /*-- Carrega os membros do Grupo --*/
        ws.arrayMembers = this.props.appStore.members.filter(member => member.group === this.props.appStore.idGroup)

        /*-- Filtra os membros ativos --*/
        ws.arrayMembers = ws.arrayMembers.filter(member => member.active)

        /*-- Carrega a quantidade de grupos a sortear --*/
        ws.qtGroups = this.props.appStore.groups[this.props.appStore.indGroup].numberForm

        /*-- Carrega o array de Grupos --*/
        ws.arrayGroups = []
        ws.oneGroup = modelGroup
        for (i = 0; i < ws.qtGroups; i++) {
            ws.oneGroup.id = i + 1
            if ( this.props.appStore.groups[this.props.appStore.indGroup].typeForm > 0 ) {
                ws.oneGroup.name = this.props.appStore.groups[this.props.appStore.indGroup].freeDescription[i].name
            } else {
                ws.oneGroup.name = null
            }
            ws.oneGroup.amount = 0
            ws.arrayGroups.push({...ws.oneGroup})
        }

        /*-- Carrega o array da LISTA com os Membros --*/
        ws.arrayList = []
        ws.oneItem = modelList
        for (i = 0; i < ws.arrayMembers.length; i++) {
            ws.oneItem.id    = i + 1
            ws.oneItem.group = 0
            ws.oneItem.order = 2
            ws.oneItem.name  = ws.arrayMembers[i].name
            ws.oneItem.person = ws.arrayMembers[i].man + ws.arrayMembers[i].woman
            ws.arrayList.push({...ws.oneItem})
        }

        /*-- Sorteio dos Grupos --*/
        ws.qtGrouped = 0
        while ( ws.qtGrouped < ws.arrayList.length ) {
            /*-- Encontra o grupo com menos pessoas (max) --*/
            let maxG = 99999999
            let selG = 0
            for (i = 0; i < ws.qtGroups; i++) {
                if ( ws.arrayGroups[i].amount < maxG ) {
                    selG = (i + 1)
                    maxG = ws.arrayGroups[i].amount
                }
            }
            /*-- Sorteio um membro (ainda não sorteado) --*/
            let selM = 0
            while ( selM === 0 ) {
                let n = this.getRandomIntInclusive(1, ws.arrayList.length)
                if ( ws.arrayList[n - 1].group === 0 ) {
                    selM = n
                }
            }
            let m = (selM - 1)
            let g = (selG - 1)
            ws.arrayList[m].group = selG
            if ( ws.arrayGroups[g].amount < 1 ) {
                ws.arrayList[m].order = 1
            } 
            ws.arrayGroups[g].amount += ws.arrayList[m].person
            ws.qtGrouped++
        }

        /*-- Inclui o arrau de Grupos no array da LISTA --*/
        ws.oneItem = modelList
        for (i = 0; i < ws.arrayGroups.length; i++) {
            ws.oneItem.id = i + 1
            ws.oneItem.group = i + 1
            ws.oneItem.order = 0
            ws.oneItem.name = ws.arrayGroups[i].name
            ws.oneItem.person = ws.arrayGroups[i].amount
            ws.arrayList.push({...ws.oneItem})
        }

        /*-- Sorta o array pelo group e order --*/
        ws.arrayList = this.sortGroup(ws.arrayList)

        /*-- Acerta os IDs do arrayList --*/
        for (i = 0; i < ws.arrayList.length; i++) {
            ws.arrayList[i].id = i + 1 
        }
        
        // console.log('***** ARRAY DE GRUPOS SORTEADOS *****')
        // for (i = 0; i < ws.arrayList.length; i++) {
        //     console.log('arrayList: ' + ws.arrayList[i].id
        //         + ' group: ' + ws.arrayList[i].group
        //         + ' order: ' + ws.arrayList[i].order
        //         + ' name: ' + ws.arrayList[i].name
        //         + ' person: ' + ws.arrayList[i].person
        //     )
        // }

        this.setState({ listMembers: ws.arrayList, })
    }

    /*==================================*/
    /*-- Alteração do grupo do Membro --*/
    /*==================================*/

    /*-- Ativa a janela de Edição --*/
    editMember = (id) => {
        const vm = {
            posMember: 0,
        }
        vm.posMember = identifyIndex( id , this.state.listMembers )
        this.setState({ 
            editGroup: true, 
            idSelected: id, 
            grSelected: this.state.listMembers[vm.posMember].group, 
            nameSelected: this.state.listMembers[vm.posMember].name,
        });
    }

    /*-- Salva a alteração de grupo --*/
    saveEditMember = (gr) => {
        const vm = {
            arrayLista: [],
            posMember: 0,
            posOldGroup: 0,
            posNewGroup: 0,
        }
        if ( gr === this.state.grSelected ) {
            this.setState({ editGroup: false, grSelected: 0, idSelected: 0, nameSelected: '' });
        } else {
            vm.arrayLista = this.state.listMembers
            vm.posMember = identifyIndex( this.state.idSelected , vm.arrayLista )
            vm.posOldGroup = identifyGroup( this.state.grSelected , vm.arrayLista )
            vm.posNewGroup = identifyGroup( gr , vm.arrayLista )
            vm.arrayLista[vm.posMember].group = gr
            vm.arrayLista[vm.posOldGroup].person -= vm.arrayLista[vm.posMember].person 
            vm.arrayLista[vm.posNewGroup].person += vm.arrayLista[vm.posMember].person 
            vm.arrayLista =  this.sortGroup(vm.arrayLista)
            this.setState({ listMembers: vm.arrayLista, editGroup: false, grSelected: 0, idSelected: 0, nameSelected: '' });
        }
    }

    /*-- Cancela a alteração de grupo --*/
    cancelEditMember = () => {
        this.setState({ editGroup: false, grSelected: 0, idSelected: 0, nameSelected: '' });
    }

    /*=================================*/
    /*-- Exclusão de membro da Lista --*/
    /*=================================*/

    deleteMember = (id) => {
        const vm = {
            posMember: 0,
            posGroup: 0,
            qtPerson: 0,
        }
        vm.posMember = identifyIndex( id , this.state.listMembers )
        vm.posGroup = identifyGroup( this.state.listMembers[vm.posMember].group , this.state.listMembers )
        vm.qtPerson = this.state.listMembers[vm.posMember].person
        Alert.alert(
            ws.lang.alert_Text,
                this.state.listMembers[vm.posMember].name,
            [
              { text: ws.lang.alert_No, onPress: null, style: 'cancel', },
              { text: ws.lang.alert_Yes, onPress: () => this.confirmDeleteMember(id, vm.posGroup, vm.qtPerson)},
            ],
            {cancelable: false},
        );        
    }

    confirmDeleteMember = (id, gr, qt) => {
        const vm = {
            arrayLista: [],
            arrayFilter: [],
        }
        vm.arrayLista = this.state.listMembers
        vm.arrayLista[gr].person -= qt 
        vm.arrayFilter = vm.arrayLista.filter(item => item.id !== id);
        this.setState({ listMembers: vm.arrayFilter });
    }

    /*====================================*/
    /*-- Marcação do membro Responsável --*/
    /*====================================*/
    
    responsibleMember = (id, ord) => {
        const vm = {
            arrayLista: [],
            posMember: 0,
        }
        vm.arrayLista = this.state.listMembers
        vm.posMember = identifyIndex( id , vm.arrayLista )
        if ( ord == 1 ) {
            vm.arrayLista[vm.posMember].order = 2
        } else {
            vm.arrayLista[vm.posMember].order = 1
        }
        vm.arrayLista = this.sortGroup(vm.arrayLista)
        this.setState({ listMembers: vm.arrayLista })
    }

    /*============================*/
    /*-- Gera a Lista de Grupos --*/  
    /*============================*/

    pressGenerateList = () => {               
        const vm = {
            arrayLista: [],
            nameGroup: '',
            textAll: '...',
            textWatts: '...',
        }
        vm.arrayLista = this.state.listMembers
        vm.textAll   = ( this.props.appStore.groups[this.props.appStore.indGroup].titleForm )
        vm.textWatts = ( '*' + this.props.appStore.groups[this.props.appStore.indGroup].titleForm + '*' )
        for (i = 0; i < vm.arrayLista.length; i++) {
            if ( vm.arrayLista[i].order === 0 ) {
                vm.nameGroup = ws.lang.group + ' ' + vm.arrayLista[i].group
                if ( this.props.appStore.groups[this.props.appStore.indGroup].typeForm > 0 ) {
                    vm.nameGroup += ' - ' + vm.arrayLista[i].name
                } 
                vm.textAll   += ( '\n\n' + vm.nameGroup )
                vm.textWatts += ( '\n\n' + '*' + vm.nameGroup + '*' )
            } else {
                vm.textAll   += ( '\n' + '   ' + vm.arrayLista[i].name )
                vm.textWatts += ( '\n' + '   ' + vm.arrayLista[i].name )
                if ( this.props.appStore.groups[this.props.appStore.indGroup].showResponsible ) {
                    if ( vm.arrayLista[i].order === 1 ) {
                        vm.textAll   += ( ' (R)' )
                        vm.textWatts += ( ' (R)' )
                    }
                }
            }
        }
        this.props.navigation.navigate('ViewList', { 
            language: this.props.appStore.language,
            textAll: vm.textAll, 
            textWatts: vm.textWatts,  
        })
    }

    /*========================*/
    /*-- Funções Auxiliares --*/
    /*========================*/

    /*-- Retorna numero aleatório entre min e max --*/
    getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*-- Faz sort do grupo (grupo, order) --*/
    sortGroup = (group) => {
        let sorted = group.sort(function(a,b) {
            if ( a.group === b.group ) {
                if ( a.order === b.order ) {
                    return 0
                } else {
                    if ( a.order < b.order ) {
                        return -1
                    } else {
                        return 1
                    }
                }
            } else {
                if ( a.group < b.group ) { 
                    return -1
                } else {
                    return 1
                }
            }
            return 0;
        })    
        return sorted
    }

    /*==========================*/
    /*-- Renderização da View --*/
    /*==========================*/

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.boxPage}>

                    <View style={styles.viewTitleForm}>
                        <Text style={styles.txTitleForm}>{this.props.appStore.groups[this.props.appStore.indGroup].titleForm}</Text>
                    </View>

                    <View style={{ }}>
                        { this.state.editGroup
                        ?
                            <View style={styles.boxEditGroup}>
                                <View style={styles.boxEditTitle}>
                                    <View>
                                        <Text style={styles.titleEditGroup}>{ws.lang.listForm_TextTitle}</Text>
                                    </View>
                                    <View style={styles.viewIcon}>
                                        <Icon name='close' 
                                            size={32} 
                                            color={color.icon_Red} 
                                            onPress={this.cancelEditMember} 
                                        />    
                                    </View>
                                </View>
                                <View style={styles.boxEditName}>
                                    <View>
                                        <Text style={styles.nameEdit}>{this.state.nameSelected}</Text>
                                    </View>
                                </View>
                                <View style={styles.boxEditSelect}>
                                    <SelectList 
                                        title={ws.lang.listForm_TextSel}
                                        options={ws.arrayGroups}
                                        selected={this.state.grSelected} 
                                        onClick={this.saveEditMember}
                                    />
                                </View>
                            </View>
                        : 
                            <View style={{ marginBottom: 30, }}>
                                <SafeAreaView>
                                    <FlatList 
                                        data={this.state.listMembers}
                                        extraData={this.state}
                                        keyExtractor={item => String(item.id)}
                                        renderItem={( {item} ) => {
                                            return (
                                                <View style={styles.boxItemFlat}>
                                                    { item.order == 0 
                                                    ?
                                                        <View style={styles.boxGroup}>
                                                            <Text style={styles.titleGroup}>
                                                                {ws.lang.group} {item.group} 
                                                            </Text>
                                                            { item.name !== null
                                                                ? <Text style={styles.titleGroup}> - {item.name}</Text>
                                                                : null
                                                            }
                                                            <View style={{ width: 5 }}></View>
                                                            <Badge value={item.person} status="primary" />
                                                        </View>
                                                    :
                                                        <View style={styles.boxMember}>
                                                            <View style={styles.viewMember}>
                                                                { this.props.appStore.groups[this.props.appStore.indGroup].showResponsible
                                                                ?
                                                                    <View>
                                                                        <View style={styles.viewIcon}>
                                                                            { item.order == 1
                                                                            ? <IconFA name='star' 
                                                                                size={18} 
                                                                                color={color.icon_Star} 
                                                                                solid
                                                                                onPress={() => this.responsibleMember(item.id, item.order)} />
                                                                            : <IconFA name='star' 
                                                                                size={18} 
                                                                                color={color.icon_Off} 
                                                                                regular
                                                                                onPress={() => this.responsibleMember(item.id, item.order)} />
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                : null
                                                                }
                                                                <View style={styles.viewName}>
                                                                    <Text style={styles.nameMember}>
                                                                        {item.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={Styles.flexDirectionRow}>
                                                                <View style={styles.viewIcon}>
                                                                    <IconFA name='edit' 
                                                                        size={26} 
                                                                        color={color.button_Help} 
                                                                        regular
                                                                        onPress={() => this.editMember(item.id, item.order)} 
                                                                    />    
                                                                </View>
                                                                <View style={styles.viewIcon}>
                                                                    <IconFA name='trash-alt' 
                                                                        size={26} 
                                                                        color={color.button_Config} 
                                                                        regular
                                                                        onPress={() => this.deleteMember(item.id)} 
                                                                    />    
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }
                                                    { item.order !== 0  
                                                        ? <View style={styles.divider}></View>
                                                        : null
                                                    }
                                                </View>  
                                            )
                                        }}
                                    />
                                </SafeAreaView>
                            </View>
                        }
                    </View>
                </View>

                <View style={Styles.boxFooter}>
                    { !this.state.editGroup
                    ?
                        <Button title='Gerar' 
                            icon='users'
                            type='font-awesome' 
                            name={ws.lang.listForm_ButtonShare}
                            color={color.color_Yellow} 
                            onClick={this.pressGenerateList} 
                        />
                    : null
                    }
                </View>

            </View>
        )
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore,    
});

export default connect(
    mapStateToProps
)(ListFormScreen)

const styles = StyleSheet.create({
    viewTitleForm: {
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },  

    txTitleForm: {
        fontSize: 22,
        fontWeight: 'bold'
    },  

    /*---------------------------------
    /*    VIEW DE SELEÇÃO DE GRUPO
    ---------------------------------*/

    boxEditGroup: {
        margin: 16,
        borderWidth: 2,
        borderColor: color.edit_Border,
        borderRadius: 8,
        backgroundColor: color.edit_BackEditable,
    },

    boxEditTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
        borderBottomWidth: 1,
        borderBottomColor: color.edit_Border,
        padding: 6,
    },
    
    titleEditGroup: {
        marginLeft: 8,
        fontSize: 22,
        fontWeight: 'bold'
    },

    boxEditName: {
        margin: 6,
        marginLeft: 20,
        justifyContent: 'center',  
    },

    nameEdit: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    boxEditSelect: {
        marginLeft: 18,
        marginBottom: 8,
        padding: 4,
        justifyContent: 'center',
    },

    /*---------------------------------
    /*       STYLES DO FLATLIST 
    ---------------------------------*/

    boxItemFlat: {
        margin: 2,
        justifyContent: 'space-between',  
    },

    boxGroup: {
        flexDirection: 'row',
        justifyContent: 'center', 
        borderWidth: 2,
        borderColor: color.edit_Border,
        backgroundColor: color.edit_BackNoEditable,
        marginHorizontal: 6,
        marginTop: 5,
        paddingTop: 4,
        paddingBottom: 4,
    },

    titleGroup: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    boxMember: {
        marginVertical: 4,
        marginHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',  
    },

    viewMember: {
        flexDirection: 'row',
    },

    viewName: {
        marginLeft: 3,
    },

    nameMember: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    divider: {
        marginHorizontal: 6,
        height: 1,
        backgroundColor: color.color_Divider,
        justifyContent: 'space-between',         
    },

    /*---------------------------------
    /*         STYLES DIVERSOS 
    ---------------------------------*/

    viewIcon: {
        marginHorizontal: 6,
    },

})