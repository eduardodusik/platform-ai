import ElementsMenu from "@/components/project/ElementsMenu";

export default function Menu() {
  return (
    <div className="fixed left-0 top-10 flex h-full items-center gap-3">
      <div className="h-full w-52 border-r border-neutral-700 bg-neutral-900">
        <div className="p-3">
          <div className="pt-4">
            <span className="font-bold">Variables</span>
            <div className="flex flex-col pt-2">
              {[
                "user_text_input",
                "user_audio_input",
                "gpt_response",
                "whisper_response",
                "generated_image_SD",
                "SAM_points",
                "parsed_file",
              ].map((val) => (
                <span key={val} className="font-light">
                  {val}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5">
            <span className="font-bold">Nodes</span>
            <div className="flex flex-col pt-2">
              <span className="font-light">Generate text</span>
            </div>
          </div>
        </div>
      </div>
      <ElementsMenu />
    </div>
  );
}
