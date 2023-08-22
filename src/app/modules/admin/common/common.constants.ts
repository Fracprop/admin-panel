/**
 * Weekdays used in Facility time management
 *
 */
export const SELECTED_STATE = 19;
export const Weekdays = [
    { name: 'Sunday', value: 'sunday' },
    { name: 'Monday', value: 'monday' },
    { name: 'Tuesday', value: 'tuesday' },
    { name: 'Wednesday', value: 'wednesday' },
    { name: 'Thursday', value: 'thursday' },
    { name: 'Friday', value: 'friday' },
    { name: 'Saturday', value: 'saturday' },
];

/**
 * RRF status used as filters in RRF LOGS
 */
export const RRFStatus = [
    { name: 'Saved as draft', levelID: 0, userLevel: 0 },
    { name: 'Sent to CO/MO', levelID: 1, userLevel: 0 },
    { name: 'Sent by DM', levelID: 1, userLevel: 1 },
    { name: 'Reviewed by CO', levelID: 1, userLevel: 1 },
    { name: 'Sent to NO', levelID: 2, userLevel: 1 },
    { name: 'Received back from higher authority', levelID: 1, userLevel: 1 },
    { name: 'Action taken or closed', levelID: 1, userLevel: 1 },
    { name: 'Sent by MO', levelID: 2, userLevel: 2 },
    { name: 'Sent back to MO', levelID: 1, userLevel: 2 },
    { name: 'Forwarded to higher facility', levelID: 3, userLevel: 2 },
    { name: 'Sent by ARTC/ART+C', levelID: 3, userLevel: 3 },
    { name: 'Sent back to ARTC/ART+C', levelID: 1, userLevel: 3 },
    { name: 'Sent to NO/Director', levelID: 4, userLevel: 3 },
    { name: 'Sent to Specialist', levelID: 5, userLevel: 4 },
    { name: 'eSACEP requested', levelID: 4, userLevel: 4 },
    { name: 'Sent back to SACEP', levelID: 3, userLevel: 4 },
    { name: 'Sent back to ARTC', levelID: 1, userLevel: 4 },
    { name: 'Sent by NO/Director', levelID: 5, userLevel: 5 },
    { name: 'Sent to NO/Director', levelID: 4, userLevel: 4 },
];

/**
 *User Types for filter
 */
export const userTypes = [
    { name: 'Doctor', value: 'doctor' },
    { name: 'CHO', value: 'CHO' },
];
/**
 *User Status for filter
 */
export const userStatus = [
    { name: 'Active', value: 'active' },
    { name: 'Blocked', value: 'blocked' },
];
export const qualifications = [
    { name: 'MBBS', value: 'MBBS' },
    { name: 'MD', value: 'MD' },
    { name: 'MS', value: 'MS' },
    { name: 'Other', value: 'Other' },
];
export const gender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Transgender', value: 'Transgender' },
];
export const consultationStatus = [
    { name: 'In Process', value: 4 },
    { name: 'Completed', value: 3 },
    //{ name: 'Forward', value: 5 },
    //  { name: 'Draft', value: 2 },
];
export const namePrefixes = [
    { name: 'Dr.', value: 'Dr.' },
    { name: 'Mr.', value: 'Mr.' },
    { name: 'Ms.', value: 'Ms.' },
];
export const GENDER = [
    { genderId: 1, genderName: 'Male', isActive: true, sourceId: 1 },
    { genderId: 2, genderName: 'Female', isActive: true, sourceId: 1 },
    { genderId: 3, genderName: 'Transgender', isActive: true, sourceId: 1 },
];
