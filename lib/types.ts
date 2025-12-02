export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  barThickness?: number;
  barPercentage?: number;
  categoryPercentage?: number;
  tension?: number;
}

export interface ChartResult {
  labels: string[];
  datasets: ChartDataset[];
}
interface ChargerLog {
  logId: string;
  ocppId: string;
  connectorName: string;
  action: string;
  requestPayload: object;
  requestTimestamp: string;
  responsePayload: object;
  responseTimestamp: string;
}
export interface ChargingSession {
  bookingId: string;
  chargerName: string;
  platform: string;
  startDate: string;
  stopDate: string;
  updatedAt: string;
  promo: string;
  price: number;
}

export interface ChargingColumn {
  headerName: string;
  field?: string;
  width?: number;
  minWidth?: number;
  cellRenderer?: unknown; // AG Grid only accepts `any` here
}
