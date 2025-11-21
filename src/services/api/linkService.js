// Links management service
class LinkService {
  constructor() {
    this.storageKey = "linkhub_links";
  }

  async delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStoredLinks() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeLinks(links) {
    localStorage.setItem(this.storageKey, JSON.stringify(links));
  }

  async getUserLinks(userId) {
    await this.delay();
    
    const links = this.getStoredLinks();
    return links.filter(link => link.userId === userId);
  }

  async createLink(linkData) {
    await this.delay();
    
    const links = this.getStoredLinks();
    const maxId = links.length > 0 ? Math.max(...links.map(l => parseInt(l.Id))) : 0;
    
    const newLink = {
      Id: maxId + 1,
      ...linkData,
      createdAt: new Date().toISOString()
    };
    
    links.push(newLink);
    this.storeLinks(links);
    
    return newLink;
  }

  async updateLink(linkId, updateData) {
    await this.delay();
    
    const links = this.getStoredLinks();
    const linkIndex = links.findIndex(l => l.Id === linkId);
    
    if (linkIndex === -1) {
      throw new Error("Link not found");
    }
    
    links[linkIndex] = {
      ...links[linkIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.storeLinks(links);
    
    return links[linkIndex];
  }

  async deleteLink(linkId) {
    await this.delay();
    
    const links = this.getStoredLinks();
    const filteredLinks = links.filter(l => l.Id !== linkId);
    
    if (filteredLinks.length === links.length) {
      throw new Error("Link not found");
    }
    
    this.storeLinks(filteredLinks);
    
    return true;
  }

  async incrementClicks(linkId) {
    await this.delay(100);
    
    const links = this.getStoredLinks();
    const linkIndex = links.findIndex(l => l.Id === linkId);
    
    if (linkIndex === -1) {
      throw new Error("Link not found");
    }
    
    links[linkIndex].clicks = (links[linkIndex].clicks || 0) + 1;
    this.storeLinks(links);
    
    return links[linkIndex];
  }
}

export const linkService = new LinkService();