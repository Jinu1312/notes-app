import { ID } from "react-native-appwrite";
import { account } from "./appwrite";


const authService = {

    // Register User
    async register(email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return {
                error: error.message || 'Registration Failed'
            }
        }
    },

    // Login User
    async login(email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return {
                error: error.message || 'Login Failed'
            }
        }
    },

    // Get loggedin user
    async getUser() {
        try {
            return account.get();
        } catch (error) {
            return {
                error: error.message
            }
        }
    },

    // Logout
    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            return {
                error: error.message || 'Logout Failed'
            }
        }
    }
}

export default authService;

