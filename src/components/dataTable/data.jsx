const opexHeaders = [
  'Opex Category',
  'Description',
  'Amount',
  '% of Total Expense',
  'Month over Month Change',
  'Actions',
]

const capexHeaders = [
  'Capex Category',
  'Asset Description',
  'Amount',
  'Percent Of Total Capex',
  'Date Of Expenses',
  'Expected LifeSpan',
  'Depreciation Rate',
  'Actions',
]

const opexData = [
  {
    id: 1,
    category: 'Salaries & Wages',
    description: 'Employee salaries and wages for the month',
    amount: 25000,
    percentOfTotalExpense: 35,
    momChange: 5.2, // 5.2% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 2,
    category: 'Office Supplies',
    description: 'Cost of office supplies including paper, pens, and printers',
    amount: 1200,
    percentOfTotalExpense: 1.68,
    momChange: -3.5, // 3.5% decrease compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 3,
    category: 'Utilities',
    description: 'Electricity, water, and internet bills',
    amount: 3500,
    percentOfTotalExpense: 4.88,
    momChange: 2.1, // 2.1% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 4,
    category: 'Rent',
    description: 'Monthly office rent',
    amount: 8000,
    percentOfTotalExpense: 11.2,
    momChange: 0, // No change from last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 5,
    category: 'Marketing & Advertising',
    description: 'Ads, campaigns, and promotional materials',
    amount: 4000,
    percentOfTotalExpense: 5.6,
    momChange: -10.2, // 10.2% decrease compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 6,
    category: 'Insurance',
    description: 'Health, property, and liability insurance',
    amount: 1500,
    percentOfTotalExpense: 2.1,
    momChange: 1.5, // 1.5% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 7,
    category: 'Travel',
    description: 'Expenses related to business travel',
    amount: 2200,
    percentOfTotalExpense: 3.08,
    momChange: -7.3, // 7.3% decrease compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 8,
    category: 'Legal & Professional Fees',
    description: 'Consultation and legal services fees',
    amount: 1800,
    percentOfTotalExpense: 2.52,
    momChange: 0.9, // 0.9% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 9,
    category: 'Technology & Software',
    description: 'Software subscriptions and tech-related purchases',
    amount: 2800,
    percentOfTotalExpense: 3.92,
    momChange: 4.4, // 4.4% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
  {
    id: 10,
    category: 'Miscellaneous',
    description: 'Uncategorized or unforeseen expenses',
    amount: 500,
    percentOfTotalExpense: 0.7,
    momChange: 12.8, // 12.8% increase compared to last month
    actions: ['view', 'edit', 'print', 'delete'],
  },
]

const capexData = [
  {
    id: 1, // Added ID
    capexCategory: 'Equipment',
    assetDescription: 'Industrial Printer',
    amount: 50000,
    percentOfTotalCapex: 25,
    dateOfExpenses: '2025-01-01',
    expectedLifeSpan: 5,
    depreciationRate: 20,
  },
  {
    id: 2, // Added ID
    capexCategory: 'Infrastructure',
    assetDescription: 'Building Renovation',
    amount: 100000,
    percentOfTotalCapex: 50,
    dateOfExpenses: '2025-01-15',
    expectedLifeSpan: 20,
    depreciationRate: 5,
  },
  {
    id: 3, // Added ID
    capexCategory: 'Technology',
    assetDescription: 'IT System Upgrade',
    amount: 30000,
    percentOfTotalCapex: 15,
    dateOfExpenses: '2025-01-20',
    expectedLifeSpan: 3,
    depreciationRate: 33,
  },
  {
    id: 4, // Added ID
    capexCategory: 'Vehicles',
    assetDescription: 'Delivery Truck',
    amount: 20000,
    percentOfTotalCapex: 10,
    dateOfExpenses: '2025-01-22',
    expectedLifeSpan: 7,
    depreciationRate: 14,
  },
  {
    id: 5, // Added ID
    capexCategory: 'Equipment',
    assetDescription: 'CNC Machine',
    amount: 75000,
    percentOfTotalCapex: 15,
    dateOfExpenses: '2025-02-01',
    expectedLifeSpan: 10,
    depreciationRate: 10,
  },
  {
    id: 6, // Added ID
    capexCategory: 'Infrastructure',
    assetDescription: 'Parking Lot Expansion',
    amount: 150000,
    percentOfTotalCapex: 30,
    dateOfExpenses: '2025-02-10',
    expectedLifeSpan: 25,
    depreciationRate: 4,
  },
  {
    id: 7, // Added ID
    capexCategory: 'Technology',
    assetDescription: 'Enterprise Software',
    amount: 50000,
    percentOfTotalCapex: 20,
    dateOfExpenses: '2025-02-15',
    expectedLifeSpan: 5,
    depreciationRate: 20,
  },
  {
    id: 8, // Added ID
    capexCategory: 'Vehicles',
    assetDescription: 'Forklift',
    amount: 35000,
    percentOfTotalCapex: 7,
    dateOfExpenses: '2025-02-20',
    expectedLifeSpan: 8,
    depreciationRate: 12,
  },
  {
    id: 9, // Added ID
    capexCategory: 'Equipment',
    assetDescription: 'Laser Cutter',
    amount: 60000,
    percentOfTotalCapex: 22,
    dateOfExpenses: '2025-02-25',
    expectedLifeSpan: 7,
    depreciationRate: 15,
  },
  {
    id: 10, // Added ID
    capexCategory: 'Infrastructure',
    assetDescription: 'Office Building HVAC System',
    amount: 120000,
    percentOfTotalCapex: 18,
    dateOfExpenses: '2025-02-28',
    expectedLifeSpan: 15,
    depreciationRate: 6,
  },
]

export { opexHeaders, opexData, capexData, capexHeaders }
