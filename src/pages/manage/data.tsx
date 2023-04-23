import { Empty } from '@douyinfe/semi-ui';
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';

export default function DataPage() {
  return (
    <Empty
      image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
      darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
      title={'This is Data Page'}
      description="当前功能暂未开放，敬请期待。"
    />
  );
}
