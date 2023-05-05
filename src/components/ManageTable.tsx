import { Breadcrumb, Input, Table, Tooltip } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";
import styles from "./manage-table.module.css";
import { IconSearch } from "@douyinfe/semi-icons";
import { setBreadcrumbRouteList } from "@/lib/util";
import { useRouter } from "next/router";

interface TableProps {
  columns: any[];
  pageFunction: (param: any) => Promise<any>;
  fuzzyFunction: (param: any) => Promise<any>;
  dataFunction?: (param: any[]) => Promise<any[]>;
  reloadFlag?: boolean;
}

interface QueryParam {
  current: number;
  pageSize: number;
  keyword?: string;
}

export default function ManageTable (props: TableProps) {
  const { columns, pageFunction, fuzzyFunction } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<API.UserVO>();
  const [queryParam, setQueryParam] = useState<QueryParam>({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState<number>(0);
  const [searchFields, setSearchFields] = useState<string[]>([]);
  const [searchFieldsTip, setSearchFieldsTip] = useState<string>();
  const [keyword, setKeyword] = useState<string>();

  const router = useRouter();

  // 初始化搜索字段
  useEffect(() => {
    let searchFields: string[] = [];
    let searchFieldTitles: string[] = [];
    columns.forEach((column) => {
      if (column.fuzzySearch && column.fuzzySearch === true) {
        searchFields.push(column.dataIndex);
        searchFieldTitles.push(column.title);
      }
    });

    setSearchFields(searchFields);
    setSearchFieldsTip(searchFieldTitles.join("、"));
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
  }, [queryParam, props.reloadFlag]);

  const getData = async (queryParam: QueryParam) => {
    let res;
    console.log("queryParam", queryParam);
    if (queryParam.keyword) {
      res = await fuzzyFunction({ ...queryParam, fields: searchFields });
    } else {
      res = await pageFunction({
        current: queryParam.current,
        pageSize: queryParam.pageSize
      });
    }
    let data = res.data;
    let records = data.records;
    if (props.dataFunction) {
      records = await props.dataFunction(data.records);
    }
    // @ts-ignore
    setDataSource(records);
    // @ts-ignore
    setTotal(data.total);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
          // marginBottom: '12px',
        }}
      >
        <Breadcrumb
          style={{
            marginBottom: "24px",
            marginRight: "auto"
          }}
          compact={false}
          routes={setBreadcrumbRouteList(router.pathname)}
        />
        <div style={{ marginLeft: "auto", width: "280px" }}>
          <Tooltip
            position={"topLeft"}
            arrowPointAtCenter={false}
            content={searchFieldsTip}
            trigger={"hover"}
          >
            <Input
              placeholder={"按字段搜索"}
              size={"large"}
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
            total: total
          }}
        />
      </div>
    </>
  );
}
