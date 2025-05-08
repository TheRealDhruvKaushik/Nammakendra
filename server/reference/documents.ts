/**
 * Reference document storage for government service information
 * Used by the NammaSarkara feature to provide accurate information about documents and procedures
 */

export interface ReferenceDocument {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: 'identity' | 'voting' | 'property' | 'certificate' | 'pension' | 'other';
}

// Collection of reference documents
export const referenceDocuments: ReferenceDocument[] = [
  {
    id: 'epic-card',
    title: 'EPIC (Electors Photo Identity Card) - Bengaluru Urban',
    content: `
##  EPIC Card Issuance – Bengaluru Urban

### What is it for?

The **EPIC (Electors Photo Identity Card)** serves as an official identity document issued by the Election Commission of India to eligible voters. It is essential for casting votes in elections and also functions as a valid proof of identity and address for various purposes.

---

###  Offline Steps – KarnatakaOne Centers

**Where to Apply:**

* Visit any **KarnatakaOne Center** in Bengaluru.

**Process:**

1. Provide your **Constituency**, **Name**, and **Relation Name** to the operator.
2. The operator will search for your details in the Department Portal.
3. Upon verification, the EPIC card will be printed and laminated on the spot.
4. The card is handed over **only to the respective applicant**; it will not be issued to any other person on their behalf.

**Service Charge:**

* ₹10 (Cash payment only)

**Contact:**

* **Phone:** 080-49203888 / 8904085030
* **Email:** onehelpdesk@karnataka.gov.in


---

###  Offline Steps – Postal Delivery via India Post

**Process:**

* EPIC cards are dispatched through **Speed Post** by the Karnataka Postal Department.
* Delivery is executed through all **9,613 post offices** in the state.
* Cards are delivered to the address specified by the voter.
* Tracking and tracing of the dispatched cards are available.
* Postal staff use the **Postman Mobile App** to update delivery information in real-time.
* Vigilance squads monitor the dispatch process to prevent malpractices.


---

###  Online Steps – e-EPIC (Digital Voter ID)

**What is e-EPIC?**

The **e-EPIC** is a portable document format (PDF) version of the EPIC, which can be downloaded and stored digitally.

**Features:**

* Contains a secure QR code for verification.
* Can be stored on mobile devices, uploaded to DigiLocker, or printed and self-laminated.
* Available for download to all electors with a unique mobile number in the electoral roll.
* If the mobile number is not unique or not registered, e-KYC is required before downloading.

**How to Download:**

1. Visit the National Voters Service Portal (NVSP) or Voter Portal.
2. Log in using your credentials.
3. Navigate to the 'Download e-EPIC' section.
4. Enter your EPIC number and complete the OTP verification.
5. Download the e-EPIC PDF.


---

###  Documents Needed

**For New Voter Registration:**

* Proof of age (e.g., Birth Certificate, School Leaving Certificate).
* Proof of residence (e.g., Utility bills, Rental agreement).
* Recent passport-sized photograph.

**For Corrections or Updates:**

* Existing EPIC card.
* Relevant documents supporting the correction (e.g., Marriage Certificate for name change).

---

###  Processing Time

* **KarnatakaOne Centers:** EPIC cards are issued immediately upon verification.
* **Postal Delivery:** Delivery timelines may vary; tracking is available through the Postman Mobile App.
* **e-EPIC Download:** Available instantly upon successful verification.

---

### Helpline and Support

* **KarnatakaOne Helpdesk:**

  * **Phone:** 080-49203888 / 8904085030
  * **Email:** onehelpdesk@karnataka.gov.in
* **Voter Helpline:**

  * **Phone:** 1950 (toll-free)
  * **Website:** https://www.nvsp.in/
    `,
    keywords: ['epic', 'voter', 'voter id', 'election', 'voting', 'e-epic', 'digital voter id', 'election commission', 'karnataka one', 'epic card', 'electoral photo identity card'],
    category: 'voting'
  },
  {
    id: 'aadhaar',
    title: 'Aadhaar Card - Application and Update Process',
    content: `
### Aadhaar Enrolment (0–5 Years)

**Enrolment Type I – Head of the Family (HoF) Based Enrolment:**

Child is enrolled using documents that link the child to a Head of Family (typically a parent) who already possesses an Aadhaar number.

**Acceptable Proof of Relationship (PoR) and Date of Birth (DoB) Documents:**

1. Birth Certificate issued by Authorized Authority under Registration of Births and Deaths Act, 1969 and respective state rules – ✅ PoR, ✅ DoB
2. Indian/Foreign Passport (for children born outside India) – ✅ PoR, ❌ DoB
3. Nepal/Bhutan Passport OR:

   * a. Nepalese/Bhutanese Citizenship Certificate
   * b. Limited Validity Photo ID Certificate issued by Nepalese/Bhutanese Mission in India (for stays over 182 days) – ✅ PoR, ❌ DoB

**Enrolment Type II – Document Based (for children in orphanages/shelters):**

4. UIDAI Standard Certificate issued by:

   * Superintendent/Warden/Matron/Head of Institution of recognized shelter homes/orphanages – ✅ PoI, ✅ PoA

**Important Notes:**
a) HoF enrolment is mandatory for 0–5 year children unless in orphanage/shelter
b) HoF must have valid Aadhaar
c) Aadhaar of both parents is needed; biometric auth by one is mandatory
d) Child and HoF names must be in PoR document
e) Child's Aadhaar address will match HoF's
f) Aadhaar for foreign residents valid until VISA expiry; 10 years for Nepal/Bhutan nationals
g) OCI Aadhaar valid 10 years
h) LTV Aadhaar valid until LTV expiry
i) Acceptable PoI documents for children include: Passport, Domicile Certificate, Caste Certificate, Disability ID, OCI card, VISA with Passport
j) Exception handling under UIDAI RO jurisdiction only
k) Only original documents accepted

---

### Aadhaar Enrolment (Above 5 Years)

**PoI/PoA/PoR/DoB Acceptability Matrix:**

| S.No | Document                                   | PoI | PoA | PoR | DoB |
| ---- | ------------------------------------------ | --- | --- | --- | --- |
| 1    | Indian Passport                            | ✅ | ✅  | ✅  | ✅ |
| 2    | PAN/e-PAN Card                             | ✅ | ❌  | ❌  | ❌ |
| 3    | Ration Card/e-Ration                       | ✅ | ✅  | ✅  | ❌ |
| 4    | Voter ID                                   | ✅ | ✅  | ❌  | ❌ |
| 5    | Driving License                            | ✅ | ❌  | ❌  | ❌ |
| 6    | Govt Service ID                            | ✅ | ❌  | ❌  | ✅ |
| 7    | Pension/Freedom Fighter ID                 | ✅ | ❌  | ✅  | ✅ |
| 8    | CGHS/ESIC/RSBY/Medi-Claim Card             | ✅ | ❌  | ❌  | ❌ |
| 9    | Disability ID                              | ✅ | ✅  | ❌  | ❌ |
| 10   | Govt-issued ID (e.g. MGNREGA, Labour Card) | ✅ | ✅  | ✅  | ❌ |
| 11   | Marriage Certificate (with photo)          | ❌ | ❌  | ✅  | ❌ |
| 12   | Caste Certificate                          | ✅ | ✅  | ✅  | ❌ |
| 13   | School/University Marksheet                | ✅ | ❌  | ✅  | ✅ |
| 14   | Transgender ID Card                        | ✅ | ✅  | ✅  | ✅ |

**UIDAI Certificate Format Issuers (PoA only unless noted):**

* MP/MLA/MLC/Municipal Councillor – ✅ PoA only
* Gazetted Officer Group A/B, EPFO Officer, Tehsildar – ✅ PoA only
* Shelter Home Official – ✅ PoI + PoA
* Head of Educational Institute – ✅ PoA
* Panchayat Head/Secretary/VRO (rural) – ✅ PoA

**Utility/Financial/Lease Documents (PoA only):**

* Electricity/Water/Gas/Telephone bills (<3 months)
* Rent agreement (registered or not)
* Property Tax receipt (<1 year)
* Insurance Policy (<1 year)
* Bank/PO Passbook or Statement (<3 months)

**Resident Foreigners/Nepal-Bhutan Nationals:**

| S.No | Document                                                                         | PoI | PoA |
| ---- | -------------------------------------------------------------------------------- | --- | --- |
| 26   | OCI + Passport (182+ day stay)                                                   | ✅   | ❌|
| 27   | LTV + Foreign Passport (minority communities)                                    | ✅   | ✅|
| 28   | Nepal/Bhutan Passport OR 2 out of: Citizenship Certificate, Voter ID, Mission ID | ✅   | ❌|
| 29   | VISA + Foreign Passport (182+ days)                                              | ✅   | ❌|
| 30   | FRRO/FRO permit                                                                  | ❌   | ✅|

---

### Aadhaar Update (All Age Groups)

Same documentation matrix applies as enrolment above with following exceptions:

* **DoB Documents:** Must contain name + date of birth. Marked with \`*\` where applicable.
* **Self Declaration (HoF Address Update):**

  * Format includes:

    * HoF Aadhaar, Name
    * Relationship with resident
    * Signature and Stamp of HoF
    * Resident's photo (3.5x4.5cm) cross signed + stamped
    * Valid for 3 months from date of issue

**Exception Handling Documents:**

* **Name Change:** Gazette Notification + old PoI
* **Gender Change:** Medical Certificate from surgeon
* **DoB Change:** Birth Certificate + Self Declaration per UIDAI format

**Note:**

* All documents must be original
* No photocopies required
* Aadhaar for foreign nationals limited by VISA validity or 10 years (Nepal, Bhutan, OCI, LTV)
* Aadhaar updates for foreigners must be done at Adult Enrolment Centres
    `,
    keywords: ['aadhaar', 'aadhar', 'uid', 'uidai', 'unique identification', 'biometric', 'identity card', 'address update', 'name update', 'documents', 'proof of identity', 'proof of address', 'proof of relationship', 'date of birth'],
    category: 'identity'
  },
  {
    id: 'form-6-voter-enrollment',
    title: 'Form 6 – Fresh Voter Enrollment',
    content: `
### Form 6 – Fresh Voter Enrollment

**Purpose:**
To apply for first-time inclusion in the electoral roll (typically at age 18+ or after change of address across constituencies).

**Eligibility:**
- Must be an Indian citizen
- Ordinarily resident at current address

**Application Methods:**
**Online:**
- Through NVSP portal → Form 6

**Offline:**
- Collect Form 6 at electoral offices or from BLO
- Fill and submit in person with photo and documents

**Documents Required:**
- Proof of Age (attach any one):
  - Birth Certificate
  - 10th/12th mark sheet
  - Aadhaar/PAN/Passport/Driving License
- Proof of Address (attach any one):
  - Utility bill (older than 1 year)
  - Aadhaar
  - Registered rent agreement
  - Bank/Post Office passbook
- Photograph:
  - Passport-sized photo (3.5x4.5 cm)
- For persons with disability or guardianship cases:
  - Include disability ID card or legal guardian declaration (if applicable)

**Declaration:**
Signed confirmation of citizenship and single constituency registration is required
    `,
    keywords: ['form 6', 'voter enrollment', 'voter registration', 'electoral roll', 'new voter', 'first time voter', 'election', 'epic'],
    category: 'voting'
  },
  {
    id: 'form-8a-voter-transposition',
    title: 'Form 8A – Transposition of Voter Entry',
    content: `
### Form 8A – Transposition of Voter Entry (within same constituency)

**Purpose:**
To update address in the voter list when shifting residence within the same constituency.

**How to Apply:**
**Online:**
- Log in to NVSP portal → Select Form 8A

**Offline:**
- Fill out Form 8A manually
- Submit to ERO or BLO at new location

**Required Documents:**
- EPIC number (if issued)
- New address proof (utility bill, rent agreement, bank statement)
- Passport-size photograph

**Process:**
- Verification by field officer
- Name is transposed to new part in the roll
- Updated voter slip is issued by ERO
    `,
    keywords: ['form 8a', 'voter transposition', 'change address', 'shift residence', 'same constituency', 'voter transfer', 'electoral roll update'],
    category: 'voting'
  },
  {
    id: 'form-8-voter-correction',
    title: 'Form 8 – Correction in Electoral Roll',
    content: `
### Form 8 – Correction in Electoral Roll

**Purpose:**
To request correction of incorrect details such as name, date of birth, address, gender, or photograph in the electoral roll.

**Modes of Application:**
**Online:**
- Visit NVSP portal → Select Form 8

**Offline:**
- Collect and submit filled Form 8 to BLO/ERO

**Documents to Carry:**
- EPIC (if issued)
- Aadhaar card or any valid ID with correct details
- Passport-size photo (if correcting photo)
- Proof for date of birth or address, if requesting corrections there

**Process:**
- Submit form with supporting documents
- Verification by BLO
- Decision letter is sent and changes are reflected in the updated roll
    `,
    keywords: ['form 8', 'voter correction', 'electoral roll correction', 'name correction', 'address correction', 'photo update', 'gender correction', 'date of birth correction'],
    category: 'voting'
  },
  {
    id: 'form-7-voter-objection',
    title: 'Form 7 – Objection or Deletion from Electoral Roll',
    content: `
### Form 7 – Objection or Deletion from Electoral Roll

**Purpose:**
Used to object inclusion or seek deletion of names (including own) from the electoral roll due to reasons like:
- Duplicate entry
- Death
- Change of address

**Application Methods:**
**Online:**
- Visit https://www.nvsp.in
- Fill Form 7, attach supporting documents, and submit electronically

**Offline:**
- Submit printed Form 7 to ERO/Booth Level Officer (BLO)

**Documents Required:**
- Copy of EPIC (Voter ID) of both applicant and the person to be deleted
- Death certificate (if applicable)
- Address proof (in case of migration)
- Any official proof supporting the objection

**Process:**
- BLO or Field Officer visits for verification
- Decision is communicated via post and updated in roll accordingly
    `,
    keywords: ['form 7', 'voter deletion', 'objection', 'electoral roll deletion', 'remove voter', 'duplicate entry', 'dead voter', 'voter leaving constituency'],
    category: 'voting'
  },
  {
    id: 'form-6a-overseas-voter',
    title: 'Form 6A – Overseas Elector Registration',
    content: `
### Form 6A – Overseas Elector Registration

**Purpose:**
To allow NRIs (Non-Resident Indians) to register in the Indian electoral roll for voting rights.

**Who Can Apply:**
- Indian citizens residing abroad (not dual nationals)
- Must hold a valid Indian passport
- Absent from India due to employment, education, or other specified reasons

**Application Modes:**
**Online (via NVSP/CEO State Portals):**
- Fill Form 6A
- Upload scanned documents (passport, visa, address proof)
- Submit digitally

**Offline:**
- Download or collect Form 6A
- Fill and submit at Electoral Registration Officer's (ERO) office or via post

**Documents to Attach:**
- Self-attested photocopy of valid Indian passport (pages with name, address, photo)
- Valid visa endorsement
- Passport-size photograph (3.5x3.5 cm)
- Proof of overseas residence (address with visa page)

**Verification:**
ERO may request original passport in-person or through the Indian Mission for verification
    `,
    keywords: ['form 6a', 'overseas voter', 'nri voter', 'foreign voter', 'overseas elector', 'indian abroad voting', 'expatriate voting'],
    category: 'voting'
  },
  {
    id: 'caste-certificate',
    title: 'Caste Certificate',
    content: `
### Caste Certificate

**Purpose:**
Enables eligibility for caste-based reservations, scholarships, and quotas.

**Online Mode:**
Via Seva Sindhu → Revenue Department
- Login → Aadhaar/Ration Card based autofill
- Fill caste details, community name, religion
- Attach caste/community proof → eSign → Payment
- Track and download certificate

**Offline Mode:**
- Visit Nadakacheri or Taluk Revenue Office
- Submit a printed form with:
  - Parent's caste certificate
  - School records mentioning caste
  - Affidavit (if required)
- Verification done by Tahsildar office before issuance
    `,
    keywords: ['caste certificate', 'community certificate', 'sc certificate', 'st certificate', 'obc certificate', 'reservation', 'backward class', 'subcaste', 'quota eligibility'],
    category: 'certificate'
  },
  {
    id: 'income-certificate',
    title: 'Income Certificate',
    content: `
### Income Certificate

**Purpose:**
To avail income-based benefits, reservations, or fee waivers.

**Online Mode:**
Same as Residence Certificate: Seva Sindhu → Revenue Department
- Provide Aadhaar/Ration Card
- Fill income details (and employment, family info)
- Upload annexures → eSign → Pay fee
- Download certificate after approval

**Offline Mode:**
- Visit local Revenue/Nadakacheri office
- Provide income proof (salary slip, self-declaration, employer letter)
- Revenue Inspector conducts field-level verification
- Certificate is printed and handed to applicant
    `,
    keywords: ['income certificate', 'income proof', 'annual income', 'family income', 'below poverty line', 'economic status', 'income verification', 'scholarship eligibility'],
    category: 'certificate'
  },
  {
    id: 'residence-certificate',
    title: 'Residence Certificate',
    content: `
### Residence Certificate

**Purpose:**
Used as proof of address for availing various benefits and legal purposes.

**Online Mode:**
- Login to Seva Sindhu → Select Residence Certificate
- Provide Aadhaar or Ration Card number
- Fill details → Attach documents (utility bill, rental agreement)
- eSign and make payment
- Track status and download once approved

**Offline Mode:**
- Visit local Revenue Office or Nadakacheri Center
- Submit hardcopy application with address proof
- Revenue Inspector conducts local verification
- Certificate issued physically
    `,
    keywords: ['residence certificate', 'domicile certificate', 'address proof', 'local resident', 'nativity certificate', 'residential status', 'proof of residence'],
    category: 'certificate'
  },
  {
    id: 'e-khata-certificate',
    title: 'New e-Khata Certificate',
    content: `
### New e-Khata Certificate

**Purpose:**
Digitally issued Khata certificate for properties under Bangalore Development Authority.

**Online Mode:**
**Steps:**
- Go to Seva Sindhu → Select BDA → "Application for New e-Khata"
- Login with credentials or OTP
- Fill details of property and applicant
- Upload annexures (property documents, tax paid receipt, ID)
- eSign and submit
- Track status via reference number and download when ready

**Offline Mode:**
- Visit BDA office or designated Atalji Janasnehi Kendra.
- Submit filled physical application with ownership and tax documents.
- Certificate issued post-verification by BDA engineer.
    `,
    keywords: ['e-khata', 'khata certificate', 'property tax', 'bda khata', 'bbmp khata', 'digital khata', 'property document', 'property ownership', 'bangalore property'],
    category: 'property'
  },
  {
    id: 'ejanma-registration',
    title: 'eJanMa – Birth & Death Registration',
    content: `
### eJanMa – Birth and Death Registration System

**Purpose:**
State-wide online platform for birth, death, and stillbirth registration in Karnataka.

**Online Procedure:**
Used by Authorized Operators only (citizens cannot directly register online).
- Steps include data entry by staff → verification by health officials → digital signature by registrar → issuance of certificates.
- Public portal: ejanma.karnataka.gov.in

**Offline Procedure (for citizens):**
**Where to apply:**
- Rural: Village Accountant, PHC, Taluk Hospitals
- Urban: Medical Officers, Health Inspectors, Sanitary Inspectors

**Documents Required (Bring Originals):**
- Hospital birth/death report
- Aadhaar card of applicant and deceased (if applicable)
- Identity proof of parents (for birth) or family (for death)
- Residential proof (utility bill, ration card, etc.)
- Stillbirth cases require medical certificate from hospital

**Process:**
- Visit authority → fill form → submit original docs → officer enters data into eJanMa → certificate issued after verification
    `,
    keywords: ['birth certificate', 'death certificate', 'birth registration', 'death registration', 'ejanma', 'birth record', 'stillbirth', 'child birth certificate', 'legal birth proof'],
    category: 'certificate'
  },
  {
    id: 'senior-citizen-card',
    title: 'Senior Citizen Card Application',
    content: `
### Senior Citizen Card Application

**Purpose:**
To obtain an official identity card for senior citizens issued by the Department of Empowerment of Differently Abled and Senior Citizens.

**Online Mode:**
Portal: Seva Sindhu

**Steps:**
1. Select the department → "Application for Senior Citizen Card"
2. Login using OTP and CAPTCHA
3. Fill applicant details and verify
4. Attach scanned annexures (ID proof, age proof)
5. eSign using Aadhaar OTP
6. Submit and receive digital acknowledgment
7. Use reference number to track and download the final certificate

**Offline Mode:**
1. Visit the Department of Empowerment of Differently Abled and Senior Citizens or a designated Bangalore One/Karnataka One/Gram One center.
2. Collect and submit a printed form along with required documents.
3. Acknowledgment and card are issued after processing.
    `,
    keywords: ['senior citizen card', 'elderly id', 'senior id', 'old age identity', 'senior benefits', 'senior citizen identity', 'elderly benefits card'],
    category: 'identity'
  },
  {
    id: 'pension',
    title: 'Pension Application Process',
    content: `
### Pension Application Process

**Documents to be submitted with application for pension:**
1. Photocopy of ID card attested by gazetted officer
2. Original ID card submitted to the Board
3. Photocopy of beneficiary's bank passbook
4. Provide Living Certificate every year
5. Ration Card
6. Employer Certificate
7. Application can be submitted within 6 months after attaining the age of sixty years
8. In case of Beneficiary death, Nominee should provide death certificate to Board
9. Before attaining age of 60 years Registered construction worker shall be the beneficiary of the board continuously for the period of 3 years.

**Application Fee:** NIL
**Service Charge (Grama one| Bengaluru 1| Karnataka 1):** NIL
**Service Time (Days):** NIL
    `,
    keywords: ['pension', 'retirement benefits', 'senior pension', 'old age pension', 'widow pension', 'disability pension', 'monthly pension', 'government pension'],
    category: 'pension'
  },
  {
    id: 'ration-card',
    title: 'Ration Card Application Process',
    content: `
### Procedure for filing application for new ration card and amendment of existing ration card

- Application can be filed at any service kiosk located at Bangalore One/ Karnataka One/ Private franchises/ Janasnehi Kendra/ Grama Panachayath/ POS shops.

- Applicant and the family members to be added need to provide Aadhar based biometric authentication at the stage of filing application. For children below 5 years, bio-metric authentication is not required but aadhar card is mandatory.

- No other document is required except the aadhar card.

- All the details i.e., Name, Photo, Age, Sex, Address, Mobile Number as appearing in the aadhar card of the applicant and his family members are copied automatically to the ration card application.

- At-least one member of the applicant's family should have the current address of their residence entered correctly in the aadhar card. If not, then at-least one member of the family should get his/her address updated to their current residence address by going to the aadhar enrolment centre.

- The mobile number to be provided should be registered in Aadhar card. If it is not done already, then at-least one family member's mobile should be registered in aadhar. But providing mobile number is not mandatory.

- The applicant should correctly select his ward no in urban areas and should correctly select his Grama Panchayath in rural areas.

- The applicant can choose any fair price shop of his choice within his Taluk/City.

- All the family members should preferably go together. If they go separately, then application fee has to be given every time. Application fee Rs. 50/-

- The eldest female member of the household can only be selected as Head of the household as per the provisions of National Food Security Act-2013.

- The application is sent automatically to the concerned Ward/ Grama Panchayath official for verification through computer software.

- The concerned official visits the house of the applicant for verification and approves the ration card if the applicant is found eligible.

- The applicant is informed through SMS at various stages i.e., Advance intimation about date of visit of the official to his place of residence for verification of his application, Approval/Rejection of his application.

- Ration card is delivered to the doorstep of the applicant through Speed post within 15 days from the date of filing application under SAKALA. The applicant is required to pay Rs. 70/- to the post man.

- The procedure for filing an amendment application for existing ration cards also remain same as above.
  - The concerned member has to be present for bio-authentication at the stage of filing application for the following:
    - Addition of member to the ration card.
    - For changes in Name, Age, Sex & Photo of any member and the same have to be first updated in Aadhar card.
    - For changes in Address, at-least one member of the family should have the new address in his aadhar card.
  - Any member in the ration card can carry out the following:
    - Corrections in relationships among family members.
    - Change in fair price shops.
    - Deletion of any existing member.

- The applications for APL or Non Priority Household (NPHH) cards also can be filed in the above process. However, applications for APL or NPHH can also be filed from any computer having internet connection by logging into the department website i.e., www.ahara.kar.nic.in. The applicant and his family members have option to do OTP based aadhar authentication for this mode of filing application.
    `,
    keywords: ['ration card', 'pds', 'food security', 'bpl card', 'apl card', 'priority household', 'fair price shop', 'food subsidy', 'nfsa', 'public distribution'],
    category: 'identity'
  }
];

/**
 * Search reference documents by query
 * @param query Search query string
 * @returns Matching documents
 */
export function searchReferenceDocuments(query: string): ReferenceDocument[] {
  if (!query || query.trim() === '') {
    return [];
  }
  
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  // Search by keywords and title
  return referenceDocuments.filter(doc => {
    // Check if any keyword matches
    const keywordMatch = doc.keywords.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery) || 
      lowercaseQuery.includes(keyword.toLowerCase())
    );
    
    // Check if title matches
    const titleMatch = doc.title.toLowerCase().includes(lowercaseQuery);
    
    // Check for content match (partial)
    const contentMatch = doc.content.toLowerCase().includes(lowercaseQuery);
    
    return keywordMatch || titleMatch || contentMatch;
  });
}

/**
 * Get a reference document by ID
 * @param id Document ID
 * @returns Reference document or undefined if not found
 */
export function getReferenceDocumentById(id: string): ReferenceDocument | undefined {
  return referenceDocuments.find(doc => doc.id === id);
}

/**
 * Get all documents in a specific category
 * @param category Category name
 * @returns Array of reference documents
 */
export function getReferenceDocumentsByCategory(category: ReferenceDocument['category']): ReferenceDocument[] {
  return referenceDocuments.filter(doc => doc.category === category);
}