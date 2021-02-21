/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createNumberRangeArray } from '../../common/number-range/number-range'

export const isTable = (text: string): boolean => {
  // Tables must consist of multiple rows and columns
  if (!text.includes('\n') || !text.includes('\t')) {
    return false
  }
  // Code within code blocks should not be parsed as a table
  if (text.startsWith('```')) {
    return false
  }

  const lines = text.split(/\r?\n/)
                    .filter(line => line.trim() !== '')

  // Tab-indented text should not be matched as a table
  if (lines.every(line => line.startsWith('\t'))) {
    return false
  }
  // Every line should have the same amount of tabs (table columns)
  const tabsPerLines = lines.map(line => line.match(/\t/g)?.length ?? 0)
  return tabsPerLines.every(line => line === tabsPerLines[0])
}

export const excelTableToMarkdown = (pasteData: string): string => {
  const tableRows = pasteData.split(/\r?\n/)
                             .filter(row => row.trim() !== '')
  const tableCells = tableRows.reduce((cellsInRow, row, index) => {
    cellsInRow[index] = row.split('\t')
    return cellsInRow
  }, [] as string[][])
  const arrayMaxRows = createNumberRangeArray(tableCells.length)
  const arrayMaxColumns = createNumberRangeArray(Math.max(...tableCells.map(row => row.length)))

  const headRow1 = arrayMaxColumns
    .map(col => col + 1)
    .map(col => `| #${ col } `)
    .join('') + '|'
  const headRow2 = arrayMaxColumns
    .map(col => col + 1)
    .map(col => `| -${ '-'.repeat(col.toString().length) } `)
    .join('') + '|'
  const body = arrayMaxRows
    .map(row => {
      return arrayMaxColumns
        .map(col => '| ' + tableCells[row][col] + ' ')
        .join('') + '|'
    })
    .join('\n')
  return `${ headRow1 }\n${ headRow2 }\n${ body }`
}
