import { AxiosRequestConfig } from './types'
import { buildUrl } from './helpers/url'
import CreateXHR from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  CreateXHR(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
