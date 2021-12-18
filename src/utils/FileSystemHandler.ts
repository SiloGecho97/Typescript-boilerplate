import { writeFile } from 'fs/promises'
// const fs = require('fs');
import _ from 'lodash'
import fs from 'fs'
import setting from '../../settings'
import constants from '../common/constant'
import { Written } from '../types/vendors/objectKey'

export default class FileSystem {
  basedir: string

  dirIndex: number

  constructor(dirname?: string) {
    // TODO: to be changed to FTPS
    this.basedir = dirname || `${setting.ROOTDIR}/uploads`
    this.dirIndex = 0
  }

  getFullDirectoryPath(folderName: string): string {
    return `${this.basedir}/${folderName}`
  }

  getFullFilenamePath(fileName: string, dirname: string): string {
    return `${this.basedir}/${dirname}/${fileName}.json`
  }

  checkDirectoryExist(folderName: string): boolean {
    return fs.existsSync(this.getFullDirectoryPath(folderName))
  }

  checkFileExist(fileName: string, dirname: string): boolean {
    return fs.existsSync(this.getFullFilenamePath(fileName, dirname))
  }

  /**
   * Create folder Method
   * @param folderName
   * @returns true if dir is created
   */
  private createFolder(folderName: string): boolean | Error {
    // TODO: Folder validation
    try {
      if (!this.checkDirectoryExist(folderName)) {
        fs.mkdirSync(this.getFullDirectoryPath(folderName))
        return true
      }
      throw Error('Directory already exist')
    } catch (err) {
      throw Error('Folder Creation Error')
    }
  }

  /**
   * Prepare data to write to file
   * @param data
   * @returns
   */
  // eslint-disable-next-line class-methods-use-this
  prepareDataToWrite(data: object, sortKey: string): string {
    const tobeWritten: Written = {}
    tobeWritten[sortKey] = data
    return JSON.stringify(tobeWritten)
  }

  /**
   * Write event to file
   * @param fileName
   * @param path
   * @param dataToWrite
   * @returns
   */
  // eslint-disable-next-line class-methods-use-this
  public async saveEvent(
    fileName: string,
    directoryName: string,
    dataToWrite: string,
    sortKey: string,
  ) {
    try {
      if (_.isEmpty(dataToWrite)) {
        throw Error('No data to write')
      }
      // Check Directoty Size
      const directorySize = this.checkDirectorySize(directoryName)
      // If Empty directory and new Directory created
      if (directorySize === 0) {
        // Create Directory
        this.createFolder(directoryName)
        // Write to File
        await this.writeToFile(directoryName, fileName, dataToWrite)
      } else if (directorySize >= constants.MAX_FOLDER_SIZE) {
        // RULE: No directory may contain more than 50,000 entries.
        // TODO: direcctory name creation should be refactor(I need idea)
        const newDirname = directoryName.replace(
          `_${this.dirIndex}`,
          `_${this.dirIndex + 1}`,
        )

        if (this.checkDirectoryExist(newDirname)) {
          this.dirIndex += 1
          // Call the function recursively for new directory
          await this.saveEvent(fileName, newDirname, dataToWrite, sortKey)
        } else {
          // Create new folder with new Directory name and write to File.
          this.createFolder(newDirname)
          await this.writeToFile(newDirname, fileName, dataToWrite)
          return true
        }
      } else {
        // Write the file to existing directory
        await this.writeToFile(directoryName, fileName, dataToWrite)
      }
      return true
    } catch (err) {
      throw Error(`${constants.FILE_SAVE_FAILED}-${err}`)
    }
  }

  /**
   * Write Data to file system
   * @param dirname directory name
   * @param fileName file name
   * @param dataToWrite data to be written in sting
   * Throw error if filename already exist
   */
  private async writeToFile(
    dirname: string,
    fileName: string,
    dataToWrite: string,
  ) {
    if (this.checkFileExist(fileName, dirname)) {
      throw Error('File Name already exist')
    }
    await writeFile(
      this.getFullFilenamePath(fileName, dirname),
      dataToWrite,
      'utf8',
    )
  }

  /**
   * Get latest file from directory
   * @param dirname
   * @returns
   */
  private getLatestFile(dirname: string): string {
    const files = fs.readdirSync(this.getFullDirectoryPath(dirname))
    return files[files.length - 1].split('.')[0]
  }

  /**
   * File Validation
   * @param dirname
   * @param fileName
   * @returns
   */
  private validateFile(dirname: string, fileName: string): boolean {
    const file = fs.statSync(this.getFullFilenamePath(fileName, dirname))
    if (file.size >= constants.MAX_FILE_SIZE) return false
    return true
  }

  /**
   * Check directory's size
   * @param directoryName
   * @returns 0 if directory is not exist else return size of directory
   */
  private checkDirectorySize(directoryName: string): number {
    // Check if directory exist.
    if (!this.checkDirectoryExist(directoryName)) return 0
    const readDirectory = fs.readdirSync(
      this.getFullDirectoryPath(directoryName),
    )
    // check if number files more than max folder size return false
    return readDirectory.length
  }
}
