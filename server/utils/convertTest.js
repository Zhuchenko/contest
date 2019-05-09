export const convertTests = (tests) => {
    const normTests = [];

    for (let i = 0, l = tests.length; i < l; i++){
        console.log(tests[i].input);
        normTests[i] = {
            input: Array.from(tests[i].input),
            output: Array.from(tests[i].output),
            number: tests[i].number
        };
    }

    return normTests
}