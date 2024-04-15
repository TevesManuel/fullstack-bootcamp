/*
    The contents of this file work to refactor
    boilerplate code and improve the development experience.
*/

//Generate typical function (e) => {fnSet(e.target.value)}
const textInputFnGen = (fnSet) => {
    return (e) => {
        fnSet(e.target.value);
    };
};

export default {
    textInputFnGen,
};