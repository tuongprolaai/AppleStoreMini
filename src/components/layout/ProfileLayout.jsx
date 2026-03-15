import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileSidebar from "./profile/ProfileSidebar";

export default function ProfileLayout() {
    const { t } = useTranslation("profile");

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {/* ── Sidebar — desktop luôn hiện ── */}
                <aside className="w-full shrink-0 md:w-64">
                    <ProfileSidebar />
                </aside>

                {/* ── Main content ── */}
                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
