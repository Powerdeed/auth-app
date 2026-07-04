type LogoProps = {
  includeTitle: boolean;
  includeSubTitle: boolean;
};

export default function Logo({ includeTitle, includeSubTitle }: LogoProps) {
  return (
    <div className="flex gap-2.5 items-center text-(--primary-blue)">
      <div className="border h-20 w-20"></div>

      <div>
        {includeTitle && (
          <div className="text-style__heading">
            Powerdeed Technology Resources Ltd
          </div>
        )}
        {includeSubTitle && (
          <div className="text-style__body">Command Center</div>
        )}
      </div>
    </div>
  );
}
