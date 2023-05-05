import { Descriptions, List, Pagination, Tag, Typography } from '@douyinfe/semi-ui';
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoByPageUsingPOST } from '@/services/interface-service/interfaceInfoController';
import { STATUS_MAP } from '@/config/constant';

const style = {
  border: '1px solid var(--semi-color-border)',
  backgroundColor: 'var(--semi-color-bg-2)',
  borderRadius: '3px',
  padding: '20px 20px 20px 20px',
  margin: '8px 2px',
};

interface PageParam {
  current: number;
  pageSize: number;
}

export default function HomePage() {
  const [pageParam, setPageParam] = useState<PageParam>({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState<number>();
  const [dataSource, setDataSource] = useState<API.InterfaceInfo[]>();

  useEffect(() => {
    getData(pageParam).then((r) => console.log(r));
  }, [pageParam]);

  const getData = async (pageParam: PageParam) => {
    console.log('pageParam', pageParam);
    let res = await listInterfaceInfoByPageUsingPOST({
      current: pageParam.current,
      pageSize: pageParam.pageSize,
    });

    let data = res.data as API.PageVOInterfaceInfo;
    // @ts-ignore
    setDataSource(data.records);
    // @ts-ignore
    setTotal(data.total);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <List
        grid={{
          gutter: 12,
          xs: 0,
          sm: 0,
          md: 12,
          lg: 8,
          xl: 8,
          xxl: 6,
        }}
        dataSource={dataSource}
        renderItem={(item: API.InterfaceInfo) => (
          <List.Item style={style}>
            <div>
              <Typography.Text
                style={{ color: 'var(--semi-color-primary)', fontWeight: 600 }}
                link={{ href: `/interface/${item.id}` }}
                onClick={() => console.log(item.name)}
              >
                {item.name}
              </Typography.Text>
              <Descriptions
                align="center"
                size="small"
                row
                data={[
                  { key: '描述', value: item.description },
                  {
                    key: '状态',
                    value: (
                      // @ts-ignore
                      <Tag color={STATUS_MAP[item.status].color}>
                        {/*@ts-ignore*/}
                        {STATUS_MAP[item.status].text}
                      </Tag>
                    ),
                  },
                ]}
              />
            </div>
          </List.Item>
        )}
      ></List>
      <Pagination
        showSizeChanger={true}
        pageSizeOpts={[5, 10, 20, 50, 200]}
        currentPage={pageParam.current}
        pageSize={pageParam.pageSize}
        onChange={(current, pageSize) => {
          setPageParam({ current, pageSize });
        }}
        total={total}
        showTotal={true}
      ></Pagination>
    </div>
  );
}
