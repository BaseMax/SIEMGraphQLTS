import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import SecurityEventsSearchResult from './interfaces/events-search-result.interface.ts';
import { CreateSecurityEventInput } from '../security-events/dto/create-security-event.input.js';
import { query } from 'express';
import { UpdateSecurityEventInput } from '../security-events/dto/update-security-event.input.js';

@Injectable()
export class SearchService {
  private readonly index = 'security-events';
  constructor(private readonly elastic: ElasticsearchService) {}

  async indexEvents(createSecurityEvent: CreateSecurityEventInput) {
    const body = await this.elastic.index({
      index: this.index,
      body: {
        ...createSecurityEvent,
      },
    });

    const result = body.result;
    return { id: body._id, result };
  }

  async count(query: any) {
    const body = await this.elastic.count({
      index: this.index,
      body: query,
    });

    return {
      count: body.count,
    };
  }

  async search(query: any) {
    const body = await this.elastic.search<SecurityEventsSearchResult>({
      index: this.index,
      body: query,
    });

    const hits = body.hits.hits;
    const results = hits.map((item) => item._source);

    return results;
  }

  async remove(id: string) {
    try {
      const event = await this.elastic.delete({
        index: this.index,
        id,
      });

      return event.result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(data: UpdateSecurityEventInput) {
    try {
      const event = await this.elastic.update({
        index: this.index,
        id: data.id,
        body: {
          doc: data,
        },
      });

      return event.result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
