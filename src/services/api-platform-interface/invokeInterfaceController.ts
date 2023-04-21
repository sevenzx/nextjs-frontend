// @ts-ignore
/* eslint-disable */
import request from '@/config/axios.config';

/** count GET /api/invoke/interface/count */
export async function countUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/invoke/interface/count', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** hasInvokeNum GET /api/invoke/interface/hasNum */
export async function hasInvokeNumUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hasInvokeNumUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/invoke/interface/hasNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
