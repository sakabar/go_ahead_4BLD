'use strict';
const docCookies = require('./cookies');

const button_func = (numbering, l_2_p_numbering) => {
    const part_types = ['Center', 'Edge', 'Corner'];
    const part_types_ln = part_types.length;

    let has_blank_numbering = false;
    for (let i = 0; i < part_types_ln; i++) {
        const part_type = part_types[i];
        const parts = Object.keys(numbering[part_type]);
        const part_ln = parts.length;
        for (let k = 0; k < part_ln; k++) {
            const part = parts[k];
            const obj = document.querySelector('.' + part_type + '__' + part);
            document.cookie = part_type + '_' + part + '=' + obj.value.charAt(0);
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

    // センター
    const center_text_obj = document.querySelector('.Analysis__CenterText');
    const center_analysis = center_text_obj.value;
    const center_spl = center_analysis.split('');
    const center_ln = center_spl.length;
    for (let i = 0; i < center_ln; i++) {
        const letter = center_spl[i];
        const part = l_2_p_numbering['Center'][letter];
        result += ' ' + center_func(part, i) + ' // Center ' + part + ' ' + letter + ' \n';
    }

    // センターパリティ
    const center_parity_checkbox = document.querySelector('.Analysis__CenterParity');
    if (center_parity_checkbox.checked) {
        result += ' ' + center_parity + ' // Center Parity\n';
    }

    // エッジ
    const edge_text_obj = document.querySelector('.Analysis__EdgeText');
    const edge_analysis = edge_text_obj.value;
    const edge_spl = edge_analysis.split('');
    const edge_ln = edge_spl.length;
    for (let i = 0; i < edge_ln; i++) {
        const letter = edge_spl[i];
        const part = l_2_p_numbering['Edge'][letter];
        result += ' ' + edge_func(part, i) + ' // Edge ' + part + ' ' + letter + ' \n';
    }

    // センターパリティ
    const edge_parity_checkbox = document.querySelector('.Analysis__EdgeParity');
    if (edge_parity_checkbox.checked) {
        result += ' ' + edge_parity + ' // Edge Parity\n';
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

    // センターパリティ
    const corner_parity_checkbox = document.querySelector('.Analysis__CornerParity');
    if (corner_parity_checkbox.checked) {
        result += ' ' + corner_parity + ' // Corner Parity\n';
    }

    const result_text_obj = document.querySelector('.Result__Text');
    result_text_obj.value = replace_small_letter(result).replace(/[()]/g, '');
};

const setup = () => {
    let numbering = {};
    let l_2_p_numbering = {};
    const part_types = ['Center', 'Edge', 'Corner'];
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

    parts['Edge'] = [
        'UB', 'UR', 'UF', 'UL',
        'LU', 'LF', 'LD', 'LB',
        'FU', 'FR', 'FD', 'FL',
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
            docCookies.setItem(cookie_key, numbering[part_type][part]);
        });
    });

    // alert('setup done.');
};

const replace_small_letter = (sequence_str) => {
    return sequence_str
        .replace(/ l' /g, ' (Lw\' L) ')
        .replace(/ l /g, ' (Lw L\') ')
        .replace(/ r' /g, ' (Rw\' R) ')
        .replace(/ r /g, ' (Rw R\') ')
        .replace(/ u' /g, ' (Uw\' U) ')
        .replace(/ u /g, ' (Uw U\') ')
        .replace(/ d' /g, ' (Dw\' D) ')
        .replace(/ d /g, ' (Dw D\') ')
        .replace(/ l2 /g, ' (Lw2 L2) ')
        .replace(/ r2 /g, ' (Rw2 R2) ')
        .replace(/ u2 /g, ' (Uw2 U2) ')
        .replace(/ d2 /g, ' (Dw2 D2) ');
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

const center_parity = 'U2';
const edge_parity = 'r2 D\' L\' F l\' U2 l\' U2 F2 l\' F2 r U2 r\' U2 l2 F\' L D';
const corner_parity = 'y2 R U R\' U\' r2 U2 r2 Uw2 r2 Uw2 U\' R U\' R\' y2';

setup();


