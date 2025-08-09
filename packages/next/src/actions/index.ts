import 'server-only';

import { ZodType, z } from 'zod';

import { zodParseFactory } from '../utils';

/**
 * @name enhanceAction
 * @description Enhance an action with captcha, schema and auth checks
 */
export function enhanceAction<
  Args,
  Response,
  Config extends {
    schema?: z.ZodType<any, any, any>;
  },
>(
  fn: (
    params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args,
  ) => Response | Promise<Response>,
  config: Config,
) {
  return async (
    params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args,
  ) => {
    // validate the schema passed in the config if it exists
    const data = config.schema
      ? zodParseFactory(config.schema)(params)
      : params;

    return fn(data);
  };
}
