export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'option'
  | 'OPTION'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
