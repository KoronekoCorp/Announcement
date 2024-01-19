import type { Metadata } from 'next'
import { Suspense } from "react";
import Loading from './loading';
import Snackbar from './Snackbar'
import { Root } from './Drawer';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Koroneko Corp',
  description: '黑猫科技',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="zh">
      <head>

      </head>
      <body style={{ margin: "auto" }}>
        <Root darkmode={cookies().get("dark")?.value == "true"}>
          <Snackbar>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </Snackbar>
        </Root>
      </body>
    </html>
  )
}
