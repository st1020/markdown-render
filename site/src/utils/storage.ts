import * as localForage from "localforage";
import { toRaw } from "vue";
import { useConstant } from "~/composables/constant";
import { useDataStore } from "~/composables/stores/data";
import type { ResumeStyles } from "~/composables/stores/style";
import { useStyleStore } from "~/composables/stores/style";
import { useToast } from "~/composables/toast";

const STORAGE_KEY = "ohmycv_resume";

type StoredResume = {
  markdown: string;
  css: string;
  styles: ResumeStyles;
};

async function read(): Promise<StoredResume | null> {
  try {
    return await localForage.getItem<StoredResume>(STORAGE_KEY);
  } catch {
    return null;
  }
}

async function write(data: StoredResume): Promise<void> {
  await localForage.setItem(STORAGE_KEY, data);
}

export class StorageService {
  public async load(): Promise<void> {
    const { setData } = useDataStore();
    const { setStyle } = useStyleStore();

    setData("loaded", false);

    const stored = await read();
    const { DEFAULT } = useConstant();

    const resume: StoredResume = stored ?? {
      markdown: DEFAULT.MD_CONTENT,
      css: DEFAULT.CSS_CONTENT,
      styles: DEFAULT.STYLES
    };

    if (!stored) await write(resume);

    setData("markdown", resume.markdown);
    setData("css", resume.css);

    for (const [key, value] of Object.entries(resume.styles)) {
      await setStyle(key as keyof ResumeStyles, value);
    }

    setData("loaded", true);
  }

  public async save(): Promise<void> {
    const { data } = useDataStore();
    const { styles } = useStyleStore();

    await write({
      markdown: data.markdown,
      css: data.css,
      styles: toRaw(styles)
    });

    useToast().save();
  }
}

export const storageService = new StorageService();
