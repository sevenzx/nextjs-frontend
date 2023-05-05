import React, { useState } from 'react';
import {
  listInterfaceInfoByFuzzyUsingPOST,
  listInterfaceInfoByPageUsingPOST,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
} from '@/services/interface-service/interfaceInfoController';
import moment from 'moment';
import { STATUS_MAP, TIME_FORMAT } from '@/config/constant';
import ManageTable from '@/components/ManageTable';
import { Button, ButtonGroup, Tag, Toast } from '@douyinfe/semi-ui';

export default function InterfaceManage() {
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      fuzzySearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      fuzzySearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      fuzzySearch: true,
    },
    {
      title: '路径',
      dataIndex: 'path',
      fuzzySearch: true,
    },
    // {
    //   title: '请求头',
    //   dataIndex: 'requestHeader',
    // },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
    },
    // {
    //   title: '响应头',
    //   dataIndex: 'responseHeader',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      // @ts-ignore
      render: (_, record) => {
        // @ts-ignore
        let item = STATUS_MAP[record.status];
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: '创建人',
      dataIndex: 'userId',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // @ts-ignore
      render: (_, record) => {
        return moment(record.createTime).format(TIME_FORMAT);
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      // @ts-ignore
      render: (_, record) => {
        return moment(record.updateTime).format(TIME_FORMAT);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // @ts-ignore
      render: (_, record) => {
        return (
          <ButtonGroup>
            <Button key="config" theme={'borderless'} onClick={() => {}}>
              编辑
            </Button>
            {record.status === 0 ? (
              <Button
                key="online"
                theme={'borderless'}
                onClick={() => {
                  handleOnlineInterface(record).then((r) => console.log(r));
                }}
              >
                发布
              </Button>
            ) : (
              <Button
                key="offline"
                theme={'borderless'}
                type={'warning'}
                onClick={() => {
                  handleOfflineInterface(record).then((r) => console.log(r));
                }}
              >
                下线
              </Button>
            )}
            <Button key="delete" theme={'borderless'} type={'danger'} onClick={() => {}}>
              删除
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  /**
   * @en-US Online Interface
   * @zh-CN 发布接口
   *
   * @param fields
   */
  const handleOnlineInterface = async (fields: API.IdRequest) => {
    const id = fields.id + '';
    Toast.info({ content: '正在发布', id: id });
    try {
      let res = await onlineInterfaceInfoUsingPOST({ ...fields });
      if (res.data) {
        Toast.success({ content: '发布成功!', id: id });
        // 刷新页面
        setReloadFlag(!reloadFlag);
        return true;
      }
    } catch (error: any) {
      Toast.error('发布失败!' + error.message);
      return false;
    }
  };

  /**
   * @en-US Offline Interface
   * @zh-CN 下线接口
   *
   * @param fields
   */
  const handleOfflineInterface = async (fields: API.IdRequest) => {
    const id = fields.id + '';
    Toast.info({ content: '正在下线', id: id });
    try {
      let res = await offlineInterfaceInfoUsingPOST({ ...fields });
      if (res.data) {
        Toast.success({ content: '下线成功!', id: id });
        // 刷新页面
        setReloadFlag(!reloadFlag);
        return true;
      }
    } catch (error: any) {
      Toast.error('下线失败!' + error.message);
      return false;
    }
  };

  return (
    <ManageTable
      columns={columns}
      pageFunction={listInterfaceInfoByPageUsingPOST}
      fuzzyFunction={listInterfaceInfoByFuzzyUsingPOST}
      reloadFlag={reloadFlag}
    />
  );
}
