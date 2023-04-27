// @ts-ignore
/* eslint-disable */
import request from '@/config/axios.config';

/** addUser POST /api/user/add */
export async function addUserUsingPOST(body: API.UserAddDTO, options?: { [key: string]: any }) {
  return request<API.ResultLong>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCurrentUser GET /api/user/current */
export async function getCurrentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultUserVO>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get/${param0} */
export async function getUserByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultUserVO>(`/api/user/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getSecretByKey GET /api/user/get/secret */
export async function getSecretByKeyUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSecretByKeyUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultInvokeInterfaceUserVO>('/api/user/get/secret', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByFuzzy POST /api/user/list/fuzzy */
export async function listUserByFuzzyUsingPOST(
  body: API.FuzzyQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageVOUserVO>('/api/user/list/fuzzy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserByPage POST /api/user/list/page */
export async function listUserByPageUsingPOST(
  body: API.PageRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageVOUserVO>('/api/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPOST(body: API.UserLoginDTO, options?: { [key: string]: any }) {
  return request<API.ResultUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPOST(options?: { [key: string]: any }) {
  return request<API.ResultBoolean>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultLong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPOST(
  body: API.UserUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
