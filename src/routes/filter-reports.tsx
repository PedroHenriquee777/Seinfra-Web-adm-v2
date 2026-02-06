import { createFileRoute } from "@tanstack/react-router";
import { FilterReportsPage } from "@/view/pages/FilterReports/FilterReportsPage";

export const Route = createFileRoute("/filter-reports")({
  component: FilterReportsPage,
});
