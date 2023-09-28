interface Props {
  first: string[];
  firstClick: (event: React.MouseEvent) => void;
}

const First = ({ first, firstClick }: Props) => {
  return (
    <div className="first">
      {first.map((categoryMember, i) => (
        <div
          key={i}
          className="firsts"
          onClick={firstClick}
        >
          {categoryMember}
        </div>
      ))}
    </div>
  );
};

export default First;
