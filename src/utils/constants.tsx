import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--border': '214.3 31.8% 91.4%',
    '--background': '0 0% 100%',
    '--foreground': '222.2 47.4% 11.2%',
    '--primary': '222.2 47.4% 11.2%',
    '--primary-foreground': '210 40% 98%',
    '--destructive': '0 100% 50%',
    '--destructive-foreground': '210 40% 98%',
    '--muted': '210 40% 96.1%',
    '--muted-foreground': '215.4 16.3% 46.9%'
  }),
  dark: vars({
    '--border': '216 34% 17%',
    '--background': '224 71% 4%',
    '--foreground': '213 31% 91%',
    '--primary': '210 40% 98%',
    '--primary-foreground': '222.2 47.4% 1.2%',
    '--destructive': '0 63% 31%',
    '--destructive-foreground': '210 40% 98%',
    '--muted': '223 47% 11%',
    '--muted-foreground': '215.4 16.3% 56.9%'
  })
};
