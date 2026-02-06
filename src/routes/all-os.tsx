import { createFileRoute } from '@tanstack/react-router'
import { AllOsPage } from '@/view/pages/AllOs/AllOsPage'

export const Route = createFileRoute('/all-os')({
  component: AllOsPage,
})
