import { createFileRoute } from '@tanstack/react-router'
import { NewOsPage } from '@/view/pages/NewOs/NewOsPage'

export const Route = createFileRoute('/new-os')({
  component: NewOsPage,
})
