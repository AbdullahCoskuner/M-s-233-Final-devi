import { PanelPlugin } from '@grafana/data';
import { SimplePanel } from './components/SimplePanel';
import { SimpleOptions } from './types';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(
  (builder) => {
    return builder
      .addColorPicker({
        path: 'backgroundColor',
        name: 'Background Color',
        defaultValue: '#f5f5f5',
      })
      .addColorPicker({
        path: 'accentColor',
        name: 'Accent Color',
        defaultValue: '#4c9aff',
      })
      .addTextInput({
        path: 'customText',
        name: 'Custom Text',
        defaultValue: 'Abdullah Panel',
      })
      .addBooleanSwitch({
        path: 'showStats',
        name: 'Show Data Stats',
        defaultValue: true,
      });
  }
);
