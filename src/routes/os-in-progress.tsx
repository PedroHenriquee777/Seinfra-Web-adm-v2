import { createFileRoute } from '@tanstack/react-router'
import { OsInProgressPage } from '@/view/pages/OsInProgress/OsInProgress'

export const Route = createFileRoute('/os-in-progress')({
  component: OsInProgressPage,
})
