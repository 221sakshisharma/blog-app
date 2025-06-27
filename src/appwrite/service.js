import { Client, ID, Databases, Storage, Query, Permission, Role} from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  users;
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, thumbnail, status, userid, slug, category, userEmail}) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          thumbnail,
          status,
          userid, slug, category,
          userEmail
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: create post :: error", error);
      throw error;
    }
  }

  async updatePost(documentId, { title, content, thumbnail, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId,
        {
          title,
          content,
          thumbnail,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: update post :: error", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: delete post :: error", error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite Service :: get post :: error", error);
      throw error;
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: get posts :: error", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: upload file :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: delete file :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return `https://fra.cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${fileId}/view?project=${config.appwriteProjectId}&mode=admin`
      // return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: get file preview :: error", error);
      return null;
    }
  }

  
  
}

const service = new Service();
export default service;
