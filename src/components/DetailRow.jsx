const DetailRow = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2">
      <p className="text-sm font-semibold text-foreground">
        {label}
      </p>

      <p className="break-all text-right text-sm text-foreground">
        {value ?? "N/A"}
      </p>
    </div>
  );
};

export default DetailRow;