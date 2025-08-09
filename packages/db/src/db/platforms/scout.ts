import { pgTable, text } from 'drizzle-orm/pg-core';

export const rFileSystem = pgTable('file_system', {
  id: text('id').primaryKey(),
  rFileContent: text('r_file_content'),
  csvFileContent: text('csv_file_content'),
});
