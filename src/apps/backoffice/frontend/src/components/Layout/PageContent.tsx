import { PropsWithChildren } from 'react';
import PageTitle, { TitleAction } from './PageTitle';

export default function PageContent(
  props: PropsWithChildren & { title: string; titleActions?: TitleAction[] }
) {
  return (
    <div className="p-6">
      <PageTitle title={props.title} actions={props.titleActions} />
      <div className="flex flex-col gap-3 mt-3">{props.children}</div>
    </div>
  );
}
