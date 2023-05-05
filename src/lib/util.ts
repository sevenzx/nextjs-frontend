import { ROUTE_CONFIG } from '@/config/route.config';
import crypto from 'crypto';
import { CLIENT_SECRET, SALT } from '@/config/constant';

/**
 * 根据path获取面包屑组件层级文本
 * @param targetPath
 */
export function setBreadcrumbRouteList(targetPath: string): string[] {
  let result: string[] = [];
  for (let i = 0; i < ROUTE_CONFIG.length; i++) {
    const item = ROUTE_CONFIG[i];
    if (item.path === targetPath) {
      result.push(item.text);
      break;
    }
    if (item.items) {
      for (let j = 0; j < item.items.length; j++) {
        const subItem = item.items[j];
        if (subItem.path === targetPath) {
          result.push(item.text);
          result.push(subItem.text);
          break;
        }
      }
    }
  }
  return result;
}

/**
 * 获取客户端签名
 * @param timestamp 时间戳
 */
export function getClientSign(timestamp: number): string {
  const content = `${SALT}.${timestamp}.${CLIENT_SECRET}`;
  return crypto.createHash('md5').update(content).digest('hex');
}
