export const ReferralReason: any = [
    'Suspected First Line Failure',
    'Suspected Second Line Failure',
    'Toxicity to ART drugs',
    'Follow-up Review',
    'Other',
];

export const RRFLevelsObj: any = {
    notCreated: -1,
    dataManager: 0,
    medicalOfficer: 1,
    nodalOfficer: 2,
    sacepARTPC: 3,
    noARTPC: 4,
    specialistARTPC: 5,
    sacepCOE: 6,
    noCOE: 7,
    specialistCOE: 8,
    sacepPCOE: 9,
    noPCOE: 10,
    specialistPCOE: 11,
};

export const facilityType: any = [
    {
        name: 'pCoE',
        value: 10,
        designations: [
            { name: 'SACEP', value: 18 },
            { name: 'Director', value: 19 },
            { name: 'Specialist', value: 20 },
        ],
    },
    {
        name: 'CoE',
        value: 3,
        designations: [
            { name: 'SACEP', value: 14 },
            { name: 'Director', value: 15 },
            { name: 'Specialist', value: 16 },
        ],
    },
    {
        name: 'ART+C',
        value: 2,
        designations: [
            { name: 'SACEP', value: 12 },
            { name: 'Nodal Officer', value: 8 },
            { name: 'Specialist', value: 10 },
        ],
    },
    {
        name: 'ARTC',
        value: 1,
        designations: [
            { name: 'Staff Nurse', value: 17 },
            { name: 'Data Manager', value: 1 },
            { name: 'Counsellor', value: 3 },
            { name: 'Medical Officer', value: 5 },
            { name: 'Nodal Officer', value: 7 },
        ],
    },
    {
        name: 'CSC',
        value: 4,
        designations: [{ name: 'Project Coordinator', value: 21 }],
    },
];

export const userTypes: any = [
    { name: 'Super Admin', value: 1 },
    { name: 'Facility Admin', value: 1 },
    { name: 'Normal User', value: 1 },
];

export const meetingTypes = [
    { name: 'CSC', value: 2 },
    { name: 'TC', value: 1 },
];
