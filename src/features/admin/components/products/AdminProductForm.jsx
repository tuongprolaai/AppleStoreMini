import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { productSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminProductImageUpload from "./AdminProductImageUpload";
import AdminColorVariantForm from "./AdminColorVariantForm";
import AdminStorageVariantForm from "./AdminStorageVariantForm";
import { CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";

export default function AdminProductForm({ product, onSubmit, isLoading }) {
    const { t } = useTranslation("admin");
    const [images, setImages] = useState(product?.images || []);
    const [colors, setColors] = useState(product?.colors || []);
    const [storage, setStorage] = useState(product?.storage || []);

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: "",
            price: 0,
            originalPrice: 0,
            stock: 0, // ✅ Thêm
            description: "",
            inStock: true,
            featured: false,
        },
    });

    const watchPrice = form.watch("price");
    const watchStock = form.watch("stock");

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name || "",
                slug: product.slug || "",
                category: product.category || "",
                price: product.price || 0,
                originalPrice: product.originalPrice || 0,
                stock: product.stock ?? 0, // ✅ Thêm
                description: product.description || "",
                inStock: product.inStock ?? true,
                featured: product.featured ?? false,
            });
            setImages(product.images || []);
            setColors(product.colors || []);
            setStorage(product.storage || []);
        }
    }, [product, form]);

    // Tự động sync inStock theo stock
    useEffect(() => {
        if (watchStock === 0) {
            form.setValue("inStock", false);
        } else if (watchStock > 0) {
            form.setValue("inStock", true);
        }
    }, [watchStock, form]);

    const handleNameChange = (e) => {
        const name = e.target.value;
        form.setValue("name", name);
        if (!product) form.setValue("slug", slugify(name));
    };

    const handleSubmit = (values) => {
        onSubmit({ ...values, images, colors, storage });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
                {/* ── Left — Main info ── */}
                <div className="space-y-5 lg:col-span-2">
                    {/* Basic info */}
                    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                        <h3 className="mb-5 text-sm font-medium text-foreground">
                            {t("product.basicInfo", {
                                defaultValue: "Thông tin cơ bản",
                            })}
                        </h3>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("product.name")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "product.namePlaceholder",
                                                )}
                                                disabled={isLoading}
                                                {...field}
                                                onChange={handleNameChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("product.slug")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "product.slugPlaceholder",
                                                )}
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("product.category")}
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={t(
                                                            "product.categoryPlaceholder",
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem
                                                        key={cat.value}
                                                        value={cat.value}
                                                    >
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price + Original price */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("product.price")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={t(
                                                        "product.pricePlaceholder",
                                                    )}
                                                    disabled={isLoading}
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value ===
                                                                ""
                                                                ? ""
                                                                : Number(
                                                                      e.target
                                                                          .value,
                                                                  ),
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="originalPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("product.originalPrice")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={t(
                                                        "product.originalPricePlaceholder",
                                                    )}
                                                    disabled={isLoading}
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value ===
                                                                ""
                                                                ? ""
                                                                : Number(
                                                                      e.target
                                                                          .value,
                                                                  ),
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("product.description")}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={t(
                                                    "product.descriptionPlaceholder",
                                                )}
                                                rows={5}
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                        <h3 className="mb-5 text-sm font-medium text-foreground">
                            {t("product.images")}
                        </h3>
                        <AdminProductImageUpload
                            productId={product?._id || product?.id}
                            images={images}
                            onImagesChange={setImages}
                        />
                    </div>

                    {/* Color variants */}
                    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                        <AdminColorVariantForm
                            colors={colors}
                            onChange={setColors}
                        />
                    </div>

                    {/* Storage variants */}
                    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                        <AdminStorageVariantForm
                            storage={storage}
                            basePrice={watchPrice}
                            onChange={setStorage}
                        />
                    </div>
                </div>

                {/* ── Right — Settings ── */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-5">
                        <h3 className="mb-4 text-sm font-medium text-foreground">
                            {t("product.status")}
                        </h3>
                        <div className="space-y-4">
                            {/* ✅ Tồn kho */}
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("product.stock", {
                                                defaultValue: "Tồn kho",
                                            })}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                placeholder="0"
                                                disabled={isLoading}
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === ""
                                                            ? 0
                                                            : Number(
                                                                  e.target
                                                                      .value,
                                                              ),
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        {watchStock === 0 && (
                                            <p className="text-xs text-red-500">
                                                {t("product.outOfStock", {
                                                    defaultValue:
                                                        "Sản phẩm đang hết hàng",
                                                })}
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            {/* inStock — sync tự động theo stock, vẫn cho override thủ công */}
                            <FormField
                                control={form.control}
                                name="inStock"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between gap-4">
                                        <div>
                                            <FormLabel className="cursor-pointer font-normal text-foreground">
                                                {t("product.inStock")}
                                            </FormLabel>
                                            <p className="text-xs text-muted-foreground">
                                                {t("product.inStockNote", {
                                                    defaultValue:
                                                        "Tự động theo tồn kho",
                                                })}
                                            </p>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            <FormField
                                control={form.control}
                                name="featured"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between gap-4">
                                        <FormLabel className="cursor-pointer font-normal text-foreground">
                                            {t("product.featured")}
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-full"
                        disabled={isLoading}
                    >
                        {isLoading ? t("product.saving") : t("product.save")}
                    </Button>

                    {product && (
                        <p className="text-center text-xs text-muted-foreground">
                            ID: {product?._id || product?.id}
                        </p>
                    )}
                </div>
            </form>
        </Form>
    );
}
