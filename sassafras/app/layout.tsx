// app/layout.tsx
import './globals.css'
import Link from 'next/link'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans">
        
        {/* HEADER */}
        <header className="text-black bg-gray-100 border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold ">Sassafras</h1>
            </Link>
            <nav className="space-x-4">
              <Link href="/home" className="hover:underline">Home</Link>
              <Link href="/currentIssue" className="hover:underline">Current Issue</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/articles" className="hover:underline">Articles</Link>
              <Link href="/issues" className="hover:underline">Issues</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 container mx-auto p-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-100 border-t p-4 text-center text-sm">
          © {new Date().getFullYear()} My Publication. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
