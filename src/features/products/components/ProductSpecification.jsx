import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function ProductSpecification({ specifications = {} }) {
    const { t } = useTranslation("product");

    const entries = Object.entries(specifications).filter(([, v]) => v);
    if (!entries.length) return null;

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="spec" className="border-border">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                    {t("detail.specification")}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-0">
                        {entries.map(([key, value], index) => (
                            <div key={key}>
                                <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
                                    <span className="shrink-0 text-muted-foreground">
                                        {t(`specification.${key}`) || key}
                                    </span>
                                    <span className="text-right font-medium text-foreground">
                                        {value}
                                    </span>
                                </div>
                                {index < entries.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
