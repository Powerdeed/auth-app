export default function Loader({ loadingTxt }: { loadingTxt?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {loadingTxt}
      <div className="relative w-5 h-5 animate-spin">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-(--terciary-grey)"
            style={{
              transform: `rotate(${i * 45}deg) translate(6px)`,
              transformOrigin: "0 0",
              animation: `fadePulse 1s linear ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
