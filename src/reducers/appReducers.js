import moment from 'moment';

import { 
    identifyIndex,    
} from '../functions/functionOther'

import { prepareGroupsDescription, amountGroupsDescription } from '../functions/functionDate'

import {
    /*-- Import do Config do App --*/
    UPDATE_APP_LANGUAGE,
    /*-- Import Manuteção dos Grupos --*/
    GROUP_SELECTED,
    GROUP_INSERT,
    GROUP_UPDATE,
    GROUP_DELETE,
    /*-- Import da Lista de Membros --*/
    ADD_MEMBER,
    EDIT_MEMBER,
    DELETE_MEMBER,
    SET_ACTIVE_MEMBER,






    /*-- Import do Config do Formação --*/
    UPDATE_FORM_TITLE_GROUPS,
    UPDATE_FORM_ADD_NUMBER,
    UPDATE_FORM_SUBTRACT_NUMBER,
    UPDATE_FORM_SHOW_RESPONSIBLE,
    UPDATE_FORM_DESCRIPTION_TYPE,
    UPDATE_FORM_INITIAL_DATE,
    UPDATE_FORM_DESCRIPTION_FREE,
    UPDATE_FORM_EDIT_DESCRIPTION,
} from '../actions/actions'

/*============================================================
/*              CONFIGURAÇÃO INICIAL DA STORE
============================================================*/

const configInitial = {
    /*-- Configuração do App --*/
    version: '1.0.0',                    
    distribution: 'PRO',                 
    language: 'br',                      
    /*-- Controles --*/
    idGroup: 0,  
    indGroup: 0,                       
    groups: [],                          
    members: [],
}

/*============================================================
/*              MODELOS E VARIAVEIS DE TRABALHO
============================================================*/

/*========== Modelo dos GRUPOS ==========*/
/*    typeform: 0 - Grupo X sem descrição adicional
/*              1 - Grupo X e data com evolução diária
/*              2 - Grupo X e data com evolução semanal
/*              3 - Grupo X e data com evolução mensal
/*              4 - Grupo X e descrição livre
/*=======================================*/
const modelGroups = {
    id: 0,
    nameGroup: 'Grupo ...',
    singularName: 'Membro',
    pluralName: 'Membros',
    titleForm: 'Grupos do ...',
    numberForm: 4,
    typeForm: 0,                           
    initialDate: moment(new Date()),
    freeDescription: [                 
        { id: 1, name: '' },             
        { id: 2, name: '' },             
        { id: 3, name: '' },             
        { id: 4, name: '' },             
    ],                                   
    showResponsible: true,               
    qtRecords: 0,
    qtMembers: 0,
    qtActive: 0,
}

/*========== Modelo dos MEMBROS ==========*/
const modelMembers = {
    group: 0,
    id: 0,
    name: '',
    man: 0,              
    woman: 0,
    active: true,
}









/*-- Constantes utilizadas nos Reducers --*/
const ws = {
    
    indGroup: 0,
    qtd: 0,
    newMember: {},






    group: 0,
    ind: 0,
    qtd: 0,


   newGroup: {},
    newArray: [],
    altGroup: {},
    altArray: [],
    delArray: [],






    newId: 0,
    newMember: {},
}







export default function appReducer(state = configInitial, action) {

//    const update = (state, mutations) => Object.assign({}, state, mutations)

    const aws = {
        idMember: 0,
        indMember: 0,
        idGroup: 0,
        indGroup: 0,
        addMember: {},
        groups: [],
        members: [],
        qtMember: 0,
        numGroup: 0,
        qtde: 0,
        description: [],


        id: 0,
        index: 0,
    }

    switch (action.type) {

        /*-----------------------------------------------------------
        /*            REDUCERS DA CONFIGURAÇÃO DO APP
        /*---------------------------------------------------------*/

        case UPDATE_APP_LANGUAGE:
            return Object.assign({}, state, {
                language: action.payload.language,
            }) 

        /*-----------------------------------------------------------
        /*            REDUCERS DA MANUTENÇÃO DOS GRUPOS
        /*---------------------------------------------------------*/

        case GROUP_SELECTED:
            aws.groups = state.groups
            aws.index = 0 
            for ( i = 0; i < aws.groups.length; i++ ) {
                if ( aws.index === 0 && aws.groups[i].id === action.payload.id ) {
                    aws.index = i
                }
            }
            return Object.assign({}, state, {
                indGroup: aws.index, 
                idGroup: action.payload.id,
            }) 

        case GROUP_INSERT:
            aws.id = 0
            for ( i = 0; i < state.groups.length; i++ ) {
                if ( state.groups[i].id > aws.id ) {
                    aws.id = state.groups[i].id    
                }
            }
            const addGroup        = modelGroups
            addGroup.id           = aws.id + 1
            addGroup.nameGroup    = action.payload.name
            addGroup.singularName = action.payload.singular
            addGroup.pluralName   = action.payload.plural
            return Object.assign({}, state, {
                groups: [ ...state.groups, { ...addGroup } ]
            })

        case GROUP_UPDATE:
            aws.groups = state.groups
            aws.index = 0 
            for ( i = 0; i < aws.groups.length; i++ ) {
                if ( aws.index === 0 && aws.groups[i].id === action.payload.id ) {
                    aws.index = i
                }
            }
            aws.groups[aws.index].nameGroup    = action.payload.name
            aws.groups[aws.index].singularName = action.payload.singular
            aws.groups[aws.index].pluralName   = action.payload.plural
            return Object.assign({}, state, {
                groups: [ ...aws.groups ]
            })            

        case GROUP_DELETE:
            aws.groups = state.groups.filter( group => group.id !== action.payload.id );
            aws.members = state.members.filter( member => member.group !== action.payload.id );
            return Object.assign({}, state, {
                groups: [ ...aws.groups ],
                members: [ ...aws.members ]
            })            

        /*-----------------------------------------------------------
        /*            REDUCERS DA MANUTENÇÃO DOS MEMBROS
        /*---------------------------------------------------------*/
        
        case ADD_MEMBER:
            /*-- Atualiza o id dos membros --*/
            for ( i = 0; i < state.members.length; i++ ) {
                state.members[i].id = i + 1
            }
            /*-- Initializa o novo membro --*/
            aws.addMember        = modelMembers
            aws.addMember.id     = state.members.length + 1
            aws.addMember.group  = action.payload.group
            aws.addMember.name   = action.payload.name
            aws.addMember.man    = action.payload.man
            aws.addMember.woman  = action.payload.woman
            aws.addMember.active = true
            /*-- Adiciona o novo membro na quantidade do grupo --*/
            aws.groups   = state.groups
            aws.indGroup = identifyIndex( action.payload.group , aws.groups ) 
            aws.groups[aws.indGroup].qtRecords += 1 
            aws.qtde = action.payload.man + action.payload.woman
            aws.groups[aws.indGroup].qtMembers += aws.qtde 
            aws.groups[aws.indGroup].qtActive += aws.qtde
            return Object.assign({}, state, {
                members: [ ...state.members, { ...aws.addMember } ],
                groups:  [ ...aws.groups ]
            })

        case EDIT_MEMBER:
            /*-- Recupera os dados dos Membros --*/
            aws.members   = state.members
            aws.indMember = identifyIndex( action.payload.id , aws.members ) 
            aws.qtMember  = aws.members[aws.indMember].man + aws.members[aws.index].woman
            aws.numGroup  = aws.members[aws.indMember].group
            /*-- Atualiza o Membro --*/
            aws.members[aws.indMember].name  = action.payload.name
            aws.members[aws.indMember].man   = action.payload.man
            aws.members[aws.indMember].woman = action.payload.woman
            /*-- Atualiza o membro na quantidade do grupo --*/
            aws.groups = state.groups
            aws.indGroup = identifyIndex( aws.numGroup , aws.groups ) 
            aws.groups[aws.indGroup].qtMembers -= aws.qtMember
            aws.qtde = action.payload.man + action.payload.woman
            aws.groups[aws.indGroup].qtMembers += aws.qtde 
            if ( aws.members[aws.indMember].active ) {
                aws.groups[aws.indGroup].qtActive -= aws.qtMember
                aws.groups[aws.indGroup].qtActive += aws.qtde
            }
            return Object.assign({}, state, {
                members: [ ...aws.members ],
                groups:  [ ...aws.groups ]
            })            

        case DELETE_MEMBER:
            /*-- Recupera os dados dos Membros --*/
            aws.members = state.members
            aws.indMember = identifyIndex( action.payload.id , aws.members ) 
            aws.qtMember = aws.members[aws.indMember].man + aws.members[aws.indMember].woman
            aws.numGroup = aws.members[aws.indMember].group
            /*-- Atualiza o membro na quantidade do grupo --*/
            aws.groups = state.groups
            aws.indGroup = identifyIndex( aws.numGroup , aws.groups ) 
            aws.groups[aws.indGroup].qtRecords -= 1 
            aws.groups[aws.indGroup].qtMembers -= aws.qtMember 
            if ( aws.members[aws.indMember].active ) {
                aws.groups[aws.indGroup].qtActive -= aws.qtMember
            }
            /*-- Filtro os membros excluindo o Deletado --*/
            aws.members = state.members.filter( member => member.id !== action.payload.id );
            return Object.assign({}, state, {
                members: [ ...aws.members ],
                groups:  [ ...aws.groups ]
            })            

        case SET_ACTIVE_MEMBER:
            /*-- Recupera os dados dos Membros --*/
            aws.members   = state.members
            aws.indMember = identifyIndex( action.payload.id , aws.members ) 
            aws.numGroup = aws.members[aws.indMember].group
            aws.groups = state.groups
            aws.indGroup = identifyIndex( aws.numGroup , aws.groups ) 
            aws.qtMember = aws.members[aws.indMember].man + aws.members[aws.indMember].woman
            if ( aws.members[aws.indMember].active ) {
                aws.groups[aws.indGroup].qtActive -= aws.qtMember
            } else {
                aws.groups[aws.indGroup].qtActive += aws.qtMember
            }
            aws.members[aws.indMember].active = !aws.members[aws.indMember].active
            return Object.assign({}, state, {
                members: [ ...aws.members ],
                groups:  [ ...aws.groups ]
            })            

        /*-----------------------------------------------------------
        /*             REDUCERS DA FORMAÇÃO DOS GRUPOS
        /*---------------------------------------------------------*/

        case UPDATE_FORM_TITLE_GROUPS:                           
            console.log('appReducers.js> Executando UPDATE_FORM_TITLE_GROUPS - title: ' + action.payload.title)
            aws.groups = state.groups
            aws.groups[state.indGroup].titleForm = action.payload.title
            console.log('appReducers.js> IndGroup: ' + state.indGroup + 'novo titleForm: ' + aws.groups[state.indGroup].titleForm )
            return Object.assign({}, state, {
                groups:  [ ...aws.groups ]
            })     










        case UPDATE_FORM_ADD_NUMBER:                             
            console.log('appReducers.js> Executando UPDATE_FORM_ADD_NUMBER')
            aws.groups = state.groups
            if ( aws.groups[state.indGroup].numberForm < 99 ) {
                aws.qtde = aws.groups[state.indGroup].numberForm + 1
                aws.groups[state.indGroup].numberForm = aws.qtde
                console.log('appReducers.js> novo numberForm: ' + aws.groups[state.indGroup].numberForm)
                aws.description = amountGroupsDescription( aws.qtde, aws.groups[state.indGroup].freeDescription )
                aws.groups[state.indGroup].freeDescription = prepareGroupsDescription(
                    aws.description, 
                    aws.groups[state.indGroup].typeForm, 
                    aws.groups[state.indGroup].initialDate)
                for ( i = 0; i < aws.groups[state.indGroup].freeDescription.length; i++ ) {
                    console.log('appReducers.js> i: ' + i 
                        + ' id: ' + aws.groups[state.indGroup].freeDescription[i].id 
                        + ' name: ' + aws.groups[state.indGroup].freeDescription[i].name )
                }
                return Object.assign({}, state, {
                    groups:  [ ...aws.groups ]
                })            
            } else {
                return state
            }

        case UPDATE_FORM_SUBTRACT_NUMBER:                        
            console.log('appReducers.js> Executando UPDATE_FORM_SUBTRACT_NUMBER')
            aws.groups = state.groups
            if ( aws.groups[state.indGroup].numberForm > 1 ) {


                // let n = state.numberGroups - 1
                // let groupsDesc = this.amountGroupsDescription(n)
                // return Object.assign({}, state, {
                //     numberGroups: n,
                //     groupsDescription: groupsDesc,
                // })            

                aws.qtde = aws.groups[state.indGroup].numberForm - 1
                aws.groups[state.indGroup].numberForm = aws.qtde
                console.log('appReducers.js> novo numberForm: ' + aws.groups[state.indGroup].numberForm)


                aws.description = amountGroupsDescription( aws.qtde, aws.groups[state.indGroup].freeDescription )
                aws.groups[state.indGroup].freeDescription = aws.description

                for ( i = 0; i < aws.groups[state.indGroup].freeDescription.length; i++ ) {
                    console.log('appReducers.js> i: ' + i 
                        + ' id: ' + aws.groups[state.indGroup].freeDescription[i].id 
                        + ' name: ' + aws.groups[state.indGroup].freeDescription[i].name )
                }


                return Object.assign({}, state, {
                    groups:  [ ...aws.groups ]
                })            


            } else {
                return state
            }

        case UPDATE_FORM_SHOW_RESPONSIBLE:                       
            console.log('appReducers.js> Executando UPDATE_FORM_SHOW_RESPONSIBLE')
            aws.groups = state.groups
            aws.groups[state.indGroup].showResponsible = !aws.groups[state.indGroup].showResponsible
            console.log('appReducers.js> showResponsible: ' + aws.groups[state.indGroup].showResponsible )
            return Object.assign({}, state, {
                groups:  [ ...aws.groups ]
            })            
    
        case UPDATE_FORM_DESCRIPTION_TYPE:                       
            console.log('appReducers.js> Executando UPDATE_FORM_DESCRIPTION_TYPE')
            aws.groups = state.groups
            aws.groups[state.indGroup].typeForm = action.payload.type
            console.log('appReducers.js> IndGroup: ' + state.indGroup + 'novo typeForm: ' + aws.groups[state.indGroup].typeForm )
            aws.description = aws.groups[state.indGroup].freeDescription 
            aws.groups[state.indGroup].freeDescription = prepareGroupsDescription(
                aws.description, 
                aws.groups[state.indGroup].typeForm, 
                aws.groups[state.indGroup].initialDate)
            for ( i = 0; i < aws.groups[state.indGroup].freeDescription.length; i++ ) {
                console.log('appReducers.js> i: ' + i 
                    + ' id: ' + aws.groups[state.indGroup].freeDescription[i].id 
                    + ' name: ' + aws.groups[state.indGroup].freeDescription[i].name )
            }
            return Object.assign({}, state, {
                groups:  [ ...aws.groups ]
            })            

            // ws.newArray = prepareGroupsDescription(
            //     state.groupsDescription, 
            //     action.payload.type, 
            //     state.initialDate)
            // return Object.assign({}, state, {
            //     descriptionType: action.payload.type,
            //     groupsDescription: ws.newArray,
            // }) 


        case UPDATE_FORM_INITIAL_DATE:                           


            console.log('appReducers.js> Executando UPDATE_FORM_INITIAL_DATE')
            aws.groups = state.groups
            aws.groups[state.indGroup].initialDate = action.payload.date
            console.log('appReducers.js> IndGroup: ' + state.indGroup + 'nova initialDate: ' + aws.groups[state.indGroup].initialDate )
            aws.description = aws.groups[state.indGroup].freeDescription 
            aws.groups[state.indGroup].freeDescription = prepareGroupsDescription(
                aws.description, 
                aws.groups[state.indGroup].typeForm, 
                aws.groups[state.indGroup].initialDate)
            for ( i = 0; i < aws.groups[state.indGroup].freeDescription.length; i++ ) {
                console.log('appReducers.js> i: ' + i 
                    + ' id: ' + aws.groups[state.indGroup].freeDescription[i].id 
                    + ' name: ' + aws.groups[state.indGroup].freeDescription[i].name )
            }
            return Object.assign({}, state, {
                groups:  [ ...aws.groups ]
            })            

            // ws.newArray = prepareGroupsDescription(
            //     state.groupsDescription, 
            //     state.descriptionType, 
            //     action.payload.date)
            // return Object.assign({}, state, {
            //     initialDate: action.payload.date,
            //     groupsDescription: ws.newArray,
            // }) 



        case UPDATE_FORM_EDIT_DESCRIPTION:
            console.log('appReducers.js> Executando UPDATE_FORM_EDIT_DESCRIPTION')
            aws.groups = state.groups
            for (i = 0; i < aws.groups[state.indGroup].freeDescription.length; i++) {
                if ( i == (action.payload.id - 1) ) {
                    aws.groups[state.indGroup].freeDescription[i].name = action.payload.name
                    console.log('appReducers.js> IndGroup: ' + state.indGroup 
                        + ' id: ' + aws.groups[state.indGroup].freeDescription[i].id
                        + ' name: ' + aws.groups[state.indGroup].freeDescription[i].name )
                }
            }
            return Object.assign({}, state, {
                groups:  [ ...aws.groups ]
            })            

    
        default:
            console.log('appReducer.js> Entrou no default')
            return state
    }
}
