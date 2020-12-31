'use strict';

// 4BLD版のコードと共通化できる部分が多いが、それは今後の課題とする

const docCookies = require('./cookies');

const button_func = (numbering, l_2_p_numbering) => {
    const part_types = ['Center', 'Edge', 'Corner', 'Tcenter', 'Medge', ];
    const part_types_ln = part_types.length;

    let has_blank_numbering = false;
    for (let i = 0; i < part_types_ln; i++) {
        const part_type = part_types[i];
        const parts = Object.keys(numbering[part_type]);
        const part_ln = parts.length;
        for (let k = 0; k < part_ln; k++) {
            const part = parts[k];
            const obj = document.querySelector('.' + part_type + '__' + part);
            docCookies.setItem(part_type + '_' + part, obj.value.charAt(0), Infinity);
            if (obj.value === ''){
                has_blank_numbering = true;
            }
        }
    }

    let result = '';
    if (has_blank_numbering) {
        result += '// Some numbering are blank.\n\n';
        alert('Some numbering are blank.');
    }



    // スクランブル
    const scramble_text_obj = document.querySelector('.Scramble__Text');
    const scramble_text = scramble_text_obj.value;
    result += ' ' + scramble_text + ' // Scramble\n';

    // +センター
    const tcenter_text_obj = document.querySelector('.Analysis__TcenterText');
    const tcenter_analysis = tcenter_text_obj.value;
    const tcenter_spl = tcenter_analysis.split('');
    const tcenter_ln = tcenter_spl.length;
    for (let i = 0; i < tcenter_ln; i++) {
        const letter = tcenter_spl[i];
        const part = l_2_p_numbering['Tcenter'][letter];
        result += ' ' + tcenter_func(part, i) + ' // + Center ' + part + ' ' + letter + ' \n';
    }

    // +センターパリティ
    const tcenter_parity_checkbox = document.querySelector('.Analysis__TcenterParity');
    if (tcenter_parity_checkbox.checked) {
        result += ' ' + tcenter_parity + ' // + Center Parity\n';
    }

    result += '\n';

    // Xセンター
    const center_text_obj = document.querySelector('.Analysis__CenterText');
    const center_analysis = center_text_obj.value;
    const center_spl = center_analysis.split('');
    const center_ln = center_spl.length;
    for (let i = 0; i < center_ln; i++) {
        const letter = center_spl[i];
        const part = l_2_p_numbering['Center'][letter];
        result += ' ' + center_func(part, i) + ' // X Center ' + part + ' ' + letter + ' \n';
    }

    // X センターパリティ
    const center_parity_checkbox = document.querySelector('.Analysis__CenterParity');
    if (center_parity_checkbox.checked) {
        result += ' ' + center_parity + ' // X Center Parity\n';
    }

    result += '\n';

    // Wエッジ
    const edge_text_obj = document.querySelector('.Analysis__EdgeText');
    const edge_analysis = edge_text_obj.value;
    const edge_spl = edge_analysis.split('');
    const edge_ln = edge_spl.length;
    for (let i = 0; i < edge_ln; i++) {
        const letter = edge_spl[i];
        const part = l_2_p_numbering['Edge'][letter];
        result += ' ' + edge_func(part, i) + ' // Wing Edge ' + part + ' ' + letter + ' \n';
    }

    // Wエッジパリティ
    const edge_parity_checkbox = document.querySelector('.Analysis__EdgeParity');
    if (edge_parity_checkbox.checked) {
        result += ' ' + edge_parity + ' // Wing Edge Parity\n';
    }

    result += '\n';

    // ミドルエッジ
    const medge_text_obj = document.querySelector('.Analysis__MedgeText');
    const medge_analysis = medge_text_obj.value;
    const medge_spl = medge_analysis.split('');
    const medge_ln = medge_spl.length;
    for (let i = 0; i < medge_ln; i++) {
        const letter = medge_spl[i];
        const part = l_2_p_numbering['Medge'][letter];
        result += ' ' + medge_func(part, i) + ' // Middle Edge ' + part + ' ' + letter + ' \n';
    }

    // 3BLDパリティ
    const medge_parity_checkbox = document.querySelector('.Analysis__MedgeParity');
    if (medge_parity_checkbox.checked) {
        result += ' ' + medge_parity + ' // 3BLD Parity\n';
    }

    // コーナー
    const corner_text_obj = document.querySelector('.Analysis__CornerText');
    const corner_analysis = corner_text_obj.value;
    const corner_spl = corner_analysis.split('');
    const corner_ln = corner_spl.length;
    for (let i = 0; i < corner_ln; i++) {
        const letter = corner_spl[i];
        const part = l_2_p_numbering['Corner'][letter];
        result += ' ' + corner_func(part) + ' // Corner ' + part + ' ' + letter + ' \n';
    }

    const result_text_obj = document.querySelector('.Result__Text');
    result_text_obj.value = replace_small_letter(result).replace(/[()]/g, '');
};

const setup = () => {
    let numbering = {};
    let l_2_p_numbering = {};
    const part_types = ['Center', 'Edge', 'Corner', 'Tcenter', 'Medge', ];
    part_types.forEach((part_type) => {
        numbering[part_type] = {};
        l_2_p_numbering[part_type] = {};
    });

    const button = document.querySelector('.Analysis__Button');
    button.addEventListener('click', () => button_func(numbering, l_2_p_numbering), false);

    // クッキーに保存したナンバリングを読み込む
    let parts = {};
    parts['Center'] = [
        'UBR', 'UFL', 'UFR',
        'LBU', 'LFU', 'LBD', 'LDF',
        'FLU', 'FRU', 'FDL', 'FDR',
        'RFU', 'RBU', 'RDF', 'RBD',
        'BRU', 'BLU', 'BDR', 'BDL',
        'DFL', 'DFR', 'DBL', 'DBR'
    ];

    parts['Tcenter'] = [
        'UR', 'UF', 'UL',
        'LU', 'LF', 'LD', 'LB',
        'FU', 'FR', 'FD', 'FL',
        'RU', 'RB', 'RD', 'RF',
        'BU', 'BL', 'BD', 'BR',
        'DF', 'DR', 'DB', 'DL'];

    parts['Edge'] = [
        'UB', 'UR', 'UF', 'UL',
        'LU', 'LF', 'LD', 'LB',
        'FU', 'FR', 'FD', 'FL',
        'RU', 'RB', 'RD', 'RF',
        'BU', 'BL', 'BD', 'BR',
        'DR', 'DB', 'DL'];

    parts['Medge'] = [
        'UB', 'UR', 'UF', 'UL',
        'LU', 'LF', 'LD', 'LB',
        'FU', 'FR', 'FL',
        'RU', 'RB', 'RD', 'RF',
        'BU', 'BL', 'BD', 'BR',
        'DR', 'DB', 'DL'];

    parts['Corner'] = [
        'UBR', 'UFL', 'UFR',
        'LFU', 'LBD', 'LDF',
        'FLU', 'FRU', 'FDL', 'FDR',
        'RFU', 'RBU', 'RDF', 'RBD',
        'BRU', 'BDR', 'BDL',
        'DFL', 'DFR', 'DBL', 'DBR'
    ];

    part_types.forEach((part_type) => {
        parts[part_type].forEach((part) => {
            const cookie_key = part_type + '_' + part;
            const obj = document.querySelector('.' + part_type + '__' + part);
            if (! obj){
                alert('There is no ' + '.' + part_type + '_' + part);
                // break;
            }
            const tmp_letter = docCookies.getItem(cookie_key);
            const letter = tmp_letter ? tmp_letter : '';
            numbering[part_type][part] = letter;
            l_2_p_numbering[part_type][letter] = part;
            //alert(part + ':' + numbering['edge'][part])
            obj.value = numbering[part_type][part];
            docCookies.setItem(cookie_key, numbering[part_type][part], Infinity);
        });
    });

    // alert('setup done.');
};

const replace_small_letter = (sequence_str) => {
    return sequence_str
        .replace(/ l/g, ' 2L')
        .replace(/ r/g, ' 2R')
        .replace(/ u/g, ' 2U')
        .replace(/ d/g, ' 2D')
        .replace(/ f/g, ' 2F')
        .replace(/ b/g, ' 2B');
};

const edge_func = (part, ind) => {
    switch (part) {
    // U面
    case 'UL':
        return 'L\' U\' L U r2 U\' L\' U L';
    case 'UB':
        return 'r2';
    case 'UR':
        return 'R U R\' U\' r2 U R U\' R\'';
    case 'UF':
        return 'l\' ' + edge_func('BU') + ' l';


    // L面
    case 'LF':
        return 'B L2 B\' r2 B L2 B\'';
    case 'LU':
        return 'B L\' B\' r2 B L B\'';
    case 'LB':
        return 'L\' B L B\' r2 B L\' B\' L';
    case 'LD':
        return 'B L B\' r2 B L\' B\'';

    // F面
    case 'FL':
        return 'U\' L\' U r2 U\' L U';
    case 'FU':
        if (ind % 2 == 0) {
            return 'D r U R2 U\' r\' U R2 U\' D\' r2';
        }
        else {
            return edge_func('BD', 0);
        }
    case 'FR':
        return 'U R U\' r2 U R\' U\'';
    case 'FD':
        return 'l2 ' + edge_func('BU') + ' l2';


    // R面
    case 'RF':
        return 'B\' R2 B r2 B\' R2 B';
    case 'RU':
        return 'B\' R B r2 B\' R\' B';
    case 'RB':
        return 'R B\' R\' B r2 B\' R B R\'';
    case 'RD':
        return 'B\' R\' B r2 B\' R B';

    // B面
    case 'BU':
        return 'U B\' R U\' B r2 B\' U R\' B U\'';
    case 'BR':
        return 'U R\' U\' r2 U R U\'';
    case 'BL':
        return 'U\' L U r2 U\' L\' U';
    case 'BD':
        if (ind % 2 == 0) {
            return 'r2 D U R2 U\' r U R2 U\' r\' D\'';
        }
        else {
            return edge_func('FU', 0);
        }

    // D面
    case 'DR':
        return 'U R2 U\' r2 U R2 U\'';
    case 'DL':
        return 'U\' L2 U r2 U\' L2 U';
    case 'DB':
        return 'l ' + edge_func('BU') + ' l\'';
    }

    return '';
};

const medge_func = (part, ind) => {
    switch (part) {
    // U面
    case 'UL':
        return 'L\' U\' L U M2 U\' L\' U L';
    case 'UB':
        return 'M2';
    case 'UR':
        return 'R U R\' U\' M2 U R U\' R\'';
    case 'UF':
        return 'M D2 M\' U2 M D2 M\' U2 M2';


    // L面
    case 'LF':
        return 'B L2 B\' M2 B L2 B\'';
    case 'LU':
        return 'B L\' B\' M2 B L B\'';
    case 'LB':
        return 'L\' B L B\' M2 B L\' B\' L';
    case 'LD':
        return 'B L B\' M2 B L\' B\'';

    // F面
    case 'FL':
        return 'U\' L\' U M2 U\' L U';
    case 'FU':
        if (ind % 2 == 0) {
            return 'D M\' U M2 U\' M U R2 U\' D\' M2';
        }
        else {
            return medge_func('BD', 0);
        }
    case 'FR':
        return 'U R U\' M2 U R\' U\'';


    // R面
    case 'RF':
        return 'B\' R2 B M2 B\' R2 B';
    case 'RU':
        return 'B\' R B M2 B\' R\' B';
    case 'RB':
        return 'R B\' R\' B M2 B\' R B R\'';
    case 'RD':
        return 'B\' R\' B M2 B\' R B';

    // B面
    case 'BU':
        return 'U B\' R U\' B M2 B\' U R\' B U\'';
    case 'BR':
        return 'U R\' U\' M2 U R U\'';
    case 'BL':
        return 'U\' L U M2 U\' L\' U';
    case 'BD':
        if (ind % 2 == 0) {
            return 'M2 D U R2 U\' M\' U R2 U\' M D\'';
        }
        else {
            return medge_func('FU', 0);
        }

    // D面
    case 'DR':
        return 'U R2 U\' M2 U R2 U\'';
    case 'DL':
        return 'U\' L2 U M2 U\' L2 U';
    case 'DB':
        if (ind % 2 == 0) {
            return 'M2 U2 M D2 M\' U2 M D2 M\'';
        } else {
            return medge_func('UF', 0);
        }
    }

    return '';
}

const tcenter_func = (part, ind) => {
    switch (part){
    // U面
    case 'UR': {
        if (ind % 2 == 0) {
            return 'r\' f\' E\' f U2 f\' E f U2 r U2';
        }
        else {
            return tcenter_func('UL', 0);
        }
    }
    case 'UL': {
        if (ind % 2 == 0) {
            return 'l f E f\' U2 f E\' f\' U2 l\' U2'
        }
        else {
            return tcenter_func('UR', 0);
        }
    }
    case 'UF':
        return 'U2';

    //L面
    case 'LF':
        return 'y\' E\' r\' E r U2 r\' E\' r E y';
    case 'LU':
        return 'M\' u M U2 M\' u\' M';
    case 'LB':
        return 'y\' r E2 r\' U2 r E2 r\' y';
    case 'LD':
        return 'M d M\' U2 M d\' M\'';

    //F面
    case 'FR':
        return 'y\' r\' E\' r U2 r\' E r y';
    case 'FL':
        return 'y l E l\' U2 l E\' l\' y\'';
    case 'FU':
        return 'u M\' u M U2 M\' u\' M u\'';
    case 'FD':
        return 'd\' M d M\' U2 M d\' M\' d';

    //R面
    case 'RF':
        return 'y E\' l E l\' U2 l E\' l\' E y\'';
    case 'RU':
        return 'M\' u\' M U2 M\' u M';
    case 'RB':
        return 'y l\' E2 l U2 l\' E2 l y\'';
    case 'RD':
        return 'M d\' M\' U2 M d M\'';

    //B面
    case 'BU':
        return 'u M\' u\' M U2 M\' u M u\'';
    case 'BL':
        return 'y\' r\' E r U2 r\' E\' r y';
    case 'BR':
        return 'y l E\' l\' U2 l E l\'y\'';
    case 'BD':
        return 'd\' M d\' M\' U2 M d M\' d';

    //D面
    case 'DF':
        return 'M\' u2 M U2 M\' u2 M';
    case 'DR':
        return 'D\' ' + tcenter_func('DF') + ' D';
    case 'DL':
        return 'D ' + tcenter_func('DF') + ' D\'';
    case 'DB':
        return 'D2 ' + tcenter_func('DF') + ' D2';
    }

    return '';
}

const center_func = (part, ind) => {
    switch (part){
    // U面
    case 'UBR': {
        if (ind % 2 == 0) {
            const q = 'r\' u\' r U\' r\' u r U2';
            return (q + ' ' + q);
        }
        else {
            return center_func('UFL', 0);
        }
    }
    case 'UFL': {
        if (ind % 2 == 0) {
            const q = 'l\' u l U l\' u\' l U2';
            return (q + ' ' + q);
        }
        else {
            return center_func('UBR', 0);
        }
    }
    case 'UFR':
        return 'U2';

    //L面
    case 'LBU':
        return 'r u r\' U2 r u\' r\'';
    case 'LFU':
        return 'y\' u r\' u\' r U2 r\' u r u\' y';
    case 'LBD':
        return 'y\' r d2 r\' U2 r d2 r\' y';
    case 'LDF':
        return 'r\' d r U2 r\' d\' r';

    //F面
    case 'FLU':
        return 'r u2 r\' U2 r u2 r\'';
    case 'FRU':
        return 'y\' r\' u r U2 r\' u\' r y';
    case 'FDL':
        return 'y l d l\' U2 l d\' l\' y\'';
    case 'FDR':
        return 'd\' r\' d r U2 r\' d\' r d';

    //R面
    case 'RFU':
        return 'y2 l u\' l\' U2 l u l\' y2';
    case 'RBU':
        return 'y l\' u2 l U2 l\' u2 l y\'';
    case 'RDF':
        return 'y d l d\' l\' U2 l d l\' d\' y\'';
    case 'RBD':
        return 'r\' d\' r U2 r\' d r';

    //B面
    case 'BRU':
        return 'y2 u l u\' l\' U2 l u l\' u\' y2';
    case 'BLU':
        return 'y\' r\' u\' r U2 r\' u r y';
    case 'BDR':
        return 'y l d\' l\' U2 l d l\' y\'';
    case 'BDL':
        return 'r\' d2 r U2 r\' d2 r';

    //D面
    case 'DFL':
        return 'D ' + center_func('DFR') + ' D\'';
    case 'DFR':
        return 'r2 D\' r2 D r2 U2 r2 D\' r2 D r2';
    case 'DBL':
        return 'D2 ' + center_func('DFR') + ' D2';
    case 'DBR':
        return 'D\' ' + center_func('DFR') + ' D';
    }

    return '';
};

const corner_func = (part) => {
    switch (part){
    // U面
    case 'UBR':
        return 'R D\' ' + corner_func('RDF') + ' D R\'';
    case 'UFL':
        return 'F ' + corner_func('RFU') + ' F\'';
    case 'UFR':
        return 'F ' + corner_func('RDF') + ' F\'';

    //L面
    case 'LFU':
        return 'F2 ' + corner_func('RDF') + ' F2';
    case 'LBD':
        return 'D2 ' + corner_func('RDF') + ' D2';
    case 'LDF':
        return 'D2 ' + corner_func('RBD') + ' D2';

    //F面
    case 'FLU':
        return 'F\' D ' + corner_func('RDF') + ' D\' F';
    case 'FRU':
        return 'R2 D\' ' + corner_func('RDF') + ' D R2';
    case 'FDL':
        return 'D ' + corner_func('RDF') + ' D\'';
    case 'FDR':
        return 'D ' + corner_func('RBD') + ' D\'';

    //R面
    case 'RFU':
        return 'R\' ' + corner_func('RDF') + ' R';
    case 'RBU':
        return 'R2 ' + corner_func('RDF') + ' R2';
    case 'RDF':
        return 'R U\' R\' U\' R U R\' F\' R U R\' U\' R\' F R';
    case 'RBD':
        return 'R ' + corner_func('RDF') + ' R\'';

    //B面
    case 'BRU':
        return 'R\' F ' + corner_func('RDF') + ' F\' R';
    case 'BDR':
        return 'D\' ' + corner_func('RDF') + ' D';
    case 'BDL':
        return 'D\' ' + corner_func('RBD') + ' D';

    //D面
    case 'DFL':
        return 'F\' ' + corner_func('RDF') + ' F';
    case 'DFR':
        return 'F\' ' + corner_func('RFU') + ' F';
    case 'DBL':
        return 'D F\' ' + corner_func('RDF') + ' F D\'';
    case 'DBR':
        return 'R2 F ' + corner_func('RDF') + ' F\' R2';
    }

    return '';
};

const tcenter_parity = 'U2';
const center_parity = 'U2';
const edge_parity = 'r2 D\' L\' F l\' U2 l\' U2 F2 l\' F2 r U2 r\' U2 l2 F\' L D';
const medge_parity = '(D\' L2 D M2 D\' L2 D) (L U L\' U\') (Rw2 F2 U2 r2 U2 F2 Rw2) (U L U\' L\')';

setup();
