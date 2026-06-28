export interface Resource {
  id: number,
  title: string,
  type: string,
  link: string,
  time: number,
  pages: number,
  inserted_at: Date,
  updated_at: Date
}


export interface ResourceRequest {
  title: string,
  type: string,
  link?: string,
  time?: number,
  pages?: number,
}

export interface VideoInfo {
  title: string,
  duration: number
}
