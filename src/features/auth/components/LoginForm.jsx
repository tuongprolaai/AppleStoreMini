import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@/lib/validations";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import SocialLoginButtons from "./SocialLoginButtons";
import { ROUTES } from "@/lib/constants";

export default function LoginForm() {
    const { t } = useTranslation("auth");
    const { login, isLoginLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {
        setServerError("");
        const result = await login(values);
        if (!result.success) {
            setServerError(result.message);
        }
    };

    return (
        <div className="w-full max-w-sm">
            {/* Title */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold text-foreground">
                    {t("login.title")}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {t("login.subtitle")}
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Server error */}
                    {serverError && (
                        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {serverError}
                        </div>
                    )}

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("login.email")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={t(
                                            "login.emailPlaceholder",
                                        )}
                                        autoComplete="email"
                                        disabled={isLoginLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>{t("login.password")}</FormLabel>
                                    <Link
                                        to={ROUTES.FORGOT_PASSWORD}
                                        className="text-xs text-apple-blue hover:opacity-70"
                                        tabIndex={-1}
                                    >
                                        {t("login.forgotPassword")}
                                    </Link>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder={t(
                                                "login.passwordPlaceholder",
                                            )}
                                            autoComplete="current-password"
                                            disabled={isLoginLoading}
                                            className="pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((v) => !v)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full rounded-full"
                        disabled={isLoginLoading}
                    >
                        {isLoginLoading
                            ? t("login.submitting")
                            : t("login.submit")}
                    </Button>
                </form>
            </Form>

            {/* Social login buttons */}
            <div className="mt-6">
                <SocialLoginButtons />
            </div>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("login.noAccount")}{" "}
                <Link
                    to={ROUTES.REGISTER}
                    className="font-medium text-apple-blue hover:opacity-70"
                >
                    {t("login.registerNow")}
                </Link>
            </p>
        </div>
    );
}
