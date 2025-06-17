const commonIntake = {
    name: {
        question: "Hi there! I'm your LegalEasier Intake Assistant. Let's get started with a few basics. What is your full name?",
        field: 'name',
        next: 'email',
    },
    email: {
        question: 'Thanks, [User Name]! What email address should we use to send your documents and updates?',
        field: 'email',
        next: 'phone'
    },
    phone: {
        question: 'And your best contact number?',
        field: 'phone',
        next: 'address'
    },
    address: {
        question: 'What state and county is your legal issue in?',
        field: 'address',
        next: 'legal_issue'
    },
    legal_issue: {
        question: 'Are you the one filing a case, have you been sued, or do you need a specific document?',
        field: 'legal_issue',
        options: ['Filing a case', 'Been sued', 'Need specific document'],
        next: 'issue_type'
    },
    issue_type: {
        question: 'What type of legal issue is this about?',
        field: 'issue_type',
        options: ['Eviction', 'Bankruptcy', 'Other'],
        next: (answer) => {
            if (answer.toLowerCase() === 'eviction') return 'eviction_start';
            if (answer.toLowerCase() === 'bankruptcy') return 'bankruptcy_start';
            return 'other_flow_start'; 
        }
    }
};

const IntakeFlow = {
    eviction_start: {
        start: {
            question: "Do you have a written lease agreement?",
            field: "hasWrittenLease",
            next: "leaseStatus",
            options: ["Yes", "No"],
        },
        leaseStatus: {
            question: "Is the lease still active, or has it expired?",
            field: "leaseStatus",
            next: "tenantCount",
        },
        tenantCount: {
            question: "How many tenants are you trying to evict?",
            field: "tenantCount",
            next: "preparationStage",
        },
        preparationStage: {
            question: "Do you want help with preparing a notice, or are you ready to file in court?",
            field: "actionType",
            next: "uploadDocs",
        },
        uploadDocs: {
            question: "Please upload your lease and any notices you've already served.",
            field: "uploadedDocs",
            upload: true,
        },
    },
    bankruptcy_start: {
        start: {
            question: "Have you filed for bankruptcy before?",
            field: "hasFiledBefore",
            next: "employmentStatus",
        },
        employmentStatus: {
            question: "Are you currently employed? If yes, what is your monthly income after taxes?",
            field: "monthlyIncome",
            next: "housingStatus",
        },
        housingStatus: {
            question: "Do you rent or own your home?",
            field: "housing",
            next: "debtAmount",
        },
        debtAmount: {
            question: "How much total unsecured debt do you currently owe?",
            field: "unsecuredDebt",
            next: "uploadDocs",
        },
        uploadDocs: {
            question: "Please upload any collection letters, court papers, or bills you'd like us to review.",
            field: "uploadedDocs",
            upload: true,
        },
    },
};

module.exports = { commonIntake, IntakeFlow };