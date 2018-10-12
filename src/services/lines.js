
import request from '@/utils/request';

const api = {
  get: '/lines',
  search: '/search',
};

export const getLines = query => request(api.get, { query });
export const search = query => request(api.search, { query });
