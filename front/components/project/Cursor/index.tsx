type Props = {
  color: string;
  x: number;
  y: number;
  scale: number
  name: string;
};

export default function Cursor({ color, x, y, scale = 0, name }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: "30",
        transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
      }}>
      <svg

        width="12"
        height="12"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <div className="-mt-1.5 ml-1 rounded-full px-1 flex align-middle justify-center" style={{ background: color, fontSize: '4px'}}>
        {name.split(" ")[0]}
      </div>
    </div>
  );
}