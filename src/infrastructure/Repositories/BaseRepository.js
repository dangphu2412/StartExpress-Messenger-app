import knex from '../../database/connection';

function list(table, columns = ['*']) {
  return knex(table).select(columns);
}

function listBy(table, clauses = {}, columns = ['*']) {
  return knex(table).where(clauses).select(columns);
}

function listByFirst(table, clauses = {}, columns = []) {
  return knex(table).where(clauses).select(columns).first();
}

function getBy(table, clauses = {}, columns = ['*']) {
  return knex(table).where(clauses).select(columns).first();
}

function create(table, attributes, returning = ['*']) {
  return knex(table).insert(attributes).returning(returning);
}
// function count(table) {
//   return knex(table).count();
// }

// function countBy(table, clauses = {}) {
//   return knex(table).where(clauses).count();
// }

// function getByAnother(table, clauses = {}, orClauses = {}, columns = ['*']) {
//   return knex(table).where(clauses).orWhere(orClauses).select(columns).first();
// }

// function joinListBy(table, tableContent, thisContent, clauses = {}, columns = []) {
//   return knex(table).leftJoin(table, tableContent, thisContent).where(clauses).select(columns);
// }

// function joinListOne(table, tableContent, thisContent, clauses = {}) {
//   return knex(table).leftJoin(table, tableContent, thisContent).where(clauses).first();
// }

// function update(table, clauses, attributes, returning = ['*']) {
//   return knex(table).where(clauses).update(attributes).returning(returning);
// }

export default {
  list,
  listBy,
  listByFirst,
  create,
  getBy,
};
