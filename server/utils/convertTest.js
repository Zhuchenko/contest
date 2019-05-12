export const convertTests = (tests) => {
    const testsWithByteArrayData = [];

    for (let i = 0, l = tests.length; i < l; i++){
        testsWithByteArrayData[i] = {
            input: Array.from(tests[i].input),
            output: Array.from(tests[i].output),
            number: tests[i].number
        };
    }

    return testsWithByteArrayData;
}