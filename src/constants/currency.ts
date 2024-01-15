export type Currency = {
  symbol: string;
  id: string;
  icon: string | undefined;
};

const fiatCurrencies: Currency[] = [
  { symbol: 'SGD', id: 'sgd', icon: '/flags/singapore.png' },
  { symbol: 'PHP', id: 'php', icon: '/flags/philippines.png' },
];

export default fiatCurrencies;
