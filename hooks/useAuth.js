"use client"

import { auth } from "@/firebase/config"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase/config"

export function useAuth() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            return result.user
        } catch (err) {
            console.error(err)
        }
    }

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid))
            const userData = userDoc.exists() ? userDoc.data() : {}
            setUser({
                ...currentUser,
                subscribed: userData.subscribed || false,
                plan: userData.plan || null,
            })
        } else {
            setUser(null)
        }
    })
    return () => unsubscribe()
}, [])

    const loginAsGuest = async () => {
        try {
            const result = await signInAnonymously(auth)
            return result.user
        } catch (err) {
            console.error(err)
        }
    }

    const loginWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return result.user
    } catch (err) {
        console.error(err)
        throw err  // let the caller handle it
    }
}

    const signUpWithEmail = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            return result.user
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        await signOut(auth)
        router.push("/")
    }

    return { user, loginWithGoogle, loginAsGuest, loginWithEmail, signUpWithEmail, logout }
}