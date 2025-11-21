// Authentication service
class AuthService {
  constructor() {
    this.storageKey = "linkhub_auth";
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async signup(userData) {
    await this.delay();
    
    // Check if username already exists
    const users = this.getStoredUsers();
    if (users.some(user => user.username === userData.username)) {
      throw new Error("Username already exists. Please choose a different one.");
    }
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error("Email already exists. Please use a different email.");
    }
    
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password, // In production, this would be hashed
      username: userData.username,
      name: userData.name,
      bio: "",
      profilePhoto: "",
      createdAt: new Date().toISOString(),
      plan: "free"
    };
    
    users.push(newUser);
    this.storeUsers(users);
    
    // Store auth session
    const authData = {
      user: { ...newUser, password: undefined },
      token: `token_${newUser.id}_${Date.now()}`,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify(authData));
    
    return authData.user;
  }

  async login(email, password) {
    await this.delay();
    
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    const authData = {
      user: { ...user, password: undefined },
      token: `token_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify(authData));
    
    return authData.user;
  }

  async logout() {
    await this.delay(100);
    localStorage.removeItem(this.storageKey);
  }

  async getCurrentUser() {
    const authData = this.getAuthData();
    if (!authData) {
      throw new Error("Not authenticated");
    }
    
    // Check if token is expired
    if (Date.now() > authData.expiresAt) {
      localStorage.removeItem(this.storageKey);
      throw new Error("Session expired");
    }
    
    return authData.user;
  }

  getAuthData() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  getStoredUsers() {
    const stored = localStorage.getItem("linkhub_users");
    return stored ? JSON.parse(stored) : [];
  }

  storeUsers(users) {
    localStorage.setItem("linkhub_users", JSON.stringify(users));
  }
}

export const authService = new AuthService();