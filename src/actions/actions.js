
/*===================================================
                CONFIGURAÇÃO DO APP 
===================================================*/

export const UPDATE_APP_LANGUAGE = 'UPDATE_APP_LANGUAGE'

export function updateAppLanguage( language ) {
    return { 
        type: UPDATE_APP_LANGUAGE, 
        payload: { language, } 
    }
}

/*===================================================
          SELEÇÃO E MANUTENÇÃO DOS GRUPOS
===================================================*/

export const GROUP_SELECTED = 'GROUP_SELECTED'
export const GROUP_INSERT = 'GROUP_INSERT'
export const GROUP_UPDATE = 'GROUP_UPDATE'
export const GROUP_DELETE = 'GROUP_DELETE'

export function groupSelected( id ) {
    return { 
        type: GROUP_SELECTED, 
        payload: { id, } 
    }
}

export function groupInsert( name, singular, plural ) {
    return { 
        type: GROUP_INSERT, 
        payload: { name, singular, plural, } 
    }
}

export function groupUpdate( id, name, singular, plural ) {
    return { 
        type: GROUP_UPDATE, 
        payload: { id, name, singular, plural, } 
    }
}

export function groupDelete( id ) {
    return { 
        type: GROUP_DELETE, 
        payload: { id, } 
    }
}

/*===================================================
                 LISTA DE MEMBROS 
===================================================*/

export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const DELETE_MEMBER = 'DELETE_MEMBER'
export const SET_ACTIVE_MEMBER = 'SET_ACTIVE_MEMBER'

export function addMember( group, name, man, woman ) {
    return { 
        type: ADD_MEMBER, 
        payload: { group, name, man, woman } 
    }
}

export function editMember( id, name, man, woman ) {
    return { 
        type: EDIT_MEMBER, 
        payload: { id, name, man, woman } 
    }
}

export function deleteMember( id ) {
    return { 
        type: DELETE_MEMBER,
        payload: { id }
    }
}

export function setActiveMember( id ) {
    return { 
        type: SET_ACTIVE_MEMBER,
        payload: { id }
    }
}

/*===================================================
              CONFIGURAÇÃO DO SORTEIO 
===================================================*/

export const UPDATE_FORM_TITLE_GROUPS = 'UPDATE_FORM_TITLE_GROUPS'
export const UPDATE_FORM_ADD_NUMBER = 'UPDATE_FORM_ADD_NUMBER'
export const UPDATE_FORM_SUBTRACT_NUMBER = 'UPDATE_FORM_SUBTRACT_NUMBER'
export const UPDATE_FORM_SHOW_RESPONSIBLE = 'UPDATE_FORM_SHOW_RESPONSIBLE'
export const UPDATE_FORM_DESCRIPTION_TYPE = 'UPDATE_FORM_DESCRIPTION_TYPE'
export const UPDATE_FORM_INITIAL_DATE = 'UPDATE_FORM_INITIAL_DATE'
export const UPDATE_FORM_EDIT_DESCRIPTION = 'UPDATE_FORM_EDIT_DESCRIPTION'

export function updateFormTitleGroups( title, ) {
    return { 
        type: UPDATE_FORM_TITLE_GROUPS, 
        payload: { 
            title,              
        } 
    }
}

export function updateFormAddNumber() {
    return { 
        type: UPDATE_FORM_ADD_NUMBER, 
    }
}

export function updateFormSubtractNumber() {
    return { 
        type: UPDATE_FORM_SUBTRACT_NUMBER, 
    }
}

export function updateFormShowResponsible() {
    return { 
        type: UPDATE_FORM_SHOW_RESPONSIBLE, 
    }
}

export function updateFormDescriptionType( type, ) {
    return { 
        type: UPDATE_FORM_DESCRIPTION_TYPE, 
        payload: { 
            type,              
        } 
    }
}

export function updateFormInitialDate( date, ) {
    return { 
        type: UPDATE_FORM_INITIAL_DATE, 
        payload: { 
            date,              
        } 
    }
}

export function updateFormEditDescription( id, name ) {
    return { 
        type: UPDATE_FORM_EDIT_DESCRIPTION, 
        payload: { 
            id,
            name,              
        } 
    }
}

