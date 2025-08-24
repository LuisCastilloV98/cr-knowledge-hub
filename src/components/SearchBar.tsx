interface Props { value: string; onChange: (v:string)=>void; placeholder?: string; }
export default function SearchBar({value,onChange,placeholder="Search topics..."}:Props){
  return (
    <input
      className="input"
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(e)=>onChange(e.target.value)}
    />
  );
}
