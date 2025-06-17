const commonIntake = {
    start: {
        question:"Hi there! I'm LawDog, your friendly legal AI Assistant, Tell me about your legal issue, So that I can help you further",
        field:'start',
        next:'name'
    },
    name: {
        question: "Let's get started with a few basics. What is your full name?",
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
        options: ['Filing a case', 'Been sued/Evicted', 'Need specific document'],
        next: 'issue_type'
    },
    issue_type: {
        question: 'What type of legal issue is this about?',
        field: 'issue_type',
        options: ['Eviction', 'Bankruptcy', 'Small_Claims','Power_of_Attorney', 'other_flow'],
        next: (answer) => {
            console.log(answer)
            if (answer.toLowerCase() === 'eviction') return 'eviction_start';
            else if (answer.toLowerCase() === 'bankruptcy') return 'bankruptcy_start';
            else if(answer.toLowerCase() === "small claims") return "small_claims_start"
            else if(answer.toLowerCase() === "civil lawsuit") return "being_sued_start"
            else if(answer.toLowerCase()=== "power of attorney") return "power_of_attorney_start"
            else {
            return 'other_flow_start'; 

            }
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
    small_claims_start: {
        start: {
            question: "Let’s get your money back. What amount are you suing for?",
            field: "claimAmount",
            next: "lawsuitReason",
        },
        lawsuitReason: {
            question: "What is the reason for the lawsuit?",
            field: "lawsuitReason",
            next: "hasAgreement",
        },
        hasAgreement: {
            question: "Do you have a written agreement or contract?",
            field: "hasWrittenAgreement",
            next: "defendantResponse",
        },
        defendantResponse: {
            question: "Has the other party refused to pay or respond?",
            field: "refusedToPay",
            next: "uploadDocs",
        },
        uploadDocs: {
            question: "Please upload any documents you want us to use (contracts, receipts, messages, etc.)",
            field: "uploadedDocs",
            upload: true,
        },
    },
    being_sued_start: {
        start: {
            question: "Let’s protect your rights. When were you served with the court papers?",
            field: "serviceDate",
            next: "hasSummons",
        },
        hasSummons: {
            question: "Do you have a copy of the summons or complaint?",
            field: "hasSummonsCopy",
            next: "caseNumber",
            upload: true,
        },
        caseNumber: {
            question: "What is the case number listed?",
            field: "caseNumber",
            next: "responseDeadline",
        },
        responseDeadline: {
            question: "Do you know the deadline to respond?",
            field: "responseDeadline",
            next: "uploadDocs",
        },
        uploadDocs: {
            question: "Please upload any documents you've received so far.",
            field: "uploadedDocs",
            upload: true,
        },
    },
    power_of_attorney_start: {
        start: {
            question: "Let’s help you prepare a Power of Attorney. What type of POA are you looking to create?",
            field: "poaType",
            options: ["General", "Medical", "Financial", "Durable", "Limited", "Not Sure"],
            next: "principalName",
        },
        principalName: {
            question: "Who will be granting the authority (the principal)? Please provide their full legal name.",
            field: "principalName",
            next: "agentName",
        },
        agentName: {
            question: "Who will be receiving the authority (the agent)? Please provide their full legal name.",
            field: "agentName",
            next: "poaEffectiveness",
        },
        poaEffectiveness: {
            question: "Should this POA be effective immediately, or only under certain conditions (like incapacity)?",
            field: "poaEffectiveness",
            next: "extraNotes",
        },
        extraNotes: {
            question: "Is there anything else we should know or include?",
            field: "extraNotes",
            next: "uploadDocs",
        },
        uploadDocs: {
            question: "Please upload any drafts or notes you’ve already prepared.",
            field: "uploadedDocs",
            upload: true,
        },
    },
    other_flow_start: {
        start: {
            question: "Please tell us a little about your situation. What kind of legal help do you think you need?",
            field: "otherDetails",
            next: "scheduleCallback",
        },
        scheduleCallback: {
            question: "Thank you. We’ll take a closer look. To best assist you, One of our technical experts will call you regarding your issue",
            field: "callbackTime",
        },
    },
    wrapUp: {
        scheduleConsult: {
            question: "Would you like to schedule a free 5-minute consultation to confirm your next steps?",
            field: "wantsConsult",
            options: ["Yes, schedule a call", "No, just prepare my documents"],
            next: "paymentChoice",
        },
        paymentChoice: {
            question: "Would you prefer to pay now or receive an invoice by email?",
            field: "paymentPreference",
            options: ["Pay now", "Send invoice"],
            next: "endMessage",
        },
        endMessage: {
            question: "Thank you! You're in good hands. We'll follow up shortly.",
            field: "endConfirmation",
        },
    },
};

module.exports = { commonIntake, IntakeFlow };
