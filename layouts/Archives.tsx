'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import archivesData from 'app/archives-data.json'
import { useState } from 'react'

// Define interfaces to match our JSON structure
interface MonthCount {
  month: string
  count: number
}

interface YearCount {
  year: string
  count: number
  months: MonthCount[]
}

interface ArchiveStructure {
  archives: YearCount[]
}

export default function ArchivesLayout() {
  const pathname = usePathname()
  const archives = archivesData as ArchiveStructure
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({})

  // Map month numbers to names
  const monthNames: Record<string, string> = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  }

  // Function to toggle year expansion
  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  // Check if we're on an archive page
  const isArchivePage = pathname.startsWith('/archives/')

  // Function to get the currently selected year and month from the URL
  const getSelectedArchive = () => {
    if (!isArchivePage) return { year: null, month: null }

    const parts = pathname.split('/archives/')[1]?.split('/') || []
    return {
      year: parts[0] || null,
      month: parts[1] || null,
    }
  }

  const selected = getSelectedArchive()

  return (
    <>
      <div>
        <div className="flex sm:space-x-24">
          <div className="h-full max-h-screen flex-wrap overflow-auto rounded-sm pt-5 sm:flex dark:shadow-gray-800/40">
            <div className="px-6">
              <h2 className="mb-4 text-xl font-bold">Archives</h2>
              <ul>
                {archives.archives.map((yearData) => {
                  const isExpanded = expandedYears[yearData.year]
                  const isYearSelected = selected.year === yearData.year

                  return (
                    <li key={yearData.year} className="my-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleYear(yearData.year)}
                          aria-label={
                            isExpanded ? `Collapse ${yearData.year}` : `Expand ${yearData.year}`
                          }
                          className="mr-2 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {isExpanded ? '▼' : '►'}
                        </button>

                        {isYearSelected && !selected.month ? (
                          <h3 className="text-primary-500 inline px-2 py-1 text-sm font-bold">
                            {`${yearData.year} (${yearData.count})`}
                          </h3>
                        ) : (
                          <Link
                            href={`/archives/${yearData.year}`}
                            className={`hover:text-primary-500 dark:hover:text-primary-500 px-2 py-1 text-sm font-medium ${
                              isYearSelected
                                ? 'text-primary-500 dark:text-primary-500'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                            aria-label={`View posts from ${yearData.year}`}
                          >
                            {`${yearData.year} (${yearData.count})`}
                          </Link>
                        )}
                      </div>

                      {/* Month list - only show if expanded */}
                      {isExpanded && (
                        <ul className="mt-2 pl-8">
                          {yearData.months.map((monthData) => {
                            const monthName = monthNames[monthData.month]
                            const isMonthSelected =
                              isYearSelected && selected.month === monthData.month

                            return (
                              <li key={monthData.month} className="my-2">
                                {isMonthSelected ? (
                                  <span className="text-primary-500 inline px-2 py-1 text-sm font-bold">
                                    {`${monthName} (${monthData.count})`}
                                  </span>
                                ) : (
                                  <Link
                                    href={`/archives/${yearData.year}/${monthData.month}`}
                                    className="hover:text-primary-500 dark:hover:text-primary-500 px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-400"
                                    aria-label={`View posts from ${monthName} ${yearData.year}`}
                                  >
                                    {`${monthName} (${monthData.count})`}
                                  </Link>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="flex-1">
            {/* Content for selected archive would go here */}
            {/* You can add a component to display posts for the selected year/month */}
          </div>
        </div>
      </div>
    </>
  )
}
