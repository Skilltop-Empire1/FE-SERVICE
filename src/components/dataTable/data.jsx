const headers = [
  'Opex Category',
  'Description',
  'Amount',
  '% of Total Expense',
  'Month over Month Change',
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

export { headers, opexData }
