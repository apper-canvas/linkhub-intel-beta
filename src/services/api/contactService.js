// Contact form service
class ContactService {
  constructor() {
    this.storageKey = "linkhub_contact_submissions";
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStoredSubmissions() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  storeSubmissions(submissions) {
    localStorage.setItem(this.storageKey, JSON.stringify(submissions));
  }

  async submitContact(formData) {
    await this.delay();
    
    const submissions = this.getStoredSubmissions();
    const maxId = submissions.length > 0 ? Math.max(...submissions.map(s => parseInt(s.Id))) : 0;
    
    const newSubmission = {
      Id: maxId + 1,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      status: "new"
    };
    
    submissions.push(newSubmission);
    this.storeSubmissions(submissions);
    
    // In a real app, this would send an email or notification
    console.log("Contact form submission:", newSubmission);
    
    return newSubmission;
  }

  async getAllSubmissions() {
    await this.delay();
    
    const submissions = this.getStoredSubmissions();
    return submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }
}

export const contactService = new ContactService();