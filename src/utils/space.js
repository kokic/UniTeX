
// pangu space (paranoid text spacing) for math worker

const CJK = '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff';

const CJK_ANS = new RegExp(`([${CJK}])([A-Za-z\u0370-\u03ff0-9@\\$%\\^&\\*\\-\\+\\\\=\\|/\u00a1-\u00ff\u2150-\u218f\u2700—\u27bf])`, 'g');
const ANS_CJK = new RegExp(`([A-Za-z\u0370-\u03ff0-9~\\$%\\^&\\*\\-\\+\\\\=\\|/!;:,\\.\\?\u00a1-\u00ff\u2150-\u218f\u2700—\u27bf])([${CJK}])`, 'g');

const S_A = /(%)([A-Za-z])/g;

const INSERT_SPACE = '$1 $2';

const pangu_space = function (s) {
  return s
    .replace(/～/g, '~ ')
    .replace(/！/g, '! ')
    .replace(/；/g, '; ')
    .replace(/：/g, ': ')
    .replace(/，/g, ', ')
    .replace(/。/g, '. ')
    .replace('？', '? ')
    .replace(/（/g, ' (')
    .replace(/）/g, ') ')
    // .replace(/“/g, ' ``')
    // .replace(/”/g, '\" ')
    .replace(CJK_ANS, INSERT_SPACE)
    .replace(ANS_CJK, INSERT_SPACE)
    ;
};

