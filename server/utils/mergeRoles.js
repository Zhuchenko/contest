export default (roles) => {
    let startRole = roles.shift();

    const groups = Object.keys(startRole);

    const reducer = (acc, curr) => {
        for (let group of groups) {
            const rights = Object.keys(acc[group]);
            for (let right of rights) {
                acc[group][right] = curr[group][right] || acc[group][right];
            }
        }
        return acc;
    };

    return roles.reduce(reducer, startRole);
};