import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContact,
  chatMessages, type ChatMessage, type InsertChatMessage,
  documents, type Document, type InsertDocument
} from "@shared/schema";

// Storage interface with all required CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
  
  // Chat methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatSessionMessages(sessionId: string): Promise<ChatMessage[]>;
  
  // Document methods
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private chatMessages: Map<number, ChatMessage>;
  private documents: Map<number, Document>;
  
  private userIdCounter: number;
  private contactIdCounter: number;
  private chatMessageIdCounter: number;
  private documentIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.chatMessages = new Map();
    this.documents = new Map();
    
    this.userIdCounter = 1;
    this.contactIdCounter = 1;
    this.chatMessageIdCounter = 1;
    this.documentIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact submission methods
  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const id = this.contactIdCounter++;
    const createdAt = new Date();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  // Chat methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageIdCounter++;
    const createdAt = new Date();
    const chatMessage: ChatMessage = { 
      ...message, 
      id, 
      createdAt 
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  // Document methods
  async createDocument(doc: InsertDocument): Promise<Document> {
    const id = this.documentIdCounter++;
    const createdAt = new Date();
    const document: Document = { 
      ...doc, 
      id, 
      createdAt 
    };
    this.documents.set(id, document);
    return document;
  }
  
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }
}

export const storage = new MemStorage();
