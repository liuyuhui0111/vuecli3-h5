/* eslint-disable */
const getters = {
    token: state => state.token,
    fromRoute: state => state.fromRoute,
    netWorkError: state => state.netWorkError,
    requestLoading: state => state.requestLoading,
    commonUserData: state => state.user.commonUserData,
    COMMON_COMP_DATA: state => state.COMMON_COMP_DATA,
};

export default getters;