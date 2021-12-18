import { customAlphabet } from 'nanoid'

const nanoidAlpha = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  5,
)

interface ISortKey {
  directoryName: string
  fileName: string
  fullSortKey: string
  sortKey: string
}

/**
 * Generate sort key using timestamp
 * @returns
 */

export default function constructSortKey(): ISortKey {
  const directoryName = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}_0`
  const fileName = `${Date.now().toString()}${Math.floor(
    Math.random() * (99999 - 10000) + 10000,
  )}`
  const sortKey = nanoidAlpha()
  const fullSortKey = `${directoryName}/${fileName}/${sortKey}`
  // TODO: refactor to best approach
  return {
    directoryName,
    fileName,
    sortKey,
    fullSortKey,
  }
}
