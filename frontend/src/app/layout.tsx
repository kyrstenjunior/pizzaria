import '../styles/globals.css';
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';

import Head from 'next/head';

export const metadata = {
  title: 'Sujeito Pizza - A melhor pizzaria',
  description: 'A melhor pizzaria do Brasil',
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <html lang="pt-BR" className={inter.className}>
        <body>
          <div className='container px-8'>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  backgroundColor: "#f1f1f1",
                  color: "#131313",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }
              }}
            />
            {children}
          </div>
        </body>
      </html>
    </>
  )
}
