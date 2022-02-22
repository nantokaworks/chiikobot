import { dbFile } from '../lib/datafile.mjs';
import fs from 'fs';
import sqlite3, { Statement } from 'sqlite3';
import { z } from 'zod';
const verbose = sqlite3.verbose();

const StatementParams = z.array(z.union([z.string(), z.number(), z.bigint(), z.boolean(), z.undefined(), z.date()]));
type StatementParams = z.infer<typeof StatementParams>;

export const isDBFileExists = fs.existsSync(dbFile);
const db = new verbose.Database(dbFile);

export const prepare = async (sql: string): Promise<Statement> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(sql, (err) => {
        if (err) reject(err);
      });
      resolve(stmt);
    });
  });
};

export const get = (statement: Statement, params?: StatementParams) => {
  return new Promise((resolve, reject) => {
    statement.get(params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const all = (statement: Statement, params?: StatementParams): Promise<unknown[]> => {
  return new Promise((resolve, reject) => {
    statement.all(params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const run = (statement: Statement, params?: StatementParams): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    statement.run(params, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};
