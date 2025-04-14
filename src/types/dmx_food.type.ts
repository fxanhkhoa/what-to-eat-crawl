export type CreateDmxFoodRequest = {
  host: string;
  dmxLink: string;
  category: string;
  token: string;
};

export type CreateDmxFoodResponse = {
  log: string;
};
