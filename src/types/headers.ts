import { IncomingHttpHeaders } from "http"

export type Headers = {
  userid?: string,
  password?: string
} & IncomingHttpHeaders