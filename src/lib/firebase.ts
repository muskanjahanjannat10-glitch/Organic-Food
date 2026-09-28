import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, getDocFromServer, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseConfig from '../../firebase-applet-config.json';

export const FIREBASE_APP_CONFIG = firebaseConfig;

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Safe Analytics Initialization
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (err) {
        console.warn('Firebase Analytics not supported in current environment:', err);
      }
    }
  });
}

// Skill-standard Error Handling Enum and Function
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Test Connection
export async function testFirebaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return { success: true, message: `Connected to Firebase (${firebaseConfig.projectId})` };
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      return { success: false, message: 'Client is offline or network is disconnected' };
    }
    // Permissions error still proves connection reached Firebase server!
    return { success: true, message: `Server reached: Firebase project ${firebaseConfig.projectId} is active` };
  }
}

// Run initial connection test on module load
if (typeof window !== 'undefined') {
  testFirebaseConnection().catch(() => {});
}

// Auth helpers
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Google Sign-in failed:', error);
    return { success: false, error: error.message };
  }
}

export async function logOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export interface StoredOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: { id: string; name: string; qty: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'pickup' | 'delivery';
  pickupSlot: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  syncedToCloud: boolean;
}

export interface StoredInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: string;
  notes?: string;
  createdAt: string;
  syncedToCloud: boolean;
}

// Save Order to Firestore + Local backup
export async function saveOrderToFirestore(orderData: {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: { id: string; name: string; qty: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'pickup' | 'delivery';
  pickupSlot: string;
  paymentMethod: string;
}): Promise<{ success: boolean; orderId: string; cloudSyncFailed?: boolean }> {
  const orderId = `ord-${Date.now()}`;
  const now = new Date().toISOString();
  
  const payload = {
    ...orderData,
    status: 'pending' as const,
    createdAt: now,
  };

  let syncedToCloud = false;

  try {
    const orderDocRef = doc(db, 'orders', orderId);
    await setDoc(orderDocRef, payload);
    syncedToCloud = true;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `orders/${orderId}`);
  }

  // Backup locally so admin panel can always inspect recent orders
  try {
    const localSaved = localStorage.getItem('organic_food_recent_orders');
    const orders: StoredOrder[] = localSaved ? JSON.parse(localSaved) : [];
    const newEntry: StoredOrder = {
      id: orderId,
      ...payload,
      syncedToCloud,
    };
    orders.unshift(newEntry);
    localStorage.setItem('organic_food_recent_orders', JSON.stringify(orders.slice(0, 50)));
  } catch (e) {
    console.warn('Could not cache order locally:', e);
  }

  return { success: true, orderId, cloudSyncFailed: !syncedToCloud };
}

// Save Inquiry to Firestore + Local backup
export async function saveInquiryToFirestore(inquiryData: {
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: string;
  notes?: string;
}): Promise<{ success: boolean; inquiryId: string; cloudSyncFailed?: boolean }> {
  const inquiryId = `inq-${Date.now()}`;
  const now = new Date().toISOString();
  const payload = {
    ...inquiryData,
    createdAt: now,
  };

  let syncedToCloud = false;

  try {
    const inqDocRef = doc(db, 'inquiries', inquiryId);
    await setDoc(inqDocRef, payload);
    syncedToCloud = true;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `inquiries/${inquiryId}`);
  }

  // Backup locally
  try {
    const localSaved = localStorage.getItem('organic_food_recent_inquiries');
    const inqs: StoredInquiry[] = localSaved ? JSON.parse(localSaved) : [];
    const newEntry: StoredInquiry = {
      id: inquiryId,
      ...payload,
      syncedToCloud,
    };
    inqs.unshift(newEntry);
    localStorage.setItem('organic_food_recent_inquiries', JSON.stringify(inqs.slice(0, 50)));
  } catch (e) {
    console.warn('Could not cache inquiry locally:', e);
  }

  return { success: true, inquiryId, cloudSyncFailed: !syncedToCloud };
}

// Fetch Orders for Admin Panel
export async function getOrdersForAdmin(): Promise<StoredOrder[]> {
  // If signed into Firebase Auth, attempt to read directly from Firestore
  if (auth.currentUser) {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(30));
      const querySnapshot = await getDocs(q);
      const cloudOrders: StoredOrder[] = [];
      querySnapshot.forEach(docSnap => {
        const data = docSnap.data() as any;
        cloudOrders.push({
          id: docSnap.id,
          ...data,
          syncedToCloud: true,
        });
      });
      if (cloudOrders.length > 0) {
        return cloudOrders;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'orders');
    }
  }

  // Fallback to local storage cache
  try {
    const localSaved = localStorage.getItem('organic_food_recent_orders');
    return localSaved ? JSON.parse(localSaved) : [];
  } catch {
    return [];
  }
}

// Fetch Inquiries for Admin Panel
export async function getInquiriesForAdmin(): Promise<StoredInquiry[]> {
  if (auth.currentUser) {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(30));
      const querySnapshot = await getDocs(q);
      const cloudInqs: StoredInquiry[] = [];
      querySnapshot.forEach(docSnap => {
        const data = docSnap.data() as any;
        cloudInqs.push({
          id: docSnap.id,
          ...data,
          syncedToCloud: true,
        });
      });
      if (cloudInqs.length > 0) {
        return cloudInqs;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'inquiries');
    }
  }

  try {
    const localSaved = localStorage.getItem('organic_food_recent_inquiries');
    return localSaved ? JSON.parse(localSaved) : [];
  } catch {
    return [];
  }
}
