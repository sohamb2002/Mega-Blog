import conf from "../conf/conf";
import { Client, Account } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      if (password.length < 8 || password.length > 265) {
        throw new Error('Password must be between 8 and 265 characters long.');
      }
      const commonPasswords = ['password', '12345678', 'qwerty'];
      if (commonPasswords.includes(password)) {
        throw new Error('Password is too common. Please choose a different password.');
      }
  
      // Create an account
      const userAccount = await this.account.create(email, password, name);
      if (userAccount) {
        // Automatically logs in the user
        await this.login({ email, password });
      }
    } catch (error) {
      if (error.message.includes('409')) {
        throw new Error('An account with this email already exists.');
      }
      console.error('Create Account Error:', error);
      throw new Error('Failed to create account');
    }
  }
  
  async login({ email, password }) {
    try {
      // Create a session with email and password
      const session = await this.account.createEmailPasswordSession(email, password);
      // Store session or token as needed
      return session;
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('Failed to login');
    }
  }

  async getCurrentUser() {
    try {
      // Ensure user is authenticated before attempting to get current user
      return await this.account.get();
    } catch (error) {
      if (error.message.includes('401')) {
        throw new Error('Authentication required. Please log in.');
      }
      console.error('Get Current User Error:', error);
      throw new Error('Failed to get current user. Please check your authentication token.');
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      // Clear stored session or token as needed
    } catch (error) {
      console.error('Logout Error:', error);
      throw new Error('Failed to logout');
    }
  }
}

const authService = new AuthService();
export default authService;
