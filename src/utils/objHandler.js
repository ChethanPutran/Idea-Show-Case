const isValid = (mainObj, obj) => {
    if (Object.keys(obj).length === 0) {
        return false;
    }
    return Object.keys(obj).every((key_) => {
        return key_ in mainObj;
    });
};

const getUserData = (obj) => {
    const { name, email, age, phoneNumber } = obj;
    return { name, email, age, phoneNumber };
};

module.exports = { isValid, getUserData };