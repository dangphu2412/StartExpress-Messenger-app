import knex from '../../database/connection';
import { Conversation } from '../../database/model/index';

class BaseRepository {
  constructor() {
    this.tableName = this.getTableName();
  }

  cloneQuery() {
    return knex(this.tableName).clone();
  }

  list(columns = ['*']) {
    return this.cloneQuery().select(columns);
  }

  listBy(clauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).select(columns);
  }

  listByFirst(clauses = {}, columns = []) {
    return this.cloneQuery().where(clauses).select(columns).first();
  }

  count() {
    return this.cloneQuery().count();
  }

  countBy(clauses = {}) {
    return this.cloneQuery().where(clauses).count();
  }

  getBy(clauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).select(columns).first();
  }

  getByAnother(clauses = {}, orClauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).orWhere(orClauses).select(columns).first();
  }

  joinListBy(table, tableContent, thisContent, clauses = {}) {
    return this.cloneQuery().leftJoin(table, tableContent, thisContent).where(clauses);
  }

  joinListOne(table, tableContent, thisContent, clauses = {}) {
    return this.cloneQuery().leftJoin(table, tableContent, thisContent).where(clauses).first();
  }

  create(attributes, trx, returning = ['*']) {
    return this.cloneQuery().insert(attributes).returning(returning);
  }

  update(clauses, attributes, returning = ['*']) {
    return this.cloneQuery().where(clauses).update(attributes).returning(returning);
  }

  delete(clauses) {
    return this.cloneQuery().where(clauses).delete();
  }
}

export default BaseRepository;
