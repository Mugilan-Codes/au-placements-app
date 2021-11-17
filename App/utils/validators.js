// REF: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// REF: https://stackoverflow.com/a/46181/12381908
// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Matches value from 0.00 to 10.00 (inclusive)
// use for cgpa
// REF: https://stackoverflow.com/a/33969156/12381908
// REF: https://www.codeproject.com/Answers/656531/Regex-expression-for-0-10-numbers-with-two-decimal#answer3
export const ZERO_TO_TEN = /^\d(\.\d{0,2})?$|^10(\.0{0,2})?$/;

// Matches values from 0.00 to 100.00 (inclusive)
export const ZERO_TO_HUNDRED = /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/;
