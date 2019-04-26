import { AxiosRequestConfig } from './types'

export default function CreateXHR(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get' } = config
  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)
  request.send(data)
}
