import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { useCreateProductMutation } from "@/store/api/productsApi";
import AdminProductForm from "@/features/admin/components/products/AdminProductForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants";

export default function AdminProductCreate() {
    const { t } = useTranslation("admin");
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleSubmit = async (values) => {
        try {
            await createProduct(values).unwrap();

            toast.success(t("product.createSuccess"));
            navigate(ROUTES.ADMIN_PRODUCTS);
        } catch (error) {
            toast.error(
                error?.data?.message || t("status.error", { ns: "common" }),
            );
        }
    };

    return (
        <div className="space-y-6">
            {/* Back */}
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
                <Link to={ROUTES.ADMIN_PRODUCTS}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {t("product.title")}
                </Link>
            </Button>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-foreground">
                    {t("product.create")}
                </h1>
            </div>

            {/* Form */}
            <AdminProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
