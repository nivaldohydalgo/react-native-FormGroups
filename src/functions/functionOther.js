
/*===========================================================
/*             RETORNA O INDEX DO ID NO ARRAY
===========================================================*/
export const identifyIndex = ( id , array ) => {
    for ( i = 0; i < array.length; i++ ) {
        if ( array[i].id === id ) {
            return i
        }
    }
    return 0
}

/*===========================================================
/*            RETORNA O INDEX DO GROUP NO ARRAY
===========================================================*/
export const identifyGroup = ( group , array ) => {
    for ( i = 0; i < array.length; i++ ) {
        if ( array[i].group === group ) {
            return i
        }
    }
    return 0
}
