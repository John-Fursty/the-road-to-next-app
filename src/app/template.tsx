import { RedirectToast } from "@/features/ticket/components/redirect-toast"

type RootTemplateProps = {
    children: React.ReactNode
}

export default function RootTemplate({ children }: RootTemplateProps) {
  return <>
        <>{children}</>
        <RedirectToast />
    </>
}