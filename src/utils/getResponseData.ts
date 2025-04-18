import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

export default async function getResponseData<T = any>(res: Response): Promise<T> {
  try {
    const ciphertext = await res.text()

    // Check if the response is empty or not a valid ciphertext
    if (!ciphertext || ciphertext.trim() === '') {
      console.error('Empty response received')
      return null as T
    }

    // Check if the payload secret is available
    if (!import.meta.env.VITE_PAYLOAD_SECRET) {
      console.error('VITE_PAYLOAD_SECRET is not defined')
      return null as T
    }

    // Decrypt the response
    const bytes = AES.decrypt(ciphertext, import.meta.env.VITE_PAYLOAD_SECRET)

    // Check if decryption was successful
    if (!bytes || !bytes.words || bytes.words.length === 0) {
      console.error('Decryption failed: Invalid bytes object')
      return null as T
    }

    const stringifiedJson = bytes.toString(encUtf8)

    if (!stringifiedJson) {
      console.error('Decryption produced empty result')
      return null as T
    }

    const jsonData: T = JSON.parse(stringifiedJson)
    return jsonData
  } catch (error) {
    console.error('Error in getResponseData:', error)
    throw error
  }
}
