import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  QueryConstraint,
  setDoc
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

export interface BaseEntity {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  status?: any;
  isArchived?: boolean;
}

export class CoreService<T extends BaseEntity> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    const q = query(collection(db, this.collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as T;
  }

  private async _log(action: string, summary: string) {
    if (this.collectionName === "activityLogs") return;
    try {
      const { logActivity } = await import("./activity-logs.service");
      const user = auth.currentUser;
      const performedBy = user ? user.uid : "System";
      await logActivity(action, summary, performedBy);
    } catch (e) {
      console.error("Failed to auto-log activity:", e);
    }
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">, userId?: string): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId || auth.currentUser?.uid || null,
      isArchived: false,
    });
    
    await this._log(`${this.collectionName} Created`, `A new record was created in ${this.collectionName}`);
    return docRef.id;
  }

  async set(id: string, data: Omit<T, "id" | "createdAt" | "updatedAt">, userId?: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId || auth.currentUser?.uid || null,
      isArchived: false,
    });
    
    await this._log(`${this.collectionName} Set`, `Record ${id} was set in ${this.collectionName}`);
  }

  async update(id: string, data: Partial<T>, userId?: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
      lastEditedBy: userId || auth.currentUser?.uid || null,
    });
    
    await this._log(`${this.collectionName} Updated`, `Record ${id} was updated in ${this.collectionName}`);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
    await this._log(`${this.collectionName} Deleted`, `Record ${id} was deleted from ${this.collectionName}`);
  }

  async archive(id: string, userId?: string): Promise<void> {
    await this.update(id, { 
      isArchived: true, 
      status: "Archived" as any 
    } as Partial<T>, userId);
  }
}
