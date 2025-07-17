import { database } from "./appwrite";

const databaseService = {
    // List Documents
    async listDocuments(dbId, colId) {

        console.log("DB ID:", dbId); // should be "notes-app-db"
        console.log("Collection ID:", colId); // should be "notes"


        try {
            const response = await database.listDocuments(dbId, colId);
            return response.documents || [];
        } catch (error) {
            console.error('error fetching documents,', error.message);
            return { error: error.message }
        }
    },

    async createDocument(dbId, colId, data, id = null) {
        try {
            return await database.createDocument(dbId, colId, id || undefined, data);
        } catch (error) {
            console.error('Error creating document', error.message);
            return {
                error: error.message,
            }

        }
    },

    async deleteDocument(dbId, colId, id) {
        try {
            await database.deleteDocument(dbId, colId, id);
            return {
                success: true
            }
        } catch (error) {
            console.error('Error deleting document', error.message);
            return {
                error: error.message,
            }
        }
    },

    async updateDocument(dbId, colId, noteId, note) {
        try {
            return await database.updateDocument(dbId, colId, noteId, note);
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

};

export default databaseService;