const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const tiers = {
  1: "Reference",
  2: "Assistant",
  3: "Transactional",
  4: "Workflow",
  5: "Decision Support",
  6: "Cross-Organization",
  7: "Autonomous Oversight",
};

const groupThemes = [
  "var(--cp-link)", "var(--cp-link)", "var(--cp-success)", "var(--cp-success)",
  "var(--cp-warning)", "var(--cp-warning)", "var(--cp-warning)", "var(--cp-danger)",
  "var(--cp-danger)", "var(--cp-accent)", "var(--cp-accent)", "var(--cp-accent)",
  "var(--cp-warning)", "var(--cp-warning)", "var(--cp-success)", "var(--cp-success)",
  "var(--cp-link)", "var(--cp-accent)",
];

const bands = {
  core: [
    ["Id", "Identity"], ["Kn", "Knowledge"], ["Da", "Data Lake"], ["Fx", "Workflow"],
    ["Co", "Connector"], ["In", "Integration"], ["An", "Analytics"], ["Ai", "AI Studio"],
    ["Bi", "BI Layer"], ["Re", "Records"], ["Ap", "API Gateway"], ["Se", "Search"],
    ["Au", "Automation"], ["Ob", "Observability"], ["Md", "Master Data"],
  ],
  trust: [
    ["Ra", "Responsible AI"], ["Hu", "Human Review"], ["Pr", "Privacy"], ["Dl", "DLP"],
    ["Au", "Audit"], ["Ri", "Risk"], ["Cy", "Cyber"], ["Mo", "Model Trace"],
    ["Ac", "Access"], ["Co", "Compliance"], ["Eq", "Equity"], ["Ex", "Exception"],
    ["Po", "Policy"], ["So", "Source Guard"], ["Go", "Governance"],
  ],
};

function d(short, name, system, guard, cases) {
  return { short, name, system, guard, cases };
}

function goal(id, title, blurb, picks) {
  return { id, title, blurb, picks };
}

const catalogs = [
  {
    folder: "HED",
    title: "Higher Education",
    lead: "A periodic table of agents for institutional workflows across students, faculty, research, operations, and leadership.",
    context: "higher education institutional",
    nav: "Higher Education",
    domains: [
      d("Student", "Student Success", "SIS, advising, CRM, LMS", "FERPA, advisor review, equity checks", ["Student policy", "Advising prep", "Risk intake", "Intervention route", "Success signal", "Care network", "Student success OS"]),
      d("Enroll", "Enrollment & Admissions", "CRM, admissions, marketing automation", "Fair admissions practice, human review", ["Program guide", "Inquiry assist", "Checklist capture", "Applicant journey", "Yield insight", "Enrollment bridge", "Enrollment command"]),
      d("Faculty", "Faculty & Teaching", "LMS, course catalog, content stores", "Academic freedom, citation discipline", ["Course guide", "Lesson assist", "Rubric capture", "Course workflow", "Teaching insight", "Faculty network", "Learning orchestrator"]),
      d("Research", "Research Administration", "Grant, IRB, sponsor, compliance systems", "Sponsor terms, IRB oversight", ["Sponsor FAQ", "Grant assist", "Compliance extract", "Submission workflow", "Award risk", "Research network", "Research OS"]),
      d("IT", "IT & Service Desk", "ServiceNow, endpoint, knowledge base", "Least privilege, incident review", ["IT FAQ", "Ticket assist", "Incident capture", "Resolution workflow", "Service insight", "Platform bridge", "IT command"]),
      d("Finance", "Finance & Procurement", "ERP, procurement, budget systems", "Approval policy, segregation of duties", ["Policy FAQ", "Purchase assist", "Spend capture", "Procurement workflow", "Budget insight", "Finance bridge", "Finance autonomy"]),
      d("HR", "HR & Workforce", "HRIS, LMS, recruiting systems", "Employee privacy, manager accountability", ["HR guide", "Onboarding assist", "Case capture", "Talent workflow", "Workforce insight", "HR bridge", "Talent OS"]),
      d("Advancement", "Advancement & Alumni", "Donor CRM, campaigns, events", "Gift policy, relationship ownership", ["Donor guide", "Alumni assist", "Gift prep", "Campaign workflow", "Prospect insight", "Advancement network", "Engagement OS"]),
      d("Athletics", "Athletics & Student Life", "Athletics, housing, conduct, events", "Student privacy, safety escalation", ["Athletics guide", "Student life assist", "Case capture", "Event workflow", "Engagement insight", "Campus network", "Student life OS"]),
      d("Library", "Library & Knowledge", "Library systems, repositories, archives", "Copyright, source attribution", ["Resource guide", "Research assist", "Archive extract", "Knowledge workflow", "Collection insight", "Knowledge graph", "Library OS"]),
      d("Facilities", "Facilities & Campus Ops", "IWMS, work orders, IoT, maps", "Safety, accessibility, union rules", ["Campus info", "Work order assist", "Inspection capture", "Maintenance workflow", "Space insight", "Facilities bridge", "Campus command"]),
      d("Security", "Campus Safety", "Dispatch, access control, incident systems", "Emergency protocol, human command", ["Safety guide", "Dispatch assist", "Incident capture", "Response workflow", "Risk signal", "Safety network", "Safety command"]),
      d("Online", "Online & Continuing Education", "LMS, CRM, credential platforms", "Learner consent, accessibility", ["Program FAQ", "Learner assist", "Credential capture", "Pathway workflow", "Demand insight", "Credential network", "Lifelong learning OS"]),
      d("Exec", "Executive Operations", "M365, board books, portfolio tools", "Sensitive leadership data, source control", ["Brief guide", "Meeting assist", "Decision capture", "Cabinet workflow", "Priority insight", "Leadership rhythm", "Institutional command"]),
      d("Data", "Institutional Data", "Data warehouse, Fabric, Power BI", "Data governance, approved metrics", ["Metric guide", "Report assist", "Data request", "Insight workflow", "Forecast signal", "Data fabric", "Institutional intelligence"]),
      d("Comms", "Communications & Brand", "CMS, social, email, PR systems", "Brand review, accessibility", ["Brand guide", "Message assist", "Content intake", "Campaign workflow", "Audience insight", "Comms network", "Reputation OS"]),
      d("Partner", "Partners & Community", "CRM, partner portals, community systems", "Data sharing agreements", ["Partner FAQ", "Engagement assist", "Referral capture", "Partnership workflow", "Impact insight", "Community network", "Partner OS"]),
      d("Trust", "Governance, Risk & Compliance", "GRC, legal, privacy, records", "Auditability, policy ownership", ["Policy guide", "Risk assist", "Audit request", "Compliance workflow", "Control insight", "Governance council", "Trust autonomy"]),
    ],
    goals: [
      goal("student-success", "Improve Student Success", "Advising, intervention, student services, and persistence", [[1,2],[1,4],[15,5],[17,6],[18,7]]),
      goal("enrollment", "Grow Enrollment Responsibly", "Inquiry, admissions, yield, communications, and program fit", [[2,2],[2,4],[16,4],[15,5],[2,7]]),
      goal("research", "Accelerate Research Administration", "Grant prep, compliance, sponsor evidence, and research networks", [[4,2],[4,4],[10,4],[15,5],[4,7]]),
      goal("operations", "Reduce Administrative Burden", "IT, finance, HR, facilities, and executive workflows", [[5,2],[6,4],[7,4],[11,5],[14,7]]),
      goal("governance", "Build Institutional Intelligence", "Trusted data, governance, leadership rhythm, and responsible AI", [[15,2],[15,6],[18,4],[18,6],[15,7]]),
    ],
  },
  {
    folder: "AMC",
    title: "Academic Medical Centers",
    lead: "A periodic table of agents for organizations where care delivery, education, research, and public mission overlap.",
    context: "academic medical center",
    nav: "Academic Medical Centers",
    domains: [
      d("Identity", "Patient, Learner & Research Identity", "Entra ID, IAM, EHR, SIS, consent", "Consent, role boundaries, least privilege", ["Identity guide", "Access assist", "Consent verify", "Role routing", "Identity risk", "Identity broker", "Identity fabric"]),
      d("Access", "Patient Access & Navigation", "CRM, scheduling, portal, call center", "Accessibility, escalation, plain language", ["Access info", "Navigation assist", "Intake capture", "Journey router", "Access insight", "Omni access", "Experience OS"]),
      d("Care", "Clinical Care Delivery", "EHR, clinical docs, orders, care plans", "Clinician accountability, scope of practice", ["Care guide", "Clinical assist", "Encounter extract", "Care workflow", "Care context", "Care orchestrator", "Clinical command"]),
      d("Nursing", "Nursing & Clinical Workforce", "EHR, staffing, workforce management", "Licensure, workload transparency", ["Nursing policy", "Staffing assist", "Shift capture", "Load workflow", "Workforce safety", "Nursing network", "Nursing command"]),
      d("Quality", "Quality & Safety", "Quality registry, safety events, incident systems", "Root cause review, safety validation", ["Quality FAQ", "Safety assist", "Incident review", "Safety event", "Quality signal", "Quality alliance", "Safety assurance"]),
      d("PopHealth", "Population & Community Health", "HIE, registries, public health platforms", "Equity impact, public health authority", ["Program guide", "Community assist", "Registry update", "Outbreak triage", "Equity insight", "Health exchange", "Population health"]),
      d("Learner", "Medical Education", "LMS, curriculum, rotation systems", "Academic oversight, learner privacy", ["Curriculum guide", "Learner assist", "Rotation capture", "Education workflow", "Competency insight", "Education bridge", "Learning command"]),
      d("Research", "Clinical Research & Trials", "CTMS, IRB, consent, grants", "IRB review, participant consent", ["Research guide", "Trial finder", "IRB checklist", "Enrollment workflow", "Eligibility insight", "Research network", "Research autonomy"]),
      d("LifeSci", "Life Sciences & Translation", "R&D, medical affairs, safety, regulatory", "Scientific accuracy, promotional review", ["Medical info", "Evidence assist", "Safety intake", "Regulatory assembly", "Evidence review", "Translation network", "Lifecycle autonomy"]),
      d("Payer", "Provider-Payer Workflows", "Claims, UM, care management, benefits", "Medical necessity review, appeal rights", ["Benefits guide", "Prior auth assist", "Claim prep", "UM workflow", "Payment integrity", "Payer connect", "Benefits autonomy"]),
      d("Pharmacy", "Pharmacy & Therapeutics", "eRx, formulary, pharmacy, PBM", "Medication safety, formulary governance", ["Medication FAQ", "Formulary assist", "Med reconcile", "Therapy workflow", "Medication insight", "Pharmacy exchange", "Therapy autonomy"]),
      d("Revenue", "Revenue Cycle", "Billing, coding, claims, ERP", "Coding compliance, audit trail", ["Billing terms", "Coding assist", "Claim scrub", "Denial workflow", "Revenue insight", "Claims exchange", "Payment balance"]),
      d("Supply", "Supply Chain & Devices", "ERP, MMIS, device inventory", "Recall safety, sourcing policy", ["Supply info", "Vendor assist", "Purchase prep", "Device match", "Demand signal", "Supplier visibility", "Supply autonomy"]),
      d("Facility", "Facilities & Throughput", "Bed management, capacity, transport, IoT", "Safety, infection control", ["Facility info", "Bed assist", "Transport request", "Flow workflow", "Capacity insight", "Emergency mode", "Facility command"]),
      d("Talent", "Credentialing & Talent", "HRIS, LMS, credentialing, scheduling", "Credential verification, labor rules", ["HR policy", "Credential assist", "Onboarding", "Credential workflow", "Talent match", "Workforce fabric", "Human capital"]),
      d("Data", "Data & Interoperability", "FHIR, data lake, API gateway, M365", "Data minimization, cyber controls", ["Data help", "API assist", "FHIR extract", "Master data workflow", "Data governance", "Interoperability ops", "AMC operating data"]),
      d("Partner", "Ecosystem & Community Network", "HIE, partner portals, referrals", "DUAs, partner assurance", ["Partner FAQ", "Referral assist", "Social referral", "Community pathway", "Care network", "Community system", "Ecosystem orchestrator"]),
      d("Trust", "Compliance, Risk & Trust", "GRC, privacy, security, responsible AI", "HIPAA, FDA, FERPA, auditability", ["Risk FAQ", "HIPAA assist", "Audit request", "AI intake", "Model risk", "Governance council", "Trust autonomy"]),
    ],
    goals: [
      goal("access", "Improve Patient and Learner Access", "Navigation, scheduling, intake, and education pathways", [[2,2],[2,4],[7,4],[15,5],[18,7]]),
      goal("clinical", "Support Clinical Workforce", "Care delivery, nursing load, safety, and throughput", [[3,2],[4,4],[5,4],[14,5],[3,7]]),
      goal("research", "Accelerate Translational Research", "Trials, grants, evidence, regulatory, and life sciences translation", [[8,2],[8,4],[9,5],[16,6],[8,7]]),
      goal("provider-payer", "Connect Provider-Payer Workflows", "Prior auth, UM, claims, revenue cycle, and benefits", [[10,2],[10,4],[12,4],[10,6],[12,7]]),
      goal("trust", "Operate a Trusted AMC Data Fabric", "Identity, interoperability, privacy, and governance", [[1,3],[16,4],[16,6],[18,6],[18,7]]),
    ],
  },
  {
    folder: "HLS",
    title: "Health & Life Sciences",
    lead: "A periodic table of agents for provider, payer, pharma, life sciences, public health, and healthcare operations.",
    context: "health and life sciences",
    nav: "Health & Life Sciences",
    domains: [
      d("Identity", "Identity & Consent", "Entra ID, patient identity, consent stores", "Identity proofing, delegated access, revocation", ["Consent info", "Identity help", "Consent verify", "Delegated access", "Trusted consent", "Identity broker", "Consent fabric"]),
      d("Access", "Patient & Member Access", "CRM, contact center, portal, scheduling", "Accessibility, plain language, escalation", ["Portal info", "Navigation assist", "Schedule capture", "Journey router", "Next best access", "Omni access", "Experience OS"]),
      d("Care", "Care Delivery", "EHR, clinical documentation, orders", "Clinician accountability, scope of practice", ["Care guidance", "Clinical scribe", "Intake extract", "Care plan draft", "Diagnosis context", "Care orchestrator", "Clinical command"]),
      d("Nursing", "Nursing & Clinical Workforce", "Workforce management, EHR, staffing", "Burnout risk, workload transparency", ["Nursing policy", "Staffing assist", "Shift swap", "Nurse load", "Workforce safety", "Nursing workforce", "Nursing orchestrator"]),
      d("Quality", "Clinical Quality & Safety", "Quality registry, incident, safety event systems", "Clinical validation, root-cause review", ["Quality FAQ", "Quality assist", "Incident review", "Safety event", "Readmission risk", "Quality alliance", "Safety assurance"]),
      d("PopHealth", "Population & Public Health", "HIE, registries, surveillance platforms", "Equity impact, public health authority", ["Program guide", "Community health", "Registry update", "Outbreak triage", "Public health equity", "Health exchange", "Population health"]),
      d("Payer", "Payer & Benefits", "Claims, benefits, UM, care management", "Medical necessity review, appeal rights", ["Benefits guide", "Member match", "Prior auth prep", "Utilization management", "Payer decision", "Provider-payer connect", "Benefits autonomy"]),
      d("Pharmacy", "Pharmacy & Therapeutics", "eRx, formulary, pharmacy, PBM", "Medication safety, formulary governance", ["Medication FAQ", "Formulary assist", "Med reconcile", "Therapy monitor", "Medication use", "Pharmacy exchange", "Therapy autonomy"]),
      d("LifeSci", "Life Sciences & Pharma", "R&D, regulatory, medical affairs, safety", "Promotional review, scientific accuracy", ["Medical info", "Medical affairs", "Safety intake", "Regulatory assembly", "Evidence review", "Life sci connect", "Lifecycle autonomy"]),
      d("Research", "Research & Trials", "CTMS, IRB, consent, grant systems", "IRB oversight, participant consent", ["Research guide", "Trial finder", "IRB checklist", "Trial enrollment", "Eligibility analysis", "Research network", "Research autonomy"]),
      d("RevCycle", "Revenue Cycle & Claims", "Billing, coding, claims, ERP", "Coding compliance, audit trail", ["Billing terms", "Coding assist", "Claim scrub", "Denial worklist", "Payment integrity", "Claims exchange", "Payment balance"]),
      d("Supply", "Supply Chain & Devices", "ERP, MMIS, device inventory", "Recall safety, sourcing policy", ["Supply info", "Vendor assist", "Purchase prep", "Device match", "Demand signal", "Supplier visibility", "Supply autonomy"]),
      d("Facility", "Facilities & Throughput", "Bed management, capacity, transport, IoT", "Safety, infection control", ["Facility info", "Bed assist", "Transport request", "Flow throughput", "Capacity optimizer", "Emergency mode", "Facility autonomy"]),
      d("Talent", "HR, Credentialing & Talent", "HRIS, LMS, credentialing, scheduling", "Credential verification, labor rules", ["HR policy", "Credential assist", "Onboarding", "Credential management", "Talent match", "Workforce fabric", "Human capital"]),
      d("Finance", "Finance & Contracting", "ERP, contracts, value-based care finance", "Segregation of duties, approval policy", ["Finance FAQ", "Contract brief", "Approval prep", "Value contract", "Forecast plan", "Risk finance", "Financial intelligence"]),
      d("IT/Data", "IT, Data & Interoperability", "Data lake, FHIR, API gateway, M365", "Data minimization, cyber controls", ["Data help", "API assist", "FHIR extract", "Master data", "Data governance", "Interoperability ops", "HLS operating data"]),
      d("Ecosystem", "Ecosystem & Partner Network", "HIE, partner portals, community referrals", "Data-use agreements, partner assurance", ["Partner FAQ", "Referral assist", "Social referral", "Community pathway", "Care network", "Community system", "Ecosystem orchestrator"]),
      d("Risk", "Compliance, Risk & Trust", "GRC, privacy, security, responsible AI", "HIPAA, FDA, model governance, auditability", ["Risk FAQ", "HIPAA assist", "Audit request", "AI intake", "Model risk", "Governance council", "Trust autonomy"]),
    ],
    goals: [
      goal("access", "Improve Patient & Member Access", "Navigation, scheduling, intake, care pathways", [[2,2],[2,4],[3,4],[7,5],[18,7]]),
      goal("nursing", "Support Nursing & Clinical Workforce", "Reduce burden, balance load, protect practice time", [[4,2],[4,4],[13,5],[14,6],[4,7]]),
      goal("provider-payer", "Connect Provider-Payer Workflows", "Prior auth, UM, claims, care management, payment integrity", [[7,2],[7,4],[11,4],[7,6],[11,7]]),
      goal("research", "Accelerate Research & Life Sciences", "Trials, evidence, regulatory, safety, medical affairs", [[10,2],[9,4],[9,5],[10,6],[9,7]]),
      goal("population", "Strengthen Public & Population Health", "Registry, surveillance, equity, community interventions", [[6,2],[6,4],[17,4],[6,6],[6,7]]),
    ],
  },
  {
    folder: "K12",
    title: "K-12 Education",
    lead: "A periodic table of agents for district operations, teaching and learning, student support, family engagement, and safe schools.",
    context: "K-12 education",
    nav: "K-12 Education",
    domains: [
      d("Student", "Student Support", "SIS, MTSS, counseling, attendance", "FERPA, counselor review, equity checks", ["Student guide", "Support assist", "Concern capture", "MTSS workflow", "Risk signal", "Support network", "Student support OS"]),
      d("Teacher", "Teaching & Learning", "LMS, curriculum, assessment systems", "Teacher ownership, age appropriateness", ["Lesson guide", "Planning assist", "Rubric capture", "Instruction workflow", "Learning insight", "Teacher network", "Instruction OS"]),
      d("Family", "Family Engagement", "Parent portal, CRM, messaging", "Plain language, translation review", ["Family FAQ", "Message assist", "Inquiry capture", "Family route", "Engagement insight", "Family bridge", "Community OS"]),
      d("SpecialEd", "Special Education", "IEP, case management, service logs", "IDEA, IEP team review", ["IEP guide", "Case assist", "Service capture", "IEP workflow", "Compliance signal", "Services bridge", "Special ed command"]),
      d("Admin", "School Administration", "M365, SIS, policy, forms", "Principal accountability, records policy", ["Admin guide", "Principal assist", "Form capture", "Approval workflow", "Ops signal", "Admin network", "School command"]),
      d("Curric", "Curriculum & Assessment", "Curriculum, benchmark, assessment platforms", "Assessment validity, standards alignment", ["Standards guide", "Assessment assist", "Item capture", "Curriculum workflow", "Gap insight", "Curriculum bridge", "Learning command"]),
      d("HR", "HR & Substitute Coverage", "HRIS, substitute, credentialing", "Labor rules, certification validation", ["HR policy", "Sub assist", "Absence capture", "Coverage workflow", "Staffing signal", "HR bridge", "Workforce OS"]),
      d("IT", "IT & Devices", "Help desk, MDM, identity, network", "Student data, least privilege", ["IT FAQ", "Device assist", "Ticket capture", "Resolution workflow", "Device signal", "IT bridge", "District IT command"]),
      d("Safety", "Safety & Student Wellness", "Incident, safety, threat assessment", "Emergency protocols, human command", ["Safety guide", "Wellness assist", "Incident capture", "Response workflow", "Risk signal", "Safety network", "Safety command"]),
      d("Trans", "Transportation", "Routing, fleet, dispatch, parent comms", "Safety, accessibility, privacy", ["Route guide", "Bus assist", "Route change", "Dispatch workflow", "Delay insight", "Fleet bridge", "Transportation command"]),
      d("Nutrition", "Nutrition & Benefits", "Meals, eligibility, POS, benefits", "Eligibility privacy, benefit rules", ["Meal FAQ", "Benefit assist", "Eligibility capture", "Meal workflow", "Participation insight", "Nutrition bridge", "Benefit OS"]),
      d("Finance", "Finance & Procurement", "ERP, budget, procurement, grants", "Approval policy, audit trail", ["Budget FAQ", "Purchase assist", "Spend capture", "Procurement workflow", "Budget insight", "Finance bridge", "Finance command"]),
      d("Facilities", "Facilities & Maintenance", "Work orders, building systems, maps", "Safety, accessibility, inspection", ["Facility info", "Maintenance assist", "Inspection capture", "Work order workflow", "Space insight", "Facilities bridge", "Campus command"]),
      d("Data", "Data & Reporting", "Data warehouse, state reporting, BI", "Approved metrics, privacy", ["Metric guide", "Report assist", "Data request", "Reporting workflow", "Early warning", "Data fabric", "District intelligence"]),
      d("Comms", "Communications", "Web, messaging, social, alerts", "Brand, accessibility, crisis review", ["Comms guide", "Draft assist", "Content capture", "Campaign workflow", "Audience insight", "Comms bridge", "Reputation OS"]),
      d("Board", "Board & Executive Ops", "Board docs, meetings, policy systems", "Public records, closed session boundaries", ["Board guide", "Meeting assist", "Decision capture", "Board workflow", "Priority insight", "Leadership rhythm", "District command"]),
      d("Partner", "Community Partners", "Partner CRM, programs, referrals", "Data sharing, consent, safeguarding", ["Partner FAQ", "Referral assist", "Program capture", "Partner workflow", "Impact insight", "Community network", "Partner OS"]),
      d("Trust", "Governance, Privacy & Trust", "GRC, policy, records, security", "FERPA, COPPA, auditability", ["Policy FAQ", "Privacy assist", "Audit request", "Compliance workflow", "Control insight", "Governance council", "Trust autonomy"]),
    ],
    goals: [
      goal("students", "Improve Student Support", "Student services, counseling, attendance, and MTSS", [[1,2],[1,4],[4,4],[9,5],[18,7]]),
      goal("teachers", "Reduce Teacher Administrative Load", "Planning, assessment, curriculum, and communications", [[2,2],[2,4],[6,4],[15,4],[2,7]]),
      goal("operations", "Run District Operations Better", "Transportation, facilities, HR, IT, and finance", [[8,2],[10,4],[13,4],[12,5],[16,7]]),
      goal("families", "Strengthen Family and Community Engagement", "Family comms, benefits, partners, and program routing", [[3,2],[11,3],[15,4],[17,6],[3,7]]),
      goal("trust", "Build Safe, Governed AI in Schools", "Privacy, security, policy, and human approval", [[18,2],[18,4],[14,5],[18,6],[18,7]]),
    ],
  },
  {
    folder: "SLG",
    title: "State & Local Government",
    lead: "A periodic table of agents for constituent services, public operations, permitting, benefits, safety, and civic trust.",
    context: "state and local government",
    nav: "State & Local Government",
    domains: [
      d("Citizen", "Constituent Services", "CRM, 311, portals, contact center", "Accessibility, escalation, language access", ["Service guide", "Intake assist", "Request capture", "Case route", "Service signal", "Service network", "Constituent OS"]),
      d("Benefits", "Benefits & Eligibility", "Eligibility, benefits, case management", "Due process, appeal rights", ["Benefits FAQ", "Eligibility assist", "Document capture", "Benefits workflow", "Equity signal", "Benefits bridge", "Benefits autonomy"]),
      d("Permits", "Permitting & Licensing", "Permitting, licensing, inspections", "Regulatory authority, audit trail", ["Permit guide", "Application assist", "Checklist capture", "Permit workflow", "Backlog insight", "Licensing bridge", "Permitting command"]),
      d("PublicWorks", "Public Works", "Work orders, asset, GIS, field systems", "Worker safety, public notice", ["Asset guide", "Field assist", "Work capture", "Repair workflow", "Asset signal", "Public works bridge", "Infrastructure command"]),
      d("Transport", "Transportation & Mobility", "Transit, traffic, fleet, DOT systems", "Safety, accessibility, emergency priority", ["Route info", "Mobility assist", "Incident capture", "Traffic workflow", "Delay insight", "Mobility bridge", "Transport command"]),
      d("PublicSafety", "Public Safety", "CAD, RMS, emergency management", "Human command, civil rights", ["Safety guide", "Dispatch assist", "Incident prep", "Response workflow", "Risk signal", "Safety network", "Public safety command"]),
      d("Health", "Public Health", "Registries, surveillance, clinics", "Public health authority, equity", ["Health FAQ", "Clinic assist", "Registry capture", "Outbreak workflow", "Equity insight", "Health exchange", "Public health OS"]),
      d("Housing", "Housing & Community Development", "Housing, grants, inspections, CRM", "Fair housing, eligibility privacy", ["Housing guide", "Program assist", "Application capture", "Housing workflow", "Need signal", "Community bridge", "Housing command"]),
      d("Justice", "Courts & Justice", "Case management, records, e-filing", "Due process, confidentiality", ["Court guide", "Case assist", "Filing capture", "Docket workflow", "Backlog insight", "Justice bridge", "Justice command"]),
      d("Finance", "Finance, Tax & Revenue", "ERP, tax, revenue, treasury", "Audit, approval policy", ["Tax FAQ", "Revenue assist", "Invoice capture", "Collection workflow", "Forecast signal", "Finance bridge", "Revenue command"]),
      d("HR", "Workforce & HR", "HRIS, learning, recruiting", "Employee privacy, labor rules", ["HR policy", "Hiring assist", "Case capture", "Workforce workflow", "Staffing signal", "HR bridge", "Workforce OS"]),
      d("Procure", "Procurement & Grants", "Procurement, grants, contracts", "Public procurement rules", ["Bid guide", "Grant assist", "Contract capture", "Procurement workflow", "Spend insight", "Supplier bridge", "Grant command"]),
      d("Records", "Records & Open Government", "Records, FOIA, agenda, archives", "Public records law, redaction", ["Records FAQ", "FOIA assist", "Redaction prep", "Records workflow", "Transparency signal", "Records bridge", "Open gov OS"]),
      d("GIS", "GIS & Asset Intelligence", "GIS, IoT, asset management", "Location privacy, source quality", ["Map guide", "GIS assist", "Layer capture", "Asset workflow", "Spatial insight", "GIS bridge", "Asset intelligence"]),
      d("IT", "IT & Cyber", "Service desk, identity, endpoint, SOC", "Least privilege, incident review", ["IT FAQ", "Ticket assist", "Incident capture", "Resolution workflow", "Cyber signal", "IT bridge", "IT command"]),
      d("Data", "Data & Performance", "Data warehouse, BI, performance mgmt", "Metric governance, privacy", ["Metric guide", "Report assist", "Data request", "Performance workflow", "Outcome insight", "Data fabric", "Gov intelligence"]),
      d("Comms", "Communications & Engagement", "Web, social, alerts, engagement tools", "Plain language, crisis review", ["Comms guide", "Draft assist", "Content capture", "Engagement workflow", "Audience insight", "Comms bridge", "Public trust OS"]),
      d("Trust", "Legal, Privacy & Trust", "GRC, legal, privacy, security", "Auditability, rights protection", ["Policy guide", "Legal assist", "Audit request", "Compliance workflow", "Control insight", "Governance council", "Trust autonomy"]),
    ],
    goals: [
      goal("constituent", "Improve Constituent Services", "Intake, routing, casework, and service visibility", [[1,2],[1,4],[3,4],[16,5],[18,7]]),
      goal("field", "Modernize Field and Asset Operations", "GIS, public works, inspections, transportation, and safety", [[14,2],[4,4],[5,4],[14,5],[4,7]]),
      goal("benefits", "Deliver Benefits More Responsibly", "Eligibility, case management, housing, and public health", [[2,2],[2,4],[8,4],[7,5],[2,7]]),
      goal("transparency", "Strengthen Open Government", "Records, communications, performance, and legal review", [[13,2],[13,4],[17,4],[16,5],[17,7]]),
      goal("trust", "Govern Public Sector AI", "Privacy, civil rights, auditability, cyber, and human command", [[18,2],[15,4],[18,4],[18,6],[18,7]]),
    ],
  },
  {
    folder: "SMC",
    title: "SMC",
    lead: "A periodic table of agents for small, medium, and corporate customers scaling sales, service, finance, operations, security, and adoption.",
    context: "SMC customer",
    nav: "SMC",
    domains: [
      d("Sales", "Sales & Pipeline", "CRM, email, meetings, forecasting", "Customer data controls, manager review", ["Pipeline guide", "Sales assist", "Lead capture", "Opportunity workflow", "Forecast signal", "Sales bridge", "Revenue OS"]),
      d("Marketing", "Marketing & Demand", "Marketing automation, web, CRM", "Consent, brand review", ["Campaign guide", "Content assist", "Lead capture", "Nurture workflow", "Demand insight", "Marketing bridge", "Growth OS"]),
      d("Service", "Customer Service", "Contact center, CRM, knowledge", "Escalation, customer privacy", ["Service FAQ", "Case assist", "Ticket capture", "Resolution workflow", "Churn signal", "Service bridge", "Customer OS"]),
      d("Finance", "Finance & Accounting", "ERP, billing, AP/AR", "Approval policy, audit trail", ["Finance FAQ", "Invoice assist", "Expense capture", "Close workflow", "Cash insight", "Finance bridge", "Finance command"]),
      d("Ops", "Operations", "ERP, work management, scheduling", "Process ownership, exception review", ["Ops guide", "Scheduling assist", "Task capture", "Operations workflow", "Bottleneck signal", "Ops bridge", "Operations command"]),
      d("Supply", "Supply Chain", "ERP, inventory, logistics", "Supplier rules, audit trail", ["Inventory guide", "Vendor assist", "Order capture", "Fulfillment workflow", "Demand signal", "Supply bridge", "Supply command"]),
      d("HR", "HR & Talent", "HRIS, recruiting, LMS", "Employee privacy, manager accountability", ["HR policy", "Recruiting assist", "Onboarding capture", "Talent workflow", "Workforce signal", "HR bridge", "Talent OS"]),
      d("IT", "IT & Support", "Service desk, endpoint, identity", "Least privilege, cyber review", ["IT FAQ", "Ticket assist", "Incident capture", "Resolution workflow", "Service insight", "IT bridge", "IT command"]),
      d("Security", "Security & Compliance", "SOC, GRC, compliance, identity", "Human approval, risk ownership", ["Security guide", "Alert assist", "Evidence capture", "Remediation workflow", "Risk signal", "Security bridge", "Security command"]),
      d("Product", "Product & Engineering", "DevOps, backlog, telemetry", "IP control, review discipline", ["Product guide", "Backlog assist", "Bug capture", "Release workflow", "Usage insight", "Engineering bridge", "Product OS"]),
      d("Field", "Field & Frontline", "Mobile, scheduling, work orders", "Worker safety, device policy", ["Field guide", "Route assist", "Work capture", "Dispatch workflow", "Safety signal", "Field bridge", "Frontline command"]),
      d("Legal", "Legal & Contracts", "CLM, legal docs, records", "Attorney review, privilege", ["Contract guide", "Clause assist", "Intake capture", "Contract workflow", "Obligation insight", "Legal bridge", "Contract OS"]),
      d("Partner", "Partner & Channel", "PRM, CRM, co-sell tools", "Partner agreements, data sharing", ["Partner guide", "Co-sell assist", "Referral capture", "Channel workflow", "Whitespace insight", "Partner bridge", "Channel OS"]),
      d("Adoption", "Adoption & Change", "M365, Viva, LMS, telemetry", "Employee trust, measurement quality", ["Adoption guide", "Coach assist", "Training capture", "Change workflow", "Usage insight", "Adoption bridge", "Change OS"]),
      d("Data", "Data & Analytics", "Fabric, BI, data warehouse", "Metric governance, source control", ["Metric guide", "Report assist", "Data request", "Insight workflow", "Forecast signal", "Data fabric", "Business intelligence"]),
      d("Exec", "Executive Rhythm", "M365, dashboards, planning tools", "Sensitive strategy data", ["Brief guide", "Meeting assist", "Decision capture", "Leadership workflow", "Priority insight", "Exec rhythm", "Business command"]),
      d("Industry", "Industry Solutions", "LOB apps, partner apps, industry data", "Domain expert review", ["Solution guide", "Use-case assist", "Requirement capture", "Industry workflow", "Value signal", "Solution bridge", "Industry OS"]),
      d("Trust", "Governance & Trust", "GRC, security, privacy, records", "Auditability, policy ownership", ["Policy FAQ", "Governance assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("growth", "Create New Pipeline", "Demand, sales, partner motion, and opportunity progression", [[2,2],[1,3],[1,4],[13,5],[1,7]]),
      goal("service", "Improve Customer Retention", "Service, product feedback, adoption, and churn signals", [[3,2],[3,4],[10,5],[14,5],[3,7]]),
      goal("ops", "Run a Healthier Business", "Finance, operations, supply chain, and executive rhythm", [[4,2],[5,4],[6,4],[16,5],[16,7]]),
      goal("security", "Secure Growth", "Identity, security, compliance, and governed adoption", [[9,2],[9,4],[18,4],[18,6],[18,7]]),
      goal("adoption", "Scale Copilot and Agent Adoption", "Training, change, data, and repeatable workflows", [[14,2],[14,4],[15,5],[8,6],[14,7]]),
    ],
  },
  {
    folder: "DIB-Defense",
    title: "DIB / Defense",
    lead: "A periodic table of agents for defense missions, defense industrial base programs, secure engineering, acquisition, and readiness.",
    context: "DIB and defense",
    nav: "DIB / Defense",
    domains: [
      d("Mission", "Mission Planning", "Mission systems, planning tools, M365", "Command authority, operational security", ["Mission guide", "Planning assist", "Brief capture", "Mission workflow", "Readiness signal", "Mission bridge", "Mission command"]),
      d("Intel", "Intelligence & Analysis", "Intel repositories, knowledge graphs", "Classification boundaries, source handling", ["Intel guide", "Analyst assist", "Source capture", "Analysis workflow", "Pattern signal", "Intel bridge", "Intel command"]),
      d("Acq", "Acquisition & Contracting", "Acquisition, CLM, procurement", "FAR/DFARS, approval authority", ["Acq guide", "Solicitation assist", "Requirement capture", "Source-selection workflow", "Cost insight", "Acq bridge", "Acquisition command"]),
      d("Program", "Program Management", "EVM, project, contract, PM tools", "Government/contractor boundary", ["Program guide", "PM assist", "Risk capture", "IMS workflow", "Schedule insight", "Program bridge", "Program command"]),
      d("Engineering", "Secure Engineering", "PLM, DevSecOps, model-based systems", "Export control, IP, configuration control", ["Design guide", "Engineering assist", "Change capture", "Design review workflow", "Defect signal", "Engineering bridge", "Engineering OS"]),
      d("Cyber", "Cyber Operations", "SOC, SIEM, XDR, identity", "Human command, incident authority", ["Cyber guide", "Alert assist", "Evidence capture", "Response workflow", "Threat signal", "Cyber bridge", "Cyber command"]),
      d("Supply", "Secure Supply Chain", "ERP, supplier, logistics, SBOM", "CMMC, supplier assurance", ["Supplier guide", "Vendor assist", "SBOM capture", "Supply workflow", "Constraint signal", "Supply bridge", "Supply command"]),
      d("Logistics", "Logistics & Sustainment", "Maintenance, ERP, asset, fleet", "Safety, mission priority", ["Logistics guide", "Maintenance assist", "Work capture", "Sustainment workflow", "Availability signal", "Logistics bridge", "Sustainment command"]),
      d("Manufact", "Defense Manufacturing", "MES, quality, PLM, ERP", "Quality assurance, controlled technical info", ["Build guide", "Quality assist", "Inspection capture", "Production workflow", "Yield signal", "Manufacturing bridge", "Production command"]),
      d("Proposal", "Capture & Proposal", "CRM, proposal stores, pricing", "OCI, source control, red team review", ["Capture guide", "Proposal assist", "RFP capture", "Color team workflow", "Win signal", "Capture bridge", "Proposal command"]),
      d("Finance", "Finance & Cost", "ERP, pricing, cost systems", "Cost accounting, audit trail", ["Cost guide", "Pricing assist", "Invoice capture", "Cost workflow", "Margin signal", "Finance bridge", "Cost command"]),
      d("Workforce", "Cleared Workforce", "HRIS, training, clearance systems", "Clearance privacy, need-to-know", ["Workforce guide", "Clearance assist", "Training capture", "Staffing workflow", "Skill signal", "Workforce bridge", "Talent command"]),
      d("Facilities", "Secure Facilities", "Facilities, access, SCIF, IoT", "Physical security, access control", ["Facility guide", "Access assist", "Inspection capture", "Facility workflow", "Risk signal", "Facility bridge", "Facility command"]),
      d("Compliance", "CMMC & Compliance", "GRC, evidence, policy, security", "Evidence integrity, auditor review", ["CMMC guide", "Control assist", "Evidence capture", "POAM workflow", "Compliance signal", "Compliance bridge", "Control command"]),
      d("Data", "Mission Data & Interoperability", "Data fabric, APIs, tactical/enterprise data", "Data labeling, cross-domain controls", ["Data guide", "API assist", "Data capture", "Interoperability workflow", "Data quality signal", "Data bridge", "Mission data fabric"]),
      d("Partner", "Alliances & Primes", "Partner portals, CRM, contracts", "Data sharing, OCI, export controls", ["Partner guide", "Teaming assist", "Referral capture", "Alliance workflow", "Whitespace signal", "Partner bridge", "Ecosystem command"]),
      d("Training", "Training & Readiness", "LMS, simulation, readiness systems", "Safety, certification authority", ["Training guide", "Readiness assist", "Exercise capture", "Training workflow", "Readiness insight", "Training bridge", "Readiness command"]),
      d("Trust", "Security, Legal & Trust", "GRC, legal, records, classification", "OPSEC, classification, auditability", ["Trust guide", "Legal assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("readiness", "Improve Mission Readiness", "Planning, logistics, training, and sustainment", [[1,2],[17,4],[8,4],[1,5],[1,7]]),
      goal("program", "Deliver Programs with Less Friction", "Program management, engineering, supply chain, and cost", [[4,2],[5,4],[7,4],[11,5],[4,7]]),
      goal("secure", "Secure the Defense Industrial Base", "Cyber, CMMC, facilities, suppliers, and trust", [[6,2],[14,4],[7,5],[18,6],[18,7]]),
      goal("capture", "Win and Execute Strategic Pursuits", "Capture, proposal, acquisition, partner, and pricing workflows", [[10,2],[3,3],[10,4],[16,5],[10,7]]),
      goal("data", "Operate a Mission Data Fabric", "Interoperability, source control, governance, and cross-domain constraints", [[15,2],[15,4],[15,6],[18,6],[15,7]]),
    ],
  },
  {
    folder: "Energy-Utilities",
    title: "Energy, Oil & Gas, Utilities",
    lead: "A periodic table of agents for asset-intensive energy organizations spanning production, grid, field work, safety, trading, and regulation.",
    context: "energy, oil and gas, and utilities",
    nav: "Energy, Oil & Gas, Utilities",
    domains: [
      d("Asset", "Asset Operations", "EAM, SCADA, historians, IoT", "Safety, operational authority", ["Asset guide", "Ops assist", "Telemetry capture", "Asset workflow", "Reliability signal", "Asset bridge", "Asset command"]),
      d("Field", "Field Service", "Mobile, work orders, dispatch", "Worker safety, union rules", ["Field guide", "Crew assist", "Work capture", "Dispatch workflow", "Safety signal", "Field bridge", "Field command"]),
      d("Maint", "Maintenance & Reliability", "EAM, CMMS, inspection, sensors", "Engineering review, criticality", ["Maintenance guide", "Planner assist", "Inspection capture", "Maintenance workflow", "Failure signal", "Reliability bridge", "Maintenance command"]),
      d("HSE", "Health, Safety & Environment", "HSE, incident, training systems", "Stop-work authority, regulatory reporting", ["HSE guide", "Safety assist", "Incident capture", "Corrective workflow", "Risk signal", "HSE bridge", "Safety command"]),
      d("Grid", "Grid & Network Operations", "ADMS, OMS, DERMS, SCADA", "Human operator command, NERC/CIP", ["Grid guide", "Operator assist", "Outage capture", "Restoration workflow", "Load signal", "Grid bridge", "Grid command"]),
      d("Production", "Production & Refining", "Production, refinery, process control", "Process safety, engineering review", ["Production guide", "Process assist", "Run capture", "Optimization workflow", "Yield signal", "Production bridge", "Production command"]),
      d("Trading", "Trading & Risk", "ETRM, market data, risk systems", "Market controls, segregation of duties", ["Market guide", "Trading assist", "Deal capture", "Risk workflow", "Exposure signal", "Trading bridge", "Trading command"]),
      d("Customer", "Customer & Metering", "CIS, CRM, AMI, billing", "Customer privacy, tariff rules", ["Customer FAQ", "Service assist", "Meter capture", "Customer workflow", "Churn signal", "Customer bridge", "Customer OS"]),
      d("Reg", "Regulatory & Rates", "Regulatory filings, legal, finance", "Regulator review, evidence trail", ["Reg guide", "Filing assist", "Evidence capture", "Rate case workflow", "Compliance signal", "Regulatory bridge", "Rates command"]),
      d("Supply", "Supply Chain & Materials", "ERP, inventory, suppliers", "Critical spares, sourcing policy", ["Materials guide", "Vendor assist", "Order capture", "Supply workflow", "Constraint signal", "Supplier bridge", "Supply command"]),
      d("Capital", "Capital Projects", "Project controls, EPC, scheduling", "Safety, contract authority", ["Project guide", "PM assist", "Change capture", "Project workflow", "Cost signal", "Capital bridge", "Project command"]),
      d("Finance", "Finance & Commercial", "ERP, contracts, revenue, billing", "Approval policy, audit trail", ["Finance FAQ", "Contract assist", "Invoice capture", "Close workflow", "Margin signal", "Finance bridge", "Commercial command"]),
      d("Workforce", "Workforce & Training", "HRIS, LMS, scheduling", "Certification, fatigue, safety", ["Workforce guide", "Training assist", "Skill capture", "Crew workflow", "Readiness signal", "Workforce bridge", "Workforce OS"]),
      d("Sustain", "Sustainability & Emissions", "ESG, emissions, reporting systems", "Methodology, auditability", ["Emissions guide", "ESG assist", "Reading capture", "Reporting workflow", "Carbon signal", "Sustainability bridge", "Sustainability OS"]),
      d("Data", "Industrial Data & AI", "Historians, data lake, Fabric, APIs", "OT/IT boundary, data quality", ["Data guide", "Analytics assist", "Sensor capture", "Data workflow", "Anomaly signal", "Data bridge", "Industrial intelligence"]),
      d("Cyber", "OT Cyber & Resilience", "SOC, OT security, identity", "Incident authority, NERC/CIP", ["Cyber guide", "Alert assist", "Evidence capture", "Response workflow", "Threat signal", "Cyber bridge", "Cyber command"]),
      d("Partner", "Ecosystem & Contractors", "Contractor portals, partner systems", "Safety onboarding, data sharing", ["Partner guide", "Contractor assist", "Permit capture", "Partner workflow", "Performance signal", "Partner bridge", "Ecosystem command"]),
      d("Trust", "Governance, Risk & Trust", "GRC, legal, safety, compliance", "Auditability, human override", ["Policy guide", "Risk assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("reliability", "Improve Asset Reliability", "Maintenance, field work, asset operations, and industrial data", [[1,2],[3,4],[2,4],[15,5],[1,7]]),
      goal("grid", "Modernize Grid and Outage Response", "Grid operations, customers, field crews, and resilience", [[5,2],[5,4],[2,4],[8,5],[5,7]]),
      goal("safety", "Strengthen Safety and Compliance", "HSE, OT cyber, regulatory, workforce, and trust", [[4,2],[4,4],[16,4],[18,6],[18,7]]),
      goal("commercial", "Optimize Commercial Performance", "Trading, finance, rates, customers, and forecasting", [[7,2],[12,4],[9,4],[7,5],[7,7]]),
      goal("sustainability", "Advance Energy Transition Reporting", "Emissions, capital projects, data, and regulatory evidence", [[14,2],[14,4],[11,4],[15,5],[14,7]]),
    ],
  },
  {
    folder: "Financial-Services",
    title: "Financial Services",
    lead: "A periodic table of agents for banking, insurance, capital markets, wealth, payments, risk, and regulatory operations.",
    context: "financial services",
    nav: "Financial Services",
    domains: [
      d("Client", "Client & Member Service", "CRM, contact center, digital banking", "Privacy, suitability, escalation", ["Client FAQ", "Service assist", "Request capture", "Service workflow", "Churn signal", "Client bridge", "Client OS"]),
      d("Advisor", "Advisor & Relationship Management", "CRM, portfolio, M365", "Suitability, disclosure, supervision", ["Advisor guide", "Meeting assist", "Note capture", "Relationship workflow", "Next-best insight", "Advisor bridge", "Advisor command"]),
      d("Lending", "Lending & Credit", "LOS, credit, collateral, docs", "Fair lending, model risk", ["Credit guide", "Loan assist", "Document capture", "Underwriting workflow", "Credit signal", "Lending bridge", "Credit command"]),
      d("Claims", "Claims & Benefits", "Claims, policy admin, imaging", "Coverage rules, appeal rights", ["Claims FAQ", "Adjuster assist", "Evidence capture", "Claims workflow", "Fraud signal", "Claims bridge", "Claims command"]),
      d("Payments", "Payments & Operations", "Payments, core banking, cards", "Fraud controls, settlement rules", ["Payment guide", "Ops assist", "Exception capture", "Payment workflow", "Exception signal", "Payments bridge", "Payments command"]),
      d("Fraud", "Fraud & Financial Crime", "AML, fraud, case management", "Investigator review, explainability", ["Fraud guide", "Alert assist", "Evidence capture", "Investigation workflow", "Risk signal", "Fraud bridge", "Financial crime command"]),
      d("Risk", "Enterprise Risk", "GRC, risk models, controls", "Model governance, risk ownership", ["Risk guide", "Risk assist", "Control capture", "Risk workflow", "Exposure signal", "Risk bridge", "Risk command"]),
      d("Compliance", "Compliance & Regulatory", "GRC, surveillance, records", "Regulatory evidence, review", ["Reg guide", "Compliance assist", "Evidence capture", "Filing workflow", "Control signal", "Compliance bridge", "Regulatory command"]),
      d("Wealth", "Wealth & Investments", "Portfolio, planning, CRM", "Suitability, fiduciary review", ["Wealth guide", "Planning assist", "Portfolio capture", "Advice workflow", "Portfolio signal", "Wealth bridge", "Wealth command"]),
      d("Markets", "Capital Markets", "Trading, research, market data", "Market abuse controls, supervision", ["Markets guide", "Research assist", "Trade capture", "Trade workflow", "Exposure signal", "Markets bridge", "Markets command"]),
      d("Insurance", "Insurance Underwriting", "Policy admin, underwriting, actuarial", "Fair treatment, actuarial review", ["Policy guide", "Underwriting assist", "Submission capture", "Underwriting workflow", "Loss signal", "Insurance bridge", "Underwriting command"]),
      d("Finance", "Finance & Treasury", "ERP, treasury, ALM", "Approval policy, audit trail", ["Finance FAQ", "Treasury assist", "Close capture", "Treasury workflow", "Liquidity signal", "Finance bridge", "Treasury command"]),
      d("Product", "Product & Pricing", "Product systems, pricing, analytics", "Approval governance, customer impact", ["Product guide", "Pricing assist", "Feature capture", "Pricing workflow", "Margin signal", "Product bridge", "Product OS"]),
      d("Branch", "Branch & Frontline", "Branch systems, scheduling, knowledge", "Customer privacy, supervision", ["Branch guide", "Frontline assist", "Request capture", "Branch workflow", "Queue signal", "Branch bridge", "Frontline command"]),
      d("Data", "Data, Analytics & AI", "Lakehouse, BI, models, feature stores", "Model risk, data lineage", ["Data guide", "Analytics assist", "Data request", "Insight workflow", "Model signal", "Data bridge", "Financial intelligence"]),
      d("Cyber", "Cyber & Resilience", "SOC, identity, incident, resilience", "Incident authority, resilience testing", ["Cyber guide", "Alert assist", "Evidence capture", "Response workflow", "Threat signal", "Cyber bridge", "Resilience command"]),
      d("Partner", "Ecosystem & Fintech", "Partner APIs, fintech platforms", "Third-party risk, data sharing", ["Partner guide", "Fintech assist", "API capture", "Partner workflow", "Ecosystem signal", "Partner bridge", "Ecosystem command"]),
      d("Trust", "Governance & Trust", "GRC, privacy, records, legal", "Auditability, human review", ["Policy FAQ", "Trust assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("client", "Deepen Client Relationships", "Service, advisor prep, wealth, and frontline experience", [[1,2],[2,2],[9,4],[14,5],[2,7]]),
      goal("risk", "Reduce Risk and Financial Crime", "Fraud, AML, cyber, compliance, and controls", [[6,2],[6,4],[8,4],[16,5],[18,7]]),
      goal("lending", "Accelerate Lending and Underwriting", "Credit, insurance, documentation, and fair decisioning", [[3,2],[3,4],[11,4],[15,5],[3,7]]),
      goal("markets", "Improve Market and Treasury Decisions", "Trading, treasury, risk, and model governance", [[10,2],[12,4],[7,5],[15,6],[10,7]]),
      goal("trust", "Operate Governed Financial AI", "Compliance, model risk, records, privacy, and auditability", [[18,2],[7,4],[8,4],[18,6],[18,7]]),
    ],
  },
  {
    folder: "Manufacturing",
    title: "Manufacturing",
    lead: "A periodic table of agents for plant operations, engineering, quality, maintenance, supply chain, safety, and connected products.",
    context: "manufacturing",
    nav: "Manufacturing",
    domains: [
      d("Plant", "Plant Operations", "MES, SCADA, ERP, IoT", "Operator authority, safety", ["Plant guide", "Operator assist", "Run capture", "Production workflow", "OEE signal", "Plant bridge", "Plant command"]),
      d("Maint", "Maintenance", "CMMS, EAM, sensors", "Safety lockout, engineering review", ["Maintenance guide", "Planner assist", "Inspection capture", "Maintenance workflow", "Failure signal", "Reliability bridge", "Maintenance command"]),
      d("Quality", "Quality Management", "QMS, inspection, SPC", "Quality signoff, traceability", ["Quality guide", "Inspector assist", "Defect capture", "CAPA workflow", "Quality signal", "Quality bridge", "Quality command"]),
      d("Engineering", "Engineering & PLM", "PLM, CAD, requirements, DevOps", "IP, configuration control", ["Design guide", "Engineering assist", "Change capture", "ECO workflow", "Defect insight", "Engineering bridge", "Engineering OS"]),
      d("Supply", "Supply Chain Planning", "ERP, planning, supplier systems", "Sourcing rules, scenario review", ["Supply guide", "Planner assist", "Order capture", "Planning workflow", "Constraint signal", "Supply bridge", "Supply command"]),
      d("Warehouse", "Warehouse & Logistics", "WMS, TMS, barcode, fleet", "Worker safety, inventory integrity", ["Warehouse guide", "Pick assist", "Shipment capture", "Logistics workflow", "Delay signal", "Logistics bridge", "Logistics command"]),
      d("Procure", "Procurement", "ERP, supplier, contracts", "Approval policy, supplier risk", ["Procurement guide", "Vendor assist", "PO capture", "Sourcing workflow", "Spend signal", "Supplier bridge", "Procurement command"]),
      d("Safety", "Safety & EHS", "EHS, training, incident systems", "Stop-work authority, reporting", ["Safety guide", "EHS assist", "Incident capture", "Corrective workflow", "Risk signal", "Safety bridge", "Safety command"]),
      d("Product", "Product Lifecycle", "PLM, telemetry, service systems", "Customer impact, engineering review", ["Product guide", "Lifecycle assist", "Feedback capture", "Release workflow", "Usage signal", "Product bridge", "Product OS"]),
      d("Service", "Field Service & Warranty", "FSM, warranty, CRM, IoT", "Customer privacy, service authority", ["Service guide", "Technician assist", "Claim capture", "Service workflow", "Warranty signal", "Service bridge", "Service command"]),
      d("Sales", "Sales & Channel", "CRM, CPQ, partner systems", "Pricing policy, customer data", ["Sales guide", "Quote assist", "Lead capture", "Deal workflow", "Demand signal", "Channel bridge", "Revenue OS"]),
      d("Finance", "Finance & Costing", "ERP, cost, margin, billing", "Audit trail, approval policy", ["Cost guide", "Finance assist", "Invoice capture", "Close workflow", "Margin signal", "Finance bridge", "Cost command"]),
      d("Workforce", "Workforce & Skills", "HRIS, LMS, scheduling", "Labor rules, certifications", ["Workforce guide", "Training assist", "Skill capture", "Crew workflow", "Skill signal", "Workforce bridge", "Talent OS"]),
      d("Sustain", "Sustainability", "ESG, emissions, energy systems", "Methodology, auditability", ["ESG guide", "Sustainability assist", "Reading capture", "Reporting workflow", "Carbon signal", "Sustainability bridge", "Sustainability OS"]),
      d("Data", "Industrial Data", "Historian, lakehouse, BI, APIs", "OT/IT boundary, data quality", ["Data guide", "Analytics assist", "Sensor capture", "Insight workflow", "Anomaly signal", "Data bridge", "Industrial intelligence"]),
      d("Cyber", "OT Cyber", "SOC, OT security, identity", "Incident authority, network segmentation", ["Cyber guide", "Alert assist", "Evidence capture", "Response workflow", "Threat signal", "Cyber bridge", "Cyber command"]),
      d("Partner", "Supplier & Ecosystem", "Supplier portals, partner platforms", "Data sharing, supplier assurance", ["Partner guide", "Supplier assist", "Onboarding capture", "Partner workflow", "Performance signal", "Partner bridge", "Ecosystem command"]),
      d("Trust", "Governance & Trust", "GRC, legal, privacy, records", "Auditability, human override", ["Policy guide", "Governance assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("plant", "Improve Plant Performance", "OEE, production flow, maintenance, quality, and workforce", [[1,2],[1,4],[2,4],[3,5],[1,7]]),
      goal("quality", "Reduce Quality Escapes", "Inspection, CAPA, engineering change, and traceability", [[3,2],[3,4],[4,4],[15,5],[3,7]]),
      goal("supply", "Build a Resilient Supply Chain", "Planning, procurement, logistics, suppliers, and finance", [[5,2],[5,4],[7,4],[17,5],[5,7]]),
      goal("service", "Connect Product to Service", "Product lifecycle, field service, warranty, and customer signals", [[9,2],[10,4],[9,5],[15,6],[10,7]]),
      goal("trust", "Secure Industrial AI", "OT cyber, safety, governance, data, and human override", [[16,2],[8,4],[18,4],[18,6],[18,7]]),
    ],
  },
  {
    folder: "Media-Communications",
    title: "Media & Entertainment / Communications",
    lead: "A periodic table of agents for content, audience, production, rights, advertising, networks, service assurance, and subscriber growth.",
    context: "media, entertainment, and communications",
    nav: "Media & Entertainment / Communications",
    domains: [
      d("Content", "Content Development", "Content stores, scripts, creative tools", "IP, editorial control, rights", ["Content guide", "Creative assist", "Brief capture", "Development workflow", "Audience signal", "Content bridge", "Content OS"]),
      d("Production", "Production Operations", "Production planning, assets, scheduling", "Safety, union rules, approvals", ["Production guide", "Schedule assist", "Shoot capture", "Production workflow", "Delay signal", "Production bridge", "Production command"]),
      d("Rights", "Rights & Licensing", "Rights management, CLM, archives", "Rights clearance, legal review", ["Rights guide", "License assist", "Clearance capture", "Rights workflow", "Obligation signal", "Rights bridge", "Rights command"]),
      d("Audience", "Audience & Subscriber", "CDP, CRM, analytics, apps", "Privacy, consent, segmentation rules", ["Audience guide", "Subscriber assist", "Segment capture", "Journey workflow", "Churn signal", "Audience bridge", "Audience OS"]),
      d("AdSales", "Advertising & Sales", "Ad sales, CRM, planning, billing", "Brand safety, pricing policy", ["Ad sales guide", "Proposal assist", "Campaign capture", "Ad workflow", "Yield signal", "Ad bridge", "Revenue OS"]),
      d("News", "Newsroom & Editorial", "CMS, wires, archives, M365", "Editorial standards, source verification", ["News guide", "Editorial assist", "Source capture", "Story workflow", "Coverage signal", "Newsroom bridge", "Editorial command"]),
      d("Sports", "Sports & Live Events", "Event ops, broadcast, ticketing", "Live safety, rights, timing", ["Event guide", "Ops assist", "Runbook capture", "Live workflow", "Incident signal", "Event bridge", "Live command"]),
      d("Gaming", "Gaming & Interactive", "Telemetry, community, devops", "Safety, moderation, IP", ["Game guide", "Community assist", "Feedback capture", "Liveops workflow", "Engagement signal", "Game bridge", "Interactive OS"]),
      d("Network", "Network Operations", "NOC, OSS, telemetry", "Operator authority, outage protocol", ["Network guide", "NOC assist", "Alert capture", "Restoration workflow", "Availability signal", "Network bridge", "Network command"]),
      d("Field", "Field Service", "Dispatch, workforce, network inventory", "Worker safety, customer privacy", ["Field guide", "Technician assist", "Work capture", "Dispatch workflow", "Safety signal", "Field bridge", "Field command"]),
      d("Customer", "Customer Care", "Contact center, CRM, billing", "Privacy, escalation", ["Care FAQ", "Agent assist", "Case capture", "Resolution workflow", "Satisfaction signal", "Care bridge", "Customer OS"]),
      d("Billing", "Billing & Revenue Ops", "Billing, mediation, ERP", "Revenue assurance, audit trail", ["Billing guide", "Revenue assist", "Exception capture", "Billing workflow", "Leakage signal", "Revenue bridge", "Revenue command"]),
      d("Product", "Product & Platform", "Product telemetry, backlog, apps", "Customer impact, release review", ["Product guide", "Backlog assist", "Feedback capture", "Release workflow", "Usage signal", "Product bridge", "Platform OS"]),
      d("Partner", "Partner & Distribution", "Partner portals, distribution, affiliates", "Data sharing, rights, SLAs", ["Partner guide", "Distribution assist", "Deal capture", "Partner workflow", "Reach signal", "Partner bridge", "Distribution command"]),
      d("Data", "Audience & Network Data", "Lakehouse, BI, identity graph", "Privacy, source lineage", ["Data guide", "Analytics assist", "Data request", "Insight workflow", "Anomaly signal", "Data bridge", "Media intelligence"]),
      d("Security", "Security & Trust", "SOC, identity, content security", "Cyber review, anti-piracy", ["Security guide", "Alert assist", "Evidence capture", "Response workflow", "Threat signal", "Security bridge", "Security command"]),
      d("Workforce", "Creative & Technical Workforce", "HRIS, scheduling, skills, vendors", "Labor rules, talent privacy", ["Workforce guide", "Crew assist", "Skill capture", "Staffing workflow", "Capacity signal", "Workforce bridge", "Talent OS"]),
      d("Govern", "Governance, Legal & Trust", "GRC, legal, privacy, standards", "Auditability, rights, editorial review", ["Policy guide", "Legal assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("content", "Accelerate Content Operations", "Development, production, rights, and editorial workflows", [[1,2],[2,4],[3,4],[6,5],[1,7]]),
      goal("audience", "Grow Audience and Subscribers", "Audience insight, product, care, billing, and campaigns", [[4,2],[4,4],[13,4],[11,5],[4,7]]),
      goal("network", "Improve Network and Service Assurance", "Network ops, field service, customer care, and security", [[9,2],[9,4],[10,4],[15,5],[9,7]]),
      goal("revenue", "Optimize Advertising and Distribution Revenue", "Ad sales, rights, distribution, billing, and yield", [[5,2],[5,4],[14,4],[12,5],[5,7]]),
      goal("trust", "Protect Rights, Privacy, and Brand Trust", "Rights, security, legal, editorial, and governance", [[3,2],[16,4],[18,4],[18,6],[18,7]]),
    ],
  },
  {
    folder: "Retail-CPG",
    title: "Retail / CPG",
    lead: "A periodic table of agents for store operations, merchandising, supply chain, consumer engagement, product, finance, and brand growth.",
    context: "retail and consumer packaged goods",
    nav: "Retail / CPG",
    domains: [
      d("Store", "Store Operations", "POS, workforce, task management", "Associate safety, customer privacy", ["Store guide", "Associate assist", "Task capture", "Store workflow", "Execution signal", "Store bridge", "Store command"]),
      d("Customer", "Customer Experience", "CRM, loyalty, contact center", "Consent, escalation", ["Customer FAQ", "Care assist", "Case capture", "Journey workflow", "Churn signal", "Customer bridge", "Customer OS"]),
      d("Merch", "Merchandising", "Merch systems, assortment, pricing", "Margin policy, approval workflow", ["Merch guide", "Assortment assist", "Plan capture", "Merch workflow", "Sell-through signal", "Merch bridge", "Merch command"]),
      d("Demand", "Demand Planning", "Planning, forecasting, POS, market data", "Scenario review, source quality", ["Demand guide", "Planner assist", "Forecast capture", "Planning workflow", "Demand signal", "Planning bridge", "Demand command"]),
      d("Supply", "Supply Chain", "ERP, WMS, TMS, supplier systems", "Supplier rules, traceability", ["Supply guide", "Logistics assist", "Order capture", "Fulfillment workflow", "Constraint signal", "Supply bridge", "Supply command"]),
      d("Inventory", "Inventory & Replenishment", "Inventory, POS, WMS, store systems", "Shrink controls, audit trail", ["Inventory guide", "Replenishment assist", "Count capture", "Replenishment workflow", "Stockout signal", "Inventory bridge", "Inventory command"]),
      d("Product", "Product & Category", "PLM, category, innovation tools", "Claims review, quality control", ["Product guide", "Category assist", "Idea capture", "Innovation workflow", "Trend signal", "Product bridge", "Category OS"]),
      d("Marketing", "Marketing & Loyalty", "CDP, loyalty, campaigns", "Consent, brand, fairness", ["Campaign guide", "Loyalty assist", "Segment capture", "Campaign workflow", "Engagement signal", "Marketing bridge", "Growth OS"]),
      d("Ecomm", "E-commerce & Digital", "Commerce, search, personalization", "Privacy, brand safety", ["Digital guide", "Search assist", "Issue capture", "Commerce workflow", "Conversion signal", "Digital bridge", "Commerce command"]),
      d("Service", "Field & Store Service", "Field service, maintenance, IoT", "Safety, store disruption", ["Service guide", "Technician assist", "Work capture", "Service workflow", "Availability signal", "Service bridge", "Service command"]),
      d("Quality", "Quality & Food Safety", "QMS, lab, supplier, recall systems", "Recall safety, regulatory evidence", ["Quality guide", "Safety assist", "Inspection capture", "CAPA workflow", "Recall signal", "Quality bridge", "Quality command"]),
      d("Finance", "Finance & Revenue", "ERP, revenue, AP/AR, pricing", "Approval policy, audit trail", ["Finance FAQ", "Revenue assist", "Invoice capture", "Close workflow", "Margin signal", "Finance bridge", "Revenue command"]),
      d("HR", "Workforce & Scheduling", "HRIS, scheduling, LMS", "Labor rules, privacy", ["Workforce guide", "Schedule assist", "Shift capture", "Labor workflow", "Coverage signal", "Workforce bridge", "Workforce OS"]),
      d("Asset", "Real Estate & Facilities", "Facilities, leases, work orders", "Safety, lease controls", ["Facility guide", "Lease assist", "Inspection capture", "Facility workflow", "Cost signal", "Facilities bridge", "Portfolio command"]),
      d("Data", "Consumer & Operations Data", "Lakehouse, BI, CDP, POS data", "Privacy, metric governance", ["Data guide", "Analytics assist", "Data request", "Insight workflow", "Pattern signal", "Data bridge", "Retail intelligence"]),
      d("Security", "Security & Loss Prevention", "LP, SOC, identity, video systems", "Privacy, human review", ["Security guide", "LP assist", "Evidence capture", "Investigation workflow", "Shrink signal", "Security bridge", "Loss prevention command"]),
      d("Partner", "Suppliers & Marketplace", "Supplier portals, marketplace, EDI", "Data sharing, supplier assurance", ["Supplier guide", "Marketplace assist", "Onboarding capture", "Partner workflow", "Performance signal", "Partner bridge", "Marketplace OS"]),
      d("Trust", "Governance, Risk & Trust", "GRC, legal, privacy, records", "Auditability, responsible AI", ["Policy guide", "Governance assist", "Audit capture", "Control workflow", "Risk insight", "Governance bridge", "Trust autonomy"]),
    ],
    goals: [
      goal("store", "Improve Store Execution", "Associate workflows, inventory, field service, and loss prevention", [[1,2],[1,4],[6,4],[16,5],[1,7]]),
      goal("customer", "Grow Customer Loyalty", "Customer experience, marketing, e-commerce, and service", [[2,2],[8,4],[9,4],[15,5],[2,7]]),
      goal("supply", "Increase Supply Chain Resilience", "Demand planning, replenishment, suppliers, and logistics", [[4,2],[5,4],[6,4],[17,5],[5,7]]),
      goal("quality", "Protect Quality and Brand Trust", "Food safety, recall, compliance, security, and governance", [[11,2],[11,4],[18,4],[18,6],[18,7]]),
      goal("growth", "Accelerate Category and Revenue Growth", "Merchandising, product, pricing, finance, and consumer insight", [[3,2],[7,4],[12,4],[15,5],[3,7]]),
    ],
  },
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function symbolFor(text, period, group) {
  const words = text.replace(/&/g, " ").split(/[^A-Za-z0-9]+/).filter(Boolean);
  const base = (words[0]?.[0] || "A") + (words[1]?.[0] || words[0]?.[1] || "g");
  return `${base}${period}`.slice(0, 3).replace(/[^A-Za-z0-9]/g, "") || `A${group}`;
}

function idFor(group, period) {
  if (period === 1) return group === 1 ? 1 : group === 18 ? 2 : null;
  if (period === 2) {
    const map = { 1: 3, 2: 4, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 10 };
    return map[group] || null;
  }
  if (period === 3) {
    const map = { 1: 11, 2: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18 };
    return map[group] || null;
  }
  if (period === 4) return 18 + group;
  if (period === 5) return 36 + group;
  if (period === 6 && group <= 2) return 54 + group;
  if (period === 6 && group >= 4) return 68 + group;
  if (period === 7 && group <= 2) return 87 + group - 1;
  if (period === 7 && group >= 4) return 100 + group;
  return null;
}

function resolveGoalSequence(catalog, picks) {
  return picks.map(([group, period]) => {
    const exact = idFor(group, period);
    if (exact) return exact;
    return idFor(group, 4) || idFor(group, 5) || idFor(group, 6) || idFor(group, 7);
  }).filter(Boolean);
}

function agentPurpose(catalog, domain, period) {
  const action = period <= 2
    ? "answers and assists"
    : period <= 4
      ? "captures, routes, and coordinates"
      : period <= 5
        ? "recommends and prioritizes"
        : period <= 6
          ? "connects work across teams and systems for"
          : "monitors, orchestrates, and escalates";
  return `${action} ${domain.name.toLowerCase()} work in a ${catalog.context} context while preserving human accountability, policy boundaries, and trusted data controls.`;
}

function buildAgents(catalog) {
  const agents = [];
  for (let period = 1; period <= 7; period += 1) {
    for (let group = 1; group <= 18; group += 1) {
      const atomic = idFor(group, period);
      if (!atomic) continue;
      const domain = catalog.domains[group - 1];
      const label = domain.cases[period - 1];
      agents.push({
        atomic,
        symbol: symbolFor(label, period, group),
        label,
        name: `${label} Agent`,
        group,
        period,
        domain: domain.name,
        tier: tiers[period],
        systems: domain.system,
        guardrails: domain.guard,
        purpose: agentPurpose(catalog, domain, period),
      });
    }
  }
  bands.core.forEach(([symbol, label], index) => agents.push({
    atomic: 57 + index,
    symbol,
    label,
    name: `${label} Agent`,
    group: "L",
    period: 6,
    domain: "Core Systems",
    tier: "Cross-Organization",
    systems: "Identity, data, knowledge, workflow, integration, analytics, and automation foundations",
    guardrails: "Approved connectors, data lineage, source-system ownership, and operational monitoring",
    purpose: `Provides the reusable ${label.toLowerCase()} foundation that lets ${catalog.context} agents connect safely across domains and systems.`,
  }));
  bands.trust.forEach(([symbol, label], index) => agents.push({
    atomic: 89 + index,
    symbol,
    label,
    name: `${label} Agent`,
    group: "A",
    period: 7,
    domain: "Trust Layer",
    tier: "Autonomous Oversight",
    systems: "GRC, privacy, security, legal, responsible AI, records, and audit controls",
    guardrails: "Continuous audit, human override, escalation, least-privilege access, and policy review",
    purpose: `Acts as a trust control for ${label.toLowerCase()} so ${catalog.context} agent workflows remain safe, explainable, and auditable.`,
  }));
  return agents.sort((a, b) => a.atomic - b.atomic);
}

function makeHtml(catalog) {
  const domains = catalog.domains.map((domain, index) => ({ g: index + 1, ...domain }));
  const goals = catalog.goals.map((g) => ({ ...g, sequence: resolveGoalSequence(catalog, g.picks) }));
  const agents = buildAgents(catalog);
  const cssGroups = groupThemes.map((theme, index) => `.g${index + 1}{background:color-mix(in srgb, ${theme} ${16 + (index % 3) * 8}%, var(--cp-surface));}`).join("\n");
  const seriesLinks = catalogs.map((item) => `<a href="../${item.folder}/">${escapeHtml(item.nav)}</a>`).join(`<span class="sep">/</span>`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1400">
<title>Periodic Table of Agents: ${escapeHtml(catalog.title)}</title>
<script>
  (() => {
    const param = new URLSearchParams(window.location.search).get("clawpilotTheme");
    const theme =
      param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
<style>
:root {
  color-scheme: light;
  --cp-bg: #f7f4ef;
  --cp-bg-elevated: #fcfbf8;
  --cp-surface: #ffffff;
  --cp-surface-soft: #f5f5f5;
  --cp-border: #dedede;
  --cp-border-strong: #919191;
  --cp-text: #242424;
  --cp-text-muted: #5c5c5c;
  --cp-text-soft: #6f6f6f;
  --cp-accent: #b11f4b;
  --cp-accent-hover: #9a1a41;
  --cp-accent-soft: rgba(177, 31, 75, 0.08);
  --cp-accent-fg: #ffffff;
  --cp-success: #16a34a;
  --cp-danger: #dc2626;
  --cp-warning: #f59e0b;
  --cp-link: #0078d4;
  --cp-shadow: 0 18px 48px rgba(0, 0, 0, 0.12);
  --cp-overlay: rgba(255, 255, 255, 0.8);
  --cp-panel: rgba(255, 255, 255, 0.86);
  --cp-panel-strong: rgba(255, 255, 255, 0.96);
  --cp-sheen: rgba(255, 255, 255, 0.55);
  --cp-highlight: rgba(177, 31, 75, 0.12);
}
html[data-theme="dark"] {
  color-scheme: dark;
  --cp-bg: #3d3b3a;
  --cp-bg-elevated: #343231;
  --cp-surface: #292929;
  --cp-surface-soft: #2e2e2e;
  --cp-border: #474747;
  --cp-border-strong: #5f5f5f;
  --cp-text: #dedede;
  --cp-text-muted: #919191;
  --cp-text-soft: #b0b0b0;
  --cp-accent: #fd8ea1;
  --cp-accent-hover: #fb7b91;
  --cp-accent-soft: rgba(253, 142, 161, 0.14);
  --cp-accent-fg: #1a1a1a;
  --cp-success: #4ade80;
  --cp-danger: #f87171;
  --cp-warning: #fbbf24;
  --cp-link: #4da6ff;
  --cp-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
  --cp-overlay: rgba(41, 41, 41, 0.88);
  --cp-panel: rgba(41, 41, 41, 0.72);
  --cp-panel-strong: rgba(41, 41, 41, 0.96);
  --cp-sheen: rgba(255, 255, 255, 0.04);
  --cp-highlight: rgba(253, 142, 161, 0.12);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{min-width:1400px;padding:24px;background:var(--cp-bg);color:var(--cp-text);font-family:"Segoe UI",Aptos,Calibri,-apple-system,BlinkMacSystemFont,sans-serif}
button,input{font-family:inherit}
a{color:inherit}
.series-nav{margin:-24px -24px 20px;padding:10px 24px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:var(--cp-accent);color:var(--cp-accent-fg);font-size:12px}
.series-nav a,.series-current{color:var(--cp-accent-fg);text-decoration:none;padding:3px 10px;border-radius:0.625rem;border:1px solid var(--cp-sheen)}
.series-label{font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700}.series-current{background:var(--cp-sheen);font-weight:700}.sep{color:var(--cp-accent-fg);opacity:.64}
header{text-align:center;margin-bottom:14px}h1{margin:0 0 4px;font-size:28px;letter-spacing:-.01em;color:var(--cp-accent)}.header-lead{margin:0;color:var(--cp-text);font-weight:700;font-size:14px}.header-sub,.series-note{margin:4px auto 0;color:var(--cp-text-muted);font-size:13px;max-width:1400px}
.controls{display:flex;gap:12px;align-items:center;max-width:1400px;margin:16px auto}.controls input{flex:1;padding:9px 12px;border:1px solid var(--cp-border);border-radius:0.625rem;background:var(--cp-surface);color:var(--cp-text);font-size:14px}.reset,.clear-button{padding:9px 14px;border:0;border-radius:0.625rem;background:var(--cp-accent);color:var(--cp-accent-fg);cursor:pointer;font-size:13px}.reset:hover,.clear-button:hover{background:var(--cp-accent-hover)}
.goals,.narrative,.legend,.maturity,.howto{max-width:1400px;margin:18px auto;padding:18px 20px;border-radius:16px;background:var(--cp-surface);border:1px solid var(--cp-border);box-shadow:0 0 2px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.14)}
.goals{background:var(--cp-surface-soft)}.goals h2,.legend h2,.maturity h2,.howto h2,.narrative h2{margin:0 0 8px;color:var(--cp-accent);font-size:15px;text-transform:uppercase;letter-spacing:.04em}.ph-sub{margin:0 0 14px;color:var(--cp-text-muted);font-size:13px}
.goals-grid,.build-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.goal-item,.build-card,.legend-item{border:1px solid var(--cp-border);border-radius:0.625rem;background:var(--cp-surface);color:var(--cp-text);cursor:pointer;text-align:left}.goal-item{padding:13px 14px;min-height:82px}.goal-item:hover,.goal-item.active,.build-card:hover,.legend-item:hover,.legend-item.active{border-color:var(--cp-accent);background:var(--cp-accent-soft)}.goal-label{display:block;font-weight:700;font-size:14px;line-height:1.25;color:var(--cp-accent)}.goal-blurb{display:block;margin-top:4px;color:var(--cp-text-muted);font-size:11.5px;line-height:1.35}
.build-plan{margin-top:16px;padding-top:16px;border-top:1px solid var(--cp-border)}.build-plan[hidden]{display:none}.bp-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;gap:16px}.bp-header h3{margin:0;color:var(--cp-accent);font-size:15px}.bp-sequence{color:var(--cp-text-muted);font-size:12px;font-weight:700}.build-card{padding:10px;min-height:118px}.build-card-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}.mini-symbol{width:32px;height:32px;border-radius:0.625rem;border:1px solid var(--cp-border);display:flex;align-items:center;justify-content:center;color:var(--cp-text);font-weight:800}.bp-step{color:var(--cp-text-soft);font-size:10px;text-transform:uppercase;letter-spacing:.05em;font-weight:700}.bp-name{color:var(--cp-text);font-size:12.5px;font-weight:700;line-height:1.2}.bp-outcome,.bp-period{color:var(--cp-text-muted);font-size:11.5px;line-height:1.35}
.quick-guide{max-width:1400px;margin:0 auto 14px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.quick-guide div{background:var(--cp-surface);border:1px solid var(--cp-border);border-left:4px solid var(--cp-accent);border-radius:0.625rem;padding:12px 14px}.quick-guide strong{display:block;color:var(--cp-accent);font-size:13px;margin-bottom:3px}.quick-guide span{display:block;color:var(--cp-text-muted);font-size:12px;line-height:1.35}
.grid-wrap{overflow-x:auto;text-align:center}.grid{display:inline-block;padding:12px;background:var(--cp-surface);border:1px solid var(--cp-border);border-radius:8px;box-shadow:0 0 2px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.14)}.row{display:flex;gap:4px;margin-bottom:4px}.cell{width:70px;height:78px;position:relative;padding:4px;border:1px solid var(--cp-border);border-radius:0.625rem;background:var(--cp-surface-soft);color:var(--cp-text);cursor:pointer;transition:transform .12s ease,opacity .12s ease,border-color .12s ease,background .12s ease;overflow:hidden}.cell:hover{transform:translateY(-2px);border-color:var(--cp-accent);z-index:5;box-shadow:var(--cp-shadow)}.cell:focus{outline:2px solid var(--cp-accent);outline-offset:1px}.cell.empty{visibility:hidden;pointer-events:none}.cell.label{height:46px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--cp-accent);color:var(--cp-accent-fg);border-color:var(--cp-accent);cursor:default;font-size:10px;line-height:1.05;font-weight:700}.cell.label span{margin-top:3px;font-weight:500;font-size:8px}.header-row .cell.label:first-child{width:88px}.cell.period-label{width:88px;display:flex;align-items:center;justify-content:center;background:var(--cp-bg-elevated);cursor:default;font-size:10px;font-weight:700;color:var(--cp-text-muted)}.cell.period-label:hover,.cell.label:hover,.cell.pointer:hover{transform:none;box-shadow:none}.atomic{position:absolute;top:3px;left:5px;font-size:9px;color:var(--cp-text-soft)}.symbol{font-weight:800;font-size:18px;text-align:center;margin-top:12px;color:var(--cp-text)}.name{font-size:8.5px;text-align:center;color:var(--cp-text-muted);margin-top:2px;line-height:1.05}.pointer{display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:default}.range{font-weight:700;font-size:12px}.ptr-label{font-size:9px;color:var(--cp-text-muted);margin-top:3px}.lanth-actin{margin-top:14px}.band-title{display:block;font-size:10px;font-weight:700;color:var(--cp-text);line-height:1.12}.band-sub{display:block;font-size:8px;color:var(--cp-text-muted);margin-top:5px;font-weight:500;line-height:1.1;white-space:nowrap}.dimmed{opacity:.18}.highlighted{outline:2px solid var(--cp-accent);outline-offset:1px;box-shadow:0 0 0 4px var(--cp-highlight);z-index:4}
${cssGroups}
.gL{background:color-mix(in srgb,var(--cp-warning) 32%,var(--cp-surface))}.gA{background:color-mix(in srgb,var(--cp-danger) 20%,var(--cp-surface))}
.legend-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 14px}.legend-item{display:flex;align-items:center;gap:8px;background:transparent;border:1px solid transparent;border-radius:5px;padding:5px 8px;font-size:12.5px}.swatch{width:18px;height:18px;border-radius:4px;border:1px solid var(--cp-border);flex-shrink:0}.legend-num{font-weight:700;min-width:18px;color:var(--cp-text)}
.maturity dl{margin:0;display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;font-size:13px}.maturity dt{font-weight:700;color:var(--cp-accent)}.maturity dd{margin:0;color:var(--cp-text-muted)}
.panel-backdrop{position:fixed;inset:0;background:var(--cp-overlay);z-index:200;opacity:0;pointer-events:none;transition:opacity .15s ease}.panel-backdrop.show{opacity:1;pointer-events:auto}.detail-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.96);width:min(520px,calc(100vw - 32px));background:var(--cp-surface);border-radius:12px;box-shadow:var(--cp-shadow);z-index:201;opacity:0;pointer-events:none;transition:opacity .15s ease,transform .15s ease;overflow:hidden;border:1px solid var(--cp-border)}.detail-panel.show{opacity:1;pointer-events:auto;transform:translate(-50%,-50%) scale(1)}.dp-header{padding:22px 56px 18px 24px;display:flex;align-items:flex-start;gap:18px;border-bottom:1px solid var(--cp-border);position:relative}.dp-symbol-box{width:88px;height:88px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid var(--cp-border);flex-shrink:0;position:relative}.dp-atomic{position:absolute;top:6px;left:8px;font-size:11px;color:var(--cp-text-soft)}.dp-symbol{font-size:30px;font-weight:800;color:var(--cp-text);margin-top:6px}.dp-title h3{margin:0 0 4px;font-size:19px;color:var(--cp-accent);line-height:1.25}.dp-domain{font-size:13px;color:var(--cp-text-muted)}.dp-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:0;background:transparent;border-radius:6px;cursor:pointer;color:var(--cp-text-muted);font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center}.dp-close:hover{background:var(--cp-surface-soft);color:var(--cp-text)}.dp-value-section{padding:14px 24px 0;margin-bottom:4px}.dp-value-block{margin-bottom:12px}.dp-value-label{font-size:10.5px;color:var(--cp-accent);text-transform:uppercase;letter-spacing:.04em;font-weight:700;margin-bottom:3px}.dp-value-text{font-size:13px;color:var(--cp-text);line-height:1.45}.dp-body{padding:16px 24px 18px;display:grid;grid-template-columns:max-content 1fr;gap:10px 18px;font-size:13px}.dp-body dt{font-weight:600;color:var(--cp-accent);text-transform:uppercase;font-size:10.5px;letter-spacing:.04em;align-self:center}.dp-body dd{margin:0;color:var(--cp-text);align-self:center}.dp-nav{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:var(--cp-surface-soft);border-top:1px solid var(--cp-border)}.dp-nav button{background:var(--cp-surface);border:1px solid var(--cp-border);color:var(--cp-text);padding:6px 14px;border-radius:5px;cursor:pointer;font-size:12px}.dp-nav button:hover:not(:disabled){border-color:var(--cp-accent);color:var(--cp-accent)}.dp-nav button:disabled{opacity:.35;cursor:not-allowed}.dp-counter{font-size:11px;color:var(--cp-text-muted)}
.narrative{padding:20px 28px}.narrative .lead{font-size:13.5px;color:var(--cp-text);border-left:3px solid var(--cp-accent);padding-left:14px;margin-bottom:14px}.narrative p,.narrative li{font-size:13px;line-height:1.55;color:var(--cp-text-muted)}.narrative ul{margin:4px 0 12px;padding-left:22px}footer{text-align:center;color:var(--cp-text-muted);font-size:11px;margin-top:18px}
@media print{body{padding:6px;min-width:0}.controls,.goals,.quick-guide,.series-nav{display:none}.cell:hover{transform:none;box-shadow:none}.grid{box-shadow:none}}
</style>
</head>
<body>
<nav class="series-nav" aria-label="Periodic Table of Agents series"><span class="series-label">Periodic Table of Agents</span><span class="sep">/</span><span class="series-current">${escapeHtml(catalog.nav)}</span><span class="sep">/</span>${seriesLinks}</nav>
<header>
  <h1>Periodic Table of Agents: ${escapeHtml(catalog.title)}</h1>
  <p class="header-lead">${escapeHtml(catalog.lead)}</p>
  <p class="header-sub">Columns are industry domains. Rows are maturity levels. Bottom bands show core systems and trust controls required to move from agents to agency.</p>
</header>
<section class="goals">
  <h2>Strategic priorities</h2>
  <p class="ph-sub">Pick an industry priority to highlight a recommended five-agent build sequence.</p>
  <div class="goals-grid" id="goalsGrid"></div>
  <div class="build-plan" id="buildPlan" hidden>
    <div class="bp-header"><h3 id="bpTitle"></h3><div class="bp-sequence" id="bpSequence"></div></div>
    <div class="build-grid" id="bpGrid"></div>
    <button class="clear-button" id="bpClear" type="button">Clear priority</button>
  </div>
</section>
<div class="quick-guide"><div><strong>Start with a domain</strong><span>Use columns to find where work actually happens in ${escapeHtml(catalog.context)} operations.</span></div><div><strong>Move down by maturity</strong><span>Rows progress from reference support to cross-system orchestration and oversight.</span></div><div><strong>Govern the bottom bands</strong><span>Core systems and trust agents determine whether high-power workflows can scale safely.</span></div></div>
<div class="controls"><input id="search" type="search" placeholder="Search agents, systems, priorities, domains, or guardrails"><button class="reset" id="reset" type="button">Reset</button></div>
<main class="grid-wrap"><div class="grid" id="grid"></div></main>
<section class="legend"><h2>Domain legend</h2><div class="legend-grid" id="legend"></div></section>
<section class="maturity"><h2>Maturity model</h2><dl>${Object.entries(tiers).map(([n, label]) => `<dt>Period ${n}: ${label}</dt><dd>${maturityDescription(Number(n))}</dd>`).join("")}</dl></section>
<section class="narrative"><h2>How to use this table</h2><p class="lead">This is a strategic operating map, not a product list. It helps teams identify where agents create value, which systems they must connect to, and what guardrails are required before autonomy increases.</p><ul><li>Use strategic priorities to find credible starting sequences.</li><li>Use domains to localize agent examples to real work, not generic productivity.</li><li>Use systems and guardrails in each detail card to shape pilots, governance reviews, and customer conversations.</li></ul></section>
<div class="panel-backdrop" id="backdrop"></div>
<aside class="detail-panel" id="detailPanel" aria-modal="true" role="dialog">
  <div class="dp-header"><div class="dp-symbol-box"><span class="dp-atomic" id="dpAtomic"></span><span class="dp-symbol" id="dpSymbol"></span></div><div class="dp-title"><h3 id="dpName"></h3><div class="dp-domain" id="dpDomain"></div></div><button class="dp-close" id="dpClose" type="button" aria-label="Close">&times;</button></div>
  <div class="dp-value-section"><div class="dp-value-block"><div class="dp-value-label">Purpose</div><div class="dp-value-text" id="dpPurpose"></div></div></div>
  <dl class="dp-body"><dt>Maturity</dt><dd id="dpTier"></dd><dt>Systems</dt><dd id="dpSystems"></dd><dt>Guardrails</dt><dd id="dpGuardrails"></dd></dl>
  <div class="dp-nav"><button id="prevAgent" type="button">Previous</button><span class="dp-counter" id="dpCounter"></span><button id="nextAgent" type="button">Next</button></div>
</aside>
<footer>Generated as part of the Periodic Table of Agents industry catalog.</footer>
<script>
const domains = ${JSON.stringify(domains)};
const agents = ${JSON.stringify(agents)};
const goals = ${JSON.stringify(goals)};
let currentFilterGroup = null;
let currentGoal = null;
let currentDetailIndex = 0;
function findAgentById(id){return agents.find(a=>a.atomic===Number(id));}
function groupClass(group){return "g"+group;}
function renderGoals(){const wrap=document.getElementById("goalsGrid");wrap.innerHTML=goals.map(g=>\`<button class="goal-item" data-goal="\${g.id}"><span class="goal-label">\${g.title}</span><span class="goal-blurb">\${g.blurb}</span></button>\`).join("");wrap.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>selectGoal(btn.dataset.goal)));}
function renderGrid(){const grid=document.getElementById("grid");const header=\`<div class="row header-row"><div class="cell label">&nbsp;</div>\${domains.map(d=>\`<div class="cell label">\${d.g}<br><span>\${d.short}</span></div>\`).join("")}</div>\`;const rows=[1,2,3,4,5,6,7].map(p=>{let cells=[\`<div class="cell period-label">Period \${p}</div>\`];for(let g=1;g<=18;g++){if(p===6&&g===3){cells.push('<div class="cell pointer"><div class="range">57-71</div><div class="ptr-label">Core Systems</div></div>');continue;}if(p===7&&g===3){cells.push('<div class="cell pointer"><div class="range">89-103</div><div class="ptr-label">Trust Layer</div></div>');continue;}const a=agents.find(x=>x.group===g&&x.period===p);cells.push(a?cellHtml(a):'<div class="cell empty"></div>');}return \`<div class="row">\${cells.join("")}</div>\`;}).join("");const core=bandRow("Core Systems","(Lanthanides)",agents.filter(a=>a.group==="L"));const trust=bandRow("Trust Layer","(Actinides)",agents.filter(a=>a.group==="A"));grid.innerHTML=header+rows+\`<div class="lanth-actin">\${core}\${trust}</div>\`;document.querySelectorAll(".cell[data-symbol]").forEach(el=>{el.addEventListener("click",()=>openDetail(el.dataset.id));el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openDetail(el.dataset.id);});});}
function cellHtml(a){return \`<div class="cell \${groupClass(a.group)}" data-symbol="\${a.symbol}" data-id="\${a.atomic}" data-group="\${a.group}" tabindex="0"><div class="atomic">\${a.atomic}</div><div class="symbol">\${a.symbol}</div><div class="name">\${a.label}</div></div>\`;}
function bandRow(title,sub,list){const cells=[\`<div class="cell period-label"><span class="band-title">\${title}</span><span class="band-sub">\${sub}</span></div>\`,'<div class="cell empty"></div>','<div class="cell empty"></div>','<div class="cell empty"></div>'];list.forEach(a=>cells.push(cellHtml(a)));return \`<div class="row">\${cells.join("")}</div>\`;}
function renderLegend(){const legend=document.getElementById("legend");legend.innerHTML=domains.map(d=>\`<button class="legend-item" data-group="\${d.g}"><span class="swatch g\${d.g}"></span><span class="legend-num">\${d.g}</span><span>\${d.name}</span></button>\`).join("");legend.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{currentFilterGroup=currentFilterGroup===String(btn.dataset.group)?null:String(btn.dataset.group);applyFilters();}));}
function selectGoal(id){currentGoal=goals.find(g=>g.id===id);document.querySelectorAll(".goal-item").forEach(b=>b.classList.toggle("active",b.dataset.goal===id));const plan=document.getElementById("buildPlan");plan.hidden=false;document.getElementById("bpTitle").textContent=currentGoal.title;document.getElementById("bpSequence").textContent=currentGoal.sequence.map(id=>findAgentById(id).symbol).join(" -> ");document.getElementById("bpGrid").innerHTML=currentGoal.sequence.map((id,i)=>{const a=findAgentById(id);return \`<button class="build-card" data-id="\${a.atomic}"><div class="build-card-head"><span class="mini-symbol \${groupClass(a.group)}">\${a.symbol}</span><span class="bp-step">Step \${i+1}</span></div><div class="bp-name">\${a.name}</div><div class="bp-outcome">\${a.purpose}</div><div class="bp-period">Period \${a.period}: \${a.tier}</div></button>\`;}).join("");document.querySelectorAll(".build-card").forEach(b=>b.addEventListener("click",()=>openDetail(b.dataset.id)));applyFilters();}
function applyFilters(){const q=document.getElementById("search").value.trim().toLowerCase();const goalIds=currentGoal?new Set(currentGoal.sequence.map(Number)):null;document.querySelectorAll(".legend-item").forEach(b=>b.classList.toggle("active",currentFilterGroup===String(b.dataset.group)));document.querySelectorAll(".cell[data-symbol]").forEach(el=>{const a=findAgentById(el.dataset.id);const haystack=Object.values(a).join(" ").toLowerCase();const visible=(!q||haystack.includes(q))&&(!currentFilterGroup||String(a.group)===currentFilterGroup)&&(!goalIds||goalIds.has(a.atomic));el.classList.toggle("dimmed",!visible);el.classList.toggle("highlighted",visible&&(!!q||!!currentFilterGroup||!!goalIds));});}
function openDetail(id){const a=findAgentById(id);currentDetailIndex=agents.indexOf(a);document.querySelector(".dp-symbol-box").className=\`dp-symbol-box \${groupClass(a.group)}\`;document.getElementById("dpAtomic").textContent=a.atomic;document.getElementById("dpSymbol").textContent=a.symbol;document.getElementById("dpName").textContent=a.name;document.getElementById("dpDomain").textContent=a.domain;document.getElementById("dpTier").textContent=\`Period \${a.period}: \${a.tier}\`;document.getElementById("dpPurpose").textContent=a.purpose;document.getElementById("dpSystems").textContent=a.systems;document.getElementById("dpGuardrails").textContent=a.guardrails;document.getElementById("dpCounter").textContent=\`\${currentDetailIndex+1} of \${agents.length}\`;document.getElementById("prevAgent").disabled=currentDetailIndex===0;document.getElementById("nextAgent").disabled=currentDetailIndex===agents.length-1;document.getElementById("detailPanel").classList.add("show");document.getElementById("backdrop").classList.add("show");}
function closeDetail(){document.getElementById("detailPanel").classList.remove("show");document.getElementById("backdrop").classList.remove("show");}
function moveDetail(delta){const next=agents[currentDetailIndex+delta];if(next)openDetail(next.atomic);}
renderGoals();renderGrid();renderLegend();document.getElementById("search").addEventListener("input",applyFilters);document.getElementById("reset").addEventListener("click",()=>{document.getElementById("search").value="";currentFilterGroup=null;currentGoal=null;document.getElementById("buildPlan").hidden=true;document.querySelectorAll(".goal-item").forEach(b=>b.classList.remove("active"));applyFilters();});document.getElementById("bpClear").addEventListener("click",()=>{currentGoal=null;document.getElementById("buildPlan").hidden=true;document.querySelectorAll(".goal-item").forEach(b=>b.classList.remove("active"));applyFilters();});document.getElementById("dpClose").addEventListener("click",closeDetail);document.getElementById("backdrop").addEventListener("click",closeDetail);document.getElementById("prevAgent").addEventListener("click",()=>moveDetail(-1));document.getElementById("nextAgent").addEventListener("click",()=>moveDetail(1));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDetail();});
</script>
</body>
</html>`;
}

function maturityDescription(period) {
  return {
    1: "Reference agents answer questions and make trusted information easier to find.",
    2: "Assistant agents help prepare work products, briefs, drafts, and next-step recommendations.",
    3: "Transactional agents capture structured inputs and prepare records, requests, or evidence.",
    4: "Workflow agents route work, coordinate handoffs, and maintain process continuity.",
    5: "Decision-support agents prioritize, forecast, identify risk, and recommend action.",
    6: "Cross-organization agents connect workflows across teams, systems, and partners.",
    7: "Autonomous-oversight agents monitor operating patterns, orchestrate exceptions, and escalate safely.",
  }[period];
}

function makeLanding() {
  const cards = catalogs.map((catalog) => `<a class="sector-card" href="./${catalog.folder}/"><span class="badge live">Live</span><h3>${escapeHtml(catalog.nav)}</h3><small>${escapeHtml(catalog.lead)}</small></a>`).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Periodic Table of Agents</title>
<script>
  (() => {
    const param = new URLSearchParams(window.location.search).get("clawpilotTheme");
    const theme =
      param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
<style>
:root {
  color-scheme: light;
  --cp-bg: #f7f4ef;
  --cp-bg-elevated: #fcfbf8;
  --cp-surface: #ffffff;
  --cp-surface-soft: #f5f5f5;
  --cp-border: #dedede;
  --cp-border-strong: #919191;
  --cp-text: #242424;
  --cp-text-muted: #5c5c5c;
  --cp-text-soft: #6f6f6f;
  --cp-accent: #b11f4b;
  --cp-accent-hover: #9a1a41;
  --cp-accent-soft: rgba(177, 31, 75, 0.08);
  --cp-accent-fg: #ffffff;
  --cp-success: #16a34a;
  --cp-danger: #dc2626;
  --cp-warning: #f59e0b;
  --cp-link: #0078d4;
  --cp-shadow: 0 18px 48px rgba(0, 0, 0, 0.12);
  --cp-overlay: rgba(255, 255, 255, 0.8);
  --cp-panel: rgba(255, 255, 255, 0.86);
  --cp-panel-strong: rgba(255, 255, 255, 0.96);
  --cp-sheen: rgba(255, 255, 255, 0.55);
  --cp-highlight: rgba(177, 31, 75, 0.12);
}
html[data-theme="dark"] {
  color-scheme: dark;
  --cp-bg: #3d3b3a;
  --cp-bg-elevated: #343231;
  --cp-surface: #292929;
  --cp-surface-soft: #2e2e2e;
  --cp-border: #474747;
  --cp-border-strong: #5f5f5f;
  --cp-text: #dedede;
  --cp-text-muted: #919191;
  --cp-text-soft: #b0b0b0;
  --cp-accent: #fd8ea1;
  --cp-accent-hover: #fb7b91;
  --cp-accent-soft: rgba(253, 142, 161, 0.14);
  --cp-accent-fg: #1a1a1a;
  --cp-success: #4ade80;
  --cp-danger: #f87171;
  --cp-warning: #fbbf24;
  --cp-link: #4da6ff;
  --cp-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
  --cp-overlay: rgba(41, 41, 41, 0.88);
  --cp-panel: rgba(41, 41, 41, 0.72);
  --cp-panel-strong: rgba(41, 41, 41, 0.96);
  --cp-sheen: rgba(255, 255, 255, 0.04);
  --cp-highlight: rgba(253, 142, 161, 0.12);
}
*{box-sizing:border-box}body{margin:0;background:var(--cp-bg);color:var(--cp-text);font-family:"Segoe UI",Aptos,Calibri,-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6}.hero{background:var(--cp-accent);color:var(--cp-accent-fg);padding:64px 24px;text-align:center}.hero h1{font-size:clamp(36px,6vw,64px);line-height:1;margin:0 0 16px;letter-spacing:-.04em}.hero p{max-width:780px;margin:0 auto;color:var(--cp-accent-fg);opacity:.82;font-size:18px}.container{max-width:1180px;margin:0 auto;padding:48px 24px}.panel{background:var(--cp-surface);border:1px solid var(--cp-border);border-radius:16px;box-shadow:0 0 2px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.14);padding:24px;margin-bottom:28px}.panel h2{color:var(--cp-accent);margin:0 0 12px;font-size:20px}.panel p{color:var(--cp-text-muted);margin:0}.sector-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.sector-card{display:flex;flex-direction:column;gap:10px;padding:22px;border-radius:16px;background:var(--cp-surface);border:1px solid var(--cp-border);text-decoration:none;color:var(--cp-text);box-shadow:0 0 2px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.14);transition:transform .15s ease,border-color .15s ease}.sector-card:hover{transform:translateY(-3px);border-color:var(--cp-accent)}.badge{align-self:flex-start;border-radius:0.625rem;padding:3px 9px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;background:var(--cp-accent-soft);color:var(--cp-accent);border:1px solid var(--cp-border)}.sector-card h3{margin:0;color:var(--cp-accent);font-size:18px}.sector-card small{color:var(--cp-text-muted);font-size:13px;line-height:1.45}footer{text-align:center;color:var(--cp-text-muted);font-size:12px;padding:24px}
</style>
</head>
<body>
<section class="hero"><h1>Periodic Table of Agents</h1><p>A structured catalog of industry-specific agent ecosystems, strategic priorities, domain workflows, core systems, and trust controls.</p></section>
<main class="container"><section class="panel"><h2>How to use the catalog</h2><p>Choose an industry table, select a strategic priority, and use the highlighted five-agent build sequence to move from credible starting point to governed orchestration.</p></section><section class="sector-grid">${cards}</section></main>
<footer>Reynolds Periodic Table of Agents industry catalog.</footer>
</body>
</html>`;
}

function makeReadme() {
  const list = catalogs.map((catalog) => `- [${catalog.nav}](./${catalog.folder}/)`).join("\n");
  const structure = catalogs.map((catalog) => `  /${catalog.folder}/index.html`).join("\n");
  return `# Periodic Table of Agents

An interactive framework for understanding and building AI agent ecosystems across industries.

## Live Site

https://reynolds711.github.io/periodic-table-of-agents/

## Industry Catalog

${list}

## What This Is

This is not a list of tools. It is a decision framework to help leaders:

- Identify high-value AI opportunities by industry and domain.
- Understand progression from reference assistants to governed orchestration.
- Sequence implementation using strategic priority build paths.
- Align agent concepts to real systems, workflows, guardrails, and trust controls.

## How to Use It

1. Start with an industry table.
2. Select a strategic priority.
3. Review the recommended five-agent sequence.
4. Open individual cells to inspect purpose, systems, maturity, and guardrails.
5. Use the bottom bands to plan core systems and trust controls before scaling autonomy.

## Repository Structure

\`\`\`text
/
  index.html
  README.md
${structure}
  /scripts/generate-catalogs.js
\`\`\`

## Design Principles

1. Start with outcomes, not tools.
2. Make each table industry/domain-specific.
3. Sequence matters more than scale.
4. Cross-domain agents drive disproportionate value.
5. High-power agents require governance, data quality, and human accountability.
`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

catalogs.forEach((catalog) => {
  writeFile(path.join(root, catalog.folder, "index.html"), makeHtml(catalog));
});
writeFile(path.join(root, "index.html"), makeLanding());
writeFile(path.join(root, "README.md"), makeReadme());

console.log(`Generated ${catalogs.length} industry catalogs.`);
