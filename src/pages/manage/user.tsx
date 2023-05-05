import { Avatar, Tag } from '@douyinfe/semi-ui';
import React from 'react';
import {
  listUserByFuzzyUsingPOST,
  listUserByPageUsingPOST,
} from '@/services/user-service/userController';
import moment from 'moment';
import { TIME_FORMAT, GENDER_MAP } from '@/config/constant';
import ManageTable from '@/components/ManageTable';

export default function UserManage() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      fuzzySearch: true,
    },
    {
      title: '昵称',
      dataIndex: 'username',
      fuzzySearch: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      fuzzySearch: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      // @ts-ignore
      render: (_, record) => {
        return <Avatar src={record.userAvatar} size={'default'} />;
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      // @ts-ignore
      render: (_, record) => {
        // @ts-ignore
        let item = GENDER_MAP[record.gender];
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
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
  ];

  return (
    <ManageTable
      columns={columns}
      pageFunction={listUserByPageUsingPOST}
      fuzzyFunction={listUserByFuzzyUsingPOST}
    />
  );
}
