
import { Button } from '@spike/ui/button';
import { Input } from '@spike/ui/input';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import z from 'zod';

import { BaseFieldInput, defineField } from './fields.schema';

defineField({
  id: 'text',
  name: 'Text',
  input: BaseFieldInput.extend({
    placeholder: z.string(),
  }),
  output: z.object({
    value: z.string(),
  }),
  renderReact: ({ title, description, required, placeholder }, submit) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const value = formData.get('text') as string;
          submit({ value });
        }}
      >
        <FieldLabel
          title={title}
          description={description}
          required={required}
        />

        <Input
          type="text"
          name="text"
          placeholder={placeholder}
          required={required}
        />

        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    );
  },
  renderRn: ({ title, description, required, placeholder }, submit) => {
    return <div>{inputData.title}</div>;
  },
});

function FieldLabel({
  title,
  description,
  required,
}: {
  title: string;
  description?: string;
  required: boolean;
}) {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {title}
      {required && <span className="text-red-500">*</span>}
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </label>
  );
}

function FieldLabelRN({
  title,
  description,
  required,
}: {
  title: string;
  description?: string;
  required: boolean;
}) {}
