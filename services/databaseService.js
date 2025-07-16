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
    }
};

export default databaseService;