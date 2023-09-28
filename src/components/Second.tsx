interface Props {
  second: string[];
  secondClick: (event: React.MouseEvent) => void;
}

const Second = ({ second, secondClick }: Props) => {
  return (
    <div className="second">
      {second.map((category, i) => (
        <div
          key={i}
          onClick={secondClick}
          className="seconds"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Second;
