// track the searches made by the user
import {Client, Databases, ID, Query} from 'react-native-appwrite'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client= new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // ! means that this value is not null or undefined

const database = new Databases(client);

export const updateSearchCount = async(search: string,movie:Movie) => {
  // check if record has already been created
  // if not, create a new record
  // if yes, update the record, ie increase the count
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('movie_id', movie.id),
    ])
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id, {
        count: existingMovie.count + 1,
      }
      )
    }
    else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(), {
        searchTerm: search,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_id: movie.id,
        title:movie.title,
      }
      )
    }
  }
  catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
}

export const getTrendingMov = async (): Promise<TrendingMovie[] | undefined>=>{
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ])
    return result.documents as unknown as TrendingMovie[];
  }
  catch (err)
  {
    console.log(err);
    return undefined
  }
}