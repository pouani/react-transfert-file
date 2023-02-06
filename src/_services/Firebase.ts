import { initializeApp } from 'firebase/app'
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import { FirebaseStorage, getStorage, ref, uploadBytes, uploadBytesResumable, UploadTask } from 'firebase/storage'
import { collection, CollectionReference, doc, Firestore, getFirestore, setDoc } from 'firebase/firestore'
import config from './config.json'
import { uuidv4 } from '@firebase/util'
import { customAlphabet } from 'nanoid'

export type FileData = {
    id: string,
    originalFilename: string,
    uniqueFilename: string,
    userId?: string
}

export type UserData = {
    displayName: string,
    uid: string
}

class FirebaseService
{
    auth: Auth;
    firestore: Firestore;
    fileCollection: CollectionReference<FileData>;
    googleAuthProvider: GoogleAuthProvider;
    storage: FirebaseStorage;
    usersCollection: CollectionReference<UserData>;


    constructor(){
        initializeApp(config);

        this.auth = getAuth();
        this.auth.useDeviceLanguage(); //permet d'utiliser la fenetre d'utilisation google avec une traduction dans la langue de l'utilisateur
        
        this.firestore = getFirestore();
        this.fileCollection = collection(this.firestore, 'files') as CollectionReference<FileData>;

        this.googleAuthProvider = new GoogleAuthProvider();

        this.storage = getStorage();

        this.usersCollection = collection(this.firestore, 'users') as CollectionReference<UserData>;
    }

    async addUser(user: User): Promise<void> {
        await setDoc(doc(this.usersCollection, user.uid), {
            uid: user.uid,
            displayName: user.displayName
        })
    }

    async addFile(originalFilename: string, uniqueFilename: string): Promise<void> {
        const id = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)().toUpperCase();

        await setDoc(doc(this.fileCollection, id), {
            id: id,
            originalFilename: originalFilename,
            uniqueFilename: uniqueFilename,
            userId: this.auth.currentUser ? this.auth.currentUser.uid : null
        })
    }

    getUniqueFilename(file: File): string{
        return `${uuidv4()}.${file.name.split('.').pop()}`;
    }

    uploadFile(file: File, filename: string): UploadTask {
        const storageRef = ref(this.storage, filename);
        return uploadBytesResumable(storageRef, file);
    }

    async signInWithGoogle(): Promise<UserCredential> {
        try {
            const UserCredential = await signInWithPopup(this.auth, this.googleAuthProvider);
            await this.addUser(UserCredential.user);
        } catch (error) {
            return null;
        }
    }

    async signOut(): Promise<void> {
        await signOut(this.auth);
    }
}

export default new FirebaseService();