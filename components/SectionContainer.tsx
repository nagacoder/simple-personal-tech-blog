import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl p-2 px-4 sm:px-6 xl:max-w-3xl xl:px-0">
      {children}
    </section>
  )
}
