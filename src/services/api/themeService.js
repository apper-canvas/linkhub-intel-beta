// Theme customization service
class ThemeService {
  constructor() {
    this.storageKey = "linkhub_themes";
  }

  async delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStoredThemes() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeThemes(themes) {
    localStorage.setItem(this.storageKey, JSON.stringify(themes));
  }

  async getUserTheme(userId) {
    await this.delay();
    
    const themes = this.getStoredThemes();
    const userTheme = themes.find(theme => theme.userId === userId);
    
    // Return default theme if none exists
    if (!userTheme) {
      return {
        userId,
        background: "#ffffff",
        buttonStyle: "rounded",
        textColor: "#1e293b",
        accentColor: "#6366f1"
      };
    }
    
    return userTheme;
  }

  async updateUserTheme(userId, themeData) {
    await this.delay();
    
    const themes = this.getStoredThemes();
    const themeIndex = themes.findIndex(theme => theme.userId === userId);
    
    const updatedTheme = {
      userId,
      ...themeData,
      updatedAt: new Date().toISOString()
    };
    
    if (themeIndex === -1) {
      // Create new theme
      themes.push({
        ...updatedTheme,
        createdAt: new Date().toISOString()
      });
    } else {
      // Update existing theme
      themes[themeIndex] = {
        ...themes[themeIndex],
        ...updatedTheme
      };
    }
    
    this.storeThemes(themes);
    
    return updatedTheme;
  }
}

export const themeService = new ThemeService();