// @ts-ignore
/* eslint-disable */
import request from '@/config/axios.config';

/** addInterfaceInfo POST /api/interface/info/add */
export async function addInterfaceInfoUsingPOST(
  body: API.InterfaceInfoAddDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultLong>('/api/interface/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo POST /api/interface/info/delete */
export async function deleteInterfaceInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/interface/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interface/info/get/${param0} */
export async function getInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultInterfaceInfo>(`/api/interface/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listInterfaceInfo GET /api/interface/info/list */
export async function listInterfaceInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListInterfaceInfo>('/api/interface/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceInfoByFuzzy POST /api/interface/info/list/fuzzy */
export async function listInterfaceInfoByFuzzyUsingPOST(
  body: API.FuzzyQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageVOInterfaceInfo>('/api/interface/info/list/fuzzy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInterfaceInfoByPage POST /api/interface/info/list/page */
export async function listInterfaceInfoByPageUsingPOST(
  body: API.InterfaceInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageVOInterfaceInfo>('/api/interface/info/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** offlineInterfaceInfo POST /api/interface/info/offline */
export async function offlineInterfaceInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/interface/info/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineInterfaceInfo POST /api/interface/info/online */
export async function onlineInterfaceInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/interface/info/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** testUserClient GET /api/interface/info/test */
export async function testUserClientUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultUserVO>('/api/interface/info/test', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateInterfaceInfo POST /api/interface/info/update */
export async function updateInterfaceInfoUsingPOST(
  body: API.InterfaceInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/interface/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
