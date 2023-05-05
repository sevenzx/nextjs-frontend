declare namespace API {
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

  type getSecretByKeyUsingGETParams = {
    /** userKey */
    userKey: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type InvokeInterfaceUserVO = {
    id?: number;
    userSecret?: string;
  };

  type PageRequest = {
    ascend?: boolean;
    current?: number;
    needTotal?: boolean;
    pageSize?: number;
    sortField?: string;
  };

  type PageVOUserVO = {
    current?: number;
    pageSize?: number;
    records?: UserVO[];
    total?: number;
  };

  type ResultBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type ResultInvokeInterfaceUserVO = {
    code?: number;
    data?: InvokeInterfaceUserVO;
    message?: string;
  };

  type ResultLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type ResultPageVOUserVO = {
    code?: number;
    data?: PageVOUserVO;
    message?: string;
  };

  type ResultUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type UserAddDTO = {
    gender?: number;
    userAccount?: string;
    userAvatar?: string;
    userPassword?: string;
    userRole?: string;
    username?: string;
  };

  type UserLoginDTO = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterDTO = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateDTO = {
    gender?: number;
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userPassword?: string;
    userRole?: string;
    username?: string;
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
