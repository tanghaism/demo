// Mock data for 本地凭证箱 prototype

export interface Space {
  id: string
  name: string
  type: 'family' | 'freelancer' | 'business' | 'custom'
  icon: string
  documentCount: number
  lastUpdated: string
}

export interface Document {
  id: string
  title: string
  category: string
  type: string
  date: string
  expiryDate?: string
  thumbnailUrl?: string
  tags: string[]
  isExpiringSoon?: boolean
  isExpired?: boolean
  description?: string
  amount?: string
  parties?: string[]
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'pdf'
  url: string
  ocrText?: string
}

export interface Reminder {
  id: string
  documentId: string
  documentTitle: string
  type: 'expiry' | 'renewal' | 'custom'
  date: string
  daysRemaining: number
  category: string
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

// Spaces
export const spaces: Space[] = [
  {
    id: '1',
    name: '我的家庭',
    type: 'family',
    icon: '🏠',
    documentCount: 45,
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: '个人职业',
    type: 'freelancer',
    icon: '💼',
    documentCount: 23,
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: '商务经营',
    type: 'business',
    icon: '🏪',
    documentCount: 67,
    lastUpdated: '2024-01-15',
  },
]

// Categories for family space
export const familyCategories: Category[] = [
  { id: '1', name: '身份证件', icon: '🪪', count: 8 },
  { id: '2', name: '房产资料', icon: '🏠', count: 12 },
  { id: '3', name: '车辆资料', icon: '🚗', count: 5 },
  { id: '4', name: '保险单据', icon: '🛡️', count: 6 },
  { id: '5', name: '医疗记录', icon: '🏥', count: 4 },
  { id: '6', name: '教育资料', icon: '📚', count: 7 },
  { id: '7', name: '合同协议', icon: '📝', count: 3 },
]

// Categories for freelancer space
export const freelancerCategories: Category[] = [
  { id: '1', name: '合同协议', icon: '📝', count: 15 },
  { id: '2', name: '发票收据', icon: '🧾', count: 32 },
  { id: '3', name: '银行流水', icon: '🏦', count: 8 },
  { id: '4', name: '资质证书', icon: '📜', count: 5 },
  { id: '5', name: '项目资料', icon: '📁', count: 12 },
]

// Categories for business space
export const businessCategories: Category[] = [
  { id: '1', name: '营业执照', icon: '📋', count: 3 },
  { id: '2', name: '税务资料', icon: '🧾', count: 18 },
  { id: '3', name: '合同协议', icon: '📝', count: 25 },
  { id: '4', name: '员工资料', icon: '👥', count: 8 },
  { id: '5', name: '租赁合同', icon: '🏢', count: 4 },
  { id: '6', name: '进货单据', icon: '📦', count: 9 },
]

// Documents
export const documents: Document[] = [
  {
    id: '1',
    title: '房屋买卖合同',
    category: '房产资料',
    type: '合同',
    date: '2023-06-15',
    expiryDate: '2053-06-15',
    tags: ['购房', '重要'],
    description: '位于XX市XX区XX路XX号的房屋买卖合同',
    amount: '¥2,850,000',
    parties: ['张三（买方）', 'XX房地产开发有限公司（卖方）'],
    attachments: [
      { id: '1', name: '合同正本.pdf', type: 'pdf', url: '/mock/contract.pdf' },
      { id: '2', name: '产权证.jpg', type: 'image', url: '/mock/deed.jpg' },
    ],
  },
  {
    id: '2',
    title: '身份证',
    category: '身份证件',
    type: '证件',
    date: '2020-03-10',
    expiryDate: '2030-03-10',
    tags: ['个人', '证件'],
    description: '张三身份证',
  },
  {
    id: '3',
    title: '车辆保险单',
    category: '车辆资料',
    type: '保险',
    date: '2024-01-01',
    expiryDate: '2024-02-28',
    isExpiringSoon: true,
    tags: ['车险', '到期'],
    description: '2024年度车辆综合保险',
    amount: '¥4,500',
  },
  {
    id: '4',
    title: '驾驶证',
    category: '身份证件',
    type: '证件',
    date: '2018-05-20',
    expiryDate: '2024-01-20',
    isExpired: true,
    tags: ['驾照', '过期'],
    description: 'C1驾驶证',
  },
  {
    id: '5',
    title: '房产证',
    category: '房产资料',
    type: '证书',
    date: '2023-08-01',
    tags: ['房产', '重要'],
    description: '位于XX市XX区的不动产权证书',
  },
  {
    id: '6',
    title: '人寿保险合同',
    category: '保险单据',
    type: '保险',
    date: '2022-01-15',
    expiryDate: '2042-01-15',
    tags: ['人寿', '长期'],
    amount: '¥500,000',
  },
  {
    id: '7',
    title: '医疗发票',
    category: '医疗记录',
    type: '发票',
    date: '2024-01-10',
    tags: ['医疗', '报销'],
    amount: '¥1,234',
  },
  {
    id: '8',
    title: '毕业证书',
    category: '教育资料',
    type: '证书',
    date: '2015-06-30',
    tags: ['学历', '证书'],
    description: 'XX大学本科毕业证书',
  },
]

// Reminders
export const reminders: Reminder[] = [
  {
    id: '1',
    documentId: '4',
    documentTitle: '驾驶证',
    type: 'expiry',
    date: '2024-01-20',
    daysRemaining: -5,
    category: '身份证件',
  },
  {
    id: '2',
    documentId: '3',
    documentTitle: '车辆保险单',
    type: 'expiry',
    date: '2024-02-28',
    daysRemaining: 14,
    category: '车辆资料',
  },
  {
    id: '3',
    documentId: '2',
    documentTitle: '身份证',
    type: 'renewal',
    date: '2030-03-10',
    daysRemaining: 2245,
    category: '身份证件',
  },
]

// OCR result mock
export const ocrResult = {
  detected: true,
  confidence: 0.92,
  fields: {
    title: '服务合同',
    date: '2024-01-15',
    amount: '¥12,000',
    party1: '张三',
    party2: 'XX科技有限公司',
    type: '服务协议',
  },
}
