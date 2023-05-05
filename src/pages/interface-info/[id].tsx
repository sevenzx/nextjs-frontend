import { GetServerSideProps } from 'next';
import { getInterfaceInfoByIdUsingGET } from '@/services/interface-service/interfaceInfoController';
import { Button, Card, Descriptions, Divider, Form, Tag, TextArea } from '@douyinfe/semi-ui';
import moment from 'moment';
import { CLIENT_KEY, STATUS_MAP, TIME_FORMAT } from '@/config/constant';
import request from '@/config/axios.config';
import React, { useState } from 'react';
import { getClientSign } from '@/lib/util';

export default function InterfaceInfoDetail({ data }: { data: API.InterfaceInfo }) {
  const [params, setParams] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const invokeInterface = async () => {
    let timestamp = new Date().getTime();
    let sign = getClientSign(timestamp);
    let res = await request(`${data.path}${params}`, {
      method: data.method,
      headers: {
        userKey: CLIENT_KEY,
        timestamp: timestamp,
        sign: sign,
      },
    });
    setResponse(res.data);
  };

  return (
    <>
      <Card title={'接口详情'}>
        <Descriptions>
          <Descriptions.Item itemKey="名称">{data.name}</Descriptions.Item>
          <Descriptions.Item itemKey="描述">{data.description}</Descriptions.Item>
          <Descriptions.Item itemKey="接口状态">
            {/*@ts-ignore*/}
            <Tag color={STATUS_MAP[data.status].color}>
              {/*@ts-ignore*/}
              {STATUS_MAP[data.status].text}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item itemKey="请求路径">{data.path}</Descriptions.Item>
          <Descriptions.Item itemKey="请求方法">{data.method}</Descriptions.Item>
          <Descriptions.Item itemKey="请求头">{data.requestHeader}</Descriptions.Item>
          <Descriptions.Item itemKey="请求参数">{data.requestParams}</Descriptions.Item>
          <Descriptions.Item itemKey="响应头">{data.responseHeader}</Descriptions.Item>
          <Descriptions.Item itemKey="创建时间">
            {moment(data.createTime).format(TIME_FORMAT)}
          </Descriptions.Item>
          <Descriptions.Item itemKey="更新时间">
            {moment(data.updateTime).format(TIME_FORMAT)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Divider />
      <br />
      <Card title={'在线调用'}>
        <Form layout={'vertical'}>
          <TextArea placeholder="请输入请求参数" onChange={(value) => setParams(value)} />
          <Button theme={'solid'} onClick={() => invokeInterface()}>
            调用
          </Button>
          {response ? <TextArea rows={10} value={JSON.stringify(response, null, 4)} /> : null}
        </Form>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let id = context.query.id;
  let res = await getInterfaceInfoByIdUsingGET({ id: Number(id) });
  return {
    props: {
      data: res.data,
    },
  };
};
