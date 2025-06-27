import { Client, Account, ID, OAuthProvider } from "appwrite";
import config from "../config/config";

// using class makes it easier to switch from appwrite to another backend server later on if we want to

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        const session = await this.login({ email, password });
        return session ? session : null;
      }
      return null
    } catch (error) {
      throw error;
    }
  }

  // return a session
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password)
      return session ? session : null
    } catch (error) {
      throw error
    }
  }

  async getCurrentSession() {
    try {
      const user = await this.account.get('current');
      return user ? user : null;
    } catch (error) {
      throw error
    }

  }

  async logout() {
    try {
      // delete sessions deletes all the sessions user has logged in from
      return await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error)
      throw error
    }
  }

  async googleLogin() {
    this.account.createOAuth2Session(
      OAuthProvider.Google, // provider
      "https://blog-2jl6hfgym-221sakshisharmas-projects.vercel.app/my-space", "https://blog-2jl6hfgym-221sakshisharmas-projects.vercel.app/login"
    )
  }

}

const authService = new AuthService();

export default authService
