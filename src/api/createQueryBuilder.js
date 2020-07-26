import qs from 'query-string';
import isEmpty from 'lodash.isempty';

function createQueryBuilder(api, params = {}) {
  const baseUrl = `${api}`;
  let queryString = {};
  if (params.orderBy) {
    queryString.orderBy = JSON.stringify(params.orderBy);
  }
  if (params.page) {
    queryString.page = params.page;
  }
  if (params.perPage) {
    queryString.perPage = params.perPage;
  }
  if (params.q) {
    queryString.q = params.q;
  }
  if (params.filter) {
    queryString.filter = JSON.stringify(params.filter);
  }

  if (isEmpty(queryString)) {
    queryString = params;
  }

  const reqUrl = `${baseUrl}?${qs.stringify(queryString)}`;
  return reqUrl;
}

export default createQueryBuilder;
