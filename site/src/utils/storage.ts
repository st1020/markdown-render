import * as localForage from "localforage";
import { toRaw } from "vue";
import { useConstant } from "~/composables/constant";
import { useDataStore } from "~/composables/stores/data";
import type { DocumentStyles } from "~/composables/stores/style";
import { useStyleStore } from "~/composables/stores/style";
import { useToast } from "~/composables/toast";

const STORAGE_KEY = "stored_document";

type StoredDocument = {
  markdown: string;
  css: string;
  styles: DocumentStyles;
};

async function read(): Promise<StoredDocument | null> {
  try {
    return await localForage.getItem<StoredDocument>(STORAGE_KEY);
  } catch {
    return null;
  }
}

async function write(data: StoredDocument): Promise<void> {
  await localForage.setItem(STORAGE_KEY, data);
}

export class StorageService {
  public async load(): Promise<void> {
    const { setData } = useDataStore();
    const { setStyle } = useStyleStore();

    await setData("loaded", false);

    const stored = await read();
    const { DEFAULT } = useConstant();

    const storedDocument: StoredDocument = stored ?? {
      markdown: DEFAULT.MD_CONTENT,
      css: DEFAULT.CSS_CONTENT,
      styles: DEFAULT.STYLES
    };

    if (!stored) await write(storedDocument);

    await setData("markdown", storedDocument.markdown);
    await setData("css", storedDocument.css);

    for (const [key, value] of Object.entries(storedDocument.styles)) {
      await setStyle(key as keyof DocumentStyles, value);
    }

    await setData("loaded", true);
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
