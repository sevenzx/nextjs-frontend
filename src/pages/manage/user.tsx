import { Avatar, Breadcrumb, Input, Table, Tag, Tooltip } from '@douyinfe/semi-ui';
import React, { useEffect, useState } from 'react';
import {
  listUserByFuzzyUsingPOST,
  listUserByPageUsingPOST,
} from '@/services/api-platform-user/userController';
import moment from 'moment';
import { TIME_FORMAT, GENDER_MAP } from '@/config/constant';
import styles from './user.module.css';
import { IconSearch } from '@douyinfe/semi-icons';
import { setBreadcrumbRouteList } from '@/lib/util';
import { useRouter } from 'next/router';

interface QueryParam {
  current: number;
  pageSize: number;
  keyword?: string;
}

export default function UserManage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<API.UserVO>();
  const [queryParam, setQueryParam] = useState<QueryParam>({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState<number>(0);
  const [searchFields, setSearchFields] = useState<string[]>([]);
  const [searchFieldsTip, setSearchFieldsTip] = useState<string>();
  const [keyword, setKeyword] = useState<string>();

  const router = useRouter();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      canSearch: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'username',
      canSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      canSearch: true,
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      // @ts-ignore
      render: (_, record) => {
        return <Avatar src={record.userAvatar} size={'medium'} />;
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
      title: '用户角色',
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

  // 初始化搜索字段
  useEffect(() => {
    let searchFields: string[] = [];
    let searchFieldTitles: string[] = [];
    columns.forEach((colum) => {
      if (colum.canSearch && colum.canSearch === true) {
        searchFields.push(colum.dataIndex);
        searchFieldTitles.push(colum.title);
      }
    });

    setSearchFields(searchFields);
    setSearchFieldsTip(searchFieldTitles.join('、'));
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      getData(queryParam).then(() => {
        // 设置延时取消加载
        const timer = setTimeout(() => {
          setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [queryParam]);

  const getData = async (queryParam: QueryParam) => {
    let res;
    console.log('queryParam', queryParam);
    if (queryParam.keyword) {
      res = await listUserByFuzzyUsingPOST({ ...queryParam, fields: searchFields });
    } else {
      res = await listUserByPageUsingPOST({
        current: queryParam.current,
        pageSize: queryParam.pageSize,
      });
    }
    let data = res.data as API.PageVOUserVO;
    // @ts-ignore
    setDataSource(data.records);
    // @ts-ignore
    setTotal(data.total);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          // marginBottom: '12px',
        }}
      >
        <Breadcrumb
          style={{
            marginBottom: '24px',
            marginRight: 'auto',
          }}
          compact={false}
          routes={setBreadcrumbRouteList(router.pathname)}
        />
        <div style={{ marginLeft: 'auto', width: '280px' }}>
          <Tooltip content={searchFieldsTip} trigger={'click'}>
            <Input
              placeholder={'按字段搜索'}
              size={'large'}
              prefix={<IconSearch />}
              onChange={(value) => setKeyword(value)}
              onEnterPress={() => {
                setQueryParam({ ...queryParam, current: 1, keyword: keyword });
              }}
              showClear={true}
              onClear={() => {
                setQueryParam({ ...queryParam, current: 1, keyword: undefined });
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.data}>
        <Table
          loading={loading}
          bordered={true}
          columns={columns}
          // @ts-ignore
          dataSource={dataSource}
          pagination={{
            showSizeChanger: true,
            pageSizeOpts: [5, 10, 20, 50, 200],
            currentPage: queryParam.current,
            pageSize: queryParam.pageSize,
            onChange: (current, pageSize) => {
              setQueryParam({ ...queryParam, current: current, pageSize: pageSize });
            },
            total: total,
          }}
        />
      </div>
    </>
  );
}
