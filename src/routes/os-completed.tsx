import { createFileRoute } from '@tanstack/react-router'
import { OsCompletedPage } from '@/view/pages/OsCompleted/OsCompleted'

export const Route = createFileRoute('/os-completed')({
  component: OsCompletedPage,
})