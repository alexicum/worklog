import fsd from '@feature-sliced/steiger-plugin';

export default [
  // Подключаем стандартный набор правил проверки слоев и слайсов FSD
  ...fsd.configs.recommended,
  {
    // Игнорируем автогенерируемые служебные папки компиляции Vite
    ignores: ['dist/**', 'node_modules/**', '.turbo/**'],
  },
  {
    // Отключаем правило малозначимых слайсов по каноническому имени из репозитория Steiger
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
];