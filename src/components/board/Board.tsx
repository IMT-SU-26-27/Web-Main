import "@/styles/board.css";

type BoardProps = {
  // text inside the tilted tag, e.g. "QUEST BOARD" or "Notice Board !!"
  ribbon: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  // rendered straddling the bottom edge
  seeMore?: React.ReactNode;
  // arrow buttons
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
  className?: string;
};

export default function Board({
  ribbon,
  title,
  subtitle,
  children,
  seeMore,
  leftArrow,
  rightArrow,
  className = "",
}: BoardProps) {
  return (
    <div className={`board ${className}`}>
      <span className="board__ribbon">{ribbon}</span>

      <div className="board__inner">
        <h2 className="board__title">{title}</h2>
        {subtitle && <p className="board__subtitle">{subtitle}</p>}

        <div className="board__content">{children}</div>

        {seeMore && <div className="board__footer">{seeMore}</div>}
      </div>

      {leftArrow && (
        <div className="board__arrow board__arrow--left">{leftArrow}</div>
      )}
      {rightArrow && (
        <div className="board__arrow board__arrow--right">{rightArrow}</div>
      )}
    </div>
  );
}
