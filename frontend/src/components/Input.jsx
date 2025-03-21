export function Input({ label, Icons, type, value, OnChange, placeholder }) {
  return (
    <>
      <label className="my-2">{label}</label>
      <div className="flex items-center justify-center font-semibold rounded gap-3 mb-2 border border-gray-300 hover:ring-2 hover:ring-black-400 p-1">
        {Icons}
        <input
          required
          type={type}
          placeholder={placeholder}
          className="pr-3 py-2 font-semibold w-full outline-none"
          value={value}
          onChange={OnChange}
        />
      </div>
    </>
  );
}
