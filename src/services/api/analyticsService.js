// Analytics tracking service
class AnalyticsService {
  constructor() {
    this.analyticsKey = "linkhub_analytics";
    this.viewsKey = "linkhub_page_views";
  }

  async delay(ms = 150) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStoredAnalytics() {
    const stored = localStorage.getItem(this.analyticsKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeAnalytics(analytics) {
    localStorage.setItem(this.analyticsKey, JSON.stringify(analytics));
  }

  getStoredViews() {
    const stored = localStorage.getItem(this.viewsKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeViews(views) {
    localStorage.setItem(this.viewsKey, JSON.stringify(views));
  }

  async getUserAnalytics(userId) {
    await this.delay();
    
    // Get user's links and calculate total clicks
    const links = JSON.parse(localStorage.getItem("linkhub_links") || "[]");
    const userLinks = links.filter(link => link.userId === userId);
    const totalClicks = userLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);
    
    // Get page views
    const views = this.getStoredViews();
    const userViews = views.filter(view => view.userId === userId);
    const totalViews = userViews.length;
    
    return {
      userId,
      totalViews,
      totalClicks,
      lastUpdated: new Date().toISOString()
    };
  }

  async trackPageView(username) {
    await this.delay(100);
    
    // Get user by username
    const users = JSON.parse(localStorage.getItem("linkhub_users") || "[]");
    const user = users.find(u => u.username === username);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const views = this.getStoredViews();
    const newView = {
      Id: views.length + 1,
      userId: user.id,
      username: username,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    views.push(newView);
    this.storeViews(views);
    
    return newView;
  }

  async getViewHistory(userId, limit = 50) {
    await this.delay();
    
    const views = this.getStoredViews();
    const userViews = views
      .filter(view => view.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
    
    return userViews;
  }
}

export const analyticsService = new AnalyticsService();