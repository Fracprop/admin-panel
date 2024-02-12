export const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
export const MOBILE_NUMBER = /^[0-9]{10}$/;
export const USER_NAME = /^[a-zA-Z 0-9_.]{2,20}$/;
export const PINCODE = /^[1-9][0-9]{5}$/;
export const ONLYCHARACTERS = /^[A-Za-z]+$/;
export const AGE = /^[0-9]{1,3}$/;
export const SOCHID = /^[0-9]{12}$/;
export const NINID = /^[0-9]{10}$/;
export const RRF_NO = /^[a-zA-Z 0-9]{15}$/;
export const PASSWORD_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\/:;<=>?\\@[\]^_`{|}~]).{8,64}$/;
export const ONLYNUMBER=/^(?=.*[1-9])\d*\.?\d+$/
