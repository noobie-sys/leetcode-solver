import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useModel from "../../hooks/use-model";

export function SelectModel() {
  const { selectedModel, setSelectedModel } = useModel();

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-full border-none  text-sm truncate">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent className="bg-[#192126] border " >
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
