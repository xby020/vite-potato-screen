import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';

export default defineConfig({
  plugins: [require('windicss/plugin/aspect-ratio')],
  theme: {
    extend: {
      fontFamily: {
        number: ['HeadLineA']
      },
      boxShadow: {
        'in-sm': 'inset 0 0 8px rgba(0, 0, 0, 0.06)',
        in: 'inset 0 0 12px rgba(0, 0, 0, 0.06)',
        'in-big': 'inset 0 1px 30px rgba(0, 0, 0, 0.30)',
        'out-big': '0 1px 30px rgba(0, 0, 0, 0.30)',
        out: '0 0 12px rgba(0, 0, 0, 0.06)'
      }
    }
  }
});
