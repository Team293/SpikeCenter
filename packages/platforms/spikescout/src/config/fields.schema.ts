import z, { ZodSchema } from 'zod';

export const BaseFieldInput = z.object({
  title: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(false),
});

export function defineField<
  I extends ZodSchema<any, any>,
  O extends ZodSchema<any, any>,
>({
  id,
  name,
  input,
  output,
  renderReact,
  renderRn,
}: {
  id: string;
  name: string;
  input: I;
  output: O;
  renderReact: (
    inputData: z.infer<I>,
    submit: (output: z.infer<O>) => void,
  ) => React.ReactElement;
  renderRn: (
    inputData: z.infer<I>,
    submit: (output: z.infer<O>) => void,
  ) => React.ReactElement;
}) {
  return {
    id,
    name,
    input,
    output,
    renderReact,
    renderRn,
  };
}
