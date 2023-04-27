declare namespace API {
  type countUsingGETParams = {
    /** interfaceInfoId */
    interfaceInfoId: number;
    /** userId */
    userId: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type FuzzyQueryRequest = {
    ascend?: boolean;
    current?: number;
    fields?: string[];
    keyword?: string;
    needTotal?: boolean;
    pageSize?: number;
    sortField?: string;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type hasInvokeNumUsingGETParams = {
    /** interfaceInfoId */
    interfaceInfoId: number;
    /** userId */
    userId: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDeleted?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddDTO = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type InterfaceInfoUpdateDTO = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type PageRequest = {
    ascend?: boolean;
    current?: number;
    needTotal?: boolean;
    pageSize?: number;
    sortField?: string;
  };

  type PageVOInterfaceInfo_ = {
    current?: number;
    pageSize?: number;
    records?: InterfaceInfo[];
    total?: number;
  };

  type ResultBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type ResultInterfaceInfo_ = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type ResultLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type ResultPageVOInterfaceInfo_ = {
    code?: number;
    data?: PageVOInterfaceInfo_;
    message?: string;
  };

  type ResultUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type UserVO = {
    createTime?: string;
    gender?: number;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
    username?: string;
  };
}
