import { sha3_512 } from "js-sha3";

export default (password, salt, conf) => {
    const {iterations, len} = conf;
    password = new Buffer(password);
    salt = new Buffer(salt);
    let out = new Buffer('');
    let md, prev, i, j;
    let num = 0;
    let block = Buffer.concat([salt, new Buffer(4)]);
    while (out.length < len) {
        num++;
        block.writeUInt32BE(num, salt.length);
        prev = new Buffer(sha3_512.create().update(password).update(block).hex());
        md = prev;
        i = 0;
        while (++i < iterations) {
            prev = new Buffer(sha3_512.create().update(password).update(prev).hex());
            j = -1;
            while (++j < prev.length) {
                md[j] ^= prev[j]
            }
        }
        out = Buffer.concat([out, md]);
    }
    return out.slice(0, len).toString('hex');
}
