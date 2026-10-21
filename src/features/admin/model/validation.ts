import type { AdminEditorValues } from "@/features/admin/model/type";

export function validateCmsImageFile(file: File) {
  return (
    ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
    file.size > 0 &&
    file.size <= 4 * 1024 * 1024
  );
}

export function createEditorValues(
  item?: Partial<AdminEditorValues> & {
    category?: string;
    location?: string;
    image?: string;
    status?: "completed" | "ongoing";
  },
): AdminEditorValues {
  return {
    title: item?.title ?? "",
    category: item?.category ?? "",
    location: item?.location ?? "",
    image: item?.image ?? "",
    images: item?.images ?? (item?.image ? [item.image] : []),
    description: item?.description ?? "",
    icon: item?.icon ?? "◉",
    status: item?.status ?? "completed",
    active: item?.active ?? true,
  };
}
