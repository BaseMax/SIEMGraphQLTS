export interface SecurityEventsSearchBody {
  id?: string;
  dataSource?: string;
  destinationIP?: string;
  eventType?: string;
  message?: string;
  severity?: string;
  sourceIP?: string;
  timestamp?: string;
  user?: string;
}
