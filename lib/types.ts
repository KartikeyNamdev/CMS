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
