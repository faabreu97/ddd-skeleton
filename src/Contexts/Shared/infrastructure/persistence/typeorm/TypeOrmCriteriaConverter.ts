import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  LessThan,
  Like,
  MoreThan,
  Not
} from 'typeorm';
import { Criteria } from '../../../domain/criteria/Criteria';
import { Filter } from '../../../domain/criteria/Filter';
import { Operator } from '../../../domain/criteria/FilterOperator';
import { Filters } from '../../../domain/criteria/Filters';
import { Order } from '../../../domain/criteria/Order';

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class TypeOrmCriteriaConverter<T> {
  private filterTransformers: Map<
    Operator,
    TransformerFunction<Filter, FindOptionsWhere<T>>
  >;

  constructor() {
    this.filterTransformers = new Map<
      Operator,
      TransformerFunction<Filter, FindOptionsWhere<T>>
    >([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter]
    ]);
  }

  public convert(criteria: Criteria): FindManyOptions<T> {
    return {
      where: criteria.hasFilters() ? this.generateFilter(criteria.filters) : {},
      order: criteria.order.hasOrder() ? this.generateSort(criteria.order) : {},
      skip: criteria.offset || 0,
      take: criteria.limit || 0
    };
  }

  protected generateFilter(filters: Filters): FindOptionsWhere<T> {
    const filter = filters.filters.map(filter => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });

    return Object.assign({}, ...filter);
  }

  protected generateSort<T>(order: Order): FindOptionsOrder<T> {
    return {
      [order.orderBy.value]: order.orderType.value
    } as FindOptionsOrder<T>;
  }

  private equalFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: filter.value.value }
    } as FindOptionsWhere<T>;
  }

  private notEqualFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: Not(filter.value.value) }
    } as FindOptionsWhere<T>;
  }

  private greaterThanFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: MoreThan(filter.value.value) }
    } as FindOptionsWhere<T>;
  }

  private lowerThanFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: LessThan(filter.value.value) }
    } as FindOptionsWhere<T>;
  }

  private containsFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: Like(filter.value.value) }
    } as FindOptionsWhere<T>;
  }

  private notContainsFilter(filter: Filter): FindOptionsWhere<T> {
    return {
      [filter.field.value]: { value: Not(Like(filter.value.value)) }
    } as FindOptionsWhere<T>;
  }
}
