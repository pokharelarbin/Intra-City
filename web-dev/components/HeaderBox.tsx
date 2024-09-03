const HeaderBox = ({
  title,
  type = "heading",
}: {
  title: string;
  type?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {type === "heading" ? (
        <h1 className="text-[40px] font-semibold text-gray-800">{title}</h1>
      ) : (
        <div className="flex items-center text-[20px] font-semibold text-gray-600">
          {title}
          <hr className="flex-1 ml-4 border-t-2 border-gray-400" />
        </div>
      )}
    </div>
  );
};

export default HeaderBox;
