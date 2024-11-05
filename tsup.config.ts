import { defineConfig } from 'tsup';
import * as preset from 'tsup-preset-solid';

const preset_options: preset.PresetOptions = {
  entries: [
    {
      entry: 'src/index.tsx',
      dev_entry: true,
    },
  ],
  drop_console: true,
};

export default defineConfig(config => {
  const watching = !!config.watch;

  const parsed_options = preset.parsePresetOptions(preset_options, watching);

  return preset.generateTsupOptions(parsed_options);
});
