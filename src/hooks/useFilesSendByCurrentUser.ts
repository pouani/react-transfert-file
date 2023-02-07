import { User } from "firebase/auth"
import { DocumentData } from "firebase/firestore"
import { FullMetadata, getMetadata, getStorage, ref } from "firebase/storage"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import FirebaseService, { FileData } from "../_services/Firebase"

export type useFilesSendByCurrentUserData = {
    currentUser: User,
    files: FileData[]
}

export const useFilesSendByCurrentUser = (): useFilesSendByCurrentUserData => {
    const { currentUser } = useContext(AuthContext)

    const [files, setFiles] = useState<FileData[]>([])

    const fetchData = async () => {
        setFiles(await FirebaseService.getFilesSendByCurrentUser())
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { currentUser, files };
}