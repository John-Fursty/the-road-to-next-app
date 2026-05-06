"use client"

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "sonner";


const RedirectToast = () => {
    useEffect(() => {
        const showCookieToast = async () => {
            const message = await getCookieByKey("toast")

            console.log(message)

            message && (
                toast.success(message), deleteCookieByKey("toast")
            )
        };

        showCookieToast();
    }, [])

    return null;
}

export { RedirectToast }