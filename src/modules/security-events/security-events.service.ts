import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { CreateSecurityEventInput } from './dto/create-security-event.input';
import { UpdateSecurityEventInput } from './dto/update-security-event.input';
import { retry } from 'rxjs';

@Injectable()
export class SecurityEventsService {
  constructor(private readonly searchService: SearchService) {}

  private createQuery(key: string, value: any) {
    return {
      query: {
        match: {
          [key]: value,
        },
      },
    };
  }

  getCountBy(key: string, value: any) {
    const query = this.createQuery(key, value);
    return this.searchService.count(query);
  }

  getBy(key: string, value: any) {
    const query = this.createQuery(key, value);
    return this.searchService.search(query);
  }

  create(securityEventInput: CreateSecurityEventInput) {
    return this.searchService.indexEvents(securityEventInput);
  }

  async update(updateSecurityEventInput: UpdateSecurityEventInput) {
    const result = await this.searchService.update(updateSecurityEventInput);

    if (result === 'not_found')
      throw new NotFoundException('Security Event not found!');

    if (result === 'updated') return true;

    return false;
  }

  async delete(id: string) {
    const result = await this.searchService.remove(id);

    if (result === 'not_found')
      throw new NotFoundException('Security Event not found!');

    if (result === 'deleted') return true;

    return false;
  }

  totalCount() {
    const query = {
      query: {
        match_all: {},
      },
    };

    return this.searchService.count(query);
  }

  findAll() {
    const query = {
      query: {
        match_all: {},
      },
    };

    return this.searchService.search(query);
  }

  findOne(id: string) {
    return this.getBy('_id', id);
  }

  getByTimeRange(startDate: Date, endDate: Date) {
    const query = {
      query: {
        range: {
          timestamp: {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
          },
        },
      },
    };
    return this.searchService.search(query);
  }

  getCountByTimeRange(startDate: Date, endDate: Date) {
    const query = {
      query: {
        range: {
          timestamp: {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
          },
        },
      },
    };
    return this.searchService.count(query);
  }

  getBySeverityAndSorting(severity: string, sort: string) {
    const query = {
      query: {
        match: {
          [severity]: severity,
        },
        sort: [
          {
            timestamp: sort ? sort : 'asc',
          },
        ],
      },
    };
    return this.searchService.search(query);
  }

  getByTimestampAndSorting(sort: string) {
    const query = {
      query: {
        match_all: {},
      },
      sort: [
        {
          timestamp: sort ? sort : 'asc',
        },
      ],
    };

    return this.searchService.search(query);
  }

  getCommonAttacks(limit: number) {
    const query = {
      size: 0,
      aggs: {
        attack_types: {
          terms: {
            field: 'attack_type.keyword', // Replace with your attack type field
            order: {
              _count: 'desc', // Descending order based on count
            },
            size: limit, // Top N attack types
          },
        },
      },
      query: {
        range: {
          timestamp: {
            gte: 'now-1d/d', // Events from the last 24 hours
            lte: 'now/d',
          },
        },
      },
    };

    return this.searchService.search(query);
  }

  getByEventTypesLast7Days(eventType: string) {
    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const query = {
      query: {
        bool: {
          must: [
            {
              match: {
                eventType: eventType,
              },
            },
            {
              range: {
                timestamp: {
                  gte: sevenDaysAgo,
                  lte: new Date().toISOString(),
                },
              },
            },
          ],
        },
      },
    };

    return this.searchService.search(query);
  }

  getByAndTimeRange(
    key: string,
    value: string,
    startDate: Date,
    endDate: Date,
  ) {
    const query = {
      query: {
        bool: {
          must: [
            {
              match: {
                [key]: value,
              },
            },
            {
              range: {
                timestamp: {
                  gte: startDate.toISOString(),
                  lte: endDate.toISOString(),
                },
              },
            },
          ],
        },
      },
    };

    return this.searchService.search(query);
  }

  async getSecurityEventsByPattern(key: string, pattern: string) {
    const query = {
      query: {
        bool: {
          must: {
            regexp: {
              [key]: pattern,
            },
          },
        },
      },
    };

    return this.searchService.search(query);
  }

  getSecurityEventsByUserAndDataSource(user: string, dataSource: string) {
    const query = {
      query: {
        bool: {
          must: [
            {
              match: {
                user: user,
              },
            },
            {
              match: {
                dataSource: dataSource,
              },
            },
          ],
        },
      },
    };
    return this.searchService.search(query);
  }
}
