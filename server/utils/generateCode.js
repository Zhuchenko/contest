const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default (length) => {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return code;
};