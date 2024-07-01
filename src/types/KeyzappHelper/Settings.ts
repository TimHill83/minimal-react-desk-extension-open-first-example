import { z } from 'zod';

const getDefaultValues = (schema: any) => {
  let defaults: any = {};
  for (const key in schema.shape) {
    if (schema.shape[key]._def.defaultValue !== undefined) {
      defaults[key] = schema.shape[key]._def.defaultValue;
    }
  }
  return defaults;
};

const SettingsNavigationShema = z.object({
  showKeyzappHelperAsDefaultLeftPanel: z.boolean().default(true),
});

export const SettingsSchema = z.object({
  navigation: SettingsNavigationShema.default(getDefaultValues(SettingsNavigationShema.shape)),
  validationEnabled: z.boolean().default(true),
});

export type Settings = z.infer<typeof SettingsSchema>;

