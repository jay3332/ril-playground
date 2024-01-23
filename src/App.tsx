import {Component, createMemo, createSignal, For, Setter, Show} from "solid-js";
import "./index.css"

const DEFAULT_IMAGES = [
  ['/images/beach-mountain.jpg', 620, 424] as const,
  ['/images/kitchen-interior.jpg', 640, 480] as const,
  ['/images/mountain-view.jpg', 640, 360] as const,
  ['/images/snowy-lake.jpg', 640, 327] as const,
]

enum InstructionType {
  Crop,
  Resize,
  Rotate,
  FlipH,
  FlipV,
  Brightness,
  Contrast,
  Saturation,
  Blur,
  Sharpen,
  Grayscale,
  Sepia,
  Invert,
  DrawRect,
}

const FIELDS: [InstructionType, string, string[], (props: any) => any][] = [
  [InstructionType.Crop, 'Crop', ['Left X', 'Top Y', 'Right X', 'Bottom Y'], (data: any) => (
    <div style={{
      position: 'relative',
      width: (data['Right X'] - data['Left X']) as any,
      height: (data['Bottom Y'] - data['Top Y']) as any,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        left: -data['Left X'] as any,
        top: -data['Top Y'] as any,
      }}>
        {data.children}
      </div>
    </div>
  )],
  [InstructionType.Resize, 'Resize', ['Width', 'Height'], (data: any) => data.children],
  [InstructionType.Rotate, 'Rotate', ['Degrees'], (data: any) => (
    <div style={{
      transform: `rotate(${data.Degrees}deg)`,
      'transform-origin': 'center center',
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.FlipH, 'Horizontal Flip', [], (data: any) => (
    <div style={{
      transform: 'scaleX(-1)',
      'transform-origin': 'center center',
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.FlipV, 'Vertical Flip', [], (data: any) => (
    <div style={{
      transform: 'scaleY(-1)',
      'transform-origin': 'center center',
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Brightness, 'Brightness', ['Amount'], (data: any) => (
    <div style={{
      filter: `brightness(${data.Amount}%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Contrast, 'Contrast', ['Amount'], (data: any) => (
    <div style={{
      filter: `contrast(${data.Amount}%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Saturation, 'Saturation', ['Amount'], (data: any) => (
    <div style={{
      filter: `saturate(${data.Amount}%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Blur, 'Blur', ['Amount'], (data: any) => (
    <div style={{
      filter: `blur(${data.Amount}px)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Sharpen, 'Sharpen', ['Amount'], (data: any) => (
    <div style={{
      filter: `contrast(${data.Amount}%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Grayscale, 'Grayscale', [], (data: any) => (
    <div style={{
      filter: `grayscale(100%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Sepia, 'Sepia', [], (data: any) => (
    <div style={{
      filter: `sepia(100%)`,
    }}>
      {data.children}
    </div>
  )],
  [InstructionType.Invert, 'Invert', [], (data: any) => (
    <div style={{
      filter: `invert(100%)`,
    }}>
      {data.children}
    </div>
  )],
  // [InstructionType.DrawRect, 'Draw Rectangle', ['Left X', 'Top Y', 'Right X', 'Bottom Y', 'Fill']],
]

interface Instruction {
  type: InstructionType
  name: string
  data: any
  manipulator: (props: any) => any
}

interface ImageData {
  mimeType: string,
  filename: string,
  url: string,
  byteLength: number,
  width?: number,
  height?: number,
  _data: ArrayBuffer,
}

function humanizeSize(bytes: number): string {
  if (bytes < 1000) {
    return bytes + ' B';
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;

  do {
    bytes /= 1000;
    ++u;
  } while (Math.round(Math.abs(bytes) * 100) / 100 >= 1000 && u < units.length - 1);

  return bytes.toFixed(2) + ' ' + units[u];
}

function byteLength(str: string) {
  let s = str.length;

  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i);

    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }

  return s;
}

const MIME_TYPES: { [key: string]: string } = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'webp': 'image/webp',
};

function getMimeType(filename: string): string | undefined {
  let ext = filename.split('.').pop();
  if (ext == null) {
    return;
  }

  ext = ext.toLowerCase();
  return MIME_TYPES[ext];
}

async function openFile(file: File): Promise<ImageData> {
  const content = await file.arrayBuffer();
  const mimeType = getMimeType(file.name);
  const url = mimeType && URL.createObjectURL(file);
  let width: number | undefined = undefined;
  let height: number | undefined = undefined;

  let result: ImageData = {
    filename: file.name,
    mimeType: mimeType!,
    url: url!,
    byteLength: file.size,
    width: width!,
    height: height!,
    _data: content,
  };

  if (url) {
    let img = new Image();
    img.src = url;
    img.addEventListener('load', (e) => {
      // @ts-ignore
      result.imageData!.width = e.target.naturalWidth;
      // @ts-ignore
      result.imageData!.height = e.target.naturalHeight;
    })
  }
  return result
}

export function Uploader({ setImage }: { setImage: Setter<ImageData | null> }) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        class=""
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file == null) return
          openFile(file).then(setImage)
        }}
      />
      <div class="rounded-lg p-4 mt-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/30 flex flex-col items-center">
        <h2 class="text-white/80 font-semibold">
          Can't choose? <span class="font-light">Try a preset image</span>
        </h2>
        <div class="flex flex-wrap mt-2 gap-2">
          <For each={DEFAULT_IMAGES}>
            {([image, width, height]) => (
              <button
                class="rounded-lg hover:brightness-125 w-[220px] h-[180px] brightness-100 transition duration-200"
                onClick={() => fetch(image).then((res) => res.arrayBuffer()).then((data) => setImage({
                  mimeType: 'image/jpeg',
                  filename: image.split('/').pop()!,
                  url: image,
                  byteLength: data.byteLength,
                  width,
                  height,
                  _data: data,
                }))}
              >
                <img src={image} alt={image} class="rounded-lg h-[180px] object-cover" />
              </button>
            )}
          </For>
        </div>
      </div>
    </>
  )
}

export function InstructionButton({ type, label, setInstructions }: { type: InstructionType, label: string, setInstructions: Setter<Instruction[]> }) {
  return (
    <button
      class="bg-gray-900 rounded-lg flex items-center justify-between p-4 min-w-[64px] transition hover:bg-gray-700"
      onClick={() => setInstructions(prev => {
        const [_, name, fields] = FIELDS.find(([t]) => t == type)!
        const data = fields?.reduce((prev, curr) => ({ ...prev, [curr]: null }), {}) ?? {}
        return [...prev, { type, name, data }]
      })}
    >
      <span class="mr-2">{label}</span>
      <span>+</span>
    </button>
  )
}

export const App: Component = () => {
  const [image, setImage] = createSignal<ImageData | null>(null)
  const [instructions, setInstructions] = createSignal<Instruction[]>([])

  const rendered = createMemo(() => {
    if (image() == null) return null
    let rendered = (
      <img src={image()!.url} alt={image()!.filename} class="rounded-lg max-w-full max-h-[600px] object-cover" />
    )
    for (const instruction of instructions()) {
      const [_, __, ___, manipulator] = FIELDS.find(([t]) => t == instruction.type)!
      rendered = manipulator({
        ...instruction.data,
        children: rendered,
      })
    }
    return rendered
  })

  return (
    <main class="bg-gray-800 w-[100vw] h-[100vh] text-white flex flex-col overflow-auto">
      <div class="p-8 bg-gray-900/70 rounded-lg mt-4 mx-4 mb-2 flex flex-col items-center justify-center">
        <h1 class="font-bold text-4xl bg-gradient-to-r from-cyan-200 to-indigo-300 text-transparent bg-clip-text">
          Image Playground
        </h1>
        <p class="mt-2 text-white/50 font-medium">
          Rapidly prototype image manipulation and effects
        </p>
      </div>
      <div class="rounded-lg bg-gray-900 p-4 mx-4">
        <h2 classList={{
          "mb-2 text-lg font-medium w-full flex justify-between items-center": true,
          "text-white/80": image() != null,
          "text-white/50": image() == null,
        }}>
          <Show when={image()} fallback="Select Image">
            <span>{image()!.filename} ({image()!.width}x{image()!.height}, {humanizeSize(image()!.byteLength)})</span>
            <button
              class="btn btn-ghost btn-sm !bg-white/5 hover:!bg-red-600 !rounded-full"
              onClick={() => setImage(null)}
            >
              x
            </button>
          </Show>
        </h2>
        <Show when={image()} fallback={<Uploader setImage={setImage} />}>
          {rendered()}
        </Show>
      </div>
      <Show when={image()}>
        <div class="rounded-lg bg-gray-900 p-4 mx-4 my-2">
          <h2 class="text-white/80 text-lg font-medium">
            Editing Instructions
          </h2>
          <p class="text-white/50 text-sm">How should we edit your image?</p>
          <div class="flex flex-col gap-2 mt-2">
            <Show when={instructions().length > 0} fallback="No instructions yet...">
              <For each={Object.entries(instructions())}>
                {([i, instruction]) => (
                  <div class="rounded-lg border-2 border-gray-800 px-4 py-2">
                    <h3 class="flex items-center justify-between">
                      <span>{instruction.name}</span>
                      <button
                        class="btn btn-ghost btn-sm !bg-white/5 hover:!bg-red-600 !rounded-full"
                        onClick={() => {
                          setInstructions(prev => prev.filter((_, index) => index != i as any))
                        }}
                      >
                        x
                      </button>
                    </h3>
                    <div class="flex flex-wrap gap-3">
                      <For each={Object.entries(instruction.data)}>
                        {([key, value]) => (
                          <div class="flex items-center gap-1.5">
                            <label for={key} class="font-semibold text-white/50">{key}</label>
                            <input
                              type="text"
                              class="outline-none border-none bg-gray-800 text-white/80 p-2 text-sm rounded-lg"
                              id={key}
                              value={value as string}
                              onChange={(event) => setInstructions(prev => {
                                const newInstructions = [...prev]
                                newInstructions[i as any].data[key] = event.target.value
                                return newInstructions
                              })}
                            />
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-4 mx-4">
          <For each={FIELDS}>
            {([type, label]) => (
              <InstructionButton type={type} label={label} setInstructions={setInstructions} />
            )}
          </For>
        </div>
      </Show>
    </main>
  )
}
