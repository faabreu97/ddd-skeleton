import Button from '../Button';

export type TitleAction = { text: string; onClick: () => void };

export default function PageTitle(props: {
  title: string;
  actions?: TitleAction[];
}) {
  return (
    <div className="flex justify-between">
      <h4>{props.title}</h4>
      <div>
        {props.actions?.map(item => (
          <div key={item.text}>
            <Button onClick={item.onClick}>{item.text}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
