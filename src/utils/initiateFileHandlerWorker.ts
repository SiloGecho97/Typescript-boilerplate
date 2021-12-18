import { Worker } from 'worker_threads'
import setting from '../../settings'

/**
 * Start work thread
 * @param data
 * @returns
 */
export default function initiateWorkerThread() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      `${setting.ROOTDIR}/src/utils/mirrorDatabaseToFile.ts`,
    )

    worker.on('message', resolve)

    worker.on('error', reject)

    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}
