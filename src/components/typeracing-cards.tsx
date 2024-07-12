import { cn } from "@/lib/utils";
import PlayerIcon from "./icons/player-icon";

interface TyperacingCardProps {
  questionChr: string;
  isCurrent: boolean;
  enemyCurrentIndex: number;
  userCurrentIndex: number;
  index: number;
  successes: number[];
  skips: number[];
}
export const TyperacingCard = (props: TyperacingCardProps) => {
  const getTextColor = () => {
    if (props.successes.includes(props.index)) {
      return "text-green-500";
    } else if (props.skips.includes(props.index)) {
      return "text-red-500";
    } else if (props.enemyCurrentIndex > props.index) {
      return "text-orange-500";
    } else {
      return "text-gray-500 opacity-30";
    }
  };
  return (
    <div className="p-2 relative text-center text-3xl" key={props.questionChr}>
      <PlayerIcon
        className={cn(['size-6 absolute translate-y-[-50%] top-0 left-[50%] translate-x-[-50%]', (props.isCurrent && props.enemyCurrentIndex === props.index  && props.userCurrentIndex !== props.index) && 'opacity-20'])}
        hidden={!props.isCurrent}
      />
      <p className={getTextColor()}>{props.questionChr}</p>
    </div>
  );
};
