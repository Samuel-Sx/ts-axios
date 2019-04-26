import { AxiosRequestConfig } from './types'
import CreateXHR from './xhr'

function axios(config: AxiosRequestConfig): void {
  // axios
  CreateXHR(config)
}

export default axios
