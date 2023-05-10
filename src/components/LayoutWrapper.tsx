import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div
      className={`${inter.className} font-sans flex flex-col justify-between absolute top-0 bottom-0 left-0 right-0`}
    >
      <div className="fixed top-0 left-0 right-0 z-40">
        <SectionContainer className=" bg-white/80 backdrop-blur dark:bg-gray-900/80">
          <Header />
        </SectionContainer>
      </div>
      <SectionContainer className="flex flex-col justify-between flex-1 pt-12">
        <main className="mb-auto">{children}</main>
        <Footer />
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
