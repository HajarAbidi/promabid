/**
 * PROMABID SaaS Infrastructure - Firestore Schema Definition (NoSQL)
 * 
 * Hierarchy Pattern: Root-Level Tenants with Sub-Collections for strict isolation.
 * 
 * 1. Collection: /tenants/{tenant_id}
 *    - name: "STE PROMABID SARL"
 *    - slug: "promabid"
 *    - owner_email: "hajarabidi03@gmail.com"
 *    - subscription_plan: "production"
 *    - created_at: Timestamp
 * 
 * 2. Sub-Collection: /tenants/{tenant_id}/quotes/{quote_id}
 *    - customer_name: String
 *    - customer_phone: String
 *    - customer_email: String
 *    - project_type: String
 *    - estimated_budget: String
 *    - description: String
 *    - status: Enum ["pending", "approved", "archived"]
 *    - source: "web_form"
 *    - created_at: Timestamp
 * 
 * 3. Sub-Collection: /tenants/{tenant_id}/chat_sessions/{session_id}
 *    - lead_name: String (if identified)
 *    - lead_phone: String (if identified)
 *    - messages: Array<{role: "user"|"bot", content: String, timestamp: Timestamp}>
 *    - status: "active" | "converted"
 *    - created_at: Timestamp
 */

// ==========================================
// Firebase Initialization & Config
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Current Tenant Scope
const TENANT_ID = "promabid-fes-001"; // Unique ID for PROMABID

// ==========================================
// Lead Capture Logic
// ==========================================

async function submitQuoteToFirestore(data) {
  try {
    const quoteRef = db.collection('tenants').doc(TENANT_ID).collection('quotes');
    
    await quoteRef.add({
      ...data,
      status: 'pending',
      source: 'web_form',
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log("Lead captured successfully in Firestore.");
    return true;
  } catch (error) {
    console.error("Firestore Error:", error);
    return false;
  }
}
