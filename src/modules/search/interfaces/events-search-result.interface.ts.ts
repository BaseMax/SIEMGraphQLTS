import { SecurityEventsSearchBody } from './events-body-search.interface';

export default interface SecurityEventsSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _id: string;
      _source: SecurityEventsSearchBody;
    }>;
  };
}
