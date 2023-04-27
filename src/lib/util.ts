import { ROUTE_CONFIG } from '@/config/route.config';

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
