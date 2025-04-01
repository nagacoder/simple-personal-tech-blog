import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-xl sm:leading-10 md:text-xl md:leading-14 dark:text-gray-100">
      {children}
    </h1>
  )
}
