import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SelectModel() {
  return (
    <Select>
      <SelectTrigger className="w-full border-none bg-transparent text-sm truncate">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
          <SelectItem
            value="gemini-2.0-flash-lite-preview-02-05"
            className="truncate"
          >
            Gemini-2.0-flash-lite-preview-02-05
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
