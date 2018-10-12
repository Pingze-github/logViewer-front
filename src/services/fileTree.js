
import request from '@/utils/request';

const api = {
  get: '/filetree',
};

export const getFileTree = query => request(api.get, { query });
