// Mock data for the TagMyKid app

export interface Child {
  id: string;
  name: string;
  grade: string;
  class: string;
  allergies: string[];
  qrCode: string;
  parentId: string;
  photoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
  inStock: boolean;
}

export interface Order {
  id: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
  parentId: string;
}

export interface ScanLog {
  id: string;
  childId: string;
  timestamp: string;
  location: string;
  scannedBy: string;
  reason: string;
}

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: 'Grade 5',
    class: '5A',
    allergies: ['Peanuts', 'Dairy'],
    qrCode: 'TMK001',
    parentId: '1',
    photoUrl: '/api/placeholder/120/120'
  },
  {
    id: '2',
    name: 'Liam Johnson',
    grade: 'Grade 3',
    class: '3B',
    allergies: [],
    qrCode: 'TMK002',
    parentId: '1',
    photoUrl: '/api/placeholder/120/120'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'School Lunch Box',
    price: 149.99,
    category: 'Lunch Supplies',
    imageUrl: '/api/placeholder/200/200',
    description: 'Insulated lunch box with compartments',
    inStock: true
  },
  {
    id: '2',
    name: 'Water Bottle',
    price: 79.99,
    category: 'Drinks',
    imageUrl: '/api/placeholder/200/200',
    description: 'BPA-free water bottle with school logo',
    inStock: true
  },
  {
    id: '3',
    name: 'Stationery Pack',
    price: 89.99,
    category: 'Stationery',
    imageUrl: '/api/placeholder/200/200',
    description: 'Complete stationery set for the school year',
    inStock: false
  },
  {
    id: '4',
    name: 'School Uniform Polo',
    price: 199.99,
    category: 'Uniform',
    imageUrl: '/api/placeholder/200/200',
    description: 'Official school polo shirt',
    inStock: true
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      { productId: '1', quantity: 1, price: 149.99 },
      { productId: '2', quantity: 2, price: 79.99 }
    ],
    total: 309.97,
    status: 'completed',
    date: '2024-01-15',
    parentId: '1'
  },
  {
    id: '2',
    items: [
      { productId: '4', quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    status: 'pending',
    date: '2024-01-20',
    parentId: '1'
  }
];

export const mockScanLogs: ScanLog[] = [
  {
    id: '1',
    childId: '1',
    timestamp: '2024-01-22T08:15:00Z',
    location: 'Main Gate',
    scannedBy: 'Security Guard',
    reason: 'School Entry'
  },
  {
    id: '2',
    childId: '2',
    timestamp: '2024-01-22T08:20:00Z',
    location: 'Main Gate',
    scannedBy: 'Security Guard',
    reason: 'School Entry'
  },
  {
    id: '3',
    childId: '1',
    timestamp: '2024-01-21T15:30:00Z',
    location: 'Library',
    scannedBy: 'Teacher',
    reason: 'Lost Item Found'
  }
];

export const mockStats = {
  totalLearners: 1247,
  todayScans: 89,
  pendingOrders: 23,
  monthlyRevenue: 45670,
  activeLearners: 1189,
  totalOrders: 156
};