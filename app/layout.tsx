import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Later.dog',
  description: 'Where code commits lead to real-life commits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
