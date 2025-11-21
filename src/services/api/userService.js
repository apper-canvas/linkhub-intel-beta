// User profile service
class UserService {
  constructor() {
    this.usersKey = "linkhub_users";
    this.authKey = "linkhub_auth";
  }

  async delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStoredUsers() {
    const stored = localStorage.getItem(this.usersKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeUsers(users) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  updateAuthUser(updatedUser) {
    const authData = localStorage.getItem(this.authKey);
    if (authData) {
      const parsed = JSON.parse(authData);
      parsed.user = updatedUser;
      localStorage.setItem(this.authKey, JSON.stringify(parsed));
    }
  }

  async getUserByUsername(username) {
    await this.delay();
    
    const users = this.getStoredUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return null;
    }
    
    return { ...user, password: undefined };
  }

  async updateProfile(userId, updateData) {
    await this.delay();
    
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    // Check if username is being changed and if it already exists
    if (updateData.username && updateData.username !== users[userIndex].username) {
      const existingUser = users.find(u => u.username === updateData.username && u.id !== userId);
      if (existingUser) {
        throw new Error("Username already exists. Please choose a different one.");
      }
    }
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.storeUsers(users);
    
    const updatedUser = { ...users[userIndex], password: undefined };
    
    // Update auth data
    this.updateAuthUser(updatedUser);
    
    return updatedUser;
  }

  async getProfile(userId) {
    await this.delay();
    
    const users = this.getStoredUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return { ...user, password: undefined };
  }
}

export const userService = new UserService();