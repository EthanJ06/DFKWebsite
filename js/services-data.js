// DFK — Corporate & Commercial practice area data
const DFK_SERVICES = [
  {
    slug: "banking-and-finance",
    category: ["corporate-commercial"],
    title: "Banking and Finance",
    description: "We advise on bilateral facilities, syndicated structured financings, large commercial projects, debt restructuring, and capital market transactions, all aspects of financial relationships, loan transactions, guarantees, insolvency, restructuring, and complex financial deals, working with leading firms to close both local and cross-border transactions. Our attorneys have extensive experience in executing and litigating mortgages, debentures, loan agreements and commercial syndicate financing."
  },
  {
    slug: "oil-energy-natural-gas",
    category: ["corporate-commercial"],
    title: "Oil, Energy and Natural Gas",
    description: "We provide legal support for energy projects, including acquisitions, operations, regulatory compliance, and all forms of energy litigation for utilities and investors."
  },
  {
    slug: "foreign-investment-trade-commerce",
    category: ["corporate-commercial"],
    title: "Foreign Investment, Trade and Commerce",
    description: "We advise foreign investors on entering Guyana's market, offering risk management proposals, government liaison, policy advocacy, and strategic business advice."
  },
  {
    slug: "corporate-and-contract",
    category: ["corporate-commercial"],
    title: "Corporate and Contract",
    description: "We manage company formation, governance, mergers, acquisitions, joint ventures, compliance, and a range of commercial agreements for diverse clients, from startups to multinationals, and have extensive experience in resolving corporate disputes whether through litigation or ADR. We advise our clients on issues relative to publicly-held corporations as well as privately-held companies. These include director's liability, minority shareholders' rights, corporate governance issues, pre-emptive rights and rights of first refusal."
  },
  {
    slug: "mergers-and-acquisitions",
    category: ["corporate-commercial"],
    title: "Mergers and Acquisitions",
    description: "We deliver corporate and commercial legal services to a diverse clientele, including major financial institutions and local, regional, and international organizations. Our practice spans specialized areas such as construction law, mutual funds, private and public equity, regulatory compliance, restructuring, and insolvency. We also draft and negotiate a wide range of commercial contracts, including distribution, agency, and supply agreements, as well as employment and independent contractor contracts."
  },
  {
    slug: "intellectual-property",
    category: ["corporate-commercial"],
    title: "Intellectual Property",
    description: "Our IP attorneys manage trademark and patent registration, enforcement, licensing, litigation, and portfolio management."
  },
  {
    slug: "competition-law",
    category: ["corporate-commercial"],
    title: "Competition Law",
    description: "We counsel clients in Guyana and across CARICOM on trade and competition law, including matters before the Caribbean Court of Justice."
  },
  {
    slug: "insurance",
    category: ["corporate-commercial"],
    title: "Insurance",
    description: "We undertake insurance and reinsurance litigation, regulatory issues, and class actions."
  },
  {
    slug: "tax-law",
    category: ["corporate-commercial"],
    title: "Tax Law",
    description: "We collaborate with revenue authorities and consultants to deliver comprehensive tax strategies for our clients with an aim towards tax optimisation and compliance. The firm also has a robust history of successful income and corporate tax litigation and negotiation."
  },
  {
    slug: "probate-trusts-estates",
    category: ["corporate-commercial", "property-estates"],
    title: "Probate, Trusts and Estates",
    description: "We counsel individuals and entities with wealth preservation, succession planning, trust and estate administration, and related disputes, delivering tailored solutions for simple or complex needs."
  },
  {
    slug: "bankruptcy-insolvency-restructuring",
    category: ["corporate-commercial"],
    title: "Bankruptcy, Insolvency, and Restructuring",
    description: "Our team manages commercial litigation and transactional insolvency, representing debtors and creditors in reorganisation, foreclosure, liquidation, and related proceedings."
  },
  {
    slug: "employment-industrial-relations",
    category: ["corporate-commercial"],
    title: "Employment and Industrial Relations",
    description: "We provide expert guidance on employment contracts, workplace policies, and dismissal disputes, including unfair termination, redundancy, health and safety, and trade disputes."
  },
  {
    slug: "admiralty-and-maritime",
    category: ["corporate-commercial"],
    title: "Admiralty and Maritime",
    description: "We represent wharf managers and owners, brokers, ship owners, insurers, charterers, and related parties in matters involving contracts, casualty, pollution, salvage, energy, finance, and litigation."
  },
  {
    slug: "public-law",
    category: ["corporate-commercial"],
    title: "Public Law",
    description: "We offer legal representation and advice in administrative and judicial review and public procurement matters."
  },
  {
    slug: "receiverships",
    category: ["corporate-commercial"],
    title: "Receiverships",
    description: "We provide receivership services which include asset protection and management, financial investigation, debt repayment and liquidation and court reporting where appointed by the court."
  },
  {
    slug: "corporate-services",
    category: ["corporate-commercial"],
    title: "Corporate Services",
    description: "We provide corporate secretarial support to clients. We negotiate and draft articles of incorporation, by-laws, shareholders' agreements, voting trust agreements, proxies, resolutions, subscription agreements and other complex corporate documentation and record. We advise clients with respect to directors' and shareholders' meetings and related corporate governance matters."
  },

  // Property and Estates
  {
    slug: "real-estate-conveyancing",
    category: ["property-estates"],
    title: "Real Estate and Conveyancing",
    description: "We support real estate development transactions, and financing, conducting due diligence, title registration, and property marketing both locally and internationally."
  },
  {
    slug: "property-other-services",
    category: ["property-estates"],
    title: "Other Services",
    description: "Advice on and preparation of limited and general Powers of Attorney; advice on and preparation of Deed Polls; and general conveyancing and property advice."
  },

  // Mining and Environmental
  {
    slug: "mining",
    category: ["mining-environmental"],
    title: "Mining",
    description: "We guide clients through investment, operation, and regulatory requirements in Guyana's mining sector, leveraging practical industry knowledge and experience. We also offer litigation services in the mining sector, particularly relating to licensing agreements, mining and quarrying claims, worker disputes, and natural resource preservation."
  },
  {
    slug: "environmental-law",
    category: ["mining-environmental"],
    title: "Environmental Law",
    description: "Our expertise covers environmental issues in mining, manufacturing, agriculture, and compliance with regulations, assisting with disaster sites and providing regulatory counsel."
  },

  // Dispute Resolution
  {
    slug: "arbitration-and-mediation",
    category: ["dispute-resolution"],
    title: "Arbitration and Mediation",
    description: "Our firm prioritises efficient dispute resolution. We advocate and arbitrate under domestic and international rules and draft robust arbitration agreements. Our lead attorney Timothy Jonas has broad ADR experience."
  },
  {
    slug: "non-contentious-litigation",
    category: ["dispute-resolution"],
    title: "Non-Contentious Litigation",
    description: "The Court's function is not limited to resolving disputes between parties. Our team is here to guide you through the processes and make the necessary applications for obtaining the permissions and orders you require to meet your business and personal needs. These types of matters include but are not limited to: application for statutory licences; paternity orders; vesting of lands; and discharge of defunct charges and restrictive covenants on land."
  },
  {
    slug: "contentious-litigation",
    category: ["dispute-resolution"],
    title: "Contentious Litigation",
    description: "Our litigators provide full representation during negotiations, trials, hearings, arbitration, and mediation. Our ability to advocate for our clients in any of these contexts enables our team to create a legal strategy that is designed to achieve favourable outcomes, while also allowing for the flexibility to adjust as a case continues to evolve over time. Litigation covers but is not limited to all practice areas."
  }
];

function dfkGetServiceBySlug(slug){
  return DFK_SERVICES.find(s => s.slug === slug);
}
