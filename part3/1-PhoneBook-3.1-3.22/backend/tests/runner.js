module.exports.run_test = (fn, test_name) => {
    if( typeof fn === 'function')
    {
        const startTime = performance.now();
        return fn().then(() => {
            const endTime = performance.now();
            console.log(`[✔] ${test_name} are executed in ${endTime-startTime}ms`);
        }).catch((error) => {
            console.error(`[❌] ${test_name} error: ${error}`);
        });
    }
    else
    {
        console.log(`❌ [${test_name}] is not valid function`);
    }
};