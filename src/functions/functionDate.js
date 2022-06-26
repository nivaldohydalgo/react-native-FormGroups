import moment from 'moment';

/*===========================================================
/*         MONTA A DESCRIÇÃO DOS GRUPOS COM DATA
===========================================================*/
export const prepareGroupsDescription = (grD, typ, init) => {

    if ( typ >= 1 && typ <= 3 ) {
        let dt = init
        if ( dt == null || dt == undefined ) {
            console.log('functionDate.js> Entrou no IF do !null ou !undefined')
            dt = moment(new Date())
        }

        for (i = 0; i < grD.length; i++) {
            if ( i > 0) {
                switch (typ) {
                    case 1:
                        dt = moment(dt).add(1, 'days')
                        break
                    case 2:
                        dt = moment(dt).add(1, 'weeks')
                        break
                    case 3:
                        dt = moment(dt).add(1, 'months')
                        break
                    default:
                        null
                }
            }
            if ( typ === 3 ) {
                grD[i].name = moment(dt).format("MM/YYYY")
            } else {
                grD[i].name = moment(dt).format("DD/MM/YYYY")
            }
        }
    } else {
        for (i = 0; i < grD.length; i++) {
            grD[i].name = ''
        }
    }

    return grD
}

/*===========================================================
/*         MONTA O ARRAY A DESCRIÇÃO DOS GRUPOS COM DATA
===========================================================*/
export const amountGroupsDescription = (n, groupD) => {
    while ( groupD.length !== n ) {
        if ( groupD.length > n ) {
            groupD.pop();
        } else {
            let gd = { id: 0, name: '' }
            gd.id = groupD.length + 1
            groupD.push(gd);
        }
    }
    return groupD
}
