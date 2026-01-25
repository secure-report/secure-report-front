export type ReportCategory =
  | 'Precios Abusivos'
  | 'Mala calidad de productos'
  | 'Mal servicio al cliente'
  | 'Publicidad engañosa'
  | 'Incumplimiento de garantías'
  | 'Falta de información'
  | 'Otras irregularidades';

export type ReportStatus = 'PENDING' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface LocationPoint {
  lat: number;
  lng: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  uri: string;
}

export interface Report {
  id: string; // alias for _id
  anonymousUserId: string;
  category: ReportCategory;
  description: string;
  location: LocationPoint;
  addressReference: string;
  media: MediaItem[];
  status: ReportStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}