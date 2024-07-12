import PlayerIcon from "./icons/player-icon";

interface TyperacingCardProps {
  questionChr: string;
}
export const TyperacingCard = (props: TyperacingCardProps) => {
  return (
    <>
      <div className="p-2 text-center text-3xl">
        <PlayerIcon className="size-6" />
        <p className={`text-gray-400`}>{props.questionChr}</p>
      </div>
    </>
  );
};
